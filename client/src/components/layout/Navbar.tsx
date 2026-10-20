import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  Flame, 
  BookOpen, 
  Terminal, 
  Gamepad2, 
  Trophy, 
  Settings, 
  Sun, 
  Moon,
  Coffee
} from 'lucide-react';
import { UserProgress } from '../../types';

interface NavbarProps {
  progress: UserProgress;
  isDark: boolean;
  toggleDark: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ progress, isDark, toggleDark }) => {
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home', icon: Coffee },
    { to: '/learn', label: 'Learning Path', icon: BookOpen },
    { to: '/playground', label: 'Playground', icon: Terminal },
    { to: '/practice', label: 'Practice Games', icon: Gamepad2 },
    { to: '/progress', label: 'My Progress', icon: Trophy },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-purple-100 dark:border-purple-900/30 bg-white/90 dark:bg-[#13111f]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-buddy-purple-500 to-buddy-purple-600 flex items-center justify-center text-white shadow-bubble-purple group-hover:scale-105 transition-transform duration-200">
              <span className="text-xl select-none">☕</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg sm:text-xl tracking-tight text-buddy-purple-900 dark:text-purple-100">
                  Java<span className="text-buddy-purple-500">Buddy</span>
                </span>
                <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 rounded-full border border-amber-300/60">
                  Age 3+ Mode
                </span>
              </div>
              <p className="hidden md:block text-[11px] text-gray-500 dark:text-gray-400 -mt-0.5">
                Learn Java Like You're 3 Years Old
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-buddy-purple-100 dark:bg-buddy-purple-900/40 text-buddy-purple-700 dark:text-purple-200 shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-buddy-purple-600 hover:bg-purple-50/70 dark:hover:bg-purple-950/30'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-buddy-purple-600 dark:text-purple-300' : 'text-gray-400'}`} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Gamification Stats & Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Daily Streak Flame */}
            <div 
              title={progress.currentStreak > 0 ? `${progress.currentStreak} day streak! Keep it up!` : 'Complete an activity today to start your streak!'}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 rounded-full text-amber-600 dark:text-amber-400 text-xs sm:text-sm font-bold shadow-sm"
            >
              <Flame className={`w-4 h-4 ${progress.currentStreak > 0 ? 'text-amber-500 animate-pulse' : 'text-gray-300'}`} />
              <span>{progress.currentStreak}d</span>
            </div>

            {/* Total XP Star */}
            <div 
              title={`Total Experience Points: ${progress.totalXp} XP`}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-buddy-purple-50 dark:bg-purple-950/40 border border-buddy-purple-200 dark:border-purple-900/50 rounded-full text-buddy-purple-700 dark:text-purple-300 text-xs sm:text-sm font-bold shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-buddy-purple-500" />
              <span>{progress.totalXp} XP</span>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleDark}
              aria-label="Toggle color theme"
              className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-purple-600" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
