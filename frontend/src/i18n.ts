import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      title: 'LabClear',
      subtitle: 'Plain-language lab result explanations',
      upload: 'Upload Lab Results',
      manual: 'Manual Entry',
      language: 'Language',
      processing: 'Processing...',
      disclaimer: 'This tool provides educational information only and is not medical advice. Always consult healthcare professionals for medical decisions.',
      safety: {
        infoOnly: 'Information only — not medical advice.',
        learnMore: 'Learn more'
      },
      summary: {
        heading: 'Summary',
        noText: 'No text extracted.',
        showMore: 'Show more',
        showLess: 'Show less'
      },
      table: {
        heading: 'Lab Values',
        noRows: 'No analytes detected.',
        range: 'Range',
        value: 'Value',
        showSources: 'Show sources',
        hideSources: 'Hide sources'
      },
      badge: {
        low: 'Low',
        inRange: 'In-range',
        high: 'High'
      },
      flag: {
        caution: 'Caution',
        urgent: 'Urgent'
      },
      empty: {
        goUpload: 'Go to Upload'
      }
    }
  },
  de: {
    translation: {
      title: 'LabKlar',
      subtitle: 'Laborergebnisse in verständlicher Sprache',
      upload: 'Laborergebnisse hochladen',
      manual: 'Manuelle Eingabe',
      language: 'Sprache',
      processing: 'Verarbeitung...',
      disclaimer: 'Dieses Tool bietet nur Bildungsinformationen und ist keine medizinische Beratung. Konsultieren Sie immer medizinische Fachkräfte für medizinische Entscheidungen.',
      safety: {
        infoOnly: 'Nur zur Information — keine medizinische Beratung.',
        learnMore: 'Mehr erfahren'
      },
      summary: {
        heading: 'Zusammenfassung',
        noText: 'Kein Text extrahiert.',
        showMore: 'Mehr anzeigen',
        showLess: 'Weniger anzeigen'
      },
      table: {
        heading: 'Laborwerte',
        noRows: 'Keine Analyten erkannt.',
        range: 'Bereich',
        value: 'Wert',
        showSources: 'Quellen anzeigen',
        hideSources: 'Quellen verbergen'
      },
      badge: {
        low: 'Niedrig',
        inRange: 'Im Bereich',
        high: 'Hoch'
      },
      flag: {
        caution: 'Vorsicht',
        urgent: 'Dringend'
      },
      empty: {
        goUpload: 'Zum Upload'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;