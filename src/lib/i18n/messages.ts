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
        toggleTheme: string;
        toggleLanguage: string;
        startProject: string;
        downloadCV: string;
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
        openImage: string;
        closePreview: string;
        whatsappTemplate: {
            requestedServiceLabel: string;
            serviceDetailsLabel: string;
            customerRequestLabel: string;
            customerRequestPlaceholder: string;
        };
        cards: Array<{
            title: string;
            description: string;
            deliverable: string;
            image: string;
            imageAlt: string;
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
    "UPAFA University Platform": {
        name: "منصة UPAFA الجامعية",
        description:
            "منصة جامعية رسمية، تحتوي صفحات القبول والبرامج والمحتوى الأكاديمي في بنية موحدة ومنظمة.",
        codeSummary:
            "النقاط الأبرز: • وحدات قابلة لإعادة الاستخدام لصفحات القبول والبرامج. • تحسين الأداء عبر ضبط التحميل وسلوك العرض. • بنية محتوى موحّدة عبر كل الصفحات الأساسية.",
    },
    "Childcare Booking Platform": {
        name: "منصة حجز رعاية الأطفال",
        description:
            "منصة حجز يستخدمها الأهل لتسجيل الأطفال، وتدير من خلالها الإدارة الجداول وتوفر الصفوف.",
        codeSummary:
            "النقاط الأبرز: • رحلة حجز واضحة من التسجيل حتى التأكيد. • لوحات إدارة للحضور والجداول والسعات. • مكونات قابلة لإعادة الاستخدام سرّعت إضافة الميزات الجديدة.",
    },
    "Cargo Logistics System": {
        name: "نظام اللوجستيات والشحن",
        description:
            "لوحة عمليات لتسجيل الشحنات وتتبعها، ومعالجة تدفقات العمل الجمركية المرتبطة بها.",
        codeSummary:
            "النقاط الأبرز: • تتبع شحنات عبر QR داخل لوحة التحكم. • نماذج إدخال مع تحقق كامل من قواعد التسعير والشحن. • واجهات تصدير جاهزة للاستخدام اليومي في العمليات.",
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
            toggleTheme: "Toggle color theme",
            toggleLanguage: "Switch language",
            startProject: "Start a project",
            downloadCV: "View resume",
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
            badge: "Web Developer",
            headingLine1: "Abdalrhman Jaffar",
            summary:
                "I build web products across all kinds of use cases — booking systems, dashboards, e-commerce, landing pages, and more — using React, Next.js, and modern web technologies.\n\nShipped to production, not left as demos.",
            seeProjects: "View Projects",
            downloadCV: "Download Resume",
            stack: "React.js • Next.js • TypeScript • Tailwind CSS",
            imageAlt: "Abdalrhman Jaffar portrait",
        },
        about: {
            eyebrow: "About",
            title: "Professional Summary",
            description:
                "Web Developer building production-ready products across a wide range of use cases.",
            paragraphOne:
                "I build systems that ship to production and stay in daily use — not prototypes that stop at the demo.",
            paragraphTwo:
                "I don't stick to one kind of project. Booking flows, admin dashboards, e-commerce stores, landing pages, logistics tools — whatever the product needs, I take on. React, Next.js, and TypeScript are the tools; understanding what each project actually needs is the job.",
            paragraphThree:
                "I'd rather spend an extra hour on the data flow and component structure now than debug it in production later. Clean architecture isn't a nice-to-have — it's what keeps a real product from breaking when it matters.",
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
            eyebrow: "Services",
            title: "My Services",
            description:
                "Web development for teams and founders who need production-ready work, not a prototype.",
            orderCta: "Order service",
            openImage: "Open service image preview",
            closePreview: "Close service image preview",
            whatsappTemplate: {
                requestedServiceLabel: "Service to request",
                serviceDetailsLabel: "Service details",
                customerRequestLabel: "Your request details",
                customerRequestPlaceholder:
                    "Write your request details down here",
            },
            cards: [
                {
                    title: "Website Development",
                    description:
                        "Full websites built with React.js on the frontend and Node.js on the backend.",
                    deliverable:
                        "Deliverable: complete web app, clean UI, API wired up, ready to deploy.",
                    image: "/images/services/Website%20Development.webp",
                    imageAlt: "Website development service preview",
                },
                {
                    title: "Landing Page Development",
                    description:
                        "Landing pages built in Next.js and designed to convert, not just look good.",
                    deliverable:
                        "Deliverable: fast, SEO-ready, responsive landing page tuned for conversions.",
                    image: "/images/services/Landing%20Page%20Development.webp",
                    imageAlt: "Next.js landing page service preview",
                },
                {
                    title: "E-commerce Store Development",
                    description:
                        "Online stores built in Next.js, from product listing to checkout.",
                    deliverable:
                        "Deliverable: full store — product flow, cart, and checkout wired end to end.",
                    image: "/images/services/E-commerce%20Store%20Development.webp",
                    imageAlt: "Next.js e-commerce service preview",
                },
                {
                    title: "Bot Development",
                    description:
                        "Node.js bots — automation bots and Telegram bots built to run unattended.",
                    deliverable:
                        "Deliverable: production-ready bot with clear commands and deployment handled.",
                    image: "/images/services/Bots%20Development.webp",
                    imageAlt: "Bot development service preview",
                },
                {
                    title: "WordPress & Shopify Development",
                    description:
                        "Sites and stores on WordPress and Shopify, set up and customized properly.",
                    deliverable:
                        "Deliverable: fully configured store or site, ready to launch.",
                    image: "/images/services/wordpress-shopify-development.webp",
                    imageAlt: "WordPress and Shopify service preview",
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
                "A range of production platforms — booking systems, dashboards, and logistics tools among them.",
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
        tools: {
            eyebrow: "Tools",
            title: "Tools I've Built",
            description:
                "Small utilities I've built and published for myself and other developers to use.",
            viewOnNpm: "View on npm",
            viewRepo: "View repository",
        },
        cv: {
            eyebrow: "Resume",
            title: "Professional Resume & Technical Profile",
            description:
                "3+ years building web products that stay in daily use, not just demos.",
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
                "Have a project, a role, or just a technical question? Reach out through any of the channels below.",
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
            headline: "Products that work in the real world, not just in a demo.",
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
            toggleTheme: "تبديل المظهر",
            toggleLanguage: "تبديل اللغة",
            startProject: "ابدأ مشروعك",
            downloadCV: "عرض السيرة",
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
            badge: "مطور ويب",
            headingLine1: "عبد الرحمن جعفر",
            summary:
                "أنظمة حجز، لوحات تحكم، متاجر إلكترونية، صفحات هبوط — منتجات ويب حقيقية تصل لمستخدميها، لا نماذج تبقى على الورق.",
            seeProjects: "عرض المشاريع",
            downloadCV: "تحميل السيرة الذاتية",
            stack: "React.js • Next.js • TypeScript • Tailwind CSS",
            imageAlt: "صورة عبد الرحمن جعفر",
        },
        about: {
            eyebrow: "نبذة",
            title: "نبذة مهنية",
            description: "أبني منتجات ويب تشتغل فعليًا، لا مجرد واجهات جميلة.",
            paragraphOne:
                "ما بلتزم بنوع واحد من المشاريع. حجز، لوحة تحكم، متجر، صفحة هبوط — أي شي يحتاجه المشروع، بشتغل عليه لحد ما يوصل لمرحلة الاستخدام الفعلي.",
            paragraphTwo:
                "React وNext.js وTypeScript هي الأدوات. الشغلة الحقيقية هي فهم احتياج كل مشروع بالضبط، وبناء الحل المناسب له بدون حشو أو تعقيد زايد.",
            paragraphThree:
                "بنية نظيفة من أول يوم توفر وقت ومشاكل لاحقًا. هاد مو رفاهية — هاد اللي بخلي المنتج يصمد لما يشتد الاستخدام عليه.",
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
            eyebrow: "خدماتي",
            title: "الخدمات التي أقدّمها",
            description:
                "تنفيذ جاهز للإنتاج — للشركات وأصحاب المشاريع اللي بدهم شغل حقيقي، مو تجربة.",
            orderCta: "اطلب الخدمة",
            openImage: "فتح معاينة صورة الخدمة",
            closePreview: "إغلاق معاينة صورة الخدمة",
            whatsappTemplate: {
                requestedServiceLabel: "الخدمة المراد طلبها",
                serviceDetailsLabel: "تفاصيل الخدمة",
                customerRequestLabel: "تفاصيل طلبك",
                customerRequestPlaceholder: "اكتب تفاصيل طلبك أدناه",
            },
            cards: [
                {
                    title: "إنشاء مواقع إلكترونية",
                    description:
                        "مواقع متكاملة: React.js للواجهة، Node.js للخلفية.",
                    deliverable:
                        "المخرج: موقع كامل، واجهة نظيفة، API مربوط، جاهز للنشر.",
                    image: "/images/services/Website%20Development.webp",
                    imageAlt: "معاينة خدمة إنشاء المواقع",
                },
                {
                    title: "إنشاء صفحات هبوط",
                    description:
                        "صفحات هبوط بـNext.js مصممة للتحويل، لا فقط للمظهر.",
                    deliverable:
                        "المخرج: صفحة سريعة، مهيأة لمحركات البحث، ومضبوطة لرفع التحويل.",
                    image: "/images/services/Landing%20Page%20Development.webp",
                    imageAlt: "معاينة خدمة صفحات الهبوط",
                },
                {
                    title: "إنشاء متجر إلكتروني",
                    description:
                        "متاجر إلكترونية بـNext.js، من صفحة المنتج حتى الدفع.",
                    deliverable:
                        "المخرج: متجر كامل — منتجات، سلة، وخطوات دفع مربوطة من طرف لطرف.",
                    image: "/images/services/E-commerce%20Store%20Development.webp",
                    imageAlt: "معاينة خدمة المتجر الإلكتروني",
                },
                {
                    title: "إنشاء بوتات",
                    description:
                        "بوتات Node.js — أتمتة عامة أو بوتات تلغرام، مصممة للعمل دون تدخل.",
                    deliverable:
                        "المخرج: بوت جاهز للإنتاج، أوامر واضحة، ونشر مُنجز بالكامل.",
                    image: "/images/services/Bots%20Development.webp",
                    imageAlt: "معاينة خدمة إنشاء البوتات",
                },
                {
                    title: "إنشاء مواقع ومتاجر عبر WordPress وShopify",
                    description:
                        "مواقع ومتاجر عبر WordPress وShopify، مُعدّة ومخصصة بشكل صحيح.",
                    deliverable:
                        "المخرج: متجر أو موقع مُهيأ بالكامل وجاهز للإطلاق.",
                    image: "/images/services/wordpress-shopify-development.webp",
                    imageAlt: "معاينة خدمة WordPress وShopify",
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
                "مجموعة متنوعة من المنصات الإنتاجية — من ضمنها أنظمة حجز، لوحات تحكم، وأدوات لوجستية.",
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
        tools: {
            eyebrow: "الأدوات",
            title: "أدوات بنيتها",
            description:
                "أدوات صغيرة بنيتها ونشرتها لاستخدامي الشخصي وليستخدمها مطورون آخرون.",
            viewOnNpm: "عرض على npm",
            viewRepo: "عرض المستودع",
        },
        cv: {
            eyebrow: "السيرة",
            title: "السيرة الذاتية والملف المهني التقني",
            description:
                "خبرة تزيد عن 3 سنوات في بناء منتجات ويب تبقى قيد الاستخدام اليومي، لا مجرد عروض تجريبية.",
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
                "لديك مشروع، فرصة عمل، أو سؤال تقني؟ تواصل معي عبر أي من القنوات أدناه.",
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
            headline: "منتجات تشتغل بالعالم الحقيقي، مو بس بعرض تجريبي.",
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
