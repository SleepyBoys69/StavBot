import React from 'react';

/**
 * SearchBar
 * A controlled text input for filtering sounds by title / tag / category.
 */
export function SearchBar({ query, onChange, resultCount }) {
  return (
    <div className="relative">
      {/* Search icon */}
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      >
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
      </svg>

      <input
        type="text"
        placeholder="Search clips, categories, tags…"
        value={query}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-[var(--bg-panel)] border border-[var(--bg-border)] rounded-xl
                   pl-9 pr-20 py-2.5 text-sm font-body text-[var(--text-prim)]
                   placeholder-[var(--text-muted)] outline-none
                   focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]
                   transition-colors duration-150"
      />

      {/* Result count badge */}
      {query && (
        <span className="absolute right-10 top-1/2 -translate-y-1/2 font-mono text-[10px] text-[var(--text-muted)]">
          {resultCount}
        </span>
      )}

      {/* Clear button */}
      {query && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-prim)] transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
      )}
    </div>
  );
}
