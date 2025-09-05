import { useQuery } from '@tanstack/react-query';
import { useTranslation } from '@/lib/i18n';
import { ResultCard } from './result-card';
import { Button } from '@/components/ui/button';
import type { LabResult } from '@/types/lab-results';

interface ResultsScreenProps {
  sessionId: string;
  onAnalyzeAnother: () => void;
  onClearSession: () => void;
}

export function ResultsScreen({ sessionId, onAnalyzeAnother, onClearSession }: ResultsScreenProps) {
  const { t } = useTranslation();

  const { data: results = [], isLoading } = useQuery<LabResult[]>({
    queryKey: ['/api/lab-sessions', sessionId, 'results'],
    enabled: !!sessionId,
  });

  const handleExportPDF = () => {
    // TODO: Implement PDF export
    console.log('Exporting PDF...');
  };

  const handleShare = () => {
    // TODO: Implement sharing functionality
    console.log('Sharing results...');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-2xl text-primary mb-4"></i>
          <p className="text-muted-foreground">Loading results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">{t('results.title')}</h2>
        <div className="flex items-center space-x-2">
          <Button
            onClick={handleExportPDF}
            variant="secondary"
            size="sm"
            data-testid="button-export-pdf"
          >
            <i className="fas fa-download mr-2"></i>
            {t('results.export')}
          </Button>
          <Button
            onClick={handleShare}
            size="sm"
            data-testid="button-share"
          >
            <i className="fas fa-share mr-2"></i>
            {t('results.share')}
          </Button>
        </div>
      </div>

      {/* Results Grid */}
      <div className="space-y-4" data-testid="results-container">
        {results.length === 0 ? (
          <div className="text-center py-12">
            <i className="fas fa-flask text-4xl text-muted-foreground mb-4"></i>
            <p className="text-muted-foreground">No lab results found.</p>
          </div>
        ) : (
          results.map((result) => (
            <ResultCard key={result.id} result={result} />
          ))
        )}
      </div>

      {/* Medical Sources */}
      <div className="bg-secondary/50 border border-border rounded-lg p-4">
        <h3 className="text-sm font-medium text-foreground mb-2">{t('results.sources')}</h3>
        <div className="space-y-1 text-sm">
          <a href="https://www.heart.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline block">
            American Heart Association - Cholesterol Guidelines
          </a>
          <a href="https://www.mayoclinic.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline block">
            Mayo Clinic - Understanding Lab Results
          </a>
          <a href="https://www.cdc.gov" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline block">
            CDC - Diabetes and Prediabetes
          </a>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button
          onClick={onAnalyzeAnother}
          variant="secondary"
          className="flex-1"
          data-testid="button-analyze-another"
        >
          <i className="fas fa-plus mr-2"></i>
          {t('results.analyzeAnother')}
        </Button>
        <Button
          onClick={onClearSession}
          variant="outline"
          className="flex-1"
          data-testid="button-clear-session"
        >
          <i className="fas fa-trash mr-2"></i>
          {t('results.clearSession')}
        </Button>
      </div>
    </div>
  );
}
