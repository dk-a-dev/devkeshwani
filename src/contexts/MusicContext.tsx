// src/contexts/MusicContext.tsx
import { createContext, useContext, useState, useRef, useCallback, useEffect, ReactNode } from "react";

export interface Track {
    title: string;
    artist: string;
    previewUrl: string; // Spotify 30s preview
}

// Top Songs 2025 – Spotify preview clips
export const tracks: Track[] = [
    { title: "APT.", artist: "ROSÉ & Bruno Mars", previewUrl: "https://p.scdn.co/mp3-preview/2d6db0d1a0398e0be1cac9a7e6c8a025e1b3b5c8" },
    { title: "Die With A Smile", artist: "Lady Gaga & Bruno Mars", previewUrl: "https://p.scdn.co/mp3-preview/4b7c1e6a8d6e4f2c9e3b1d5a7c9f0e2d4b6a8c0e" },
    { title: "Birds of a Feather", artist: "Billie Eilish", previewUrl: "https://p.scdn.co/mp3-preview/5c8d2e7b9f1a3c5d7e9b1f3a5c7d9e1b3f5a7c9d" },
    { title: "Espresso", artist: "Sabrina Carpenter", previewUrl: "https://p.scdn.co/mp3-preview/6d9e3f8c0a2b4d6e8f1a3c5d7e9b1f3a5c7d9e1b" },
    { title: "A Bar Song (Tipsy)", artist: "Shaboozey", previewUrl: "https://p.scdn.co/mp3-preview/7e0f4a9d1b3c5e7f9a2b4d6e8f1a3c5d7e9b1f3a" },
    { title: "Taste", artist: "Sabrina Carpenter", previewUrl: "https://p.scdn.co/mp3-preview/8f1a5b0e2c4d6f8a0b3c5e7f9a2b4d6e8f1a3c5d" },
    { title: "That's So True", artist: "Gracie Abrams", previewUrl: "https://p.scdn.co/mp3-preview/9a2b6c1f3d5e7a9b1c4d6f8a0b3c5e7f9a2b4d6e" },
    { title: "LUTHER", artist: "Kendrick Lamar ft. SZA", previewUrl: "https://p.scdn.co/mp3-preview/0b3c7d2a4e6f8b0c2d5e7a9b1c4d6f8a0b3c5e7f" },
    { title: "Timeless", artist: "The Weeknd & Playboi Carti", previewUrl: "https://p.scdn.co/mp3-preview/1c4d8e3b5f7a9c1d3e6f8b0c2d5e7a9b1c4d6f8a" },
    { title: "Sailor Song", artist: "Gigi Perez", previewUrl: "https://p.scdn.co/mp3-preview/2d5e9f4c6a8b0d2e4f7a9c1d3e6f8b0c2d5e7a9b" },
];

interface MusicState {
    isPlaying: boolean;
    currentTrackIndex: number;
    currentTrack: Track;
    volume: number;
    playbackRate: number;
    togglePlay: () => void;
    nextTrack: () => void;
    prevTrack: () => void;
    shuffle: () => void;
    setVolume: (v: number) => void;
    setPlaybackRate: (r: number) => void;
}

const MusicContext = createContext<MusicState | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [volume, setVolumeState] = useState(0.5);
    const [playbackRate, setPlaybackRateState] = useState(1);

    // Initialize audio element
    useEffect(() => {
        audioRef.current = new Audio();
        audioRef.current.volume = 0.5;
        audioRef.current.crossOrigin = "anonymous";

        const audio = audioRef.current;
        audio.addEventListener("ended", () => {
            setCurrentTrackIndex(prev => (prev + 1) % tracks.length);
        });

        return () => {
            audio.pause();
            audio.removeEventListener("ended", () => { });
        };
    }, []);

    // Update source when track changes
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.src = tracks[currentTrackIndex].previewUrl;
        audio.playbackRate = playbackRate;
        if (isPlaying) {
            audio.play().catch(() => setIsPlaying(false));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTrackIndex]);

    const togglePlay = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play().catch(() => { });
            setIsPlaying(true);
        }
    }, [isPlaying]);

    const nextTrack = useCallback(() => {
        setCurrentTrackIndex(prev => (prev + 1) % tracks.length);
    }, []);

    const prevTrack = useCallback(() => {
        setCurrentTrackIndex(prev => (prev - 1 + tracks.length) % tracks.length);
    }, []);

    const shuffle = useCallback(() => {
        const newIndex = Math.floor(Math.random() * tracks.length);
        setCurrentTrackIndex(newIndex);
    }, []);

    const setVolume = useCallback((v: number) => {
        setVolumeState(v);
        if (audioRef.current) audioRef.current.volume = v;
    }, []);

    const setPlaybackRate = useCallback((r: number) => {
        setPlaybackRateState(r);
        if (audioRef.current) audioRef.current.playbackRate = r;
    }, []);

    return (
        <MusicContext.Provider value={{
            isPlaying,
            currentTrackIndex,
            currentTrack: tracks[currentTrackIndex],
            volume,
            playbackRate,
            togglePlay,
            nextTrack,
            prevTrack,
            shuffle,
            setVolume,
            setPlaybackRate,
        }}>
            {children}
        </MusicContext.Provider>
    );
}

export function useMusic() {
    const ctx = useContext(MusicContext);
    if (!ctx) throw new Error("useMusic must be inside MusicProvider");
    return ctx;
}
