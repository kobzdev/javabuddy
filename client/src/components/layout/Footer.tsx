import React from 'react';
import { Heart, Coffee, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-purple-100 dark:border-purple-900/30 bg-white/50 dark:bg-[#13111f]/50 py-8 px-4 sm:px-6 lg:px-8 pb-20 lg:pb-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950 flex items-center justify-center text-buddy-purple-600">
            <Coffee className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-sm text-gray-800 dark:text-gray-200">
              JavaBuddy — Learn Java Like You're 3 Years Old
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Explaining every hard concept with simple English, familiar toys, and patient love.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
          <Link to="/learn" className="hover:text-buddy-purple-600 transition-colors">
            Curriculum
          </Link>
          <span>•</span>
          <Link to="/playground" className="hover:text-buddy-purple-600 transition-colors">
            Live Playground
          </Link>
          <span>•</span>
          <Link to="/settings" className="hover:text-buddy-purple-600 transition-colors">
            Execution Status
          </Link>
          <span>•</span>
          <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200/50">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Isolated Sandbox</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
