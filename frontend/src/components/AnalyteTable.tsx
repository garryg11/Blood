import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LevelBadge from './LevelBadge';
import FlagChip from './FlagChip';

interface AnalyteRow {
  analyte: string;
  value?: number;
  unit?: string;
  refRange?: {
    low?: number;
    high?: number;
    unit?: string;
  };
  level?: 'low' | 'in-range' | 'high';
  message?: string;
  sources?: string[];
  flag?: 'none' | 'caution' | 'urgent';
}

interface AnalyteTableProps {
  rows?: AnalyteRow[];
}

const AnalyteTable = ({ rows }: AnalyteTableProps) => {
  const [expandedSources, setExpandedSources] = useState<Set<number>>(new Set());
  const { t } = useTranslation();

  const toggleSources = (index: number) => {
    const newExpanded = new Set(expandedSources);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSources(newExpanded);
  };
  if (!rows || rows.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 mb-8" data-testid="analyte-table">
        <h2 className="text-2xl font-bold text-[#1d1d1f] mb-6">{t('table.heading')}</h2>
        <p className="text-[#86868b] text-lg" data-testid="no-analytes-message">
          {t('table.noRows')}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 mb-8" data-testid="analyte-table">
      <h2 className="text-2xl font-bold text-[#1d1d1f] mb-6">{t('table.heading')}</h2>
      
      <div className="space-y-4">
        {rows.map((row, index) => (
          <div 
            key={index} 
            className="bg-[#f5f5f7] rounded-xl p-6 shadow-sm"
            data-testid={`analyte-card-${index}`}
          >
            {/* Name and Value Row */}
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-bold text-[#1d1d1f]" data-testid={`analyte-name-${index}`}>
                {row.analyte}
              </h3>
              <div className="text-right flex items-center gap-2">
                <span className="text-lg font-semibold text-[#1d1d1f]" data-testid={`analyte-value-${index}`}>
                  {row.value !== undefined ? row.value : '—'}
                  {row.unit && (
                    <span className="text-[#86868b] ml-1">{row.unit}</span>
                  )}
                </span>
                <LevelBadge level={row.level} />
              </div>
            </div>

            {/* Reference Range */}
            {row.refRange && (row.refRange.low !== undefined || row.refRange.high !== undefined) && (
              <div className="mb-2">
                <span className="text-[#86868b] text-base">
                  {t('table.range')}: {row.refRange.low !== undefined ? row.refRange.low : '—'}–{row.refRange.high !== undefined ? row.refRange.high : '—'}{row.refRange.unit ? ` ${row.refRange.unit}` : ''}
                </span>
              </div>
            )}

            {/* Message */}
            {row.message && (
              <div className="mb-3">
                <p className="text-[#515154] text-base" data-testid={`analyte-message-${index}`}>
                  {row.message}
                </p>
              </div>
            )}

            {/* Flag Chip */}
            {row.flag && row.flag !== 'none' && (
              <div className="mb-3">
                <FlagChip flag={row.flag} />
              </div>
            )}

            {/* Sources */}
            {row.sources && row.sources.length > 0 && (
              <div>
                <button
                  onClick={() => toggleSources(index)}
                  className="text-[#007aff] text-sm font-medium hover:text-[#0056b3] transition-colors duration-200"
                  data-testid={`show-sources-button-${index}`}
                >
                  {expandedSources.has(index) ? t('table.hideSources') : t('table.showSources')}
                </button>
                {expandedSources.has(index) && (
                  <div className="mt-2 space-y-1" data-testid={`sources-list-${index}`}>
                    {row.sources.map((source, sourceIndex) => (
                      <div key={sourceIndex}>
                        <a
                          href={source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[#007aff] hover:text-[#0056b3] underline break-all"
                          data-testid={`source-link-${index}-${sourceIndex}`}
                        >
                          {source}
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyteTable;