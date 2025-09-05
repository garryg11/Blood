import { useTranslation } from 'react-i18next';

interface ManualEntryLinkProps {
  onClick: () => void;
}

const ManualEntryLink = ({ onClick }: ManualEntryLinkProps) => {
  const { t } = useTranslation();

  return (
    <div className="text-center mt-6">
      <button
        onClick={onClick}
        className="text-blue-500 hover:text-blue-600 underline"
      >
        {t('manual')}
      </button>
    </div>
  );
};

export default ManualEntryLink;