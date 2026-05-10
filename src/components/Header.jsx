import React from 'react';

/**
 * Header
 * Top bar: logo + tagline + stop-all and random buttons
 */
export function Header({ onStopAll, onRandom, totalCount }) {
  return (
    <header className="sticky top-0 z-40 glass border-b border-[var(--bg-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 safe-left safe-right">
        {/* Inner row — uses safe-top so content clears notch / Dynamic Island */}
        <div className="safe-top pb-0">
          <div className="h-16 flex items-center justify-between gap-4">

        {/* ── Logo ── */}
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-2xl select-none">🎙️</span>
          <div className="min-w-0">
            <h1
              className="font-display font-800 text-xl sm:text-2xl tracking-tight leading-none"
              style={{ color: 'var(--accent)' }}
            >
              StavBoard
            </h1>
            <p className="text-[10px] font-mono text-[var(--text-muted)] leading-none mt-0.5 hidden sm:block">
              {totalCount} clips • ur gay
            </p>
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="flex items-center gap-2">
          <button
            onClick={onRandom}
            title="Play random clip"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-body font-500
                       bg-[var(--bg-panel)] border border-[var(--bg-border)]
                       text-[var(--text-sec)] hover:text-[var(--accent)]
                       hover:border-[var(--accent)] transition-all duration-150"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h11M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H6"/>
            </svg>
            <span className="hidden sm:inline">Random</span>
          </button>

          <button
            onClick={onStopAll}
            title="Stop all audio"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-body font-500
                       bg-[var(--bg-panel)] border border-[var(--bg-border)]
                       text-[var(--text-sec)] hover:text-red-400
                       hover:border-red-400 transition-all duration-150"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="6" width="12" height="12" rx="2"/>
            </svg>
            <span className="hidden sm:inline">Stop</span>
          </button>
        </div>
        </div>
      </div>
    </div>
  </header>
  );
}
