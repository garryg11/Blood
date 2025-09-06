
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ResultSummary: React.FC<{ text?: string }> = ({ text }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const shown = text ? (open ? text : text.slice(0, 300)) : "";

  return (
    <section className="rounded-xl bg-white shadow-sm p-4">
      <h2 className="text-base font-semibold mb-2">{t("summary.heading")}</h2>
      {!text ? (
        <div className="text-sm text-gray-500">{t("summary.noText")}</div>
      ) : (
        <>
          <pre className="text-xs text-gray-600 whitespace-pre-wrap">{shown}</pre>
          {text.length > 300 && (
            <button
              onClick={() => setOpen((v) => !v)}
              className="mt-2 text-sm text-blue-600 underline"
            >
              {open ? t("summary.showLess") : t("summary.showMore")}
            </button>
          )}
        </>
      )}
    </section>
  );
};

export default ResultSummary;
