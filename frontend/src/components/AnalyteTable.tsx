import { useTranslation } from "react-i18next";
import LevelBadge from "./LevelBadge";

interface Row {
  name: string;
  value: number;
  unit: string;
  ref_low?: number;
  ref_high?: number;
  flag: "low" | "normal" | "high" | "unknown";
  explanation: string;
}

const AnalyteTable: React.FC<{ rows?: Row[]; summary?: string }> = ({ rows, summary }) => {
  const { t } = useTranslation();

  if (!rows || rows.length === 0) {
    return <div className="text-sm text-gray-500">{t("table.noRows")}</div>;
  }

  return (
    <section className="space-y-3">
      {summary && (
        <div className="text-sm font-medium text-gray-700 p-3 bg-gray-50 rounded-lg">
          {summary}
        </div>
      )}
      {rows.map((r, idx) => (
        <div key={idx} className="rounded-xl bg-white shadow-sm p-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold">{t(`medical.analytes.${r.name}`) || r.name}</span>
            <div className="flex items-center gap-2">
              <span>{r.value} <span className="text-gray-500">{r.unit}</span></span>
              <LevelBadge flag={r.flag} />
            </div>
          </div>
          {(r.ref_low !== undefined || r.ref_high !== undefined) && (
            <div className="text-xs text-gray-500 mt-1">
              {t("table.range")}: {r.ref_low ?? "—"}–{r.ref_high ?? "—"} {r.unit}
            </div>
          )}
          {r.explanation && (
            <div className="text-sm text-gray-600 mt-2">{t(`medical.explanations.${r.explanation}`) || r.explanation}</div>
          )}
        </div>
      ))}
    </section>
  );
};

export default AnalyteTable;