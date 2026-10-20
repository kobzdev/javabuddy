import React from 'react';
import { Lesson } from '../../types';

interface VisualDemoCardProps {
  demo: Lesson['visualDemo'];
}

export const VisualDemoCard: React.FC<VisualDemoCardProps> = ({ demo }) => {
  return (
    <div className="p-6 bg-gradient-to-br from-purple-50/50 via-white to-blue-50/40 dark:from-[#1b172b] dark:via-[#191627] dark:to-[#171d2b] rounded-3xl border border-purple-200/70 dark:border-purple-900/40 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🎨</span>
        <h3 className="font-bold text-base text-gray-900 dark:text-purple-100">
          {demo.title}
        </h3>
      </div>

      {/* Render based on demo type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {demo.items.map((item, index) => {
          const colorStyles: Record<string, string> = {
            purple: 'bg-purple-100/80 dark:bg-purple-950/50 border-purple-300 dark:border-purple-800 text-purple-900 dark:text-purple-200',
            blue: 'bg-blue-100/80 dark:bg-blue-950/50 border-blue-300 dark:border-blue-800 text-blue-900 dark:text-blue-200',
            yellow: 'bg-amber-100/80 dark:bg-amber-950/50 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200',
            green: 'bg-emerald-100/80 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200',
          };

          const activeColor = colorStyles[item.color || 'purple'] || colorStyles.purple;

          return (
            <div
              key={index}
              className={`p-4 rounded-2xl border ${activeColor} flex flex-col justify-between transition-transform hover:-translate-y-1 duration-200 shadow-sm`}
            >
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wide bg-white/70 dark:bg-black/30 border border-current mb-2">
                  {item.label}
                </span>
                <p className="font-code font-bold text-sm sm:text-base mb-1 break-words">
                  {item.value}
                </p>
              </div>

              {item.description && (
                <p className="text-xs opacity-90 mt-2 font-medium">
                  {item.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
