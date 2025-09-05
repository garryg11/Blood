import { useTranslation } from '@/lib/i18n';

interface PrivacyOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyOverlay({ isOpen, onClose }: PrivacyOverlayProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handleClearData = () => {
    // Clear localStorage
    localStorage.removeItem('labclear-current-session');
    
    // Show confirmation
    alert('All session data has been cleared.');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 fade-in">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border shadow-xl">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">{t('privacy.title')}</h2>
            <button 
              data-testid="button-close-privacy"
              onClick={onClose}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-success/10 border border-success/30 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <i className="fas fa-shield-check text-success mt-0.5"></i>
                <div>
                  <h3 className="text-sm font-medium text-success mb-1">{t('privacy.protected')}</h3>
                  <p className="text-sm text-muted-foreground">{t('privacy.localProcessing')}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-foreground">{t('privacy.dataHandling')}</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start space-x-2">
                  <i className="fas fa-check text-success mt-0.5 text-xs"></i>
                  <span>{t('privacy.browserOnly')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <i className="fas fa-check text-success mt-0.5 text-xs"></i>
                  <span>{t('privacy.noUpload')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <i className="fas fa-check text-success mt-0.5 text-xs"></i>
                  <span>{t('privacy.autoDelete')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <i className="fas fa-check text-success mt-0.5 text-xs"></i>
                  <span>{t('privacy.hipaa')}</span>
                </li>
              </ul>
            </div>

            <div className="border-t border-border pt-4">
              <button 
                data-testid="button-clear-data"
                onClick={handleClearData}
                className="w-full px-4 py-3 bg-destructive text-destructive-foreground rounded-lg font-medium hover:bg-destructive/90 transition-colors"
              >
                <i className="fas fa-trash mr-2"></i>
                {t('privacy.clearAll')}
              </button>
            </div>

            <div className="text-xs text-muted-foreground">
              <p>{t('privacy.disclaimer')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
