import UploadCard from '../components/UploadCard';
import ManualEntryLink from '../components/ManualEntryLink';
import LangSwitch from '../components/LangSwitch';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f9f9f9] flex flex-col">
      {/* Top Bar */}
      <header className="w-full py-4 px-6 flex justify-between items-center">
        <div></div> {/* Empty left side */}
        <h1 className="text-xl font-bold text-[#111111]" data-testid="app-title">
          PlainSpeak Labs
        </h1>
        <div>
          <LangSwitch />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        <div className="w-full max-w-sm mx-auto text-center space-y-12">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-4xl font-bold text-[#111111] leading-tight" data-testid="hero-headline">
                Your lab results, made clear.
              </h2>
              <p className="text-lg text-[#666666] leading-relaxed">
                Upload a PDF or photo. Get plain-language explanations in seconds.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <UploadCard />
          </div>

          {/* Manual Entry Link */}
          <div>
            <ManualEntryLink />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;