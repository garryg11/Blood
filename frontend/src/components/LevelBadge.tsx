
import React from "react";
import { useTranslation } from "react-i18next";

type L = "low" | "in-range" | "high" | undefined;

export default function LevelBadge({ level }: { level?: L }) {
  const { t } = useTranslation();
  if (!level) return null;

  const map: Record<Exclude<L, undefined>, { label: string; cls: string }> = {
    "low":      { label: t("badge.low"),     cls: "bg-amber-100 text-amber-900" },
    "in-range": { label: t("badge.inRange"), cls: "bg-green-100 text-green-900" },
    "high":     { label: t("badge.high"),    cls: "bg-red-100 text-red-900" },
  };

  const v = map[level];
  return <span className={`px-2 py-0.5 rounded-full text-xs ${v.cls}`}>{v.label}</span>;
}
