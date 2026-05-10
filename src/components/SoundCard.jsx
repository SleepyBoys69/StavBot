import React from 'react';

/**
 * SoundCard
 * Individual clickable card for one audio clip.
 * Shows: title, category, play count, favorite toggle, active state.
 */
export function SoundCard({ sound, isActive, isPlaying, playCount, isFavorite, onPlay, onToggleFavorite }) {
  return (
    <div
      onClick={() => onPlay(sound)}
      className={[
        'group relative flex flex-col gap-2 p-4 rounded-xl cursor-pointer select-none',
        'border transition-all duration-200',
        'bg-[var(--bg-panel)] hover:bg-[#222228]',
        isActive
          ? 'border-[var(--accent)] card-active pulse-ring'
          : 'border-[var(--bg-border)] hover:border-[#3a3a50]',
      ].join(' ')}
    >
      {/* ── Play indicator / waveform ── */}
      <div className="flex items-start justify-between gap-2">
        <div className={[
          'flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0 transition-colors',
          isActive ? 'bg-[var(--accent)]' : 'bg-[var(--bg-border)] group-hover:bg-[#3a3a50]',
        ].join(' ')}>
          {isActive && isPlaying ? (
            /* Animated waveform bars */
            <span className="flex items-end gap-[2px] h-4">
              {[0,1,2,3,4].map(i => (
                <span
                  key={i}
                  className="wave-dot"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </span>
          ) : (
            /* Play triangle */
            <svg
              className={['w-3.5 h-3.5', isActive ? 'text-[#0e0e10]' : 'text-[var(--text-muted)]'].join(' ')}
              viewBox="0 0 24 24" fill="currentColor"
            >
              <path d="M5 3l14 9-14 9V3z"/>
            </svg>
          )}
        </div>

        {/* Favorite button */}
        <button
          onClick={e => { e.stopPropagation(); onToggleFavorite(sound.id); }}
          className={[
            'p-1 rounded-md transition-all duration-150 opacity-0 group-hover:opacity-100',
            isFavorite ? '!opacity-100 text-[var(--accent)]' : 'text-[var(--text-muted)] hover:text-[var(--accent)]',
          ].join(' ')}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
      </div>

      {/* ── Title ── */}
      <p className={[
        'font-display font-600 text-sm leading-tight line-clamp-2 transition-colors',
        isActive ? 'text-[var(--accent)]' : 'text-[var(--text-prim)] group-hover:text-white',
      ].join(' ')}>
        {sound.title}
      </p>

      {/* ── Footer: category + play count ── */}
      <div className="flex items-center justify-between mt-auto pt-1">
        <span className="font-mono text-[9px] text-[var(--text-muted)] uppercase tracking-wider truncate max-w-[70%]">
          {sound.category}
        </span>
        {playCount > 0 && (
          <span className="font-mono text-[9px] text-[var(--text-muted)]">
            ×{playCount}
          </span>
        )}
      </div>
    </div>
  );
}
