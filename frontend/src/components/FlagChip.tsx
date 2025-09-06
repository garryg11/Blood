import React from "react";
import { useTranslation } from "react-i18next";

type F = "none" | "caution" | "urgent" | undefined;

export default function FlagChip({ flag }: { flag?: F }) {
  const { t } = useTranslation();
  if (!flag || flag === "none") return null;

  const label = flag === "caution" ? t("flag.caution") : t("flag.urgent");
  const cls =
    flag === "caution"
      ? "border-amber-400 text-amber-700"
      : "border-red-400 text-red-700";

  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs border ${cls}`}>
      {label}
    </span>
  );
}