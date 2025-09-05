import { useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import { LanguageSelector } from './language-selector';
import { PrivacyOverlay } from './privacy-overlay';

export function AppHeader() {
  const { t } = useTranslation();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <i className="fas fa-microscope text-2xl text-primary"></i>
              <h1 className="text-xl font-semibold text-foreground">{t('app.title')}</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                data-testid="button-language-toggle"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <i className="fas fa-globe text-sm"></i>
                <span>{t('header.language')}</span>
                <i className="fas fa-chevron-down text-xs"></i>
              </button>
              <button 
                data-testid="button-privacy"
                onClick={() => setIsPrivacyOpen(true)}
                className="rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <i className="fas fa-shield-halved text-lg"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      <LanguageSelector 
        isOpen={isLanguageOpen} 
        onClose={() => setIsLanguageOpen(false)}
      />
      
      <PrivacyOverlay 
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </>
  );
}
