
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: { 
    translation: { 
      safety: { 
        infoOnly: "Information only — not medical advice.", 
        learnMore: "Learn more" 
      },
      table: {
        noRows: "No data available",
        range: "Range",
        showSources: "Show sources",
        hideSources: "Hide sources"
      },
      flag: {
        caution: "Caution",
        urgent: "Urgent"
      },
      summary: {
        heading: "Summary",
        noText: "No summary available",
        showMore: "Show more",
        showLess: "Show less"
      },
      results: {
        loadingExplain: "Analyzing values…",
        partial: "Some items couldn't be explained."
      },
      nav: {
        goUpload: "Go to Upload"
      },
      upload: {
        label: "Upload PDF/Image"
      }
    } 
  },
  de: { 
    translation: { 
      safety: { 
        infoOnly: "Nur zu Informationszwecken — keine medizinische Beratung.", 
        learnMore: "Mehr erfahren" 
      },
      table: {
        noRows: "Keine Daten verfügbar",
        range: "Bereich",
        showSources: "Quellen anzeigen",
        hideSources: "Quellen ausblenden"
      },
      flag: {
        caution: "Vorsicht",
        urgent: "Dringend"
      },
      summary: {
        heading: "Zusammenfassung",
        noText: "Keine Zusammenfassung verfügbar",
        showMore: "Mehr anzeigen",
        showLess: "Weniger anzeigen"
      },
      results: {
        loadingExplain: "Werte werden analysiert…",
        partial: "Einige Elemente konnten nicht erklärt werden."
      },
      nav: {
        goUpload: "Zum Upload gehen"
      },
      upload: {
        label: "PDF/Bild hochladen"
      }
    } 
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;
