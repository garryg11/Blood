import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LangSwitch from './components/LangSwitch';
import Home from './pages/Home';
import Manual from './pages/Manual';
import './i18n';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'manual'>('home');
  const { t } = useTranslation();

  const handleNavigateToManual = () => {
    setCurrentPage('manual');
  };

  const handleNavigateHome = () => {
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button onClick={handleNavigateHome}>
            <h1 className="text-2xl font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors">
              {t('title')}
            </h1>
          </button>
          <LangSwitch />
        </div>
      </header>
      
      <main>
        {currentPage === 'home' && <Home onNavigateToManual={handleNavigateToManual} />}
        {currentPage === 'manual' && <Manual onNavigateHome={handleNavigateHome} />}
      </main>
    </div>
  );
}

export default App;