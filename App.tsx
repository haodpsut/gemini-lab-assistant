
import React, { useState, useMemo, useEffect } from 'react';
import { Lab } from './types';
import { LAB_DATA } from './constants';
import SubjectSelector from './components/SubjectSelector';
import LabViewer from './components/LabViewer';
import ApiKeyManager from './components/ApiKeyManager';

// This is a polyfill for the sandboxed environment.
// In a real app, you would use a more robust solution for managing environment variables.
if (typeof process === 'undefined') {
  (window as any).process = { env: {} };
}

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string | null>(() => {
    // Check for key in localStorage on initial load
    try {
      return localStorage.getItem('gemini-api-key');
    } catch (e) {
      console.error("Could not access localStorage", e);
      return null;
    }
  });

  const [selectedLabId, setSelectedLabId] = useState<string | null>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);

  useEffect(() => {
    // When apiKey state changes, update the mock process.env and localStorage
    if (apiKey) {
      (process.env as any).API_KEY = apiKey;
      try {
        localStorage.setItem('gemini-api-key', apiKey);
      } catch (e) {
        console.error("Could not access localStorage", e);
      }
    } else {
       delete (process.env as any).API_KEY;
       try {
        localStorage.removeItem('gemini-api-key');
       } catch (e) {
        console.error("Could not access localStorage", e);
       }
    }
  }, [apiKey]);


  const handleKeySubmit = (key: string) => {
    setApiKey(key);
  };

  const handleSelectLab = (subjectId: string, labId: string) => {
    setSelectedSubjectId(subjectId);
    setSelectedLabId(labId);
  };

  const handleGoBack = () => {
    setSelectedLabId(null);
    setSelectedSubjectId(null);
  };

  const selectedLab = useMemo(() => {
    if (!selectedSubjectId || !selectedLabId) return null;
    const subject = LAB_DATA.find(s => s.id === selectedSubjectId);
    return subject?.labs.find(l => l.id === selectedLabId) || null;
  }, [selectedSubjectId, selectedLabId]);
  
  if (!apiKey) {
    return <ApiKeyManager onKeySubmit={handleKeySubmit} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <header className="bg-gray-800 shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            <h1 className="text-xl md:text-2xl font-bold text-white">Gemini Lab Assistant</h1>
          </div>
          {selectedLab && (
            <button
              onClick={handleGoBack}
              className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition duration-300 flex items-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Back to Labs</span>
            </button>
          )}
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedLab ? (
          <SubjectSelector subjects={LAB_DATA} onSelectLab={handleSelectLab} />
        ) : (
          <LabViewer key={selectedLab.id} lab={selectedLab} />
        )}
      </main>
    </div>
  );
};

export default App;
