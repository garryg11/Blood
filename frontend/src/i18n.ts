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