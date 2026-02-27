// src/App.tsx
import { useState, useEffect } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import { About } from "@/components/sections/About";
import { Portfolio } from "@/components/sections/Portfolio";
import { Experience } from "@/components/sections/Experience";
import { Extras } from "@/components/sections/Extras";
import { Contact } from "@/components/sections/Contact";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { MixerPanel } from "@/components/MixerPanel";
import { Analytics } from "@vercel/analytics/react";
import { track } from "@vercel/analytics";
import { SpeedInsights } from "@vercel/speed-insights/react";

const App = () => {
    const [currentPage, setCurrentPage] = useState<string>("about");

    useEffect(() => {
        const getRoute = () => (location.hash.replace("#", "") || "about").toLowerCase();
        const handleHashChange = () => {
            const newPage = getRoute();
            setCurrentPage(newPage);
            track("Pageview", { path: window.location.pathname + window.location.hash });
            window.scrollTo({ top: 0, behavior: "auto" });
        };
        handleHashChange();
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    const handleNavigate = (page: string) => {
        if (!document.startViewTransition) {
            location.hash = page;
            return;
        }
        document.startViewTransition(() => {
            location.hash = page;
        });
    };

    const renderPage = () => {
        switch (currentPage) {
            case "portfolio": return <Portfolio />;
            case "experience": return <Experience />;
            case "extras": return <Extras />;
            case "mixer": return <MixerPanel />;
            case "contact": return <Contact />;
            default: return <About />;
        }
    };

    return (
        <ThemeProvider>
            <TooltipProvider>
                <Sonner />
                <Layout currentPage={currentPage} onNavigate={handleNavigate}>
                    {renderPage()}
                </Layout>
                <Analytics />
                <SpeedInsights />
            </TooltipProvider>
        </ThemeProvider>
    );
};

export default App;