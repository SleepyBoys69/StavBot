import React from 'react';
import { SoundCard } from './SoundCard';

/**
 * SoundGrid
 * Responsive grid of SoundCard components.
 * Shows an empty state when no sounds match filters.
 */
export function SoundGrid({
  sounds,
  currentSound,
  isPlaying,
  playCounts,
  favorites,
  onPlay,
  onToggleFavorite,
}) {
  if (sounds.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
        <span className="text-5xl mb-4 select-none">🔇</span>
        <p className="font-display font-600 text-lg text-[var(--text-prim)]">No clips found</p>
        <p className="font-body text-sm text-[var(--text-muted)] mt-1">
          Try a different search or category
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3"
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))',
      }}
    >
      {sounds.map(sound => (
        <SoundCard
          key={sound.id}
          sound={sound}
          isActive={currentSound?.id === sound.id}
          isPlaying={currentSound?.id === sound.id && isPlaying}
          playCount={playCounts[sound.id] || 0}
          isFavorite={favorites.includes(sound.id)}
          onPlay={onPlay}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
