import { useState, useEffect } from 'react';
import { TestStatus, TestResult, Attempt } from './types';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import TestEngine from './components/TestEngine';
import Results from './components/Results';

const INITIAL_ATTEMPT: Attempt = {
  id: 'attempt-1',
  date: '26 May 2026',
  tin: '28842427',
  overallScore: 64,
  speaking: 58,
  listening: 73,
  reading: 62,
  writing: 62
};

export default function App() {
  const [status, setStatus] = useState<TestStatus>('login');
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [viewingAttempt, setViewingAttempt] = useState<Attempt | null>(null);

  // Initialize attempts from localStorage or default list
  useEffect(() => {
    const saved = localStorage.getItem('versant_attempts');
    if (saved) {
      try {
        setAttempts(JSON.parse(saved));
      } catch (e) {
        setAttempts([INITIAL_ATTEMPT]);
      }
    } else {
      setAttempts([INITIAL_ATTEMPT]);
      localStorage.setItem('versant_attempts', JSON.stringify([INITIAL_ATTEMPT]));
    }
  }, []);

  const handleComplete = (finalResults: TestResult[]) => {
    // Determine user score based on percentage of non-skipped items
    const totalQuestions = finalResults.length || 1;
    const answeredCount = finalResults.filter(r => !r.skipped).length;
    const performanceRatio = answeredCount / totalQuestions;

    // Map ratio into realistic GSE scale (10 to 90)
    const baseGSE = Math.round(15 + performanceRatio * 72); // max 87 score
    const speakingScore = Math.max(10, Math.min(90, Math.round(baseGSE - 4 + Math.random() * 8)));
    const listeningScore = Math.max(10, Math.min(90, Math.round(baseGSE + 5 + Math.random() * 6)));
    const readingScore = Math.max(10, Math.min(90, Math.round(baseGSE + Math.random() * 4)));
    const writingScore = Math.max(10, Math.min(90, Math.round(baseGSE - 1 + Math.random() * 6)));
    
    const overallScore = Math.round((speakingScore + listeningScore + readingScore + writingScore) / 4);

    // Create unique TIN number
    const tinNumber = String(Math.floor(10000000 + Math.random() * 90000000));
    const today = new Date().toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    const newAttempt: Attempt = {
      id: `attempt-${Date.now()}`,
      date: today,
      tin: tinNumber,
      overallScore,
      speaking: speakingScore,
      listening: listeningScore,
      reading: readingScore,
      writing: writingScore
    };

    const updatedAttempts = [newAttempt, ...attempts];
    setAttempts(updatedAttempts);
    localStorage.setItem('versant_attempts', JSON.stringify(updatedAttempts));

    setViewingAttempt(newAttempt);
    setStatus('completed');
    
    // Log results payload for potential whisper/LLM backend processing
    console.log("=== EXAM SUBMITTED TO BACKEND PROXIES ===");
    console.log("Generated Scorecard:", newAttempt);
    console.log("Raw user response blobs & text tokens:", finalResults);
  };

  const handleBackToDashboard = () => {
    setViewingAttempt(null);
    setStatus('dashboard');
  };

  return (
    <div className="min-h-screen bg-[var(--color-neutral-base)] text-[#171717] font-sans selection:bg-neutral-200">
      {/* If the user is currently viewing a specific attempt scorecard */}
      {viewingAttempt ? (
        <Results attempt={viewingAttempt} onBack={handleBackToDashboard} />
      ) : (
        <>
          {status === 'login' && <Login onLogin={() => setStatus('dashboard')} />}
          
          {status === 'dashboard' && (
            <Dashboard 
              onStart={() => setStatus('testing')} 
              attempts={attempts}
              onViewAttempt={(att) => setViewingAttempt(att)}
            />
          )}
          
          {status === 'testing' && <TestEngine onComplete={handleComplete} />}
          
          {status === 'completed' && (
            <Results onBack={handleBackToDashboard} />
          )}
        </>
      )}
    </div>
  );
}
