import React from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  Cpu, 
  Trash2, 
  Sparkles, 
  Server, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { ExecutionResponse } from '../../lib/api';

interface OutputPanelProps {
  result: ExecutionResponse | null;
  isLoading: boolean;
  onClear: () => void;
  sampleOutput?: string;
  onOpenTutor?: () => void;
}

export const OutputPanel: React.FC<OutputPanelProps> = ({
  result,
  isLoading,
  onClear,
  sampleOutput,
  onOpenTutor,
}) => {
  return (
    <div className="flex flex-col h-full bg-[#1e1c2e] text-white rounded-2xl border border-purple-900/40 overflow-hidden shadow-lg">
      {/* Header Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#171524] border-b border-purple-900/40">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-200">
            Console Output
          </span>
          {result && (
            <span
              className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                result.status === 'Accepted'
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                  : result.status === 'Unconfigured'
                  ? 'bg-amber-950/60 text-amber-300 border-amber-500/40'
                  : 'bg-rose-950/60 text-rose-300 border-rose-500/40'
              }`}
            >
              {result.status}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs text-purple-300">
          {result?.time && (
            <div className="flex items-center gap-1" title="Execution Time">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <span>{result.time}</span>
            </div>
          )}
          {result?.memory && (
            <div className="flex items-center gap-1" title="Memory Used">
              <Cpu className="w-3.5 h-3.5 text-gray-400" />
              <span>{result.memory} KB</span>
            </div>
          )}
          {result && (
            <button
              onClick={onClear}
              title="Clear Console Output"
              className="p-1 rounded hover:bg-purple-900/50 text-purple-400 hover:text-white transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 font-code text-xs sm:text-sm overflow-y-auto space-y-4">
        {isLoading ? (
          <div className="h-full flex flex-col items-center justify-center py-12 text-center text-purple-300">
            <div className="w-10 h-10 border-3 border-buddy-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="font-semibold text-sm">Running your Java code...</p>
            <p className="text-xs text-purple-400 mt-1">Checking instructions, braces, and semicolons!</p>
          </div>
        ) : !result ? (
          <div className="h-full flex flex-col items-center justify-center py-12 text-center text-purple-400">
            <div className="w-12 h-12 rounded-2xl bg-purple-950/80 flex items-center justify-center text-2xl mb-3">
              🚀
            </div>
            <p className="font-medium text-sm text-purple-200">Output will appear here</p>
            <p className="text-xs text-purple-400 max-w-xs mt-1">
              Click the green <span className="font-bold text-emerald-400">Run Code</span> button to test your program!
            </p>
            {sampleOutput && (
              <div className="mt-4 p-3 bg-purple-950/40 border border-purple-800/30 rounded-xl text-left max-w-md w-full">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-purple-300 mb-1">
                  <span>Target Output for this lesson:</span>
                </div>
                <pre className="text-emerald-300 font-code text-xs whitespace-pre-wrap">{sampleOutput}</pre>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Status & Provider Badge */}
            <div className="flex items-center justify-between text-xs pb-2 border-b border-purple-900/40">
              <div className="flex items-center gap-1.5 text-gray-400">
                <Server className="w-3.5 h-3.5" />
                <span>Runner: {result.provider}</span>
              </div>
              <span className="text-[11px] text-purple-400">
                {result.provider.includes('Unconfigured') ? '⚠️ Local Config Needed' : '⚡ Live Execution'}
              </span>
            </div>

            {/* Beginner-friendly explanation card */}
            {result.beginnerExplanation && (
              <div className="p-3.5 bg-gradient-to-r from-purple-950/70 to-indigo-950/70 border border-purple-500/40 rounded-xl flex items-start gap-3">
                <span className="text-xl select-none mt-0.5">🧸</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-xs text-purple-200">
                      JavaBuddy Teacher Note:
                    </p>
                    {onOpenTutor && (
                      <button
                        onClick={onOpenTutor}
                        className="text-[11px] font-semibold text-buddy-yellow-400 hover:underline flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3" />
                        Ask Tutor
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-purple-200 mt-1 leading-relaxed">
                    {result.beginnerExplanation}
                  </p>
                </div>
              </div>
            )}

            {/* Standard Output (stdout) */}
            {result.stdout && (
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Standard Output
                </p>
                <div className="bg-[#12111c] p-3 rounded-xl border border-purple-900/30 overflow-x-auto">
                  <pre className="text-emerald-300 font-code whitespace-pre-wrap">{result.stdout}</pre>
                </div>
              </div>
            )}

            {/* Compilation Output */}
            {result.compileOutput && (
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-rose-400 mb-1 flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" />
                  Compilation Messages
                </p>
                <div className="bg-[#1e1017] p-3 rounded-xl border border-rose-900/40 overflow-x-auto">
                  <pre className="text-rose-300 font-code whitespace-pre-wrap">{result.compileOutput}</pre>
                </div>
              </div>
            )}

            {/* Standard Error (stderr) */}
            {result.stderr && (
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Standard Error / Diagnostic
                </p>
                <div className="bg-[#1a140f] p-3 rounded-xl border border-amber-900/40 overflow-x-auto">
                  <pre className="text-amber-300 font-code whitespace-pre-wrap">{result.stderr}</pre>
                </div>
              </div>
            )}

            {/* Empty Output notice if status Accepted but stdout is blank */}
            {result.status === 'Accepted' && !result.stdout && (
              <div className="p-3 bg-purple-950/30 border border-purple-800/30 rounded-xl text-purple-300 text-xs">
                Your program ran and exited with status 0, but didn't print any text to the screen!
                Did you remember to write <code className="text-purple-200">System.out.println(...);</code>?
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
