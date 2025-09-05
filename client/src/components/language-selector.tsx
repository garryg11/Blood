import { useTranslation } from '@/lib/i18n';
import { useEffect, useRef } from 'react';

interface LanguageSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LanguageSelector({ isOpen, onClose }: LanguageSelectorProps) {
  const { language, changeLanguage } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={ref}
      className="fixed top-20 right-4 bg-card border border-border rounded-lg shadow-lg p-2 z-40 fade-in"
      data-testid="language-selector"
    >
      <div className="space-y-1">
        <button
          data-testid="button-language-en"
          onClick={() => {
            changeLanguage('en');
            onClose();
          }}
          className={`w-full px-3 py-2 text-left text-sm rounded hover:bg-accent transition-colors flex items-center justify-between ${
            language === 'en' ? 'bg-accent' : ''
          }`}
        >
          <span>English</span>
          <span className="text-xs text-muted-foreground">EN</span>
        </button>
        <button
          data-testid="button-language-de"
          onClick={() => {
            changeLanguage('de');
            onClose();
          }}
          className={`w-full px-3 py-2 text-left text-sm rounded hover:bg-accent transition-colors flex items-center justify-between ${
            language === 'de' ? 'bg-accent' : ''
          }`}
        >
          <span>Deutsch</span>
          <span className="text-xs text-muted-foreground">DE</span>
        </button>
      </div>
    </div>
  );
}
