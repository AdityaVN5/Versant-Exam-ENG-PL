import { AlertTriangle, MicVocal, Headset, Keyboard, FileText, Calendar, Compass } from 'lucide-react';
import { Attempt } from '../types';

interface DashboardProps {
  onStart: () => void;
  attempts: Attempt[];
  onViewAttempt: (attempt: Attempt) => void;
}

export default function Dashboard({ onStart, attempts, onViewAttempt }: DashboardProps) {
  return (
    <div className="min-h-screen bg-[var(--color-neutral-base)] flex flex-col items-center justify-start text-[#171717] w-full">
      <div className="w-full bg-white border-x border-neutral-200 p-8 md:p-12 flex flex-col space-y-12 min-h-screen">
        
        {/* Header */}
        <header className="border-b border-neutral-200 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-serif italic tracking-tight">Versant English Placement Test Practice</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mt-4 font-bold">Your English Proficiency Portal</p>
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-300">ADMIN CONTROL PORTAL</span>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Instructions Column (2/3 width) */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black border-b border-neutral-100 pb-2 flex items-center gap-2">
              <Compass className="w-4 h-4 text-neutral-400" />
              <span>Assessment & Environment Rules</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-6 bg-[var(--color-neutral-base)] border border-neutral-200">
                 <MicVocal className="w-5 h-5 text-black shrink-0" />
                 <div>
                   <h3 className="text-[11px] uppercase tracking-widest font-bold text-black mb-1">Microphone Required</h3>
                   <p className="text-xs text-neutral-500 leading-relaxed">Provide browser permissions when prompted. Speak naturally, close to your mic.</p>
                 </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-[var(--color-neutral-base)] border border-neutral-200">
                 <Keyboard className="w-5 h-5 text-black shrink-0" />
                 <div>
                   <h3 className="text-[11px] uppercase tracking-widest font-bold text-black mb-1">Keyboard Input</h3>
                   <p className="text-xs text-neutral-500 leading-relaxed">Writing stages require rapid, precise transcription and passage reconstruction.</p>
                 </div>
              </div>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 flex gap-4">
              <AlertTriangle className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
              <div className="text-left">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-2 text-black">Acoustic Guidelines</h4>
                <ul className="list-disc list-inside text-xs text-neutral-500 space-y-2 leading-relaxed">
                  <li><strong className="text-black font-semibold">Zero Background Noise:</strong> Background voices or ambient music seriously impact scoring accuracy.</li>
                  <li><strong className="text-black font-semibold">Keep Silent:</strong> Avoid double breathing patterns or computer mouse clicks.</li>
                  <li><strong className="text-black font-semibold">The 6-Second Flag:</strong> Speaking tests require you to begin speaking within 6 seconds. If not, the current question gets skipped as "no response".</li>
                </ul>
              </div>
            </div>

            <div className="pt-4">
              <button 
                onClick={onStart}
                className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-all"
              >
                <span>Acknowledge & Start New Test</span>
                <Headset className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Attempts / History Column (1/3 width) */}
          <div className="bg-neutral-50 border border-neutral-200 p-6 flex flex-col justify-start">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-6">Your Recorded Attempts</h2>
            
            {attempts.length === 0 ? (
              <div className="text-center py-12">
                 <FileText className="w-8 h-8 text-neutral-300 mx-auto mb-3" />
                 <p className="text-xs text-neutral-400 font-medium">No previous attempts recorded.</p>
              </div>
            ) : (
              <div className="space-y-4 overflow-y-auto max-h-[360px] pr-1">
                {attempts.map((att) => (
                  <div key={att.id} className="bg-white border border-neutral-200 p-4 relative group hover:border-black transition-all">
                     <div className="flex justify-between items-start mb-2">
                       <div>
                         <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase">TIN: {att.tin}</span>
                         <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 mt-1">
                            <Calendar className="w-3 h-3 text-neutral-400" />
                            <span>{att.date}</span>
                         </div>
                       </div>
                       <div className="text-right">
                         <span className="text-[10px] uppercase font-bold tracking-widest text-[#171717] block">GSE</span>
                         <span className="text-lg font-serif italic font-bold">{att.overallScore}</span>
                       </div>
                     </div>
                     <button
                       onClick={() => onViewAttempt(att)}
                       className="w-full mt-2 py-1.5 border border-neutral-200 hover:bg-black hover:text-white text-black text-[9px] font-bold uppercase tracking-widest transition-colors"
                     >
                       View Report card
                     </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
