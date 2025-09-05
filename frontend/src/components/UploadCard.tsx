import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResults } from '../contexts/ResultsContext';

type UploadState = 'idle' | 'uploading' | 'processing' | 'done';

const UploadCard = () => {
  const [uploadState, setUploadState] = useState<UploadState>('idle');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const { setResults } = useResults();

  const uploadFile = async (file: File) => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/extract/`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  };

  const handleDemoMode = async () => {
    setUploadState('processing');
    setError('');

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API_URL}/extract/?demo=true`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const results = await response.json();
      setResults(results);
      setUploadState('done');
      navigate('/results');
    } catch (err) {
      setError('Demo mode failed. Please try again.');
      setUploadState('idle');
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadState('uploading');
    setError('');

    try {
      setUploadState('processing');
      const results = await uploadFile(file);
      setResults(results);
      setUploadState('done');
      navigate('/results');
    } catch (err) {
      setError('Upload failed. Please try again.');
      setUploadState('idle');
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-8 text-center transition-all duration-200 hover:shadow-md">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
        </div>
        
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
        />
        
        <label
          htmlFor="file-upload"
          className={`inline-block w-full py-4 px-6 text-white font-bold text-lg rounded-full transition-colors duration-200 active:scale-[0.98] ${
            uploadState === 'idle' ? 'bg-[#007aff] hover:bg-[#0056b3] cursor-pointer' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {uploadState === 'idle' && 'Upload PDF/Image'}
          {uploadState === 'uploading' && 'Uploading...'}
          {uploadState === 'processing' && 'Processing...'}
          {uploadState === 'done' && 'Complete!'}
        </label>
        
        {/* Demo Mode Button */}
        <button
          onClick={handleDemoMode}
          disabled={uploadState !== 'idle'}
          className={`w-full mt-4 py-3 px-6 font-medium text-lg rounded-full border-2 transition-colors duration-200 ${
            uploadState === 'idle' 
              ? 'border-[#007aff] text-[#007aff] hover:bg-[#007aff] hover:text-white' 
              : 'border-gray-300 text-gray-400 cursor-not-allowed'
          }`}
          data-testid="demo-mode-button"
        >
          Demo Mode
        </button>
        
        <p className="text-sm text-gray-500 mt-4">PDF, JPG, PNG files</p>
        
        {error && (
          <p className="text-sm text-red-500 mt-2" data-testid="upload-error">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default UploadCard;