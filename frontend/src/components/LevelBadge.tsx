interface LevelBadgeProps {
  level?: 'low' | 'in-range' | 'high';
}

const LevelBadge = ({ level }: LevelBadgeProps) => {
  if (!level) return null;

  const badgeStyles = {
    'low': 'bg-amber-50 text-amber-700 border border-amber-200',
    'in-range': 'bg-green-50 text-green-700 border border-green-200', 
    'high': 'bg-red-50 text-red-700 border border-red-200'
  };

  const badgeText = {
    'low': 'Low',
    'in-range': 'In-range',
    'high': 'High'
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