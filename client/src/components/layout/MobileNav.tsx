import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Coffee, BookOpen, Terminal, Gamepad2, Trophy, Settings } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home', icon: Coffee },
    { to: '/learn', label: 'Learn', icon: BookOpen },
    { to: '/playground', label: 'Code', icon: Terminal },
    { to: '/practice', label: 'Games', icon: Gamepad2 },
    { to: '/progress', label: 'Progress', icon: Trophy },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#13111f]/95 backdrop-blur-md border-t border-purple-100 dark:border-purple-900/30 px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-[10px] font-bold transition-all ${
                isActive
                  ? 'text-buddy-purple-600 dark:text-purple-300 scale-105'
                  : 'text-gray-500 dark:text-gray-400 hover:text-buddy-purple-500'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-buddy-purple-100 dark:bg-purple-950/60' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="mt-0.5">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
