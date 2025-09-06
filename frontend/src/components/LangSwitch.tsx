
import React from "react";
import i18n from "../i18n";
import LangToggle from "./LangToggle";

const LangSwitch: React.FC = () => {
  const cur = i18n.language.startsWith("de") ? "de" : "en";
  function setLang(newLang: "en" | "de") { 
    i18n.changeLanguage(newLang); 
  }
  return (
    <LangToggle value={cur} onChange={setLang} />
  );
};
export default LangSwitch;
