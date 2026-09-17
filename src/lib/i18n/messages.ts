import type { PortfolioProject } from "../data/portfolio";

export type Language = "en" | "ar";

type ProjectCategory = PortfolioProject["category"];

type ProjectTranslationMap = Record<
    string,
    {
        name?: string;
        description?: string;
        codeSummary?: string;
    }
>;

export interface MessageCatalog {
    nav: {
        portfolio: string;
        home: string;
        about: string;
        services: string;
        projects: string;
        tools: string;
        cv: string;
        contact: string;
        menu: string;
        navigate: string;
        openMenu: string;
        closeMenu: string;
        toggleLanguage: string;
        startProject: string;
        downloadCV: string;
        skipToContent: string;
        work: string;
        courses: string;
        openSidebar: string;
        closeSidebar: string;
        resume: string;
    };
    sectionAria: {
        home: string;
        about: string;
        services: string;
        projects: string;
        tools: string;
        cv: string;
        contact: string;
    };
    profile: {
        fullName: string;
        shortName: string;
        title: string;
        location: string;
    };
    hero: {
        badge: string;
        headingLine1: string;
        summary: string;
        seeProjects: string;
        downloadCV: string;
        stack: string;
        imageAlt: string;
    };
    about: {
        eyebrow: string;
        title: string;
        description: string;
        paragraphOne: string;
        paragraphTwo: string;
        paragraphThree: string;
        educationTitle: string;
        principlesTitle: string;
        durationLabel: string;
        statusLabel: string;
        brand: {
            eyebrow: string;
            title: string;
            description: string;
            pillars: Array<{
                title: string;
                description: string;
            }>;
        };
    };
    services: {
        eyebrow: string;
        title: string;
        description: string;
        orderCta: string;
        whatsappTemplate: {
            intro: string;
            serviceLabel: string;
        };
        cards: Array<{
            title: string;
            description: string;
            capabilities: string[];
        }>;
    };
    principles: {
        eyebrow: string;
        title: string;
        description: string;
        items: Array<{
            index: string;
            title: string;
            description: string;
        }>;
    };
    stats: Array<{
        label: string;
        value: string;
        detail: string;
    }>;
    education: {
        degree: string;
        university: string;
        duration: string;
        status: string;
        coursework: string[];
    };
    values: Array<{
        title: string;
        description: string;
    }>;
    projects: {
        eyebrow: string;
        title: string;
        description: string;
        filters: {
            featured: string;
            all: string;
        };
        filtersAria: string;
        categories: Record<ProjectCategory, string>;
        actions: {
            github: string;
            live: string;
            details: string;
        };
        details: {
            back: string;
            aboutTitle: string;
            galleryTitle: string;
            linksTitle: string;
            codeSummaryTitle: string;
            codeGalleryTitle: string;
            openImage: string;
            closePreview: string;
            nextImage: string;
            previousImage: string;
            imageAlt: string;
        };
        projectCopy: ProjectTranslationMap;
    };
    work: {
        eyebrow: string;
        title: string;
        description: string;
        filters: {
            featured: string;
            all: string;
            tools: string;
        };
        filtersAria: string;
        emptyTools: string;
    };
    courses: {
        eyebrow: string;
        title: string;
        description: string;
        durationLabel: string;
        hoursUnit: string;
        sessionUnit: string;
        topicsLabel: string;
        enroll: string;
        bookConsultation: string;
        levels: {
            beginner: string;
            intermediate: string;
            "all-levels": string;
        };
        items: Record<
            string,
            { name: string; tagline: string; description: string }
        >;
        whatsappTemplate: {
            intro: string;
            courseLabel: string;
        };
    };
    tools: {
        eyebrow: string;
        title: string;
        description: string;
        viewOnNpm: string;
        viewRepo: string;
    };
    cv: {
        eyebrow: string;
        title: string;
        description: string;
        openCV: string;
        downloadPDF: string;
        iframeTitle: string;
        mobilePreviewNotice: string;
    };
    contact: {
        eyebrow: string;
        title: string;
        description: string;
        fields: {
            name: string;
            email: string;
            message: string;
        };
        placeholders: {
            name: string;
            email: string;
            message: string;
        };
        submit: string;
        submitting: string;
        ways: {
            whatsappLabel: string;
            whatsappValue: string;
            instagramLabel: string;
            instagramValue: string;
            gitlabLabel: string;
            gitlabValue: string;
            khamsatLabel: string;
            khamsatValue: string;
            mostaqlLabel: string;
            mostaqlValue: string;
            emailLabel: string;
        };
        emailTemplate: {
            subjectPrefix: string;
            greeting: string;
            myName: string;
            myEmail: string;
        };
        validation: {
            nameMin: string;
            nameMax: string;
            emailInvalid: string;
            messageMin: string;
            messageMax: string;
        };
    };
    footer: {
        headline: string;
        description: string;
        contactLabel: string;
        rightsReserved: string;
    };
    seo: {
        title: string;
        description: string;
        keywords: string;
        ogTitle: string;
        ogDescription: string;
        locale: string;
        localeAlternate: string;
    };
    scrollToTopAria: string;
    loader: {
        text: string;
    };
    error: {
        code: string;
        title: string;
        description: string;
        backHome: string;
    };
}

