import React from 'react';
import { CATEGORIES } from '../data/sounds';

const ALL_TABS = ['All', 'Favorites', ...CATEGORIES.filter(c => c !== 'All')];

/**
 * CategoryTabs
 * Horizontal scrollable category filter bar.
 */
export function CategoryTabs({ active, onChange, counts }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
      {ALL_TABS.map(tab => {
        const isActive = tab === active;
        const count    = counts?.[tab] ?? 0;

        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={[
              'flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body font-500',
              'border transition-all duration-150 whitespace-nowrap',
              isActive
                ? 'bg-[var(--accent)] border-[var(--accent)] text-[#0e0e10] font-600'
                : 'bg-[var(--bg-panel)] border-[var(--bg-border)] text-[var(--text-sec)] hover:border-[var(--accent)] hover:text-[var(--accent)]',
            ].join(' ')}
          >
            {tab === 'Favorites' && (
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill={isActive ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            )}
            {tab}
            {count > 0 && (
              <span className={[
                'font-mono text-[10px] rounded-full px-1',
                isActive ? 'bg-black/20' : 'bg-[var(--bg-border)] text-[var(--text-muted)]'
              ].join(' ')}>
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
