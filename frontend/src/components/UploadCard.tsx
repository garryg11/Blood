
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { postExplain } from "../lib/api";
import { useResults } from "../store/results";

const UploadCard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Get context, but guard the setters
  const ctx = useResults();
  const setExtracted = ctx.setExtracted || (() => {});
  const setExplained = ctx.setExplained || (() => {});
  const setExplaining = typeof ctx.setExplaining === "function" ? ctx.setExplaining : () => {};

  const onUpload = async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/extract-file", { method: "POST", body: fd });
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    ctx.setResults(data); // render in your Results table
    return data;
  };

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return;
    
    // When starting work
    setErr(null);
    setLoading(true);
    setExplaining(true);
    
    const file = e.target.files[0];
    
    try {
      const data = await onUpload(file);
      setExtracted(data);
      setExplained(data);
      navigate("/results");
    } catch (e: any) {
      setErr("We couldn't process that file. Please try another or use Manual Entry.");
    } finally {
      // When finishing (both in success/finally blocks)
      setLoading(false);
      setExplaining(false);
    }
  }

  async function handleDemo() {
    // When starting work
    setErr(null);
    setLoading(true);
    setExplaining(true);
    
    try {
      // Simple local demo payload
      const demoExtract = {
        text: "Hemoglobin 14.1 g/dL\nALT 62 U/L\nFerritin 380 ng/mL",
        fields: [
          { analyte: "Hemoglobin", value: 14.1, unit: "g/dL" },
          { analyte: "ALT", value: 62, unit: "U/L" },
          { analyte: "Ferritin", value: 380, unit: "ng/mL" },
        ],
        warnings: [],
      };
      setExtracted(demoExtract);
      const items = demoExtract.fields.map((f: any) => ({ 
        analyte: f.analyte, 
        value: f.value, 
        unit: f.unit 
      }));
      const explained = await postExplain(items);
      setExplained(explained);
      navigate("/results");
    } catch (e) { 
      setErr("Demo failed. Please try again."); 
    } finally { 
      // When finishing (both in success/finally blocks)
      setLoading(false);
      setExplaining(false); 
    }
  }

  const isProcessing = loading || ctx.explaining;

  const triggerFileInput = () => {
    document.getElementById('file-input')?.click();
  };

  return (
    <div className="space-y-4">
      {/* Hidden file input */}
      <input 
        id="file-input"
        type="file" 
        accept=".pdf,.jpg,.jpeg,.png" 
        onChange={(e) => e.target.files?.[0] && handleFile(e)} 
        className="hidden"
        disabled={isProcessing}
      />
      
      {/* Primary CTA - Upload Report */}
      <button
        onClick={triggerFileInput}
        className="w-full py-4 px-6 bg-[#007aff] text-white text-lg font-semibold rounded-xl hover:bg-[#0056b3] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isProcessing}
        data-testid="button-upload-report"
      >
        {isProcessing ? "Processing..." : "Upload report"}
      </button>

      {/* Secondary CTA - Try Demo */}
      <div className="flex justify-center">
        <button
          onClick={handleDemo}
          className="px-6 py-2 text-[#007aff] text-sm font-medium border border-[#007aff] rounded-full hover:bg-[#007aff] hover:text-white transition-colors duration-200 disabled:opacity-50"
          disabled={isProcessing}
          data-testid="button-try-demo"
        >
          Try demo
        </button>
      </div>

      {/* Status and Errors */}
      {loading && <div className="text-xs text-gray-500 text-center">Processing…</div>}
      {err && <div className="text-sm text-amber-700 text-center">{err}</div>}
    </div>
  );
};

export default UploadCard;
