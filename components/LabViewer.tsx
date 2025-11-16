
import React, { useState, useEffect, useCallback } from 'react';
import { Lab } from '../types';
import { getReviewContent, getHint, evaluateAnswer } from '../services/geminiService';
import { BookOpenIcon, LightBulbIcon, DocumentTextIcon, CheckCircleIcon } from './icons/Icons';

interface LabViewerProps {
  lab: Lab;
}

type Tab = 'review' | 'assignment';

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div>
  </div>
);

const LabViewer: React.FC<LabViewerProps> = ({ lab }) => {
  const [activeTab, setActiveTab] = useState<Tab>('review');
  const [reviewContent, setReviewContent] = useState<string>('');
  const [isLoadingReview, setIsLoadingReview] = useState<boolean>(true);
  const [studentAnswer, setStudentAnswer] = useState<string>('');
  const [hints, setHints] = useState<string[]>([]);
  const [hintCount, setHintCount] = useState<number>(0);
  const [isLoadingHint, setIsLoadingHint] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);

  const maxHints = 3;

  const fetchReview = useCallback(async () => {
    setIsLoadingReview(true);
    const content = await getReviewContent(lab.reviewTopics);
    setReviewContent(content);
    setIsLoadingReview(false);
  }, [lab.reviewTopics]);

  useEffect(() => {
    fetchReview();
  }, [fetchReview]);

  const handleGetHint = async () => {
    if (hintCount >= maxHints) return;
    setIsLoadingHint(true);
    const newHint = await getHint(lab.problem, studentAnswer);
    setHints(prev => [...prev, newHint]);
    setHintCount(prev => prev + 1);
    setIsLoadingHint(false);
  };

  const handleSubmit = async () => {
    setIsEvaluating(true);
    setEvaluation('');
    const result = await evaluateAnswer(lab.problem, studentAnswer);
    setEvaluation(result);
    setIsEvaluating(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'review':
        return (
          <div className="prose prose-invert prose-lg max-w-none p-6 bg-gray-800 rounded-b-lg">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center"><BookOpenIcon /> Review Kiến thức</h3>
            {isLoadingReview ? <LoadingSpinner /> : <pre className="whitespace-pre-wrap font-sans">{reviewContent}</pre>}
          </div>
        );
      case 'assignment':
        return (
          <div className="p-6 bg-gray-800 rounded-b-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column: Problem & Hints */}
              <div>
                <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center"><DocumentTextIcon /> Yêu cầu đề bài</h3>
                <div className="prose prose-invert max-w-none p-4 bg-gray-900/50 rounded-lg">
                  <pre className="whitespace-pre-wrap font-sans">{lab.problem}</pre>
                </div>
                <div className="mt-6">
                  <button
                    onClick={handleGetHint}
                    disabled={hintCount >= maxHints || isLoadingHint}
                    className="w-full flex items-center justify-center px-4 py-2 bg-yellow-600 text-white font-bold rounded-lg hover:bg-yellow-700 transition duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
                  >
                    {isLoadingHint ? (
                       <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <LightBulbIcon /> Lấy Gợi ý ({maxHints - hintCount} lần còn lại)
                      </>
                    )}
                  </button>
                </div>
                <div className="mt-4 space-y-4">
                  {hints.map((hint, index) => (
                    <div key={index} className="p-4 bg-gray-700 rounded-lg">
                      <p className="font-bold text-yellow-400">Gợi ý #{index + 1}:</p>
                      <pre className="whitespace-pre-wrap font-sans mt-2 text-gray-300">{hint}</pre>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Submission & Evaluation */}
              <div>
                <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center"><CheckCircleIcon /> Bài làm & Đánh giá</h3>
                <textarea
                  value={studentAnswer}
                  onChange={(e) => setStudentAnswer(e.target.value)}
                  placeholder="Nhập câu trả lời hoặc code của bạn vào đây..."
                  className="w-full h-64 p-4 bg-gray-900 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                />
                <button
                  onClick={handleSubmit}
                  disabled={isEvaluating || !studentAnswer}
                  className="w-full mt-4 px-4 py-3 bg-green-600 text-white font-extrabold rounded-lg hover:bg-green-700 transition duration-300 disabled:bg-gray-600"
                >
                  {isEvaluating ? 'Đang chấm bài...' : 'Nộp bài'}
                </button>

                {isEvaluating && <LoadingSpinner />}
                {evaluation && (
                  <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                    <h4 className="text-xl font-bold text-green-400 mb-2">Kết quả đánh giá</h4>
                    <div className="prose prose-invert max-w-none">
                       <pre className="whitespace-pre-wrap font-sans">{evaluation}</pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  const getTabClass = (tab: Tab) => 
    `px-6 py-3 font-bold text-lg rounded-t-lg transition-colors duration-300 flex items-center space-x-2 ${
      activeTab === tab 
      ? 'bg-gray-800 text-cyan-400' 
      : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
    }`;


  return (
    <div className="bg-gray-800/50 rounded-xl shadow-2xl">
      <h2 className="text-3xl font-extrabold text-white p-6">{lab.title}</h2>
      <div className="border-b border-gray-700">
        <nav className="flex space-x-2 px-6">
          <button onClick={() => setActiveTab('review')} className={getTabClass('review')}>
            <BookOpenIcon />
            <span>Review Kiến thức</span>
          </button>
          <button onClick={() => setActiveTab('assignment')} className={getTabClass('assignment')}>
            <DocumentTextIcon />
            <span>Làm bài</span>
          </button>
        </nav>
      </div>
      {renderContent()}
    </div>
  );
};

export default LabViewer;
