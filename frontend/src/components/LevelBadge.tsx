
import { useTranslation } from "react-i18next";

type Flag = "low" | "normal" | "high" | "unknown" | undefined;

export default function LevelBadge({ flag }: { flag?: Flag }) {
  const { t } = useTranslation();
  if (!flag) return null;

  const map: Record<Exclude<Flag, undefined>, { label: string; cls: string }> = {
    "low":     { label: t("badge.low"),     cls: "bg-blue-100 text-blue-900" },
    "normal":  { label: t("badge.normal"),  cls: "bg-green-100 text-green-900" },
    "high":    { label: t("badge.high"),    cls: "bg-red-100 text-red-900" },
    "unknown": { label: t("badge.unknown"), cls: "bg-gray-100 text-gray-900" },
  };

  const v = map[flag];
  return <span className={`px-2 py-0.5 rounded-full text-xs ${v.cls}`}>{v.label}</span>;
}