const arabicProjectCopy: ProjectTranslationMap = {
    "Childcare Booking Platform": {
        name: "منصة حجز رعاية الأطفال",
        description:
            "السياق: احتاجت جهة رعاية الأطفال إلى استبدال عمليات التسجيل والجدولة اليدوية بنظام قادر على إدارة السعة والتوفر في الزمن الفعلي.",
        codeSummary:
            "الحل الهندسي: منصة مبنية على Next.js تغطي دورة الحجز كاملة، من التسجيل حتى التأكيد، مدعومة بواجهات إدارية للجداول والحضور والسعة، ضمن بنية مكوّنات خفّضت تكلفة كل ميزة لاحقة أُضيفت للنظام.",
    },
    "Cargo Logistics System": {
        name: "نظام اللوجستيات والشحن",
        description:
            "السياق: احتاجت عملية لوجستية إلى رؤية شاملة وتحكم دقيق في تسجيل الشحنات وتتبعها ومعالجة إجراءاتها الجمركية، بعد أن كانت تُدار دون نظام موحّد.",
        codeSummary:
            "الحل الهندسي: لوحة تحكم تشغيلية قائمة على React، تتضمن تتبعاً للشحنات عبر رموز QR، وإدخال بيانات مُتحقَّق منه وفق قواعد التسعير والشحن، وواجهات جاهزة للتصدير مصمَّمة للاستخدام التشغيلي اليومي.",
    },
    "Dental Clinic Booking System": {
        name: "نظام حجز عيادة الأسنان",
        description:
            "نظام حجز مواعيد للعيادات، بصلاحيات منفصلة تمامًا بين الأطباء وموظفي الاستقبال.",
        codeSummary:
            "النقاط الأبرز: • جدولة مواعيد تمنع التعارض بين الحجوزات. • واجهات مختلفة لكل دور وظيفي حسب الصلاحيات. • ربط الواجهة مباشرة بـExpress.js وMySQL.",
    },
    "Boat Booking Platform": {
        name: "منصة حجز القوارب",
        description:
            "منصة حجز قوارب للسوق السعودي، بصفحة هبوط مصممة للتحويل ولوحة إدارة كاملة.",
        codeSummary:
            "النقاط الأبرز: • صفحة هبوط عالية التحويل لرفع نية الحجز. • لوحة إدارة للرحلات والتسعير والحجوزات. • تجربة موبايل مضبوطة للاستخدام اليومي.",
    },
    "Tatabu Shipment Tracking Platform": {
        name: "منصة تتبع الشحنات Tatabu",
        description:
            "منصة تتبع شحنات تعرض حالة كل شحنة ومسارها بشكل حي، مع مؤشرات متابعة تشغيلية.",
        codeSummary:
            "النقاط الأبرز: • واجهات متابعة لدورة الشحنة كاملة، من الإنشاء حتى التسليم. • مكونات قابلة لإعادة الاستخدام لخطوط الحالة ولوحات العمليات. • تجربة مضبوطة لشاشات المكتب والتابلت في الاستخدام اليومي.",
    },
};

