// src/data/resume.tsx
import {
    Github,
    Linkedin,
    Mail,
    Zap,
    Code,
    Rocket,
} from "lucide-react";
import { SiteConfig } from "@/types";
import { SVGProps } from "react";
import { JSX } from "react/jsx-runtime";

export const resume: SiteConfig = {
    name: "Dev Keshwani",
    role: "Full-Stack Developer",
    location: "India",
    email: "dev.keshwani345@gmail.com",

    typewriterWords: ["applications.", "experiences.", "solutions.", "products."],

    bio: [
        "I specialise in creating unique and high-performance",
        "Graduate in Computer Science from VIT Vellore, specializing in full-stack development and mobile applications. Experienced in Flutter, GoLang, Python, and modern web technologies with hands-on experience in DevOps, CI/CD, and cloud platforms.",
        "Passionate about building scalable applications and contributing to open-source projects. From Android apps used by 40,000+ students to production REST APIs with 95%+ uptime — I build things that matter."
    ],

    contact: {
        socials: [
            { name: "GitHub", url: "https://github.com/dk-a-dev", icon: Github },
            { name: "LinkedIn", url: "https://linkedin.com/in/dev-keshwani", icon: Linkedin },
            {
                name: "Twitter",
                url: "https://twitter.com/dk_a_dev",
                icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" {...props}>
                        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                    </svg>
                )
            },
            { name: "Email", url: "mailto:dev.keshwani345@gmail.com", icon: Mail },
        ]
    },

    skills: [
        "Python", "GoLang", "Java", "Dart", "Kotlin", "TypeScript", "JavaScript",
        "Flutter", "React.js", "Next.js", "Node.js", "Express.js", "FastAPI", "Svelte",
        "Docker", "CI/CD", "Git/GitHub", "MongoDB", "PostgreSQL", "Firebase",
        "Redis", "AWS", "Google Cloud", "Tailwind CSS"
    ],

    attributes: [
        {
            label: "Full-Stack Builder",
            description: "From mobile to backend, I ship end-to-end.",
            icon: Code,
            color: "text-blue-400"
        },
        {
            label: "Performance First",
            description: "I optimise for speed, scalability, and uptime.",
            icon: Zap,
            color: "text-amber-400"
        },
        {
            label: "Open Source Advocate",
            description: "Mentored 100+ projects and reviewed countless PRs.",
            icon: Rocket,
            color: "text-emerald-400"
        },
    ],

    experience: [
        {
            type: "work",
            company: "Samsung R&D (PRISM)",
            logo: "/images/samsung.jpeg",
            icon: "SR",
            containerClass: "bg-blue-500/10 border-blue-500/20",
            textClass: "text-blue-400",
            title: "Research Intern",
            period: "Jul 2025 – Oct 2025",
            highlights: [
                "Developed on-device predictive models using TensorFlow Lite and MLKit for the SmartThings ecosystem.",
                "Improved device automation accuracy with low-latency and private predictions.",
                "Integrated predictive model into SmartThings Android app, enhancing user engagement.",
            ],
        },
        {
            type: "work",
            company: "Valsco Technology Pvt Ltd",
            logo: "/images/valsco.jpeg",
            icon: "VT",
            containerClass: "bg-purple-500/10 border-purple-500/20",
            textClass: "text-purple-400",
            title: "App Developer Intern",
            period: "Jul 2024 – Sep 2024",
            highlights: [
                "Developed Flutter mobile app with caching strategies and performance optimizations.",
                "Integrated secure payment gateways, OAuth2, and GCP APIs into Jurident app, improving performance by 50%.",
            ],
        },
        {
            type: "work",
            company: "Google Developers Group - VIT",
            logo: "/images/gdsc.jpeg",
            icon: "GDG",
            containerClass: "bg-green-500/10 border-green-500/20",
            textClass: "text-green-400",
            title: "Applications & Projects Lead",
            period: "Jul 2023 – Jan 2026",
            highlights: [
                "Mentored and guided development of 100+ projects under GDG-VIT's mentorship program.",
                "Spearheaded VITTY 3.0 Android app development, adopted by 40,000+ students.",
                "Organized DevJams, Hexathon, WomenTechies with 2000+ participants each.",
                "Conducted technical workshops on Flutter, Firebase, and IoT to 1000+ students.",
            ],
        },
        {
            type: "work",
            company: "IEEE-VIT",
            logo: "/images/ieee.png",
            icon: "IEEE",
            containerClass: "bg-sky-500/10 border-sky-500/20",
            textClass: "text-sky-400",
            title: "Technical Manager",
            period: "Jul 2023 – Jun 2024",
            highlights: [
                "Managed Hacktoberfest repositories, reviewing 100+ PRs across open-source projects.",
                "Organized HackTheHackathon'23 and Prudentia, each with 300+ participants.",
                "Delivered Python library sessions at PyCamp to 150+ participants.",
            ],
        },
        {
            type: "education",
            company: "VIT Vellore",
            icon: "VIT",
            containerClass: "bg-red-500/10 border-red-500/20",
            textClass: "text-red-400",
            title: "B.Tech Computer Science — 8.61 CGPA",
            period: "Aug 2022 – Jul 2026",
            highlights: [
                "Specializing in full-stack development and mobile applications.",
                "Technical Manager for Gravitas 2025 tech fest (10,000+ participants).",
                "Co-Ordinator, Riviera'24 Technical Team — led app development for 10k+ users.",
                "Scored 100/100 in University Differential Calculus.",
            ],
        },
        {
            type: "education",
            company: "The Cambrian School",
            icon: "TCS",
            containerClass: "bg-amber-500/10 border-amber-500/20",
            textClass: "text-amber-400",
            title: "CBSE Class XII — 92.8%",
            period: "2020 – 2021",
            highlights: [
                "Secured top-3 merit positions in Classes IX–XII.",
                "Achieved 10 CGPA in Class X with 95.6% overall.",
            ],
        },
    ],

    projects: [
        {
            title: "dev.ly",
            client: "Personal Project",
            timeline: "2026",
            techStack: ["Next.js", "Express.js", "Redis", "BullMQ", "PostgreSQL"],
            images: ["/projects/dev-ly.png"],
            description: "A high-performance URL shortener with a dedicated analytics microservice, real-time click tracking, Redis caching, BullMQ queues, and a modern Next.js dashboard.",
            scope: "Full-Stack Development + Microservices",
            responsibilities: [
                "Built a multi-repo microservices architecture with an Express.js URL shortener API and a dedicated analytics service.",
                "Engineered robust click tracking and guaranteed delivery using BullMQ workers and Redis caching.",
                "Developed a modern dashboard using Next.js 16 and Tailwind CSS to visualize user's aggregate stats and time series data."
            ],
            languages: ["TypeScript", "JavaScript"],
            repoUrl: "https://github.com/dk-a-dev/dev.ly",
            demoUrl: "https://dev-ly-frontend.vercel.app/",
        },
        {
            title: "Harmonica",
            client: "Personal Project",
            timeline: "2026",
            techStack: ["Swift", "SwiftUI", "Core Data", "WebKit"],
            images: ["/projects/harmonica.png"],
            description: "A native Swift/SwiftUI Hacker News client inspired by Harmonic for Android. Built with zero third-party dependencies. Features Best/New/Ask/Show/Jobs feeds, time filters, in-app WebView, bookmarks, threaded comments, user profiles, Algolia-powered search, story submission, offline caching, and 7 themes including animated Liquid UI themes.",
            scope: "iOS Development",
            responsibilities: [
                "Built full-featured HN client with SwiftUI and Core Data — zero dependencies.",
                "Implemented threaded comment views, bookmarks, search, and offline caching.",
                "Designed 7 custom themes including 3 animated Liquid UI themes.",
            ],
            languages: ["Swift"],
            repoUrl: "https://github.com/dk-a-dev/harmonica",
        },
        {
            title: "Artium",
            client: "GDG-VIT Project",
            timeline: "Sep 2024 – Feb 2025",
            techStack: ["Next.js", "Flutter", "MongoDB", "VGG19"],
            images: ["/projects/artium.svg"],
            description: "An art discovery platform leveraging VGG19-based Neural Style Transfer to generate paintings in famous artist styles. Features user authentication, curated galleries, and social sharing.",
            scope: "Full-stack Development + ML",
            responsibilities: [
                "Developed Neural Style Transfer pipeline using VGG19 architecture.",
                "Built Next.js frontend with user authentication and artwork galleries.",
                "Integrated social features like sharing artworks and curated collections.",
            ],
            languages: ["TypeScript", "Python", "Dart"],
            repoUrl: "https://github.com/gdgvit/artium-frontend",
            demoUrl: "https://artium.dscvit.com/",
        },
        {
            title: "LightSaber",
            client: "Personal Project",
            timeline: "Feb 2024",
            techStack: ["GoLang", "PostgreSQL", "Docker", "CI/CD", "Grafana"],
            images: ["/projects/lightsabar.png"],
            description: "Production-ready Go REST API with JWT authentication, database migrations, role-based permissions, and Grafana/Graphite monitoring stack achieving 95%+ uptime.",
            scope: "Backend API + DevOps",
            responsibilities: [
                "Built REST API with JWT auth, migrations, and role-based permissions.",
                "Automated deployment pipelines using GitHub Actions and Docker.",
                "Integrated Grafana + Graphite monitoring for real-time metrics.",
            ],
            languages: ["Go"],
            repoUrl: "https://github.com/dk-a-dev/LightSaber",
        },
        {
            title: "VITTY 3.0",
            client: "GDG-VIT",
            timeline: "2023 – Present",
            techStack: ["Android", "Kotlin", "Jetpack Compose", "Firebase"],
            images: ["/projects/vitty.svg"],
            description: "VIT timetable app with 40,000+ total users. Features Circles for connecting with friends, empty classroom finder, iOS widgets, caching & offline-ready timetables, ghost mode, and in-app notifications.",
            scope: "Android Development",
            responsibilities: [
                "Mentored team on production Android development with Kotlin.",
                "Implemented Jetpack Compose UI, Room DB, and LiveData architecture.",
                "Managed GitHub repository with 32+ stars and 5+ contributors.",
            ],
            languages: ["Kotlin"],
            demoUrl: "https://vitty.dscvit.com",
            repoUrl: "https://github.com/GDSCVIT/vitty",
        },
        {
            title: "Riviera'24 App",
            client: "VIT University",
            timeline: "Dec 2023 – Feb 2024",
            techStack: ["Flutter", "Firebase", "Push Notifications"],
            images: ["/projects/riviera.png"],
            description: "Official VIT Riviera'24 App for international sports and cultural carnival with 30,000+ students from 650+ colleges. Real-time event updates, registration system, and push notifications.",
            scope: "Mobile App Development",
            responsibilities: [
                "Led development of official app with registrations and live tracking.",
                "Implemented secure payments and auth, reducing login issues by 20%.",
                "Recognized as Technical Team Co-Ordinator for contributions.",
            ],
            languages: ["Dart"],
            demoUrl: "https://riviera2024-frontend.vercel.app/",
            // repoUrl: "",
        },
        {
            title: "Liwid",
            client: "Personal Project",
            timeline: "Aug 2023 – Jan 2024",
            techStack: ["Kotlin", "Android Library"],
            images: ["/projects/liwid.svg"],
            description: "Android library for lock-screen live widgets/notifications with real-time app updates. Includes comprehensive documentation and test suite for seamless integration.",
            scope: "Android Library",
            responsibilities: [
                "Developed Android library for lock-screen live widgets with real-time updates.",
                "Delivered full documentation and test suite for multi-app integration.",
            ],
            languages: ["Kotlin"],
            repoUrl: "https://github.com/dk-a-dev/Liwid",
        },
        {
            title: "SoundCrowd",
            client: "GDG-VIT Project",
            timeline: "2023",
            techStack: ["Svelte", "TailwindCSS", "Spotify API"],
            images: ["/projects/collabify.svg"],
            description: "Collaborative playlist app for events, enabling shared Spotify playlist creation and admin moderation. Features event-based state management in SvelteKit.",
            scope: "Web Development",
            responsibilities: [
                "Developed collaborative playlist platform with admin moderation.",
                "Designed UI with TailwindCSS and event-based state management.",
            ],
            languages: ["JavaScript"],
            repoUrl: "https://github.com/gdgvit/soundcrowd-frontend",
            demoUrl: "https://soundcrowd.dscvit.com/",
        },
        {
            title: "Zitch",
            client: "Google SDG Hackathon",
            timeline: "Hackathon 2023",
            techStack: ["Flutter", "gRPC", "Firebase", "ML"],
            images: ["/projects/zitch.svg"],
            description: "Stray-dog population heatmap application built during Google SDG Hackathon to assist NGOs. Uses classification models and gRPC-based backend to map stray density.",
            scope: "Mobile App + ML",
            responsibilities: [
                "Built heatmap application using classification models + gRPC backend.",
                "Gamified contributions for awareness, enabling NGOs to allocate resources.",
            ],
            languages: ["Dart", "Python"],
            repoUrl: "https://github.com/sidhant-sriv/zitch",
        },
        {
            title: "GitHub Org Wrapped",
            client: "Personal Project",
            timeline: "2024",
            techStack: ["Python", "Pandas", "Streamlit", "Plotly"],
            images: ["/projects/gorg.svg"],
            description: "GitHub Org Data Analyzer providing insights into metrics like active days, longest streaks, month-wise activity, developer activity, and repository activity from GitHub logs.",
            scope: "Data Visualization",
            responsibilities: [
                "Built data pipeline with Pandas for GitHub organization analytics.",
                "Created interactive Streamlit dashboard with Plotly visualizations.",
            ],
            languages: ["Python"],
            repoUrl: "https://github.com/dk-a-dev/github-org-wrapped-gen",
        },
        {
            title: "Breakey",
            client: "Personal Project",
            timeline: "2023",
            techStack: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB"],
            images: ["/projects/breakey.svg"],
            description: "A typing speed test website inspired by MonkeyType. Users can gauge their typing speed within a 30-second timeframe with customizable themes and a sleek interface.",
            scope: "Full-stack Web App",
            responsibilities: [
                "Built typing test engine with real-time WPM and accuracy tracking.",
                "Implemented customizable themes and user profiles with MongoDB.",
            ],
            languages: ["JavaScript", "HTML", "CSS"],
            repoUrl: "https://github.com/dk-a-dev/breakey",
            demoUrl: "https://breakey.vercel.app/",
        },
        {
            title: "Ledgerly",
            client: "Team Project",
            timeline: "2024",
            techStack: ["Flutter", "Django", "Firebase", "Riverpod"],
            images: ["/projects/bookeeper.svg"],
            description: "AI-powered bookkeeping app inspired by Khatabook. Built with a 6-person team using Django, Flutter and Classification Models to record voice-enabled transactions.",
            scope: "Mobile App + AI",
            responsibilities: [
                "Developed Flutter frontend with Riverpod state management.",
                "Integrated voice-enabled transaction recording using classification models.",
            ],
            languages: ["Dart", "Python"],
            repoUrl: "https://github.com/dk-a-dev/book-keeping-app",
        },
    ],

    sessions: [
        {
            title: "Android Study Jams: Introduction to Android Development",
            description: "Beginner-friendly sessions on developing Android apps using Kotlin.",
            topics: ["Android Dev", "Kotlin"],
            youtubeEmbedUrl: "https://www.youtube.com/embed/NJaEcyOwAu0?si=9gz-fg_LxfxToXHE",
        },
        {
            title: "Android Study Jams: Architecture and Compose",
            description: "Deep-dive into app architecture patterns, LiveData, and Jetpack Compose.",
            topics: ["App Architecture", "Kotlin", "Android Dev"],
            youtubeEmbedUrl: "https://www.youtube.com/embed/BVpa-QR7GLQ?si=9SJhYkY-N3yXKq09",
        },
        {
            title: "Android Study Jams: Networking and Task Scheduling",
            description: "Fetching data from APIs, coroutines, and background task scheduling.",
            topics: ["Android Dev", "Kotlin", "Coroutines"],
            youtubeEmbedUrl: "https://www.youtube.com/embed/y9nkT8dHB_0?si=6qKSBn41gC8PhL27",
        },
        {
            title: "PyCamp: Python Libraries",
            description: "A series of sessions on Python libraries organised by IEEE-VIT.",
            topics: ["Python", "Data Science", "Web-Scraping", "Flask"],
            youtubeEmbedUrl: null,
            image: "/extra/pycamp.svg",
            link: "https://github.com/IEEE-VIT/PyCamp-Day1",
        },
    ],

    blogs: [
        {
            title: "Decoding VAR: The Polarizing Force Reshaping Football's Destiny",
            description: "The beautiful game — \"Football\". With a ball, a field, and unbridled passion, it's a sport that speaks a universal language, uniting…",
            topics: ["Football", "VAR", "Technology"],
            image: "/extra/var.svg",
            link: "https://medium.com/@dev.keshwani345/decoding-var-the-polarizing-force-reshaping-footballs-destiny-9564021cd368",
        },
    ],

    certifications: [
        { name: "DevOps Fundamentals", issuer: "IBM Career Education Program", description: "CI/CD pipelines, containerization, and monitoring tools." },
        { name: "DevOps, Agile & Design Thinking", issuer: "IBM Career Education Program", description: "Agile frameworks, Scrum practices, and design thinking." },
        { name: "Full-Stack Web Development Bootcamp", issuer: "Udemy", description: "React, Node.js, Express, MongoDB, and deployment strategies." },
        { name: "Flutter & Dart", issuer: "Udemy", description: "Mobile apps with Flutter, Firebase integration, and UI/UX." },
        { name: "Postman API Fundamentals Student Expert", issuer: "Postman", description: "API design, testing, and automation workflows." },
    ],
};