
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { postExtract, postExplain } from "../lib/api";
import { useResults } from "../store/results";

const UploadCard: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setExtracted, setExplained, setExplaining } = useResults();

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return;
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
    } catch (err) {
      console.error(err);
    } finally {
      setExplaining(false);
      navigate("/results");
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
      />
    </div>
  );
};

export default UploadCard;
