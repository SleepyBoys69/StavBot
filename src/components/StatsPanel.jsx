import React, { useState } from 'react';
import { sounds } from '../data/sounds';
import { topSounds, totalPlays } from '../utils/soundUtils';

/**
 * StatsPanel
 * Collapsible sidebar panel showing play stats, top clips, recently played.
 */
export function StatsPanel({ playCounts, recentlyPlayed, favorites, onPlay }) {
  const [open, setOpen] = useState(false);

  const total   = totalPlays(playCounts);
  const topList = topSounds(playCounts, 5);
  const recentList = recentlyPlayed
    .slice(0, 8)
    .map(id => sounds.find(s => s.id === id))
    .filter(Boolean);

  return (
    <>
      {/* ── Toggle button (mobile: bottom-right fab; desktop: inline) ── */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed right-4 bottom-20 z-40 sm:hidden flex items-center justify-center
                   w-10 h-10 rounded-full glass border border-[var(--bg-border)]
                   text-[var(--text-sec)] hover:text-[var(--accent)] transition-colors"
        title="Stats"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 3v18h18V3H3zm10 13H7v-2h6v2zm4-4H7v-2h10v2zm0-4H7V6h10v2z"/>
        </svg>
      </button>

      {/* ── Panel ── */}
      <aside className={[
        'flex-shrink-0 w-64 hidden lg:flex flex-col gap-4',
      ].join(' ')}>
        <StatCard title="Total Plays" icon="🎧">
          <span className="font-display font-700 text-3xl" style={{ color: 'var(--accent)' }}>
            {total.toLocaleString()}
          </span>
        </StatCard>

        <StatCard title="Favorites" icon="❤️">
          <span className="font-display font-700 text-3xl text-[var(--text-prim)]">
            {favorites.length}
          </span>
        </StatCard>

        {topList.length > 0 && (
          <StatCard title="Most Played" icon="🏆">
            <ul className="flex flex-col gap-2 w-full">
              {topList.map((s, i) => (
                <li
                  key={s.id}
                  onClick={() => onPlay(s)}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <span className="font-mono text-[10px] text-[var(--text-muted)] w-4">{i+1}</span>
                  <span className="flex-1 font-body text-xs text-[var(--text-sec)] group-hover:text-[var(--accent)] truncate transition-colors">
                    {s.title}
                  </span>
                  <span className="font-mono text-[10px] text-[var(--text-muted)]">
                    ×{playCounts[s.id]}
                  </span>
                </li>
              ))}
            </ul>
          </StatCard>
        )}

        {recentList.length > 0 && (
          <StatCard title="Recently Played" icon="🕐">
            <ul className="flex flex-col gap-2 w-full">
              {recentList.map(s => (
                <li
                  key={s.id}
                  onClick={() => onPlay(s)}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <span className="flex-1 font-body text-xs text-[var(--text-sec)] group-hover:text-[var(--accent)] truncate transition-colors">
                    {s.title}
                  </span>
                </li>
              ))}
            </ul>
          </StatCard>
        )}
      </aside>
    </>
  );
}

function StatCard({ title, icon, children }) {
  return (
    <div className="glass rounded-xl p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm select-none">{icon}</span>
        <span className="font-display font-600 text-xs text-[var(--text-sec)] uppercase tracking-wider">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}
