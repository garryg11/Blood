import { useState, useEffect } from 'react';

type Language = 'en' | 'de';

interface Translations {
  [key: string]: {
    en: string;
    de: string;
  };
}

const translations: Translations = {
  'app.title': {
    en: 'LabClear',
    de: 'LabKlar'
  },
  'header.language': {
    en: 'EN',
    de: 'DE'
  },
  'disclaimer.title': {
    en: 'Medical Disclaimer',
    de: 'Medizinischer Haftungsausschluss'
  },
  'disclaimer.text': {
    en: 'This tool provides educational information only and is not medical advice. Always consult healthcare professionals for medical decisions.',
    de: 'Dieses Tool bietet nur Bildungsinformationen und ist keine medizinische Beratung. Konsultieren Sie immer medizinische Fachkräfte für medizinische Entscheidungen.'
  },
  'upload.title': {
    en: 'Upload Your Lab Results',
    de: 'Laden Sie Ihre Laborergebnisse hoch'
  },
  'upload.subtitle': {
    en: 'Get plain-language explanations of your lab results with normal ranges and trusted medical references.',
    de: 'Erhalten Sie leicht verständliche Erklärungen Ihrer Laborergebnisse mit Normalwerten und vertrauenswürdigen medizinischen Referenzen.'
  },
  'upload.dropText': {
    en: 'Drop your lab results here',
    de: 'Legen Sie Ihre Laborergebnisse hier ab'
  },
  'upload.supportedFiles': {
    en: 'Supports PDF, JPG, PNG files up to 10MB',
    de: 'Unterstützt PDF-, JPG-, PNG-Dateien bis 10MB'
  },
  'upload.chooseFile': {
    en: 'Choose File',
    de: 'Datei auswählen'
  },
  'upload.manualEntry': {
    en: 'Or enter values manually',
    de: 'Oder Werte manuell eingeben'
  },
  'upload.manualTitle': {
    en: 'Manual Entry',
    de: 'Manuelle Eingabe'
  },
  'form.testName': {
    en: 'Test Name',
    de: 'Testname'
  },
  'form.value': {
    en: 'Value',
    de: 'Wert'
  },
  'form.unit': {
    en: 'Unit',
    de: 'Einheit'
  },
  'form.addTest': {
    en: 'Add Test',
    de: 'Test hinzufügen'
  },
  'privacy.notice': {
    en: 'Your data is processed locally and automatically deleted after your session',
    de: 'Ihre Daten werden lokal verarbeitet und nach Ihrer Sitzung automatisch gelöscht'
  },
  'processing.title': {
    en: 'Processing Your Lab Results',
    de: 'Verarbeitung Ihrer Laborergebnisse'
  },
  'processing.subtitle': {
    en: 'Analyzing and preparing plain-language explanations...',
    de: 'Analyse und Vorbereitung leicht verständlicher Erklärungen...'
  },
  'processing.extracting': {
    en: 'Extracting text from document',
    de: 'Text aus Dokument extrahieren'
  },
  'processing.identifying': {
    en: 'Identifying lab values',
    de: 'Laborwerte identifizieren'
  },
  'processing.generating': {
    en: 'Generating explanations',
    de: 'Erklärungen generieren'
  },
  'results.title': {
    en: 'Your Lab Results',
    de: 'Ihre Laborergebnisse'
  },
  'results.export': {
    en: 'Export PDF',
    de: 'PDF exportieren'
  },
  'results.share': {
    en: 'Share',
    de: 'Teilen'
  },
  'results.normal': {
    en: 'Normal',
    de: 'Normal'
  },
  'results.high': {
    en: 'High',
    de: 'Hoch'
  },
  'results.low': {
    en: 'Low',
    de: 'Niedrig'
  },
  'results.borderlineHigh': {
    en: 'Borderline High',
    de: 'Grenzwertig erhöht'
  },
  'results.whatThisMeans': {
    en: 'What this means:',
    de: 'Was das bedeutet:'
  },
  'results.urgentNotice': {
    en: 'Important Notice',
    de: 'Wichtiger Hinweis'
  },
  'results.urgentText': {
    en: 'This value is significantly elevated and may require immediate medical attention. Please contact your healthcare provider.',
    de: 'Dieser Wert ist deutlich erhöht und erfordert möglicherweise sofortige medizinische Aufmerksamkeit. Bitte kontaktieren Sie Ihren Arzt.'
  },
  'results.sources': {
    en: 'Trusted Medical Sources',
    de: 'Vertrauenswürdige medizinische Quellen'
  },
  'results.analyzeAnother': {
    en: 'Analyze Another Report',
    de: 'Anderen Bericht analysieren'
  },
  'results.clearSession': {
    en: 'Clear Session Data',
    de: 'Sitzungsdaten löschen'
  },
  'privacy.title': {
    en: 'Privacy & Safety',
    de: 'Datenschutz & Sicherheit'
  },
  'privacy.protected': {
    en: 'Your Privacy is Protected',
    de: 'Ihr Datenschutz ist geschützt'
  },
  'privacy.localProcessing': {
    en: 'All processing happens locally. No data is stored on our servers.',
    de: 'Alle Verarbeitung erfolgt lokal. Keine Daten werden auf unseren Servern gespeichert.'
  },
  'privacy.dataHandling': {
    en: 'Data Handling',
    de: 'Datenverarbeitung'
  },
  'privacy.browserOnly': {
    en: 'Files processed in your browser only',
    de: 'Dateien werden nur in Ihrem Browser verarbeitet'
  },
  'privacy.noUpload': {
    en: 'No data uploaded to external servers',
    de: 'Keine Daten an externe Server hochgeladen'
  },
  'privacy.autoDelete': {
    en: 'Session data auto-deleted on close',
    de: 'Sitzungsdaten werden beim Schließen automatisch gelöscht'
  },
  'privacy.hipaa': {
    en: 'HIPAA-compliant by design',
    de: 'HIPAA-konform konzipiert'
  },
  'privacy.clearAll': {
    en: 'Clear All Session Data Now',
    de: 'Alle Sitzungsdaten jetzt löschen'
  },
  'privacy.disclaimer': {
    en: 'By using this tool, you acknowledge that this is for educational purposes only and not a substitute for professional medical advice.',
    de: 'Durch die Nutzung dieses Tools bestätigen Sie, dass es nur zu Bildungszwecken dient und kein Ersatz für professionelle medizinische Beratung ist.'
  }
};

export function useTranslation() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('labclear-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('labclear-language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return {
    language,
    t,
    changeLanguage
  };
}
