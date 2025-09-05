import { useTranslation } from 'react-i18next';

const SafetyBanner = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8" data-testid="safety-banner">
      <p className="text-yellow-800 font-medium text-lg">
        {t('safety.infoOnly')}
      </p>
    </div>
  );
};

export default SafetyBanner;