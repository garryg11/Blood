import { useTranslation } from '@/lib/i18n';

export function ProcessingScreen() {
  const { t } = useTranslation();

  return (
    <div className="fade-in space-y-8">
      <div className="text-center space-y-6">
        <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center pulse-subtle">
          <i className="fas fa-cog fa-spin text-3xl text-primary"></i>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-foreground">{t('processing.title')}</h2>
          <p className="text-muted-foreground mt-2">{t('processing.subtitle')}</p>
        </div>
        
        {/* Progress Steps */}
        <div className="space-y-3 max-w-md mx-auto">
          <div className="flex items-center space-x-3 text-sm" data-testid="progress-extracting">
            <div className="w-4 h-4 bg-success rounded-full flex items-center justify-center">
              <i className="fas fa-check text-xs text-success-foreground"></i>
            </div>
            <span className="text-foreground">{t('processing.extracting')}</span>
          </div>
          <div className="flex items-center space-x-3 text-sm" data-testid="progress-identifying">
            <div className="w-4 h-4 bg-primary rounded-full pulse-subtle"></div>
            <span className="text-foreground">{t('processing.identifying')}</span>
          </div>
          <div className="flex items-center space-x-3 text-sm" data-testid="progress-generating">
            <div className="w-4 h-4 bg-muted rounded-full"></div>
            <span className="text-muted-foreground">{t('processing.generating')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
