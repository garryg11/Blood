import { useState } from 'react';

const LangSwitch = () => {
  const [currentLang, setCurrentLang] = useState('EN');

  const toggleLanguage = () => {
    setCurrentLang(currentLang === 'EN' ? 'DE' : 'EN');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="text-[#111111] font-medium text-sm hover:text-[#007aff] transition-colors duration-200"
      data-testid="lang-switch"
    >
      {currentLang} | {currentLang === 'EN' ? 'DE' : 'EN'}
    </button>
  );
};

export default LangSwitch;