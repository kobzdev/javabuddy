import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  Terminal, 
  Code2, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { OutputPanel } from './OutputPanel';
import { executeJavaCode, ExecutionResponse } from '../../lib/api';

interface JavaEditorProps {
  initialCode?: string;
  defaultExample?: string;
  sampleOutput?: string;
  onCodeChange?: (code: string) => void;
  onExecutionComplete?: (res: ExecutionResponse) => void;
  onOpenTutor?: () => void;
  height?: string;
  showExamples?: boolean;
}

export const PRELOADED_EXAMPLES: Array<{ name: string; code: string; desc: string }> = [
  {
    name: 'Hello, World!',
    desc: 'The classic kindergarten starting point',
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, little programmer!");
    }
}`,
  },
  {
    name: 'Toy Box Variables',
    desc: 'String, int, and double labeled boxes',
    code: `public class Main {
    public static void main(String[] args) {
        String toy = "Robot";
        int batteryLevel = 100;
        double toyPrice = 19.99;
        
        System.out.println("Toy: " + toy);
        System.out.println("Battery: " + batteryLevel + "%");
        System.out.println("Price: $" + toyPrice);
    }
}`,
  },
  {
    name: 'If/Else Decisions',
    desc: 'Making choices based on conditions',
    code: `public class Main {
    public static void main(String[] args) {
        int coins = 5;
        int cookieCost = 3;

        if (coins >= cookieCost) {
            System.out.println("Yummy! You have enough coins for a cookie!");
        } else {
            System.out.println("Save up more coins first!");
        }
    }
}`,
  },
  {
    name: 'For Loop Carousel',
    desc: 'Counting apples in a loop',
    code: `public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            System.out.println("Lap #" + i + " on the merry-go-round!");
        }
        System.out.println("All finished!");
    }
}`,
  },
  {
    name: 'Juice Blender Method',
    desc: 'Reusable recipe method',
    code: `public class Main {
    public static int multiply(int x, int y) {
        return x * y;
    }

    public static void main(String[] args) {
        int result = multiply(6, 7);
        System.out.println("6 times 7 is: " + result);
    }
}`,
  },
  {
    name: 'Pet Dog Class',
    desc: 'Object blueprint with fields and methods',
    code: `class Puppy {
    String name;
    
    Puppy(String n) {
        name = n;
    }
    
    void bark() {
        System.out.println(name + " barks: Woof woof!");
    }
}

