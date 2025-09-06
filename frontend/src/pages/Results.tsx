import React from "react";
import { useTranslation } from "react-i18next";
import { useResults } from "../store/results";
import SafetyBanner from "../components/SafetyBanner";
import ResultSummary from "../components/ResultSummary";
import AnalyteTable from "../components/AnalyteTable";
import { downloadPdfFromSummary } from "../lib/download";

const Results: React.FC = () => {
  const { extracted, explained, explaining } = useResults();
  const { t } = useTranslation();

  const isDE = (navigator.language || "en").toLowerCase().startsWith("de");
  const disclaimer = isDE
    ? "Nur zu Informationszwecken — keine medizinische Beratung."
    : "Information only — not medical advice.";

  async function handleExport() {
    await downloadPdfFromSummary({
      locale: isDE ? "de" : "en",
      extracted_text: extracted?.text || "",
      explained_items: explained?.items || [],
      app_name: "CoreVitals",
      disclaimer,
    });
  }

  if (!extracted) {
    return (
      <div className="p-6 text-center">
        <a href="/" className="text-blue-600 underline">{t("nav.goUpload")}</a>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <SafetyBanner />
      <div className="flex justify-end">
        <button
          onClick={handleExport}
          className="text-sm px-3 py-2 rounded-full border border-gray-200 hover:bg-gray-50"
          disabled={!explained}
        >
          {t("export.pdf")}
        </button>
      </div>
      {explaining && (
        <div className="text-sm text-gray-500">{t("results.loadingExplain")}</div>
      )}
      <ResultSummary text={extracted.text} />
      {explained ? (
        <>
          {explained.warnings?.length > 0 && (
            <div className="text-amber-600 text-sm">
              {t("results.partial")}
            </div>
          )}
          <AnalyteTable rows={explained.items} summary={explained.summary} />
        </>
      ) : (
        <AnalyteTable rows={extracted.fields || []} />
      )}
    </div>
  );
};

export default Results;