import React, { useState, useMemo } from 'react';
import { Header }       from './components/Header';
import { SearchBar }    from './components/SearchBar';
import { CategoryTabs } from './components/CategoryTabs';
import { SoundGrid }    from './components/SoundGrid';
import { PlayerBar }    from './components/PlayerBar';
import { StatsPanel }   from './components/StatsPanel';
import { sounds, CATEGORIES } from './data/sounds';
import { useAudioPlayer }     from './hooks/useAudioPlayer';
import { filterSounds, randomSound } from './utils/soundUtils';

// Sort options
const SORT_OPTIONS = [
  { value: 'default',  label: 'Default'   },
  { value: 'popular',  label: 'Popular'   },
  { value: 'recent',   label: 'Recent'    },
];

export default function App() {
  const [category,  setCategory]  = useState('All');
  const [query,     setQuery]     = useState('');
  const [sortMode,  setSortMode]  = useState('default');

  const {
    currentSound, isPlaying,
    progress, duration,
    volume, setVolume,
    playCounts, recentlyPlayed, favorites,
    play, stopAll, seek,
    toggleFavorite, isFavorite,
  } = useAudioPlayer();

  // ── Filtered + sorted sound list ────────────────────────────────────────
  const filtered = useMemo(() => filterSounds({
    category,
    query,
    favorites,
    sortMode,
    playCounts,
    recentlyPlayed,
  }), [category, query, favorites, sortMode, playCounts, recentlyPlayed]);

  // ── Category badge counts ────────────────────────────────────────────────
  const counts = useMemo(() => {
    const map = { All: sounds.length, Favorites: favorites.length };
    CATEGORIES.forEach(cat => {
      if (cat !== 'All') map[cat] = sounds.filter(s => s.category === cat).length;
    });
    return map;
  }, [favorites]);

  // ── Random ───────────────────────────────────────────────────────────────
  const handleRandom = () => play(randomSound(currentSound?.id));

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onStopAll={stopAll}
        onRandom={handleRandom}
        totalCount={sounds.length}
      />

      <main
        className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex gap-6"
        style={{
          paddingBottom: currentSound
            ? 'calc(90px + env(safe-area-inset-bottom, 0px) + 1.5rem)'
            : '1.5rem',
        }}
      >

        {/* ── Main column ── */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">

          {/* Search + sort row */}
          <div className="flex gap-3 items-center">
            <div className="flex-1">
              <SearchBar
                query={query}
                onChange={setQuery}
                resultCount={filtered.length}
              />
            </div>

            {/* Sort select */}
            <select
              value={sortMode}
              onChange={e => setSortMode(e.target.value)}
              className="bg-[var(--bg-panel)] border border-[var(--bg-border)] rounded-xl
                         px-3 py-2.5 text-sm font-body text-[var(--text-sec)] outline-none
                         focus:border-[var(--accent)] transition-colors cursor-pointer flex-shrink-0"
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Category tabs */}
          <CategoryTabs
            active={category}
            onChange={cat => { setCategory(cat); setQuery(''); }}
            counts={counts}
          />

          {/* Sound grid */}
          <SoundGrid
            sounds={filtered}
            currentSound={currentSound}
            isPlaying={isPlaying}
            playCounts={playCounts}
            favorites={favorites}
            onPlay={play}
            onToggleFavorite={toggleFavorite}
          />
        </div>

        {/* ── Stats sidebar (desktop only) ── */}
        <StatsPanel
          playCounts={playCounts}
          recentlyPlayed={recentlyPlayed}
          favorites={favorites}
          onPlay={play}
        />
      </main>

      {/* ── Sticky now-playing bar ── */}
      <PlayerBar
        currentSound={currentSound}
        isPlaying={isPlaying}
        progress={progress}
        duration={duration}
        volume={volume}
        onVolume={setVolume}
        onSeek={seek}
        onStop={stopAll}
      />
    </div>
  );
}
