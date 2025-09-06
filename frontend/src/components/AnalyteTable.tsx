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
      {rows.map((r, idx) => (
        <div key={idx} className="rounded-xl bg-white shadow-sm p-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold">{r.analyte}</span>
            <div className="flex items-center gap-2">
              <span>{r.value !== undefined ? r.value : "—"}
                {r.unit && <span className="text-gray-500 ml-1">{r.unit}</span>}
              </span>
              <LevelBadge level={r.level} />
              <FlagChip flag={r.flag} />
            </div>
          </div>
          {r.refRange && (r.refRange.low !== undefined || r.refRange.high !== undefined) && (
            <div className="text-xs text-gray-500">
              {t("table.range")}: {r.refRange.low ?? "—"}–{r.refRange.high ?? "—"} {r.refRange.unit ? ` ${r.refRange.unit}` : ""}
            </div>
          )}
          {r.message && (
            <div className="text-sm text-gray-600 mb-2">{r.message}</div>
          )}
          {r.sources && r.sources.length > 0 && (
            <div className="mt-2">
              <button
                onClick={() => setOpenRow(openRow === idx ? null : idx)}
                className="text-sm text-blue-600 underline"
              >
                {openRow === idx ? t("table.hideSources") : t("table.showSources")}
              </button>
              {openRow === idx && (
                <div className="mt-2 space-y-1">
                  {r.sources.map((src, j) => (
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