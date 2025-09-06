
import React from "react";
import { useTranslation } from "react-i18next";

const SafetyBanner: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-amber-50 text-amber-900 px-3 py-2 rounded">
      {t("safety.infoOnly")}{" "}
      <a href="/privacy" className="underline">{t("safety.learnMore")}</a>
    </div>
  );
};
export default SafetyBanner;
