import { sounds } from '../data/sounds';

/**
 * Filter sounds by category and search query.
 *
 * @param {string} category  - 'All' or a specific category name
 * @param {string} query     - free-text search
 * @param {string[]} favorites - array of favorited sound ids
 * @param {string} sortMode  - 'default' | 'favorites' | 'recent' | 'popular'
 * @param {Object} playCounts - { [id]: number }
 * @param {string[]} recentlyPlayed - array of ids newest-first
 */
export function filterSounds({ category, query, favorites, sortMode, playCounts, recentlyPlayed }) {
  let result = [...sounds];

  // ── Category filter ────────────────────────────────────────────────────
  if (category === 'Favorites') {
    result = result.filter(s => favorites.includes(s.id));
  } else if (category !== 'All') {
    result = result.filter(s => s.category === category);
  }

  // ── Search filter ──────────────────────────────────────────────────────
  if (query.trim()) {
    const q = query.toLowerCase();
    result = result.filter(s =>
      s.title.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  // ── Sort ───────────────────────────────────────────────────────────────
  if (sortMode === 'popular') {
    result.sort((a, b) => (playCounts[b.id] || 0) - (playCounts[a.id] || 0));
  } else if (sortMode === 'recent') {
    const order = new Map(recentlyPlayed.map((id, i) => [id, i]));
    result.sort((a, b) => {
      const ai = order.has(a.id) ? order.get(a.id) : Infinity;
      const bi = order.has(b.id) ? order.get(b.id) : Infinity;
      return ai - bi;
    });
  }

  return result;
}

/**
 * Pick a random sound (excluding the currently playing one).
 */
export function randomSound(excludeId) {
  const pool = excludeId ? sounds.filter(s => s.id !== excludeId) : sounds;
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Format seconds → "0:00"
 */
export function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

/**
 * Get the total play count across all sounds.
 */
export function totalPlays(playCounts) {
  return Object.values(playCounts).reduce((a, b) => a + b, 0);
}

/**
 * Get the top N most-played sounds.
 */
export function topSounds(playCounts, n = 5) {
  return sounds
    .filter(s => playCounts[s.id])
    .sort((a, b) => (playCounts[b.id] || 0) - (playCounts[a.id] || 0))
    .slice(0, n);
}
