import React from 'react';
import { formatTime } from '../utils/soundUtils';

/**
 * PlayerBar
 * Sticky bottom bar shown while a clip is loaded.
 * Shows: clip name, category, progress bar, seek, volume slider, stop button.
 */
export function PlayerBar({
  currentSound,
  isPlaying,
  progress,
  duration,
  volume,
  onVolume,
  onSeek,
  onStop,
}) {
  if (!currentSound) return null;

  const elapsed = duration ? (progress / 100) * duration : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-[var(--bg-border)] animate-slide-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 safe-left safe-right pt-3 safe-bottom">

        {/* ── Progress bar (clickable) ── */}
        <div
          className="h-1 bg-[var(--bg-border)] rounded-full mb-3 cursor-pointer group"
          onClick={e => {
            const rect = e.currentTarget.getBoundingClientRect();
            onSeek(((e.clientX - rect.left) / rect.width) * 100);
          }}
        >
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, var(--accent), var(--accent-dim))',
            }}
          />
        </div>

        <div className="flex items-center gap-4">

          {/* ── Waveform / playing indicator ── */}
          <div className="flex-shrink-0 w-8 flex items-end gap-[2px] h-5">
            {isPlaying ? (
              [0,1,2,3,4].map(i => (
                <span
                  key={i}
                  className="wave-dot"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))
            ) : (
              <svg className="w-4 h-4 text-[var(--text-muted)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 3l14 9-14 9V3z"/>
              </svg>
            )}
          </div>

          {/* ── Track info ── */}
          <div className="flex-1 min-w-0">
            <p className="font-display font-600 text-sm truncate" style={{ color: 'var(--accent)' }}>
              {currentSound.title}
            </p>
            <p className="font-mono text-[10px] text-[var(--text-muted)] truncate">
              {currentSound.category}
              {duration > 0 && (
                <span className="ml-2">{formatTime(elapsed)} / {formatTime(duration)}</span>
              )}
            </p>
          </div>

          {/* ── Volume ── */}
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            <svg className="w-3.5 h-3.5 text-[var(--text-muted)]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={volume}
              onChange={e => onVolume(parseFloat(e.target.value))}
              className="w-20 accent-[var(--accent)] cursor-pointer"
            />
            <svg className="w-4 h-4 text-[var(--text-muted)]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          </div>

          {/* ── Stop button ── */}
          <button
            onClick={onStop}
            className="flex-shrink-0 p-2 rounded-lg bg-[var(--bg-border)] hover:bg-red-900/40
                       text-[var(--text-muted)] hover:text-red-400 transition-all duration-150"
            title="Stop"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="6" width="12" height="12" rx="2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
