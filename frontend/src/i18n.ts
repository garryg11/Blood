
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
      },
      export: {
        pdf: "Export PDF"
      },
      badge: {
        low: "Low",
        normal: "Normal", 
        high: "High",
        unknown: "Unknown"
      },
      medical: {
        analytes: {
          "Glucose": "Glucose",
          "ALT": "ALT", 
          "AST": "AST",
          "Hemoglobin": "Hemoglobin"
        },
        explanations: {
          "Within normal range.": "Within normal range.",
          "Below the typical reference range.": "Below the typical reference range.",
          "Above the typical range.": "Above the typical range.",
          "Slightly above the typical range; consider a fasting re-test.": "Slightly above the typical range; consider a fasting re-test.",
          "No reference range available.": "No reference range available."
        }
      },
      language: {
        toggle: "DE"
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
      },
      export: {
        pdf: "PDF exportieren"
      },
      badge: {
        low: "Niedrig",
        normal: "Normal",
        high: "Hoch", 
        unknown: "Unbekannt"
      },
      medical: {
        analytes: {
          "Glucose": "Glukose",
          "ALT": "ALT",
          "AST": "AST", 
          "Hemoglobin": "Hämoglobin"
        },
        explanations: {
          "Within normal range.": "Im Normbereich.",
          "Below the typical reference range.": "Unter dem typischen Referenzbereich.",
          "Above the typical range.": "Über dem typischen Bereich.",
          "Slightly above the typical range; consider a fasting re-test.": "Leicht über dem typischen Bereich; nüchterne Wiederholung erwägen.",
          "No reference range available.": "Kein Referenzbereich verfügbar."
        }
      },
      language: {
        toggle: "EN"
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
