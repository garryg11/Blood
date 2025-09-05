import { Link } from 'react-router-dom';
import LangSwitch from '../components/LangSwitch';

const Manual = () => {
  return (
    <div className="min-h-screen bg-[#f9f9f9] flex flex-col">
      {/* Top Bar */}
      <header className="w-full py-4 px-6 flex justify-between items-center">
        <Link 
          to="/" 
          className="text-[#007aff] text-sm font-medium hover:text-[#0056b3] transition-colors duration-200"
          data-testid="back-home-link"
        >
          ← Back
        </Link>
        <h1 className="text-xl font-bold text-[#111111]" data-testid="app-title">
          PlainSpeak Labs
        </h1>
        <div>
          <LangSwitch />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        <div className="w-full max-w-sm mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#111111] leading-tight" data-testid="manual-headline">
            Manual Entry
          </h2>
        </div>
      </main>
    </div>
  );
};

export default Manual;