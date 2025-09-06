
import React from "react";
import i18n from "../i18n";

const LangSwitch: React.FC = () => {
  const cur = i18n.language.startsWith("de") ? "de" : "en";
  function toggle() { i18n.changeLanguage(cur === "en" ? "de" : "en"); }
  return (
    <button onClick={toggle} className="text-sm px-2 py-1 border rounded">
      {cur.toUpperCase()} | {(cur === "en" ? "de" : "en").toUpperCase()}
    </button>
  );
};
export default LangSwitch;
