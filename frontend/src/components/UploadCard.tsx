
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { postExtract, postExplain } from "../lib/api";
import { useResults } from "../store/results";

const UploadCard: React.FC = () => {
  const [err, setErr] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setExtracted, setExplained, setExplaining, explaining } = useResults();

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return;
    setErr(null);
    const file = e.target.files[0];
    setExplaining(true);
    
    try {
      const extractJson = await postExtract(file);
      setExtracted(extractJson);
      
      const items = (extractJson?.fields || []).map((f: any) => ({
        analyte: f.analyte, 
        value: f.value, 
        unit: f.unit,
      }));
      
      const explainJson = await postExplain(items);
      setExplained(explainJson);
      navigate("/results");
    } catch (e: any) {
      setErr("We couldn't process that file. Please try another or use Manual Entry.");
    } finally {
      setExplaining(false);
    }
  }

  async function handleDemo() {
    setExplaining(true);
    setErr(null);
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
      setExplaining(false); 
    }
  }

  return (
    <div className="rounded-xl shadow-sm p-4 bg-white space-y-3">
      <label className="block text-sm font-medium">{t("upload.label")}</label>
      <input 
        type="file" 
        accept=".pdf,.jpg,.jpeg,.png" 
        onChange={handleFile} 
        className="block w-full text-sm"
        disabled={explaining}
      />
      <div className="flex justify-center pt-2">
        <button
          onClick={handleDemo}
          className="text-sm px-3 py-2 rounded-full border border-gray-200 hover:bg-gray-50"
          disabled={explaining}
        >
          Try Demo (no upload)
        </button>
      </div>
      <div id="upload-status" className="text-xs text-gray-500">
        {explaining && t("results.loadingExplain")}
      </div>
      {err && <div className="text-sm text-amber-700">{err}</div>}
    </div>
  );
};

export default UploadCard;
