import { useTranslation } from 'react-i18next';
import UploadCard from '../components/UploadCard';
import ManualEntryLink from '../components/ManualEntryLink';

interface HomeProps {
  onNavigateToManual: () => void;
}

const Home = ({ onNavigateToManual }: HomeProps) => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('title')}</h1>
        <p className="text-xl text-gray-600 mb-8">{t('subtitle')}</p>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-sm text-yellow-800 text-left">
              <p className="font-medium mb-1">Medical Disclaimer</p>
              <p>{t('disclaimer')}</p>
            </div>
          </div>
        </div>
      </div>

      <UploadCard />
      <ManualEntryLink onClick={onNavigateToManual} />
    </div>
  );
};

export default Home;