public class Main {
    public static void main(String[] args) {
        Puppy dog = new Puppy("Barnaby");
        dog.bark();
    }
}`,
  },
];

export const JavaEditor: React.FC<JavaEditorProps> = ({
  initialCode = PRELOADED_EXAMPLES[0].code,
  sampleOutput,
  onCodeChange,
  onExecutionComplete,
  onOpenTutor,
  height = '420px',
  showExamples = true,
}) => {
  const [code, setCode] = useState<string>(initialCode);
  const [copied, setCopied] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<ExecutionResponse | null>(null);
  const [stdin, setStdin] = useState<string>('');
  const [showStdin, setShowStdin] = useState<boolean>(false);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleCodeChange = (newVal: string | undefined) => {
    const val = newVal || '';
    setCode(val);
    if (onCodeChange) {
      onCodeChange(val);
    }
  };

  const handleRun = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setResult(null);

    const res = await executeJavaCode(code, stdin);
    setResult(res);
    setIsLoading(false);

    if (onExecutionComplete) {
      onExecutionComplete(res);
    }
  };

  const handleReset = () => {
    setCode(initialCode);
    setResult(null);
    if (onCodeChange) {
      onCodeChange(initialCode);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExampleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = PRELOADED_EXAMPLES.find(ex => ex.name === e.target.value);
    if (selected) {
      setCode(selected.code);
      setResult(null);
      if (onCodeChange) {
        onCodeChange(selected.code);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Editor & Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Editor Box */}
        <div className="flex flex-col bg-[#1e1e1e] rounded-2xl border border-purple-900/40 overflow-hidden shadow-lg">
          {/* Editor Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-[#252526] border-b border-gray-800">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-buddy-purple-400" />
              <span className="text-xs font-bold text-gray-200">Main.java</span>

              {showExamples && (
                <select
                  onChange={handleExampleSelect}
                  className="ml-2 text-xs bg-[#1e1e1e] text-purple-200 border border-purple-900/50 rounded-lg px-2 py-1 outline-none focus:border-buddy-purple-500"
                  defaultValue=""
                >
                  <option value="" disabled>Load Example...</option>
                  {PRELOADED_EXAMPLES.map(ex => (
                    <option key={ex.name} value={ex.name}>{ex.name}</option>
                  ))}
                </select>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCopy}
                title="Copy code to clipboard"
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors text-xs flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handleReset}
                title="Reset to original code"
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors text-xs flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>

              <button
                onClick={() => setShowStdin(!showStdin)}
                title="Toggle standard input (stdin)"
                className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition-colors ${
                  showStdin ? 'bg-buddy-purple-600/30 text-purple-200' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Input</span>
              </button>

              {onOpenTutor && (
                <button
                  onClick={onOpenTutor}
                  title="Ask the AI Kindergarten Teacher for help"
                  className="px-2.5 py-1 rounded-lg bg-buddy-purple-600/30 text-purple-200 hover:bg-buddy-purple-600/50 border border-purple-500/30 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Teacher</span>
                </button>
              )}

              {/* Main Green Run Button */}
              <button
                onClick={handleRun}
                disabled={isLoading}
                className={`ml-1 flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-bold text-xs text-white shadow-bubble-green transition-all duration-150 ${
                  isLoading
                    ? 'bg-gray-600 cursor-not-allowed opacity-75'
                    : 'bg-emerald-600 hover:bg-emerald-500 active:translate-y-0.5'
                }`}
              >
                {isLoading ? (
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Play className="w-3.5 h-3.5 fill-current" />
                )}
                <span>Run</span>
              </button>
            </div>
          </div>

          {/* Optional Stdin Input Drawer */}
          {showStdin && (
            <div className="px-4 py-2 bg-[#1b1b1b] border-b border-gray-800 flex items-center gap-2">
              <span className="text-[11px] font-bold text-gray-400 uppercase">Stdin Input:</span>
              <input
                type="text"
                value={stdin}
                onChange={(e) => setStdin(e.target.value)}
                placeholder="Type input text here for Scanner or readLine()..."
                className="flex-1 bg-[#121212] text-gray-200 text-xs px-2.5 py-1 rounded border border-gray-700 outline-none focus:border-buddy-purple-500"
              />
            </div>
          )}

          {/* Monaco Editor Container */}
          <div className="relative w-full" style={{ minHeight: height }}>
            <Editor
              height={height}
              language="java"
              theme="vs-dark"
              value={code}
              onChange={handleCodeChange}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: '"Fira Code", Consolas, Monaco, monospace',
                tabSize: 4,
                insertSpaces: true,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                renderLineHighlight: 'all',
                suggestOnTriggerCharacters: true,
                wordWrap: 'on',
                padding: { top: 12, bottom: 12 },
              }}
              loading={
                <div className="flex flex-col items-center justify-center h-full text-purple-300 py-16">
                  <div className="w-8 h-8 border-3 border-buddy-purple-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                  <p className="text-xs">Preparing Java Editor...</p>
                </div>
              }
            />
          </div>

          <div className="px-4 py-1.5 bg-[#252526] text-[11px] text-gray-400 flex items-center justify-between border-t border-gray-800">
            <span>Shortcut: Click Run or press Play</span>
            <span>Java 17 OpenJDK Ready</span>
          </div>
        </div>

        {/* Console Output Panel */}
        <div style={{ minHeight: height }}>
          <OutputPanel
            result={result}
            isLoading={isLoading}
            onClear={() => setResult(null)}
            sampleOutput={sampleOutput}
            onOpenTutor={onOpenTutor}
          />
        </div>
      </div>
    </div>
  );
};
