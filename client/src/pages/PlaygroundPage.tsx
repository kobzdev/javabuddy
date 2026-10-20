import React, { useState } from 'react';
import { 
  Terminal, 
  Sparkles, 
  Info, 
  Server, 
  Coffee, 
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { JavaEditor, PRELOADED_EXAMPLES } from '../components/editor/JavaEditor';
import { ExecutionResponse } from '../lib/api';

interface PlaygroundPageProps {
  onOpenTutor: (title: string, code?: string, output?: any) => void;
}

export const PlaygroundPage: React.FC<PlaygroundPageProps> = ({ onOpenTutor }) => {
  const [currentCode, setCurrentCode] = useState<string>(PRELOADED_EXAMPLES[0].code);
  const [lastExecution, setLastExecution] = useState<ExecutionResponse | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fadeIn pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-100 dark:border-purple-900/40 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-buddy-purple-100 dark:bg-purple-950/60 border border-buddy-purple-200 dark:border-purple-800 text-buddy-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>Interactive Sandbox</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-purple-100">
            Java Playground
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
            Write, test, and run any Java code in your own sandboxed browser workspace.
          </p>
        </div>

        <button
          onClick={() => onOpenTutor('Java Playground', currentCode, lastExecution)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-buddy-purple-500 to-indigo-600 text-white font-bold text-sm shadow-bubble-purple hover:opacity-95 transition-all self-start sm:self-center"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Ask Teacher for Advice</span>
        </button>
      </div>

      {/* Editor & Output System */}
      <div className="w-full">
        <JavaEditor
          initialCode={PRELOADED_EXAMPLES[0].code}
          onCodeChange={setCurrentCode}
          onExecutionComplete={setLastExecution}
          onOpenTutor={() => onOpenTutor('Java Playground', currentCode, lastExecution)}
          height="520px"
          showExamples={true}
        />
      </div>

      {/* Reassuring Sandbox Banner */}
      <div className="p-4 bg-purple-50/70 dark:bg-[#1a1728] rounded-2xl border border-purple-100 dark:border-purple-900/40 flex items-start gap-3 text-xs text-gray-600 dark:text-gray-400">
        <Info className="w-4 h-4 text-buddy-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-gray-800 dark:text-purple-200">
            About Java Code Execution in JavaBuddy:
          </p>
          <p>
            Your code is sent to the backend execution runner, which evaluates it inside an isolated sandbox with memory and execution-time limits. Standard output and compilation diagnostics are streamed back directly to the console above.
          </p>
        </div>
      </div>
    </div>
  );
};
