import { useState, useRef, useCallback, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

/**
 * useAudioPlayer
 *
 * Central audio-management hook.
 * - Only one clip plays at a time (a new play stops the previous).
 * - Tracks play counts, recently played, volume — all persisted in localStorage.
 */
export function useAudioPlayer() {
  const audioRef = useRef(null);   // the currently active Audio object

  const [currentSound,   setCurrentSound]   = useState(null);   // sound object | null
  const [isPlaying,      setIsPlaying]       = useState(false);
  const [progress,       setProgress]        = useState(0);      // 0-100
  const [duration,       setDuration]        = useState(0);      // seconds

  const [volume,         setVolume]          = useLocalStorage('sb_volume', 0.8);
  const [playCounts,     setPlayCounts]      = useLocalStorage('sb_playcounts', {});
  const [recentlyPlayed, setRecentlyPlayed]  = useLocalStorage('sb_recent', []);   // array of ids (newest first, max 20)
  const [favorites,      setFavorites]       = useLocalStorage('sb_favorites', []); // array of ids

  // ── Volume sync ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // ── Progress tracking ────────────────────────────────────────────────────
  const startProgressTracking = useCallback((audio) => {
    const tick = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setDuration(audio.duration);
      }
    };
    audio.addEventListener('timeupdate', tick);
    return () => audio.removeEventListener('timeupdate', tick);
  }, []);

  // ── Play ─────────────────────────────────────────────────────────────────
  const play = useCallback((sound) => {
    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // If clicking the same clip that's playing → just stop (toggle off)
    if (currentSound?.id === sound.id && isPlaying) {
      audioRef.current = null;
      setCurrentSound(null);
      setIsPlaying(false);
      setProgress(0);
      return;
    }

    const audio = new Audio(sound.file);
    audio.volume = volume;
    audioRef.current = audio;

    audio.play().catch(() => {
      // File missing or blocked — fail gracefully
      setIsPlaying(false);
    });

    setCurrentSound(sound);
    setIsPlaying(true);
    setProgress(0);

    // Cleanup on ended
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setProgress(0);
    });

    // Progress
    const cleanup = startProgressTracking(audio);
    audio.addEventListener('ended', cleanup);

    // Increment play count
    setPlayCounts(prev => ({
      ...prev,
      [sound.id]: (prev[sound.id] || 0) + 1,
    }));

    // Update recently played (max 20, no dupes at top)
    setRecentlyPlayed(prev => {
      const filtered = prev.filter(id => id !== sound.id);
      return [sound.id, ...filtered].slice(0, 20);
    });
  }, [currentSound, isPlaying, volume, startProgressTracking, setPlayCounts, setRecentlyPlayed]);

  // ── Stop all ─────────────────────────────────────────────────────────────
  const stopAll = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setCurrentSound(null);
    setIsPlaying(false);
    setProgress(0);
  }, []);

  // ── Seek ─────────────────────────────────────────────────────────────────
  const seek = useCallback((pct) => {
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = (pct / 100) * audioRef.current.duration;
    }
  }, []);

  // ── Favorites toggle ─────────────────────────────────────────────────────
  const toggleFavorite = useCallback((soundId) => {
    setFavorites(prev =>
      prev.includes(soundId)
        ? prev.filter(id => id !== soundId)
        : [...prev, soundId]
    );
  }, [setFavorites]);

  const isFavorite = useCallback((soundId) => favorites.includes(soundId), [favorites]);

  return {
    currentSound,
    isPlaying,
    progress,
    duration,
    volume,     setVolume,
    playCounts,
    recentlyPlayed,
    favorites,
    play,
    stopAll,
    seek,
    toggleFavorite,
    isFavorite,
  };
}
