import { useTranslation } from 'react-i18next';

interface FlagChipProps {
  flag?: 'none' | 'caution' | 'urgent';
}

const FlagChip = ({ flag }: FlagChipProps) => {
  const { t } = useTranslation();
  if (!flag || flag === 'none') return null;

  const chipStyles = {
    'caution': 'border-amber-400 text-amber-800 bg-amber-100',
    'urgent': 'border-red-400 text-red-800 bg-red-100'
  };

  const chipText = {
    'caution': t('flag.caution'),
    'urgent': t('flag.urgent')
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