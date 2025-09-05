import { useState } from 'react';

const SafetyBanner = () => {
  const [currentLang, setCurrentLang] = useState('EN');

  const messages = {
    EN: "⚠ Not medical advice. For information only.",
    DE: "⚠ Keine medizinische Beratung. Nur zur Information."
  };

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6" data-testid="safety-banner">
      <div className="flex items-center space-x-2">
        <span className="text-yellow-600 font-medium text-sm">
          {messages[currentLang as keyof typeof messages]}
        </span>
      </div>
    </div>
  );
};

export default SafetyBanner;