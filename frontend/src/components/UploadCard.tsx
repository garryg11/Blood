
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { postExplain } from "../lib/api";
import { useResults } from "../store/results";
import Dropzone from "./Dropzone";

const UploadCard: React.FC<{setBusy?: (busy: boolean) => void; setErr?: (err: string | null) => void}> = ({ setBusy, setErr: setPageErr }) => {
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

  async function handleUpload(file: File) {
    // When starting work
    setErr(null);
    setPageErr?.(null);
    setBusy?.(true);
    setLoading(true);
    setExplaining(true);
    
    try {
      const data = await onUpload(file);
      setExtracted(data);
      setExplained(data);
      navigate("/results");
    } catch (e: any) {
      setPageErr?.("We couldn't read that file. Try a clearer scan or PDF.");
    } finally {
      // When finishing (both in success/finally blocks)
      setBusy?.(false);
      setLoading(false);
      setExplaining(false);
    }
  }

  async function handleDemo() {
    // When starting work
    setErr(null);
    setPageErr?.(null);
    setBusy?.(true);
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
      setPageErr?.("Demo failed. Please try again."); 
    } finally { 
      // When finishing (both in success/finally blocks)
      setBusy?.(false);
      setLoading(false);
      setExplaining(false); 
    }
  }

  const isProcessing = loading || ctx.explaining;

  return (
    <div className="space-y-4">
      {/* Dropzone for file upload */}
      <Dropzone onFile={handleUpload} />

      {/* Secondary CTA - Try Demo */}
      <div className="flex justify-center">
        <button
          onClick={handleDemo}
          className="px-6 py-2 text-[#007aff] text-sm font-medium border border-[#007aff] rounded-full hover:bg-[#007aff] hover:text-white transition-colors duration-200 disabled:opacity-50 focus:outline-auto"
          disabled={isProcessing}
          tabIndex={4}
          aria-label="Try demo"
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
