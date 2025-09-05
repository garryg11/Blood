interface FlagChipProps {
  flag?: 'none' | 'caution' | 'urgent';
}

const FlagChip = ({ flag }: FlagChipProps) => {
  if (!flag || flag === 'none') return null;

  const chipStyles = {
    'caution': 'border-amber-300 text-amber-700 bg-amber-50',
    'urgent': 'border-red-300 text-red-700 bg-red-50'
  };

  const chipText = {
    'caution': 'Caution',
    'urgent': 'Urgent'
  };

  return (
    <span 
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${chipStyles[flag]}`}
      data-testid={`flag-chip-${flag}`}
    >
      {chipText[flag]}
    </span>
  );
};

export default FlagChip;