// src/components/sections/Extras.tsx
import { ExternalLink, Play, FileText, Pen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { resume } from "@/data/resume";

export function Extras() {
    return (
        <div className="max-w-4xl mx-auto pb-10">
            <header className="mb-12 animate-fade-up">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                    Extras
                </h2>
                <p className="text-muted-foreground text-lg">Sessions, talks, writing, and certifications.</p>
            </header>

            {/* Resume Download */}
            <div className="mb-10 animate-fade-up" style={{ animationDelay: "100ms" }}>
                <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 glass-card rounded-xl text-white font-medium hover:border-white/20 transition-all group"
                >
                    <FileText className="w-5 h-5 text-primary" />
                    Download Resume
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
            </div>

            {/* Sessions & Talks */}
            <section className="mb-12">
                <div className="flex items-center gap-2 mb-6 animate-fade-up" style={{ animationDelay: "150ms" }}>
                    <div className="p-2 bg-primary/10 rounded-lg text-primary border border-primary/20">
                        <Play className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight">Sessions & Talks</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {resume.sessions.map((session, index) => (
                        <div
                            key={session.title}
                            className="glass-card rounded-2xl p-5 flex flex-col animate-fade-up"
                            style={{ animationDelay: `${(index + 2) * 100}ms` }}
                        >
                            {session.youtubeEmbedUrl ? (
                                <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-4 bg-black/40 border border-white/10">
                                    <iframe
                                        src={session.youtubeEmbedUrl}
                                        title={session.title}
                                        className="absolute inset-0 w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            ) : session.image ? (
                                <div className="w-full aspect-video rounded-xl overflow-hidden mb-4 bg-white/5 border border-white/10 flex items-center justify-center p-2">
                                    <img src={session.image} alt={session.title} className="w-full h-full object-contain" />
                                </div>
                            ) : null}
                            <h4 className="text-base font-bold text-white mb-2 leading-snug">{session.title}</h4>
                            <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-3">{session.description}</p>
                            <div className="flex flex-wrap gap-1.5 mb-3">
                                {session.topics.map((topic) => (
                                    <Badge key={topic} variant="secondary" className="text-xs px-2 py-0.5 bg-white/5 border border-white/10">{topic}</Badge>
                                ))}
                            </div>
                            {session.link && (
                                <a href={session.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors mt-auto">
                                    View Resource <ExternalLink size={14} />
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Writing */}
            <section className="mb-12">
                <div className="flex items-center gap-2 mb-6 animate-fade-up" style={{ animationDelay: "100ms" }}>
                    <div className="p-2 bg-secondary/10 rounded-lg text-secondary border border-secondary/20">
                        <Pen className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight">Writing</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {resume.blogs.map((blog, index) => (
                        <a
                            key={blog.title}
                            href={blog.link}
                            target="_blank"
                            rel="noreferrer"
                            className="block group animate-fade-up"
                            style={{ animationDelay: `${(index + 2) * 100}ms` }}
                        >
                            <div className="glass-card rounded-2xl p-5 flex flex-col h-full">
                                {blog.image && (
                                    <div className="w-full aspect-[2/1] rounded-xl overflow-hidden mb-4 bg-white/5 border border-white/10 flex items-center justify-center p-2">
                                        <img src={blog.image} alt={blog.title} className="w-full h-full object-contain" />
                                    </div>
                                )}
                                <div className="flex items-start justify-between gap-3 mb-2">
                                    <h4 className="text-base font-bold text-white group-hover:text-primary transition-colors leading-snug">{blog.title}</h4>
                                    <ExternalLink size={16} className="text-white/20 group-hover:text-primary transition-colors flex-shrink-0 mt-0.5" />
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed mt-1 flex-1">{blog.description}</p>
                                <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-white/5">
                                    {blog.topics.map((topic) => (
                                        <Badge key={topic} variant="secondary" className="text-xs px-2 py-0.5 bg-white/5 border border-white/10">{topic}</Badge>
                                    ))}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            {/* Certifications */}
            <section>
                <div className="flex items-center gap-2 mb-6 animate-fade-up" style={{ animationDelay: "100ms" }}>
                    <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400 border border-amber-500/20">
                        <FileText className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight">Certifications</h3>
                </div>
                <div className="grid grid-cols-1 gap-3">
                    {resume.certifications.map((cert, index) => (
                        <div
                            key={cert.name}
                            className="glass-card rounded-xl p-4 flex items-start gap-4 animate-fade-up"
                            style={{ animationDelay: `${(index + 2) * 80}ms` }}
                        >
                            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                                <FileText className="w-4 h-4 text-amber-400/70" />
                            </div>
                            <div>
                                <div className="font-medium text-white text-sm">{cert.name}</div>
                                <div className="text-xs text-primary/80 font-medium mt-0.5">{cert.issuer}</div>
                                <div className="text-xs text-muted-foreground mt-1">{cert.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