export const messages: Record<Language, MessageCatalog> = {
    en: {
        nav: {
            portfolio: "Portfolio",
            home: "Home",
            about: "About",
            services: "Services",
            projects: "Projects",
            tools: "Tools",
            cv: "Resume",
            contact: "Contact",
            menu: "Menu",
            navigate: "Navigate",
            openMenu: "Open menu",
            closeMenu: "Close menu",
            toggleLanguage: "Switch language",
            startProject: "Start a project",
            downloadCV: "View resume",
            skipToContent: "Skip to content",
            work: "Work",
            courses: "Courses",
            openSidebar: "Open menu",
            closeSidebar: "Close menu",
            resume: "Resume",
        },
        sectionAria: {
            home: "Home",
            about: "About",
            services: "Services",
            projects: "Projects",
            tools: "Tools",
            cv: "Resume",
            contact: "Contact",
        },
        profile: {
            fullName: "Abdalrhman Jaffar",
            shortName: "The Octopus",
            title: "Web Developer",
            location: "Damascus, Syria",
        },
        hero: {
            badge: "Abdalrhman Jaffar — The Octopus",
            headingLine1: "Web systems built to survive production.",
            summary:
                "Platforms for teams that can't afford downtime.",
            seeProjects: "View Case Studies",
            downloadCV: "Request a Consultation",
            stack: "React.js • Next.js • TypeScript • Tailwind CSS",
            imageAlt: "Abdalrhman Jaffar portrait",
        },
        about: {
            eyebrow: "About",
            title: "Professional Philosophy",
            description:
                "Systems built for production, not for demos.",
            paragraphOne:
                "Production is the only real test of engineering quality. Every architecture decision here is made against real conditions — concurrent users, data integrity, long-term maintenance — not against a demo.",
            paragraphTwo:
                "A shipped product must recover from failure, scale without a rewrite, and stay readable for the next engineer. That is the standard.",
            paragraphThree: "",
            educationTitle: "Tech Stack",
            principlesTitle: "Skills",
            durationLabel: "Focus",
            statusLabel: "Specialization",
            brand: {
                eyebrow: "The Octopus",
                title: "Why an Octopus?",
                description:
                    "The Octopus isn't just a logo — it's the seal that goes on my work. A promise that whatever it's attached to was built on solid architecture from the first line of code.",
                pillars: [
                    {
                        title: "Adaptation",
                        description:
                            "An octopus doesn't fight its environment — it adapts to reach its goal. Same approach here: bend the tools to the problem, not the other way around.",
                    },
                    {
                        title: "Precision",
                        description:
                            "Attention to the details a user never sees, but that guarantee a system stays stable under real use.",
                    },
                    {
                        title: "Handling multiple systems at once",
                        description:
                            "An octopus runs eight arms independently and in sync. That's the same skill a real product needs — many moving parts, working as one.",
                    },
                ],
            },
        },
        services: {
            eyebrow: "Value Proposition",
            title: "Engineering Solutions",
            description:
                "Four things I build, measured by what they change operationally.",
            orderCta: "Request this service",
            whatsappTemplate: {
                intro: "Hi, I'd like to request:",
                serviceLabel: "Service",
            },
            cards: [
                {
                    title: "Landing Pages with Next.js",
                    description:
                        "Conversion-focused pages that load fast and rank — server-rendered, responsive, and measured.",
                    capabilities: [
                        "Server-side rendering",
                        "SEO & Core Web Vitals",
                        "Responsive on every device",
                    ],
                },
                {
                    title: "Systems with React.js",
                    description:
                        "Dashboards, booking flows and multi-role platforms built to stay stable as they grow.",
                    capabilities: [
                        "Role-based access control",
                        "REST API integration",
                        "Complex forms & validation",
                    ],
                },
                {
                    title: "Stores with Shopify",
                    description:
                        "Storefronts set up, themed and tuned for real selling — not a default template.",
                    capabilities: [
                        "Custom theme work",
                        "Product & collection setup",
                        "Checkout optimization",
                    ],
                },
                {
                    title: "Bots & Automation",
                    description:
                        "Scripts and bots that take the repetitive work off your team's hands.",
                    capabilities: [
                        "Workflow automation",
                        "Third-party API wiring",
                        "Scheduled jobs",
                    ],
                },
            ],
        },
        principles: {
            eyebrow: "Core Values",
            title: "Three standards every system is held to",
            description:
                "The Octopus is a seal, not a logo — it marks work built this way from the first line.",
            items: [
                {
                    index: "01",
                    title: "Precision",
                    description:
                        "The details a user never sees decide whether a system holds under load.",
                },
                {
                    index: "02",
                    title: "Integration",
                    description:
                        "Every part speaks to every other part. No component is an island.",
                },
                {
                    index: "03",
                    title: "Smart Simplicity",
                    description:
                        "Complex problems, interfaces that feel effortless.",
                },
            ],
        },
        stats: [
            {
                label: "Role",
                value: "Web Developer",
                detail: "Building production web applications, not demos.",
            },
            {
                label: "Core Focus",
                value: "Full Web Delivery",
                detail: "Whatever the product needs — no fixed niche.",
            },
            {
                label: "Main Stack",
                value: "React, Next.js, TypeScript",
                detail: "Typed, componentized, built to stay maintainable.",
            },
            {
                label: "Integration",
                value: "REST APIs, Auth, Express",
                detail: "Wired directly into real backend services.",
            },
        ],
        education: {
            degree: "Web Development",
            university: "React.js, Next.js, TypeScript, Tailwind CSS",
            duration: "Production-ready web applications",
            status: "Web applications",
            coursework: [
                "React.js",
                "Next.js",
                "TypeScript",
                "JavaScript (ES6+)",
                "Tailwind CSS",
                "shadcn/ui",
                "Responsive Design",
                "UI Animations",
                "MUI",
                "Electron Desktop App",
                "Capacitor",
                "Zustand",
                "useMemo",
                "Lazy Loading",
                "Git",
                "GitHub & GitLab",
                "Server Deployment",
                "Websites Deployment",
            ],
        },
        values: [
            {
                title: "Frontend",
                description:
                    "React.js, Next.js, TypeScript, JavaScript (ES6+), Tailwind CSS, shadcn/ui, MUI, Zustand, useMemo, Lazy Loading, Responsive Design, UI Animations, Electron Desktop App, Capacitor, Git, GitHub & GitLab, Server Deployment, Websites Deployment.",
            },
            {
                title: "System Design",
                description:
                    "Admin Dashboards, Booking Systems, E-commerce, Landing Pages, Complex Forms, UX Flow Structuring.",
            },
            {
                title: "Backend Integration",
                description:
                    "REST APIs, Authentication flows, Basic Node.js, Express.js, MySQL.",
            },
        ],
        projects: {
            eyebrow: "Projects",
            title: "Featured Projects",
            description:
                "Booking systems, dashboards, and logistics tools in daily use.",
            filters: {
                featured: "Featured",
                all: "All Projects",
            },
            filtersAria: "Project filter tabs",
            categories: {
                "next.js": "next.js",
                javascript: "JavaScript",
                react: "React",
                fullstack: "Fullstack",
            },
            actions: {
                github: "GitHub",
                live: "Live",
                details: "More details",
            },
            details: {
                back: "Back",
                aboutTitle: "About This Project",
                galleryTitle: "Project Gallery",
                linksTitle: "Project Links",
                codeSummaryTitle: "Code Overview",
                codeGalleryTitle: "Code Gallery",
                openImage: "Open image preview",
                closePreview: "Close gallery preview",
                nextImage: "Next image",
                previousImage: "Previous image",
                imageAlt: "Project gallery image",
            },
            projectCopy: {},
        },
        work: {
            eyebrow: "Work",
            title: "Projects & Tools",
            description:
                "Production platforms and the utilities built alongside them.",
            filters: {
                featured: "Featured",
                all: "All Projects",
                tools: "Tools",
            },
            filtersAria: "Work filter tabs",
            emptyTools: "No tools published yet.",
        },
        courses: {
            eyebrow: "Learn",
            title: "Courses & Mentoring",
            description:
                "Practical training built on the same stack I ship production work with.",
            durationLabel: "Duration",
            hoursUnit: "hours",
            sessionUnit: "One session",
            topicsLabel: "Covers",
            enroll: "Ask about this course",
            bookConsultation: "Book a session",
            levels: {
                beginner: "Beginner",
                intermediate: "Intermediate",
                "all-levels": "All levels",
            },
            items: {
                frontend: {
                    name: "Frontend Development",
                    tagline: "From zero to production React",
                    description:
                        "Build and deploy real interfaces with React, Next.js and TypeScript — components, state, routing, and the deployment step most courses skip.",
                },
                backend: {
                    name: "Backend Development",
                    tagline: "APIs, data, and auth",
                    description:
                        "Design REST APIs with Node.js and Express, model data in MySQL, and implement authentication that holds up outside a tutorial.",
                },
                "programming-foundations": {
                    name: "Programming Foundations",
                    tagline: "The part that transfers between languages",
                    description:
                        "How programs actually work: logic, data structures, problem decomposition and Git — the base that makes every framework easier.",
                },
                consultation: {
                    name: "Personal Consultation",
                    tagline: "One-to-one, your code",
                    description:
                        "A focused session on whatever is blocking you — a code review, an architecture decision, or a career question. Bring the problem.",
                },
            },
            whatsappTemplate: {
                intro: "Hi, I'd like to ask about:",
                courseLabel: "Course",
            },
        },
        tools: {
            eyebrow: "Tools",
            title: "Tools I've Built",
            description:
                "Small utilities I built and published.",
            viewOnNpm: "View on npm",
            viewRepo: "View repository",
        },
        cv: {
            eyebrow: "Resume",
            title: "Professional Resume & Technical Profile",
            description:
                "3+ years of products that stay in daily use.",
            openCV: "Open resume",
            downloadPDF: "Download PDF",
            iframeTitle: "Abdalrhman resume",
            mobilePreviewNotice:
                "Resume preview is disabled on small screens for better performance. Use the buttons above to open or download the PDF.",
        },
        contact: {
            eyebrow: "Contact",
            title: "Let's Talk",
            description:
                "A project, a role, or a technical question — reach out.",
            fields: {
                name: "Name",
                email: "Email",
                message: "Message",
            },
            placeholders: {
                name: "Your name",
                email: "you@example.com",
                message:
                    "Share project scope, timeline, and expected outcomes.",
            },
            submit: "Prepare message",
            submitting: "Preparing email...",
            ways: {
                whatsappLabel: "WhatsApp",
                whatsappValue: "Direct message",
                instagramLabel: "Instagram",
                instagramValue: "@abdalrhman_jaffar",
                gitlabLabel: "GitLab",
                gitlabValue: "gitlab.com/dev.elliot.j",
                khamsatLabel: "Khamsat",
                khamsatValue: "Freelance profile",
                mostaqlLabel: "Mostaql",
                mostaqlValue: "Freelance profile",
                emailLabel: "Email",
            },
            emailTemplate: {
                subjectPrefix: "Message from",
                greeting: "Hi",
                myName: "My name",
                myEmail: "My email",
            },
            validation: {
                nameMin: "Name must be at least 2 characters.",
                nameMax: "Name must be under 40 characters.",
                emailInvalid: "Please enter a valid email address.",
                messageMin: "Message must contain at least 10 characters.",
                messageMax: "Message is too long.",
            },
        },
        footer: {
            headline: "Building something that has to work? Let's talk.",
            description: "React, Next.js, and TypeScript, built to last.",
            contactLabel: "Contact",
            rightsReserved: "All rights reserved.",
        },
        seo: {
            title: "Abdalrhman Jaffar | Portfolio",
            description:
                "Abdalrhman Jaffar builds booking systems, dashboards, e-commerce, and more with React and Next.js — shipped to production.",
            keywords:
                "Abdalrhman Jaffar, Web Developer, React.js, Next.js, TypeScript, Dashboards, Booking Platforms, Web Applications, Portfolio",
            ogTitle: "Abdalrhman Jaffar - Web Developer Portfolio",
            ogDescription:
                "Booking systems, dashboards, e-commerce, and more — real products, built for production.",
            locale: "en_US",
            localeAlternate: "ar_SY",
        },
        scrollToTopAria: "Scroll to top",
        loader: {
            text: "Loading portfolio...",
        },
        error: {
            code: "Error 404",
            title: "Page not found",
            description:
                "The page you are looking for does not exist or may have been moved.",
            backHome: "Back to homepage",
        },
    },
    ar: {
        nav: {
            portfolio: "معرض الأعمال",
            home: "الرئيسية",
            about: "نبذة",
            services: "خدماتي",
            projects: "المشاريع",
            tools: "الأدوات",
            cv: "السيرة",
            contact: "تواصل",
            menu: "القائمة",
            navigate: "التنقل",
            openMenu: "فتح القائمة",
            closeMenu: "إغلاق القائمة",
            toggleLanguage: "تبديل اللغة",
            startProject: "ابدأ مشروعك",
            downloadCV: "عرض السيرة",
            skipToContent: "تخطَّ إلى المحتوى",
            work: "الأعمال",
            courses: "الكورسات",
            openSidebar: "فتح القائمة",
            closeSidebar: "إغلاق القائمة",
            resume: "السيرة",
        },
        sectionAria: {
            home: "الرئيسية",
            about: "نبذة",
            services: "خدماتي",
            projects: "المشاريع",
            tools: "الأدوات",
            cv: "السيرة الذاتية",
            contact: "التواصل",
        },
        profile: {
            fullName: "عبد الرحمن جعفر",
            shortName: "The Octopus",
            title: "مطور ويب",
            location: "دمشق، سوريا",
        },
        hero: {
            badge: "عبد الرحمن جعفر — The Octopus",
            headingLine1: "أنظمة ويب مصمَّمة لتصمد في الإنتاج.",
            summary:
                "منصات لفرق لا تحتمل التعطّل.",
            seeProjects: "عرض دراسات الحالة",
            downloadCV: "طلب استشارة",
            stack: "React.js • Next.js • TypeScript • Tailwind CSS",
            imageAlt: "صورة عبد الرحمن جعفر",
        },
        about: {
            eyebrow: "نبذة",
            title: "الفلسفة المهنية",
            description:
                "أنظمة تُبنى للإنتاج، لا للعرض.",
            paragraphOne:
                "بيئة الإنتاج هي المحك الحقيقي الوحيد لجودة الهندسة. كل قرار معماري هنا يُتخذ وفق ظروف فعلية — تزامن المستخدمين، وسلامة البيانات، والصيانة طويلة الأمد — لا وفق عرض تجريبي.",
            paragraphTwo:
                "المنتج المنشور يجب أن يتعافى من الأعطال، وأن يتّسع دون إعادة بناء، وأن يبقى واضحاً للمهندس التالي. هذا هو المعيار.",
            paragraphThree: "",
            educationTitle: "التقنيات",
            principlesTitle: "المهارات",
            durationLabel: "التركيز",
            statusLabel: "التخصص",
            brand: {
                eyebrow: "The Octopus",
                title: "ليش الأخطبوط؟",
                description:
                    "الأخطبوط مش مجرد شعار — هو الختم اللي بحطه على شغلي. وعد إنه أي شي حامل هالاسم مبني على بنية متينة من أول سطر كود.",
                pillars: [
                    {
                        title: "التكيّف",
                        description:
                            "الأخطبوط ما بيقاوم بيئته، بيتكيّف معها لحد ما يوصل لهدفه. نفس المنطق هون: أطوّع الأدوات لخدمة المشروع، مو العكس.",
                    },
                    {
                        title: "الدقة",
                        description:
                            "انتباه للتفاصيل اللي المستخدم ما بيشوفها أبدًا، بس هي اللي بتضمن ثبات النظام تحت الاستخدام الفعلي.",
                    },
                    {
                        title: "إدارة أنظمة متعددة بمرونة",
                        description:
                            "الأخطبوط بيحرّك ثمن أذرع بشكل مستقل ومتزامن بنفس الوقت. هاي بالضبط المهارة اللي بيحتاجها أي منتج حقيقي — أجزاء كتير، شغالة كوحدة واحدة.",
                    },
                ],
            },
        },
        services: {
            eyebrow: "القيمة المقدَّمة",
            title: "حلول هندسية",
            description:
                "أربعة أنواع من العمل، يقيسها أثرها التشغيلي.",
            orderCta: "اطلب الخدمة",
            whatsappTemplate: {
                intro: "مرحباً، أريد طلب:",
                serviceLabel: "الخدمة",
            },
            cards: [
                {
                    title: "صفحات هبوط بـ Next.js",
                    description:
                        "صفحات مصمَّمة للتحويل، سريعة التحميل ومهيّأة لمحركات البحث.",
                    capabilities: [
                        "عرض من جهة الخادم",
                        "تحسين SEO ومؤشرات الأداء",
                        "تجاوب على كل الأجهزة",
                    ],
                },
                {
                    title: "أنظمة بـ React.js",
                    description:
                        "لوحات تحكم وأنظمة حجز ومنصات متعددة الأدوار، تبقى مستقرة مع النمو.",
                    capabilities: [
                        "صلاحيات قائمة على الأدوار",
                        "ربط مع REST APIs",
                        "نماذج معقّدة مع تحقّق",
                    ],
                },
                {
                    title: "متاجر بـ Shopify",
                    description:
                        "متاجر تُبنى وتُنسَّق وتُضبط للبيع الفعلي، لا قالب جاهز كما هو.",
                    capabilities: [
                        "تخصيص القالب",
                        "إعداد المنتجات والأقسام",
                        "تحسين مسار الشراء",
                    ],
                },
                {
                    title: "بوتات وأتمتة",
                    description:
                        "بوتات وسكربتات تتكفّل بالمهام المتكررة بدل فريقك.",
                    capabilities: [
                        "أتمتة سير العمل",
                        "ربط واجهات خارجية",
                        "مهام مجدولة",
                    ],
                },
            ],
        },
        principles: {
            eyebrow: "القيم الجوهرية",
            title: "ثلاثة معايير يُحتكم إليها في كل نظام",
            description:
                "The Octopus ختم لا شعار — يوضع على عمل بُني هكذا من أول سطر.",
            items: [
                {
                    index: "01",
                    title: "الدقة",
                    description:
                        "التفاصيل التي لا يراها المستخدم هي التي تحسم ثبات النظام.",
                },
                {
                    index: "02",
                    title: "التكامل",
                    description:
                        "كل جزء يخاطب بقية الأجزاء. لا مكوّن يعمل بمعزل.",
                },
                {
                    index: "03",
                    title: "البساطة الذكية",
                    description:
                        "مسائل معقّدة، وواجهات تبدو بديهية.",
                },
            ],
        },
        stats: [
            {
                label: "الدور",
                value: "مطور ويب",
                detail: "بناء تطبيقات إنتاجية، لا نماذج تجريبية.",
            },
            {
                label: "التركيز الأساسي",
                value: "أي نوع مشروع",
                detail: "بدون تخصص ثابت — الحل يحدده احتياج المشروع.",
            },
            {
                label: "التقنيات الأساسية",
                value: "React وNext.js وTypeScript",
                detail: "كود مُصنّف بأنواع، مقسّم لمكوّنات، قابل للصيانة.",
            },
            {
                label: "التكامل",
                value: "REST APIs وAuth وExpress",
                detail: "مربوط مباشرة بخدمات Backend فعلية.",
            },
        ],
        education: {
            degree: "تطوير ويب",
            university: "React.js وNext.js وTypeScript وTailwind CSS",
            duration: "تطبيقات ويب جاهزة للإنتاج",
            status: "تطبيقات ويب",
            coursework: [
                "React.js",
                "Next.js",
                "TypeScript",
                "JavaScript (ES6+)",
                "Tailwind CSS",
                "shadcn/ui",
                "Responsive Design",
                "UI Animations",
                "MUI",
                "Electron Desktop App",
                "Capacitor",
                "Zustand",
                "useMemo",
                "Lazy Loading",
                "Git",
                "GitHub & GitLab",
                "Server Deployment",
                "Websites Deployment",
            ],
        },
        values: [
            {
                title: "Frontend",
                description:
                    "React.js وNext.js وTypeScript وJavaScript (ES6+) وTailwind CSS وshadcn/ui وMUI وZustand، بالإضافة إلى useMemo وLazy Loading والتصميم المتجاوب وحركات الواجهة، وتطبيقات Electron وCapacitor، وGit وGitHub وGitLab، ونشر الخوادم والمواقع.",
            },
            {
                title: "تصميم الأنظمة",
                description:
                    "لوحات تحكم إدارية، أنظمة حجز، متاجر إلكترونية، صفحات هبوط، نماذج معقدة، وبناء تدفقات تجربة المستخدم.",
            },
            {
                title: "التكامل مع الخلفية",
                description:
                    "REST APIs، تدفقات المصادقة (Authentication)، أساسيات Node.js وExpress.js وMySQL.",
            },
        ],
        projects: {
            eyebrow: "المشاريع",
            title: "أبرز المشاريع",
            description:
                "أنظمة حجز ولوحات تحكم وأدوات لوجستية قيد الاستخدام اليومي.",
            filters: {
                featured: "مميزة",
                all: "كل المشاريع",
            },
            filtersAria: "تبويبات تصفية المشاريع",
            categories: {
                "next.js": "نيكست",
                javascript: "جافاسكريبت",
                react: "ريأكت",
                fullstack: "متكامل",
            },
            actions: {
                github: "جيت هب",
                live: "معاينة",
                details: "مزيد من التفاصيل",
            },
            details: {
                back: "عودة",
                aboutTitle: "شرح المشروع",
                galleryTitle: "معرض المشروع",
                linksTitle: "روابط المشروع",
                codeSummaryTitle: "نبذة عن الكود",
                codeGalleryTitle: "معرض الكود",
                openImage: "فتح معاينة الصورة",
                closePreview: "إغلاق معاينة المعرض",
                nextImage: "الصورة التالية",
                previousImage: "الصورة السابقة",
                imageAlt: "صورة من معرض المشروع",
            },
            projectCopy: arabicProjectCopy,
        },
        work: {
            eyebrow: "الأعمال",
            title: "المشاريع والأدوات",
            description:
                "منصات تعمل في بيئة الإنتاج، والأدوات التي بُنيت إلى جانبها.",
            filters: {
                featured: "مميزة",
                all: "كل المشاريع",
                tools: "الأدوات",
            },
            filtersAria: "تبويبات تصفية الأعمال",
            emptyTools: "لا توجد أدوات منشورة بعد.",
        },
        courses: {
            eyebrow: "تعلَّم",
            title: "الكورسات والإرشاد",
            description:
                "تدريب عملي على نفس التقنيات التي أبني فيها مشاريع حقيقية.",
            durationLabel: "المدة",
            hoursUnit: "ساعة",
            sessionUnit: "جلسة واحدة",
            topicsLabel: "يغطي",
            enroll: "استفسر عن الكورس",
            bookConsultation: "احجز جلسة",
            levels: {
                beginner: "مبتدئ",
                intermediate: "متوسط",
                "all-levels": "كل المستويات",
            },
            items: {
                frontend: {
                    name: "تطوير الواجهات",
                    tagline: "من الصفر إلى React جاهز للإنتاج",
                    description:
                        "بناء ونشر واجهات حقيقية بـ React وNext.js وTypeScript — المكوّنات والحالة والتوجيه، وخطوة النشر التي تتجاهلها معظم الكورسات.",
                },
                backend: {
                    name: "تطوير الخلفية",
                    tagline: "واجهات برمجية وبيانات ومصادقة",
                    description:
                        "تصميم REST APIs بـ Node.js وExpress، ونمذجة البيانات في MySQL، وبناء مصادقة تصمد خارج بيئة الدروس.",
                },
                "programming-foundations": {
                    name: "أساسيات البرمجة",
                    tagline: "الجزء الذي ينتقل بين اللغات",
                    description:
                        "كيف تعمل البرامج فعلياً: المنطق وبنى المعطيات وتفكيك المسائل وGit — الأساس الذي يجعل كل إطار عمل أسهل.",
                },
                consultation: {
                    name: "استشارة شخصية",
                    tagline: "جلسة فردية على كودك أنت",
                    description:
                        "جلسة مركّزة على ما يعطّلك: مراجعة كود، أو قرار معماري، أو سؤال مهني. أحضر المشكلة معك.",
                },
            },
            whatsappTemplate: {
                intro: "مرحباً، أريد الاستفسار عن:",
                courseLabel: "الكورس",
            },
        },
        tools: {
            eyebrow: "الأدوات",
            title: "أدوات بنيتها",
            description:
                "أدوات صغيرة بنيتها ونشرتها.",
            viewOnNpm: "عرض على npm",
            viewRepo: "عرض المستودع",
        },
        cv: {
            eyebrow: "السيرة",
            title: "السيرة الذاتية والملف المهني التقني",
            description:
                "أكثر من 3 سنوات من منتجات تبقى قيد الاستخدام اليومي.",
            openCV: "فتح السيرة",
            downloadPDF: "تحميل PDF",
            iframeTitle: "سيرة عبد الرحمن",
            mobilePreviewNotice:
                "تم تعطيل معاينة السيرة على الشاشات الصغيرة لتحسين الأداء. استخدم الأزرار بالأعلى للفتح أو التحميل.",
        },
        contact: {
            eyebrow: "تواصل",
            title: "دعنا نتحدث",
            description:
                "مشروع، أو فرصة عمل، أو سؤال تقني — تواصل معي.",
            fields: {
                name: "الاسم",
                email: "البريد الإلكتروني",
                message: "الرسالة",
            },
            placeholders: {
                name: "اسمك",
                email: "you@example.com",
                message:
                    "شارك تفاصيل المشروع، النطاق، الجدول الزمني، والنتائج المتوقعة.",
            },
            submit: "تجهيز الرسالة",
            submitting: "جارٍ تجهيز الرسالة...",
            ways: {
                whatsappLabel: "واتساب",
                whatsappValue: "تواصل مباشر",
                instagramLabel: "إنستغرام",
                instagramValue: "@abdalrhman_jaffar",
                gitlabLabel: "GitLab",
                gitlabValue: "gitlab.com/dev.elliot.j",
                khamsatLabel: "خمسات",
                khamsatValue: "ملف العمل الحر",
                mostaqlLabel: "مستقل",
                mostaqlValue: "ملف العمل الحر",
                emailLabel: "البريد",
            },
            emailTemplate: {
                subjectPrefix: "رسالة من",
                greeting: "مرحبًا",
                myName: "اسمي",
                myEmail: "بريدي",
            },
            validation: {
                nameMin: "الاسم يجب أن يحتوي على حرفين على الأقل.",
                nameMax: "الاسم يجب أن يكون أقل من 40 حرفًا.",
                emailInvalid: "يرجى إدخال بريد إلكتروني صحيح.",
                messageMin: "الرسالة يجب أن تحتوي على 10 أحرف على الأقل.",
                messageMax: "الرسالة طويلة جدًا.",
            },
        },
        footer: {
            headline: "عندك شي لازم يشتغل صح؟ خلينا نحكي.",
            description: "React وNext.js وTypeScript، مبنية لتدوم.",
            contactLabel: "تواصل",
            rightsReserved: "جميع الحقوق محفوظة.",
        },
        seo: {
            title: "عبد الرحمن جعفر | معرض أعمال",
            description:
                "عبد الرحمن جعفر يبني أنظمة حجز، لوحات تحكم، متاجر إلكترونية، وغيرها باستخدام React وNext.js — منشورة على الإنتاج فعليًا.",
            keywords:
                "عبد الرحمن جعفر, مطور ويب, React.js, Next.js, TypeScript, لوحات تحكم, منصات حجز, تطبيقات ويب, بورتفوليو",
            ogTitle: "عبد الرحمن جعفر - معرض أعمال مطور ويب",
            ogDescription:
                "أنظمة حجز، لوحات تحكم، متاجر إلكترونية، وغيرها — منتجات حقيقية مبنية للإنتاج.",
            locale: "ar_SY",
            localeAlternate: "en_US",
        },
        scrollToTopAria: "العودة للأعلى",
        loader: {
            text: "جاري تحميل المعرض...",
        },
        error: {
            code: "خطأ 404",
            title: "الصفحة غير موجودة",
            description: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
            backHome: "العودة للرئيسية",
        },
    },
};
