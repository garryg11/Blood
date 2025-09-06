
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: { translation: { safety: { infoOnly: "Information only — not medical advice.", learnMore: "Learn more" } } },
  de: { translation: { safety: { infoOnly: "Nur zu Informationszwecken — keine medizinische Beratung.", learnMore: "Mehr erfahren" } } }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;
