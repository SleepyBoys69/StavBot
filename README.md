# StavBoard 🎙️

A polished, dark-mode React soundboard for Stav Ziv clips.  
Built with **Vite + React + Tailwind CSS**.

---

## Project Structure

```
stavboard/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.jsx              # React entry point
│   ├── App.jsx               # Root component, wires everything together
│   ├── index.css             # Tailwind + custom CSS vars, grain, animations
│   ├── components/
│   │   ├── Header.jsx        # Top bar: logo, stop-all, random
│   │   ├── SearchBar.jsx     # Controlled search input
│   │   ├── CategoryTabs.jsx  # Horizontal scrollable category filter
│   │   ├── SoundCard.jsx     # Individual clip card with active state
│   │   ├── SoundGrid.jsx     # Responsive grid of SoundCards
│   │   ├── PlayerBar.jsx     # Sticky now-playing bar at bottom
│   │   └── StatsPanel.jsx    # Desktop sidebar: play counts, top clips, recent
│   ├── data/
│   │   └── sounds.js         # All 130+ clips with real filenames from StavBot repo
│   ├── hooks/
│   │   ├── useAudioPlayer.js # Core audio logic: play/stop/seek/volume/history
│   │   └── useLocalStorage.js# Persistent state helper
│   └── utils/
│       └── soundUtils.js     # filter, sort, random, formatTime, topSounds
└── public/
    └── sounds/               # ← PUT YOUR MP3 FILES HERE
```

---

## Getting the Audio Files

The MP3 files are from the public **StavBot GitHub repo**:

> https://github.com/StavBot/StavBot.github.io/tree/master/audio

1. Go to that URL.
2. Download the files you want (or clone the repo).
3. Copy all the MP3 files into `public/sounds/` in this project.

The filenames in `src/data/sounds.js` match exactly.  
Once the files are in place, everything will work automatically.

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy MP3 files into public/sounds/

# 3. Start dev server
npm run dev

# 4. Build for production
npm run build
```

---

## Features

- 🎵 130+ real clips, organized into 8 categories
- 🔍 Full-text search (title, category, tags)
- 🏷️ Category filter tabs with clip counts
- ❤️ Favorites — saved in localStorage
- 🕐 Recently played — saved in localStorage
- 📊 Play counts — saved in localStorage
- 🔀 Random clip button
- ⏹️ Stop-all button
- 📊 Stats sidebar (desktop): top clips, recent, total plays
- 🔊 Volume slider — saved in localStorage
- ▶️ One clip at a time (clicking new stops previous)
- 💡 Active card glows amber with animated waveform
- 📱 Fully responsive (mobile + desktop)
- 🎨 Dark, glassy, premium aesthetic with grain overlay
