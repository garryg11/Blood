import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import LevelBadge from "./LevelBadge";
import FlagChip from "./FlagChip";

interface Row {
  analyte: string;
  value?: number;
  unit?: string;
  refRange?: { low?: number; high?: number; unit?: string };
  level?: "low" | "in-range" | "high";
  message?: string;
  sources?: string[];
  flag?: "none" | "caution" | "urgent";
}

const AnalyteTable: React.FC<{ rows?: Row[] }> = ({ rows }) => {
  const { t } = useTranslation();
  const [openRow, setOpenRow] = useState<number | null>(null);

  if (!rows || rows.length === 0) {
    return <div className="text-sm text-gray-500">{t("table.noRows")}</div>;
  }

  return (
    <section className="space-y-3">
      <h2 className="text-base font-semibold">{t("table.heading")}</h2>
      {rows.map((row, i) => (
        <div key={i} className="rounded-xl bg-white shadow-sm p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="font-medium">{row.analyte}</div>
            <div className="flex items-center gap-2">
              <span className="text-sm">
                {row.value !== undefined ? row.value : "—"}
                {row.unit && <span className="text-gray-500 ml-1">{row.unit}</span>}
              </span>
              <LevelBadge level={row.level} />
              <FlagChip flag={row.flag} />
            </div>
          </div>
          
          {row.refRange && (row.refRange.low !== undefined || row.refRange.high !== undefined) && (
            <div className="text-xs text-gray-500 mb-2">
              {t("table.range")}: {row.refRange.low ?? "—"}–{row.refRange.high ?? "—"}{row.refRange.unit ? ` ${row.refRange.unit}` : ""}
            </div>
          )}

          {row.message && (
            <div className="text-sm text-gray-600 mb-2">{row.message}</div>
          )}

          {row.sources && row.sources.length > 0 && (
            <div>
              <button
                onClick={() => setOpenRow(openRow === i ? null : i)}
                className="text-sm text-blue-600 underline"
              >
                {openRow === i ? t("table.hideSources") : t("table.showSources")}
              </button>
              {openRow === i && (
                <div className="mt-2 space-y-1">
                  {row.sources.map((src, j) => (
                    <div key={j}>
                      <a
                        href={src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 underline break-all"
                      >
                        {src}
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default AnalyteTable;