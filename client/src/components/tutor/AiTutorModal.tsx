import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  HelpCircle, 
  Lightbulb, 
  BookOpen, 
  AlertCircle, 
  RotateCcw, 
  Heart,
  Smile
} from 'lucide-react';
import { queryAiTutor, TutorResponse } from '../../lib/api';

interface AiTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonTitle?: string;
  userCode?: string;
  executionOutput?: any;
}

export const AiTutorModal: React.FC<AiTutorModalProps> = ({
  isOpen,
  onClose,
  lessonTitle,
  userCode,
  executionOutput,
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'tutor' | 'user'; text: string; analogy?: string; tip?: string }>>([
    {
      sender: 'tutor',
      text: "Hello little friend! I'm JavaBuddy, your patient coding teacher! 🧸 No question is too small. Click any helper button below or ask me anything!",
      analogy: "🌟 You can do anything, one step at a time!",
    },
  ]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const quickActions = [
    { type: 'eli3', label: "Explain Like I'm 3", icon: '🧸', color: 'bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-300' },
    { type: 'explain_lines', label: "Explain Every Line", icon: '📖', color: 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-300' },
    { type: 'example', label: "Give Me an Example", icon: '💡', color: 'bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-300' },
    { type: 'hint', label: "Give Me a Hint", icon: '🔍', color: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-300' },
    { type: 'why_wrong', label: "Why Is My Code Wrong?", icon: '🩹', color: 'bg-rose-100 text-rose-700 hover:bg-rose-200 border-rose-300' },
    { type: 'easier_exercise', label: "Easier Exercise", icon: '🐣', color: 'bg-sky-100 text-sky-700 hover:bg-sky-200 border-sky-300' },
    { type: 'try_again', label: "Cheer Me Up!", icon: '🎈', color: 'bg-pink-100 text-pink-700 hover:bg-pink-200 border-pink-300' },
  ];

  const handleQuickAction = async (action: any) => {
    if (loading) return;
    setLoading(true);

    setMessages(prev => [
      ...prev,
      { sender: 'user', text: action.label },
    ]);

    const res: TutorResponse = await queryAiTutor({
      queryType: action.type,
      lessonTitle,
      userCode,
      executionOutput,
    });

    setMessages(prev => [
      ...prev,
      {
        sender: 'tutor',
        text: res.message,
        analogy: res.analogy,
        tip: res.kindergartenTip,
      },
    ]);

    setLoading(false);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    const userText = inputMessage.trim();
    setInputMessage('');
    setLoading(true);

    setMessages(prev => [
      ...prev,
      { sender: 'user', text: userText },
    ]);

    const res = await queryAiTutor({
      queryType: 'custom',
      lessonTitle,
      userCode,
      executionOutput,
      customMessage: userText,
    });

    setMessages(prev => [
      ...prev,
      {
        sender: 'tutor',
        text: res.message,
        analogy: res.analogy,
        tip: res.kindergartenTip,
      },
    ]);

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#1a1728] rounded-3xl shadow-2xl border border-purple-200 dark:border-purple-900/50 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-2xl shadow-inner animate-float">
              🧸
            </div>
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2">
                JavaBuddy Teacher
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white/20 text-white">
                  Kind & Patient
                </span>
              </h3>
              <p className="text-xs text-purple-100">
                {lessonTitle ? `Guiding you through: ${lessonTitle}` : 'Ask me anything about Java!'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Action Chips */}
        <div className="px-6 py-3 bg-purple-50/60 dark:bg-purple-950/20 border-b border-purple-100 dark:border-purple-900/30 overflow-x-auto flex items-center gap-2">
          {quickActions.map(action => (
            <button
              key={action.type}
              onClick={() => handleQuickAction(action)}
              disabled={loading}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${action.color} ${
                loading ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'
              }`}
            >
              <span>{action.icon}</span>
              <span>{action.label}</span>
            </button>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-buddy-purple-600 text-white rounded-br-none shadow-md'
                    : 'bg-purple-50 dark:bg-[#252038] text-gray-800 dark:text-purple-100 border border-purple-100 dark:border-purple-800/40 rounded-bl-none shadow-sm'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {msg.analogy && (
                  <div className="mt-3 pt-2.5 border-t border-purple-200 dark:border-purple-700/40 flex items-center gap-2 text-xs font-semibold text-purple-700 dark:text-purple-300">
                    <span>{msg.analogy}</span>
                  </div>
                )}

                {msg.tip && (
                  <div className="mt-2 p-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 rounded-xl text-xs text-amber-800 dark:text-amber-200 font-medium">
                    💡 <strong>Tip:</strong> {msg.tip}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-purple-500 font-semibold p-2">
              <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <span>JavaBuddy is thinking of the gentlest analogy...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-[#1a1728] border-t border-purple-100 dark:border-purple-900/30 flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask a question (e.g. 'What is a boolean?' or 'Can you explain line 3?')..."
            className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-[#252038] border border-purple-200 dark:border-purple-900/50 rounded-2xl text-sm outline-none focus:border-buddy-purple-500 dark:text-white"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || loading}
            className="p-2.5 bg-buddy-purple-600 hover:bg-buddy-purple-500 disabled:opacity-50 text-white rounded-2xl transition-transform active:scale-95 shadow-bubble-purple"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
