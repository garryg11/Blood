import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ResultSummaryProps {
  text?: string;
}

const ResultSummary = ({ text }: ResultSummaryProps) => {
  const [showMore, setShowMore] = useState(false);
  const { t } = useTranslation();

  if (!text) {
    return (
      <div className="bg-white rounded-2xl p-8 mb-8" data-testid="result-summary">
        <h2 className="text-2xl font-bold text-[#1d1d1f] mb-6">{t('summary.heading')}</h2>
        <p className="text-[#86868b] text-lg" data-testid="no-text-message">
          {t('summary.noText')}
        </p>
      </div>
    );
  }

  const shouldTruncate = text.length > 300;
  const displayText = showMore || !shouldTruncate ? text : text.substring(0, 300) + "...";

  return (
    <div className="bg-white rounded-2xl p-8 mb-8" data-testid="result-summary">
      <h2 className="text-2xl font-bold text-[#1d1d1f] mb-6">{t('summary.heading')}</h2>
      
      <div className="bg-[#f5f5f7] rounded-xl p-6 mb-6">
        <pre className="text-[#515154] font-mono text-base leading-relaxed whitespace-pre-wrap" data-testid="extracted-text">
          {displayText}
        </pre>
      </div>

      {shouldTruncate && (
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-[#007aff] font-medium text-lg hover:text-[#0056b3] transition-colors duration-200 min-h-[44px] px-2 -mx-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007aff] focus-visible:ring-offset-2 rounded-lg"
          aria-label={showMore ? t('summary.showLess') : t('summary.showMore')}
          data-testid="show-more-button"
        >
          {showMore ? t('summary.showLess') : t('summary.showMore')}
        </button>
      )}
    </div>
  );
};

export default ResultSummary;