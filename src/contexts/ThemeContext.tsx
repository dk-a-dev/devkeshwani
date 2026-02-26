// src/contexts/ThemeContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Palette {
    name: string;
    primary: string;       // HSL values (no "hsl()")
    secondary: string;
    blobA: string;         // rgba for background blob
    blobB: string;
    ring: string;
}

export interface Texture {
    name: string;
    id: string;
}

export const palettes: Palette[] = [
    {
        name: "Rosé",
        primary: "340 82% 75%",
        secondary: "165 60% 60%",
        blobA: "rgba(219, 39, 119, 0.15)",
        blobB: "rgba(20, 184, 166, 0.15)",
        ring: "340 82% 75%",
    },
    {
        name: "Neon Mint",
        primary: "160 84% 55%",
        secondary: "270 60% 65%",
        blobA: "rgba(16, 185, 129, 0.18)",
        blobB: "rgba(139, 92, 246, 0.15)",
        ring: "160 84% 55%",
    },
    {
        name: "Sunset",
        primary: "25 95% 63%",
        secondary: "240 60% 60%",
        blobA: "rgba(249, 115, 22, 0.18)",
        blobB: "rgba(99, 102, 241, 0.15)",
        ring: "25 95% 63%",
    },
    {
        name: "Arctic",
        primary: "190 90% 55%",
        secondary: "215 20% 55%",
        blobA: "rgba(6, 182, 212, 0.18)",
        blobB: "rgba(148, 163, 184, 0.12)",
        ring: "190 90% 55%",
    },
    {
        name: "Lavender",
        primary: "270 75% 70%",
        secondary: "340 70% 65%",
        blobA: "rgba(167, 139, 250, 0.18)",
        blobB: "rgba(244, 63, 94, 0.12)",
        ring: "270 75% 70%",
    },
    {
        name: "Mono",
        primary: "0 0% 85%",
        secondary: "0 0% 55%",
        blobA: "rgba(255, 255, 255, 0.08)",
        blobB: "rgba(255, 255, 255, 0.04)",
        ring: "0 0% 85%",
    },
];

export const textures: Texture[] = [
    { name: "Noise", id: "noise" },
    { name: "Mesh", id: "mesh" },
    { name: "Aurora", id: "aurora" },
    { name: "Grain", id: "grain" },
    { name: "Minimal", id: "minimal" },
    { name: "Dots", id: "dots" },
];

interface ThemeState {
    paletteIndex: number;
    textureIndex: number;
    palette: Palette;
    texture: Texture;
    setPalette: (i: number) => void;
    setTexture: (i: number) => void;
}

const ThemeContext = createContext<ThemeState | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [paletteIndex, setPaletteIndex] = useState(() => {
        const saved = localStorage.getItem("dk-palette");
        return saved ? parseInt(saved, 10) : 0;
    });
    const [textureIndex, setTextureIndex] = useState(() => {
        const saved = localStorage.getItem("dk-texture");
        return saved ? parseInt(saved, 10) : 0;
    });

    const palette = palettes[paletteIndex] || palettes[0];
    const texture = textures[textureIndex] || textures[0];

    // Apply palette CSS vars to :root
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty("--primary", palette.primary);
        root.style.setProperty("--primary-foreground", palette.primary.split(" ")[0] + " 10% 10%");
        root.style.setProperty("--secondary", palette.secondary);
        root.style.setProperty("--secondary-foreground", palette.secondary.split(" ")[0] + " 10% 10%");
        root.style.setProperty("--ring", palette.ring);
        root.style.setProperty("--blob-a", palette.blobA);
        root.style.setProperty("--blob-b", palette.blobB);
        localStorage.setItem("dk-palette", String(paletteIndex));
    }, [palette, paletteIndex]);

    // Apply texture data attribute to body
    useEffect(() => {
        document.body.setAttribute("data-texture", texture.id);
        localStorage.setItem("dk-texture", String(textureIndex));
    }, [texture, textureIndex]);

    return (
        <ThemeContext.Provider value={{
            paletteIndex,
            textureIndex,
            palette,
            texture,
            setPalette: setPaletteIndex,
            setTexture: setTextureIndex,
        }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be inside ThemeProvider");
    return ctx;
}
