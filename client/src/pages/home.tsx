import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from '@/lib/i18n';
import { AppHeader } from '@/components/app-header';
import { UploadScreen } from '@/components/upload-screen';
import { ProcessingScreen } from '@/components/processing-screen';
import { ResultsScreen } from '@/components/results-screen';
import { apiRequest } from '@/lib/queryClient';
import type { LabSession } from '@/types/lab-results';

type AppScreen = 'upload' | 'processing' | 'results';

export default function Home() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('upload');
  const [sessionId, setSessionId] = useState<string>(() => {
    return localStorage.getItem('labclear-current-session') || '';
  });

  // Create session mutation
  const createSessionMutation = useMutation({
    mutationFn: () => apiRequest('POST', '/api/lab-sessions', { language: 'en' }),
    onSuccess: async (response) => {
      const session: LabSession = await response.json();
      setSessionId(session.id);
      localStorage.setItem('labclear-current-session', session.id);
    },
  });

  // Query session status
  const { data: session } = useQuery<LabSession>({
    queryKey: ['/api/lab-sessions', sessionId],
    enabled: !!sessionId,
    refetchInterval: currentScreen === 'processing' ? 1000 : false,
  });

  // Effect to handle session status changes
  useEffect(() => {
    if (session) {
      if (session.processingStatus === 'processing' && currentScreen !== 'processing') {
        setCurrentScreen('processing');
      } else if (session.processingStatus === 'completed' && currentScreen !== 'results') {
        setCurrentScreen('results');
      }
    }
  }, [session, currentScreen]);

  // Initialize session on mount if none exists
  useEffect(() => {
    if (!sessionId) {
      createSessionMutation.mutate();
    }
  }, []);

  const handleProcessingStart = () => {
    setCurrentScreen('processing');
  };

  const handleAnalyzeAnother = () => {
    // Create new session
    createSessionMutation.mutate();
    setCurrentScreen('upload');
  };

  const handleClearSession = async () => {
    if (sessionId) {
      try {
        await apiRequest('DELETE', `/api/lab-sessions/${sessionId}`);
        localStorage.removeItem('labclear-current-session');
        queryClient.clear();
        createSessionMutation.mutate();
        setCurrentScreen('upload');
      } catch (error) {
        console.error('Failed to clear session:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      {/* Medical Disclaimer Banner */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 max-w-2xl">
        <div className="mb-8 rounded-lg border border-warning bg-warning/10 p-4" data-testid="disclaimer-banner">
          <div className="flex items-start space-x-3">
            <i className="fas fa-exclamation-triangle text-warning mt-0.5"></i>
            <div>
              <h3 className="text-sm font-medium text-warning-foreground">{t('disclaimer.title')}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t('disclaimer.text')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-2xl">
        {currentScreen === 'upload' && sessionId && (
          <UploadScreen
            sessionId={sessionId}
            onProcessingStart={handleProcessingStart}
          />
        )}
        
        {currentScreen === 'processing' && (
          <ProcessingScreen />
        )}
        
        {currentScreen === 'results' && sessionId && (
          <ResultsScreen
            sessionId={sessionId}
            onAnalyzeAnother={handleAnalyzeAnother}
            onClearSession={handleClearSession}
          />
        )}
      </main>
    </div>
  );
}
