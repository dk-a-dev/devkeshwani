// src/components/MixerPanel.tsx
import { useState, useRef, useCallback, useEffect } from "react";
import { useTheme, palettes, textures } from "@/contexts/ThemeContext";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";

declare global {
    interface Window {
        onSpotifyIframeApiReady: (IFrameAPI: any) => void;
    }
}

// ─── Visualizer (Based on user HTML) ──────────────────────────
function Visualizer({ isPlaying, palette }: { isPlaying: boolean; palette: any }) {
    const [levels, setLevels] = useState<number[]>(Array(8).fill(0));

    useEffect(() => {
        if (!isPlaying) {
            setLevels(Array(8).fill(1)); // Base low level when paused
            return;
        }
        const interval = setInterval(() => {
            setLevels(Array.from({ length: 8 }, () => Math.floor(Math.random() * 10) + 2));
        }, 150);
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="relative !h-40 overflow-hidden rounded-sm border-[1.45px] border-[#FDF2F0] bg-[#114C80] px-8 py-5 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-full">
            <div className="flex h-full items-end justify-between gap-2 bg-[#020605] px-4 shadow-[inset_0px_0px_10px_0px_rgba(0,0,0,1)]">
                {levels.map((level, colIdx) => (
                    <div key={colIdx} className="vis-col flex h-full w-full flex-col-reverse items-center gap-1 py-2">
                        {Array.from({ length: 12 }).map((_, rowIdx) => {
                            const active = rowIdx < level;
                            let color = `hsl(${palette.primary})`; // Base color from theme
                            if (rowIdx > 6) color = `hsl(${palette.secondary})`; // Secondary color
                            if (rowIdx > 9) color = "#FFFFFF"; // White peaks

                            return (
                                <div
                                    key={rowIdx}
                                    className="vis-block min-h-[4px] w-full flex-1 transition-all duration-75 rounded-sm"
                                    style={{
                                        backgroundColor: active ? color : 'rgba(255,255,255,0.05)',
                                        opacity: active ? 1 : 0.5,
                                        boxShadow: active ? `0 0 8px ${color}` : 'none'
                                    }}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── Big Slider (Based on user HTML) ──────────────────────────
function BigSlider({ value, onChange, label, palette }: { value: number; onChange: (v: number) => void; label: string; palette: any }) {
    const trackRef = useRef<HTMLDivElement>(null);
    const dragging = useRef(false);

    const handleMove = useCallback((clientY: number) => {
        if (!trackRef.current) return;
        const rect = trackRef.current.getBoundingClientRect();
        let pct = 1 - (clientY - rect.top) / rect.height;
        pct = Math.max(0, Math.min(1, pct));
        onChange(pct);
    }, [onChange]);

    const onPointerDown = useCallback((e: React.PointerEvent) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        handleMove(e.clientY);
    }, [handleMove]);

    const onPointerMove = useCallback((e: React.PointerEvent) => {
        if (dragging.current) handleMove(e.clientY);
    }, [handleMove]);

    const onPointerUp = useCallback(() => { dragging.current = false; }, []);

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="relative flex h-40 w-12 items-center justify-center rounded-[4px] bg-white/10 backdrop-blur-md shadow-[inset_0px_4px_10px_rgba(0,0,0,0.5)] border border-white/10 transition-colors duration-500">
                <div
                    ref={trackRef}
                    className="absolute top-4 bottom-4 w-1.5 rounded-full bg-black/60 shadow-inner cursor-pointer"
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                >
                    <div
                        className="absolute left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.5)] border-[3px] border-[#222] transition-all hover:scale-110 active:scale-95 flex items-center justify-center group"
                        style={{ top: `${(1 - value) * 100}%`, background: `linear-gradient(135deg, hsl(${palette.primary}), hsl(${palette.secondary}))` }}
                    >
                        <div className="w-4 h-0.5 bg-white/80 rounded-full shadow-sm group-active:bg-white" />
                    </div>
                </div>
            </div>
            <span className="font-mono text-[10px] font-bold text-white/70 tracking-widest">{label}</span>
        </div>
    );
}

// ─── Turntable (Interactive) ──────────────────────────────────
function Turntable({ spinning, onClick, icon }: { spinning?: boolean; onClick?: () => void; icon?: React.ReactNode }) {
    return (
        <div className="relative flex aspect-square w-24 sm:w-28 lg:w-32 cursor-pointer items-center justify-center hover:scale-105 transition-transform group" onClick={onClick}>
            {/* Outer Ring */}
            <div className="absolute inset-0 rounded-full border-[6px] border-[#142441] bg-[#1a1a1a] shadow-[0_4px_15px_rgba(0,0,0,0.6)]" />
            {/* Spinning Record Area */}
            <div className={`absolute inset-2 rounded-full bg-[#111] overflow-hidden ${spinning ? "animate-spin" : ""}`} style={spinning ? { animationDuration: "2s", animationTimingFunction: "linear" } : undefined}>
                {/* Grooves */}
                <div className="absolute inset-[10%] rounded-full border border-white/10" />
                <div className="absolute inset-[25%] rounded-full border border-white/10" />
                <div className="absolute inset-[40%] rounded-full border border-white/10" />
                {/* Center Label */}
                <div className="absolute inset-[35%] rounded-full bg-[#52F6EE] border-4 border-[#142441] flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-black shadow-inner" />
                </div>
            </div>
            {/* Action Icon Overlay */}
            {icon && (
                <div className="absolute inset-0 flex items-center justify-center z-10 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded-full">
                    {icon}
                </div>
            )}
        </div>
    );
}

// ─── Main Mixer Page ─────────────────────────────────────────
export function MixerPanel() {
    const { paletteIndex, textureIndex, setPalette, setTexture, palette } = useTheme();

    const [slider1, setSlider1] = useState(0.8);
    const [slider2, setSlider2] = useState(0.5);
    const [slider3, setSlider3] = useState(0.5);

    const embedControllerRef = useRef<any>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [trackName, setTrackName] = useState("Spotify Playback Engine Booting...");

    useEffect(() => {
        // Load Spotify IFrame API script
        if (!document.querySelector('script[src="https://open.spotify.com/embed/iframe-api/v1"]')) {
            const script = document.createElement("script");
            script.src = "https://open.spotify.com/embed/iframe-api/v1";
            script.async = true;
            document.body.appendChild(script);
        }

        window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
            const element = document.getElementById('spotify-embed');
            if (!element) return;

            const options = {
                uri: 'spotify:playlist:37i9dQZEVXddreM6XRt2g5?utm_source=generator',
                width: '75%',
                height: '352',
                theme: '0'
            };

            const callback = (EmbedController: any) => {
                embedControllerRef.current = EmbedController;
                EmbedController.addListener('playback_update', (e: any) => {
                    setIsPlaying(!e.data.isPaused);
                    if (e.data.track?.name) {
                        setTrackName(`${e.data.track.name} — ${e.data.track.artists.map((a: any) => a.name).join(", ")}`);
                    }
                });
                EmbedController.addListener('ready', () => {
                    setTrackName("Spotify Ready — Hit Play!");
                });
            };
            IFrameAPI.createController(element, options, callback);
        };
    }, []);

    const handlePlayPause = () => embedControllerRef.current?.togglePlay();
    const handleNext = () => embedControllerRef.current?.next();
    const handlePrev = () => embedControllerRef.current?.prev();

    return (
        <div className="max-w-6xl mx-auto pb-12">
            {/* Header */}
            <header className="mb-4 animate-fade-up px-4 md:px-0">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                    DJ Deck
                </h2>
                <p className="text-muted-foreground text-lg">Your master control room. Play some tunes and set the vibe.</p>
            </header>

            {/* Main DJ Console Shell */}
            <div
                className="relative mx-auto flex w-full flex-col gap-6 overflow-hidden rounded-[24px] border border-white/10 p-6 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] animate-fade-up transition-colors duration-700"
                style={{
                    background: `linear-gradient(145deg, hsla(${palette.primary}, 0.15) 0%, hsla(${palette.secondary}, 0.1) 100%), rgba(10, 10, 15, 0.9)`,
                    backdropFilter: "blur(20px)"
                }}
            >
                {/* Top Section: Marquee Display */}
                <div className="relative flex aspect-[20/1] md:aspect-[30/1] w-full items-center overflow-hidden bg-black/80 px-[2%] shadow-[inset_0_0_15px_rgba(0,0,0,1)] rounded-lg border border-white/5">
                    <div className="flex gap-[10%] text-sm md:text-lg font-mono tracking-widest whitespace-nowrap animate-marquee transition-colors duration-500" style={{ color: `hsl(${palette.primary})`, textShadow: `0 0 10px hsla(${palette.primary}, 0.5)` }}>
                        <span>▶ NOW PLAYING: {trackName.toUpperCase()} </span>
                        <span>▶ NOW PLAYING: {trackName.toUpperCase()} </span>
                    </div>
                </div>

                {/* Middle Grid: The Deck */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT PANEL: Visualizer & Textures */}
                    <div className="flex flex-col gap-6">
                        <Visualizer isPlaying={isPlaying} palette={palette} />

                        {/* Textures Matrix */}
                        <div className="bg-black/20 rounded-[16px] p-5 border border-white/5 shadow-inner flex flex-col items-center backdrop-blur-md">
                            <h4 className="text-white/40 font-mono text-[10px] mb-4 tracking-[0.2em] font-bold">TEXTURE MATRIX</h4>
                            <div className="flex w-full flex-wrap items-center justify-center gap-x-2 gap-y-5 px-2">
                                {textures.map((t, i) => (
                                    <div key={i} className="flex w-[28%] justify-center flex-col items-center gap-2">
                                        <div className="w-8">
                                            <button
                                                onClick={() => setTexture(i)}
                                                className={`aspect-square w-full rounded-md transition-all border-b-[3px] shadow-lg hover:opacity-85 ${textureIndex === i
                                                    ? 'translate-y-[2px] shadow-none scale-110 border-transparent'
                                                    : 'hover:brightness-110'
                                                    }`}
                                                style={{
                                                    backgroundColor: `hsl(${palette.secondary})`,
                                                    borderColor: textureIndex !== i ? `hsla(${palette.secondary}, 0.6)` : 'transparent',
                                                    boxShadow: textureIndex === i ? `0 0 15px hsla(${palette.secondary}, 0.5)` : undefined
                                                }}
                                                title={t.name}
                                            />
                                        </div>
                                        <span className="text-[9px] text-white/50 uppercase font-mono">{t.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* CENTER PANEL: Turntables & Spotify */}
                    <div className="flex flex-col gap-6 items-center w-full h-full">
                        {/* Transport Deck */}
                        <div className="bg-black/40 p-6 rounded-[20px] w-full flex justify-around items-center border border-white/10 shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                            <Turntable onClick={handlePrev} icon={<SkipBack className="w-8 h-8" />} />
                            <Turntable spinning={isPlaying} onClick={handlePlayPause} icon={isPlaying ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10 ml-1" />} />
                            <Turntable onClick={handleNext} icon={<SkipForward className="w-8 h-8" />} />
                        </div>

                        {/* Spotify Embed Screen */}
                        <div className="w-full flex-1 flex flex-col items-center justify-center min-h-[352px] bg-black/50 overflow-hidden rounded-[20px] border border-white/5 shadow-[inset_0_0_20px_rgba(0,0,0,1)] backdrop-blur-md">
                            {/* User's Embedded Iframe */}
                            <iframe
                                id="spotify-embed"
                                data-testid="embed-iframe"
                                style={{ borderRadius: "20px" }}
                                src="https://open.spotify.com/embed/playlist/37i9dQZEVXddreM6XRt2g5?utm_source=generator&theme=0"
                                width="100%"
                                height="100%"
                                className="min-h-[352px]"
                                frameBorder="0"
                                allowFullScreen={false}
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>

                    {/* RIGHT PANEL: Palettes & Sliders */}
                    <div className="flex flex-col gap-6">
                        {/* Palettes Matrix */}
                        <div className="bg-black/20 rounded-[16px] p-5 border border-white/5 shadow-inner flex flex-col items-center backdrop-blur-md">
                            <h4 className="text-white/40 font-mono text-[10px] mb-4 tracking-[0.2em] font-bold">PALETTE</h4>
                            <div className="flex w-full flex-wrap items-center justify-center gap-x-2 gap-y-5 px-2">
                                {palettes.map((p, i) => (
                                    <div key={i} className="flex w-[28%] justify-center flex-col items-center gap-2">
                                        <div className="w-8">
                                            <button
                                                onClick={() => setPalette(i)}
                                                className={`aspect-square w-full rounded-md transition-all border-b-[3px] shadow-lg hover:opacity-85 ${paletteIndex === i
                                                    ? 'translate-y-[2px] shadow-none scale-110 border-transparent'
                                                    : 'border-black/40 hover:border-black/20'
                                                    }`}
                                                style={{
                                                    background: `linear-gradient(135deg, hsl(${p.primary}), hsl(${p.secondary}))`,
                                                    boxShadow: paletteIndex === i ? `0 0 15px hsla(${p.primary}, 0.5)` : undefined
                                                }}
                                                title={p.name}
                                            />
                                        </div>
                                        <span className="text-[9px] text-white/50 uppercase font-mono">{p.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Slider Bank */}
                        <div className="bg-black/20 rounded-[16px] p-5 border border-white/5 shadow-[inset_0_2px_15px_rgba(0,0,0,0.3)] flex justify-around backdrop-blur-md">
                            <BigSlider value={slider1} onChange={setSlider1} label="VOL" palette={palette} />
                            <BigSlider value={slider2} onChange={setSlider2} label="EQ" palette={palette} />
                            <BigSlider value={slider3} onChange={setSlider3} label="FX" palette={palette} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
