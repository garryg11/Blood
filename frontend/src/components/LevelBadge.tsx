import { useTranslation } from 'react-i18next';

interface LevelBadgeProps {
  level?: 'low' | 'in-range' | 'high';
}

const LevelBadge = ({ level }: LevelBadgeProps) => {
  const { t } = useTranslation();
  if (!level) return null;

  const badgeStyles = {
    'low': 'bg-amber-100 text-amber-800 border border-amber-300',
    'in-range': 'bg-green-100 text-green-800 border border-green-300', 
    'high': 'bg-red-100 text-red-800 border border-red-300'
  };

  const badgeText = {
    'low': t('badge.low'),
    'in-range': t('badge.inRange'),
    'high': t('badge.high')
  };

  return (
    <span 
      className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${badgeStyles[level]}`}
      data-testid={`level-badge-${level}`}
    >
      {badgeText[level]}
    </span>
  );
};

export default LevelBadge;