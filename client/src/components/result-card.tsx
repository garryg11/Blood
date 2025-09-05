import { useTranslation } from '@/lib/i18n';
import type { LabResult } from '@/types/lab-results';

interface ResultCardProps {
  result: LabResult;
}

export function ResultCard({ result }: ResultCardProps) {
  const { t } = useTranslation();

  const getStatusColor = (interpretation: string) => {
    switch (interpretation) {
      case 'normal':
        return 'success';
      case 'high':
      case 'low':
        return 'destructive';
      case 'borderline-high':
      case 'borderline-low':
        return 'warning';
      default:
        return 'muted';
    }
  };

  const getStatusText = (interpretation: string) => {
    switch (interpretation) {
      case 'normal':
        return t('results.normal');
      case 'high':
        return t('results.high');
      case 'low':
        return t('results.low');
      case 'borderline-high':
        return t('results.borderlineHigh');
      default:
        return interpretation;
    }
  };

  const statusColor = getStatusColor(result.interpretation);
  const isUrgent = result.isUrgent === 'true';
  const borderClass = isUrgent ? 'border-2 border-destructive/30' : 'border border-border';
  const valueColorClass = statusColor === 'destructive' ? 'text-destructive' : 
                         statusColor === 'warning' ? 'text-warning' : 'text-foreground';

  return (
    <div className={`bg-card ${borderClass} rounded-xl p-6 space-y-4`} data-testid={`result-card-${result.id}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-medium text-foreground" data-testid={`text-test-name-${result.id}`}>
              {result.testName}
            </h3>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${statusColor}/10 text-${statusColor}`}>
              <i className={`fas ${statusColor === 'success' ? 'fa-check-circle' : statusColor === 'destructive' ? 'fa-exclamation-triangle' : 'fa-minus-circle'} mr-1`}></i>
              {getStatusText(result.interpretation)}
            </span>
          </div>
          <div className="flex items-baseline space-x-2 mb-3">
            <span className={`text-2xl font-semibold ${valueColorClass}`} data-testid={`text-value-${result.id}`}>
              {result.value}
            </span>
            <span className="text-sm text-muted-foreground" data-testid={`text-unit-${result.id}`}>
              {result.unit}
            </span>
            {result.normalRangeText && (
              <span className="text-sm text-muted-foreground">
                (Normal: <span data-testid={`text-normal-range-${result.id}`}>{result.normalRangeText}</span>)
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Urgent Alert */}
      {isUrgent && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4" data-testid={`alert-urgent-${result.id}`}>
          <div className="flex items-start space-x-3">
            <i className="fas fa-exclamation-triangle text-destructive mt-0.5"></i>
            <div>
              <h4 className="text-sm font-medium text-destructive mb-1">{t('results.urgentNotice')}</h4>
              <p className="text-sm text-foreground">{t('results.urgentText')}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="prose prose-sm max-w-none">
        <p className="text-foreground" data-testid={`text-explanation-${result.id}`}>
          {result.explanation}
        </p>
        
        <div className="mt-4 p-3 bg-accent/50 rounded-lg">
          <h4 className="text-sm font-medium text-foreground mb-1">{t('results.whatThisMeans')}</h4>
          <p className="text-sm text-muted-foreground" data-testid={`text-meaning-${result.id}`}>
            {result.meaning}
          </p>
        </div>
      </div>
    </div>
  );
}
