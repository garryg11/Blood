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
  if (!rows || rows.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 mb-8" data-testid="analyte-table">
        <h2 className="text-2xl font-bold text-[#1d1d1f] mb-6">Lab Values</h2>
        <p className="text-[#86868b] text-lg" data-testid="no-analytes-message">
          No analytes detected.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 mb-8" data-testid="analyte-table">
      <h2 className="text-2xl font-bold text-[#1d1d1f] mb-6">Lab Values</h2>
      
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
              <div className="text-right">
                <span className="text-lg font-semibold text-[#1d1d1f]" data-testid={`analyte-value-${index}`}>
                  {row.value !== undefined ? row.value : '—'}
                  {row.unit && (
                    <span className="text-[#86868b] ml-1">{row.unit}</span>
                  )}
                </span>
              </div>
            </div>

            {/* Reference Range */}
            {row.refRange && (row.refRange.low !== undefined || row.refRange.high !== undefined) && (
              <div className="mb-2">
                <span className="text-[#86868b] text-base">
                  Range: {row.refRange.low !== undefined ? row.refRange.low : '—'}–{row.refRange.high !== undefined ? row.refRange.high : '—'}{row.refRange.unit ? ` ${row.refRange.unit}` : ''}
                </span>
              </div>
            )}

            {/* Message */}
            {row.message && (
              <div>
                <p className="text-[#515154] text-base" data-testid={`analyte-message-${index}`}>
                  {row.message}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyteTable;