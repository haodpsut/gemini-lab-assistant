
import React, { useState } from 'react';

interface ApiKeyManagerProps {
  onKeySubmit: (key: string) => void;
}

const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({ onKeySubmit }) => {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      setError('API Key cannot be empty.');
      return;
    }
    setError('');
    onKeySubmit(apiKey);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-2xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Gemini Lab Assistant</h1>
          <p className="mt-2 text-gray-400">Please enter your API Key to continue.</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="api-key" className="text-sm font-bold text-gray-300 sr-only">
              API Key
            </label>
            <input
              id="api-key"
              name="api-key"
              type="password"
              autoComplete="current-password"
              required
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-4 py-3 text-gray-100 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Enter your Gemini API Key"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 font-extrabold text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500 transition-colors duration-300"
            >
              Start Learning
            </button>
          </div>
        </form>
        <div className="text-xs text-center text-gray-500">
          <p>
            You can get your API key from{' '}
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-cyan-400 hover:underline"
            >
              Google AI Studio
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyManager;
