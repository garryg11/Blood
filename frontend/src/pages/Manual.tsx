import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ManualProps {
  onNavigateHome: () => void;
}

const Manual = ({ onNavigateHome }: ManualProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    testName: '',
    value: '',
    unit: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Manual entry submitted:', formData);
    // TODO: Submit to backend
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="text-center mb-8">
        <button
          onClick={onNavigateHome}
          className="text-blue-500 hover:text-blue-600 mb-4 inline-block"
        >
          ← Back to Home
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('manual')}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="testName" className="block text-sm font-medium text-gray-700 mb-2">
            Test Name
          </label>
          <input
            type="text"
            id="testName"
            name="testName"
            value={formData.testName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Total Cholesterol"
            required
          />
        </div>

        <div>
          <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-2">
            Value
          </label>
          <input
            type="number"
            id="value"
            name="value"
            value={formData.value}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 185"
            required
          />
        </div>

        <div>
          <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-2">
            Unit
          </label>
          <input
            type="text"
            id="unit"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., mg/dL"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors font-medium"
        >
          Analyze Result
        </button>
      </form>
    </div>
  );
};

export default Manual;