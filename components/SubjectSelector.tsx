
import React from 'react';
import { Subject } from '../types';

interface SubjectSelectorProps {
  subjects: Subject[];
  onSelectLab: (subjectId: string, labId: string) => void;
}

const SubjectSelector: React.FC<SubjectSelectorProps> = ({ subjects, onSelectLab }) => {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Welcome to the Lab</h2>
        <p className="mt-4 text-lg text-gray-400">Select a subject to begin your lab session.</p>
      </div>
      <div className="space-y-8">
        {subjects.map((subject) => (
          <div key={subject.id} className="bg-gray-800 rounded-xl shadow-2xl p-6 transition-all duration-300 hover:bg-gray-700/50">
            <h3 className="text-2xl font-bold text-cyan-400">{subject.name}</h3>
            <p className="mt-2 text-gray-300">{subject.description}</p>
            <div className="mt-6 space-y-4">
              <h4 className="text-lg font-semibold text-gray-200">Available Labs:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subject.labs.map((lab) => (
                  <button
                    key={lab.id}
                    onClick={() => onSelectLab(subject.id, lab.id)}
                    className="p-4 bg-gray-900 rounded-lg text-left hover:bg-cyan-900/50 border border-gray-700 hover:border-cyan-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <p className="font-semibold text-white">{lab.title}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectSelector;
