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
        headingLine2: string;
        headingLine3: string;
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
    };
    services: {
        eyebrow: string;
        title: string;
        description: string;
        orderCta: string;
        openImage: string;
        closePreview: string;
        whatsappTemplate: {
            intro: string;
            serviceLabel: string;
            descriptionLabel: string;
            deliverableLabel: string;
            closing: string;
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
            "منصة جامعية رسمية بواجهة منظمة لصفحات القبول والبرامج والمحتوى الأكاديمي.",
        codeSummary:
            "النقاط الأبرز: • بناء وحدات قابلة لإعادة الاستخدام لصفحات القبول والبرامج. • تحسين الأداء عبر ضبط التحميل وسلوك العرض. • توحيد بنية المحتوى في الصفحات الأساسية.",
    },
    "Childcare Booking Platform": {
        name: "منصة حجز رعاية الأطفال",
        description:
            "منصة حجز للأهل لتسجيل الأطفال وإدارة الجداول ومتابعة توفر الصفوف.",
        codeSummary:
            "النقاط الأبرز: • تصميم رحلة حجز واضحة من التسجيل حتى التأكيد. • بناء لوحات إدارة للحضور والجداول والسعات. • تنظيم مكونات قابلة لإعادة الاستخدام لتسريع التطوير.",
    },
    "Cargo Logistics System": {
        name: "نظام اللوجستيات والشحن",
        description:
            "لوحة عمليات لإدارة تسجيل الشحنات وتتبعها ومعالجة تدفقات العمل الجمركية.",
        codeSummary:
            "النقاط الأبرز: • تنفيذ تتبع الشحنات عبر QR داخل لوحة التحكم. • بناء نماذج إدخال مع تحقق لقواعد التسعير والشحن. • إضافة واجهات تصدير جاهزة لعمليات التشغيل اليومية.",
    },
    "Dental Clinic Booking System": {
        name: "نظام حجز عيادة الأسنان",
        description:
            "نظام حجز مواعيد للعيادات مع صلاحيات منفصلة للأطباء وموظفي الاستقبال.",
        codeSummary:
            "النقاط الأبرز: • بناء جدولة مواعيد مع منع التعارضات. • تنفيذ واجهات منفصلة حسب الدور الوظيفي. • ربط تدفقات الواجهة مع Express.js وMySQL.",
    },
    "Boat Booking Platform": {
        name: "منصة حجز القوارب",
        description:
            "منصة حجز قوارب للسوق السعودي مع صفحات هبوط موجّهة للتحويل ولوحة إدارة.",
        codeSummary:
            "النقاط الأبرز: • تطوير صفحة هبوط عالية التحويل لرفع نية الحجز. • بناء لوحة إدارة للرحلات والتسعير والحجوزات. • تحسين تجربة الموبايل للاستخدام اليومي.",
    },
    "Tatabu Shipment Tracking Platform": {
        name: "منصة تتبع الشحنات Tatabu",
        description:
            "منصة لتتبع الشحنات مع عرض حي لحالة الشحنة ومسارها ومؤشرات المتابعة التشغيلية.",
        codeSummary:
            "النقاط الأبرز: • بناء واجهات متابعة دورة الشحنة من الإنشاء حتى التسليم. • تنظيم مكونات قابلة لإعادة الاستخدام لخطوط الحالة ولوحات العمليات. • تحسين التجربة للاستعمال اليومي على شاشات المكتب والتابلت.",
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
            cv: "Resume",
            contact: "Contact",
        },
        profile: {
            fullName: "Abdalrhman Jaffar",
            shortName: "Abdalrhman",
            title: "Frontend Developer",
            location: "Damascus, Syria",
        },
        hero: {
            badge: "Frontend Developer",
            headingLine1: "Abdalrhman Jaffar",
            headingLine2: "Frontend Developer",
            headingLine3: "",
            summary:
                "I build modern web applications, scalable dashboards, and high-conversion landing pages using React and modern frontend technologies.\n\nFocused on performance, clean architecture, and real production systems.",
            seeProjects: "View Projects",
            downloadCV: "Download Resume",
            stack: "React.js • Next.js • TypeScript • Tailwind CSS • Dashboards • Booking Platforms",
            imageAlt: "Abdalrhman Jaffar portrait",
        },
        about: {
            eyebrow: "About",
            title: "Professional Summary",
            description:
                "Frontend Developer building scalable dashboards, booking platforms, and data-driven web applications.",
            paragraphOne:
                "I'm a Frontend Developer specializing in building real production systems, not just UI demos.",
            paragraphTwo:
                "My work focuses on scalable dashboards, booking platforms, and data-driven web applications using React, Next.js, and TypeScript.",
            paragraphThree:
                "I care about performance, maintainability, and user experience. I enjoy structuring complex interfaces and building clean frontend architecture.",
            educationTitle: "Frontend Stack",
            principlesTitle: "Skills",
            durationLabel: "Focus",
            statusLabel: "Specialization",
        },
        services: {
            eyebrow: "Services",
            title: "My Services",
            description:
                "I offer frontend services for teams and founders who need fast, production-ready delivery.",
            orderCta: "Order now",
            openImage: "Open service image preview",
            closePreview: "Close service image preview",
            whatsappTemplate: {
                intro: "Hi, I would like to request this service:",
                serviceLabel: "Service",
                descriptionLabel: "Description",
                deliverableLabel: "Deliverable",
                closing:
                    "Please share pricing, timeline, and the next steps to start.",
            },
            cards: [
                {
                    title: "Website Development",
                    description:
                        "Building complete websites using React.js for frontend and Node.js for backend.",
                    deliverable:
                        "Deliverable: Full web application with clean UI, API integration, and deployment-ready code.",
                    image: "/images/services/Website%20Development.png",
                    imageAlt: "Website development service preview",
                },
                {
                    title: "Landing Page Development",
                    description:
                        "Designing and developing high-conversion landing pages using Next.js.",
                    deliverable:
                        "Deliverable: Fast, SEO-friendly, responsive landing page optimized for conversions.",
                    image: "/images/services/Landing%20Page%20Development.png",
                    imageAlt: "Next.js landing page service preview",
                },
                {
                    title: "E-commerce Store Development",
                    description:
                        "Building modern e-commerce stores using Next.js with smooth shopping experience.",
                    deliverable:
                        "Deliverable: Complete online store pages with product flow, cart, and checkout integration.",
                    image: "/images/services/E-commerce%20Store%20Development.png",
                    imageAlt: "Next.js e-commerce service preview",
                },
                {
                    title: "Bot Development",
                    description:
                        "Creating Node.js bots including general automation bots and Telegram bots.",
                    deliverable:
                        "Deliverable: Production-ready bot with command flow, integrations, and deployment guidance.",
                    image: "/images/services/Bots%20Development.png",
                    imageAlt: "Bot development service preview",
                },
                {
                    title: "WordPress & Shopify Development",
                    description:
                        "Creating websites and online stores using WordPress and Shopify platforms.",
                    deliverable:
                        "Deliverable: Managed website/store setup, customization, and ready-to-launch storefront.",
                    image: "/images/services/wordpress-shopify-development.png",
                    imageAlt: "WordPress and Shopify service preview",
                },
            ],
        },
        stats: [
            {
                label: "Role",
                value: "Frontend Developer",
                detail: "Focused on production web applications.",
            },
            {
                label: "Core Focus",
                value: "Dashboards & Booking Systems",
                detail: "Complex interfaces for real operational workflows.",
            },
            {
                label: "Main Stack",
                value: "React, Next.js, TypeScript",
                detail: "Modern frontend technologies with clean architecture.",
            },
            {
                label: "Integration",
                value: "REST APIs, Auth, Express",
                detail: "Frontend connected to real backend services.",
            },
        ],
        education: {
            degree: "Frontend Development",
            university: "React.js, Next.js, TypeScript, Tailwind CSS",
            duration: "Scalable dashboards and booking platforms",
            status: "Frontend web applications",
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
                    "Admin Dashboards, Booking Systems, Complex Forms, UX Flow Structuring.",
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
                "Real production platforms focused on booking workflows, dashboards, and data-driven interfaces.",
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
        cv: {
            eyebrow: "Resume",
            title: "Professional Resume & Technical Profile",
            description:
                "Frontend Developer with 3+ years building modern production web applications.",
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
                "For project inquiries, collaboration, or product discussions, feel free to reach out through the channels below.",
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
            headline:
                "Building modern frontend products for real business operations.",
            description:
                "React, Next.js, and TypeScript development for scalable web products.",
            contactLabel: "Contact",
            rightsReserved: "All rights reserved.",
        },
        seo: {
            title: "Abdalrhman Jaffar | Portfolio",
            description:
                "Frontend portfolio of Abdalrhman Jaffar, focused on modern web applications, scalable dashboards, and booking platforms built with React and Next.js.",
            keywords:
                "Abdalrhman Jaffar, Frontend Developer, React.js, Next.js, TypeScript, Dashboards, Booking Platforms, Web Applications, Portfolio",
            ogTitle: "Abdalrhman Jaffar - Frontend Developer Portfolio",
            ogDescription:
                "Explore production-focused frontend projects in booking platforms, logistics systems, and dashboards.",
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
            cv: "السيرة الذاتية",
            contact: "التواصل",
        },
        profile: {
            fullName: "عبد الرحمن جعفر",
            shortName: "عبد الرحمن",
            title: "مطور واجهات أمامية",
            location: "دمشق، سوريا",
        },
        hero: {
            badge: "مطور واجهات أمامية",
            headingLine1: "عبد الرحمن جعفر",
            headingLine2: "مطور واجهات أمامية",
            headingLine3: "",
            summary:
                "أبني تطبيقات ويب حديثة، ولوحات تحكم قابلة للتوسع، وصفحات هبوط عالية التحويل باستخدام React وتقنيات Frontend الحديثة.\n\nأركز على الأداء، وبنية كود نظيفة، وأنظمة إنتاجية حقيقية.",
            seeProjects: "عرض المشاريع",
            downloadCV: "تحميل السيرة الذاتية",
            stack: "React.js • Next.js • TypeScript • Tailwind CSS • لوحات تحكم • منصات حجز",
            imageAlt: "صورة عبد الرحمن جعفر",
        },
        about: {
            eyebrow: "نبذة",
            title: "نبذة مهنية",
            description:
                "مطور واجهات أمامية يبني لوحات تحكم قابلة للتوسع ومنصات حجز وتطبيقات ويب معتمدة على البيانات.",
            paragraphOne:
                "أنا مطور واجهات أمامية متخصص في بناء أنظمة إنتاجية حقيقية، وليس مجرد واجهات تجريبية.",
            paragraphTwo:
                "يركز عملي على لوحات التحكم القابلة للتوسع، ومنصات الحجز، وتطبيقات الويب المعتمدة على البيانات باستخدام React وNext.js وTypeScript.",
            paragraphThree:
                "أهتم بالأداء، وسهولة الصيانة، وتجربة المستخدم. أستمتع ببناء واجهات معقدة بطريقة منظمة وبنية Frontend نظيفة.",
            educationTitle: "تقنيات Frontend",
            principlesTitle: "المهارات",
            durationLabel: "التركيز",
            statusLabel: "التخصص",
        },
        services: {
            eyebrow: "خدماتي",
            title: "الخدمات التي أقدّمها",
            description:
                "أقدّم خدمات Frontend جاهزة للإنتاج للشركات وأصحاب المشاريع مع تنفيذ سريع ومنظّم.",
            orderCta: "اطلبها",
            openImage: "فتح معاينة صورة الخدمة",
            closePreview: "إغلاق معاينة صورة الخدمة",
            whatsappTemplate: {
                intro: "مرحبًا، أرغب بطلب هذه الخدمة:",
                serviceLabel: "الخدمة",
                descriptionLabel: "الوصف",
                deliverableLabel: "المخرج",
                closing: "ممكن تفاصيل السعر والمدة وخطوات البدء؟",
            },
            cards: [
                {
                    title: "إنشاء مواقع إلكترونية",
                    description:
                        "تطوير مواقع إلكترونية كاملة باستخدام React.js للواجهة وNode.js للخلفية.",
                    deliverable:
                        "المخرج: موقع متكامل بواجهة نظيفة وربط API وكود جاهز للنشر.",
                    image: "/images/services/Website%20Development.png",
                    imageAlt: "معاينة خدمة إنشاء المواقع",
                },
                {
                    title: "إنشاء صفحات هبوط",
                    description:
                        "تصميم وتطوير صفحات هبوط عالية التحويل باستخدام Next.js.",
                    deliverable:
                        "المخرج: صفحة هبوط سريعة ومتجاوبة ومهيأة لمحركات البحث والتحويل.",
                    image: "/images/services/Landing%20Page%20Development.png",
                    imageAlt: "معاينة خدمة صفحات الهبوط",
                },
                {
                    title: "إنشاء متجر إلكتروني",
                    description:
                        "تطوير متجر إلكتروني حديث باستخدام Next.js مع تجربة شراء سلسة.",
                    deliverable:
                        "المخرج: متجر متكامل بصفحات المنتجات والسلة وخطوات شراء واضحة.",
                    image: "/images/services/E-commerce%20Store%20Development.png",
                    imageAlt: "معاينة خدمة المتجر الإلكتروني",
                },
                {
                    title: "إنشاء بوتات",
                    description:
                        "إنشاء بوتات باستخدام Node.js تشمل بوتات عامة وبوتات تلغرام.",
                    deliverable:
                        "المخرج: بوت جاهز للإنتاج مع منطق أوامر واضح وإعداد قابل للتشغيل.",
                    image: "/images/services/Bots%20Development.png",
                    imageAlt: "معاينة خدمة إنشاء البوتات",
                },
                {
                    title: "إنشاء مواقع ومتاجر عبر WordPress وShopify",
                    description:
                        "إنشاء مواقع ومتاجر احترافية باستخدام WordPress وShopify حسب احتياج النشاط.",
                    deliverable:
                        "المخرج: متجر/موقع جاهز للإطلاق مع التخصيص الكامل وإعدادات التشغيل.",
                    image: "/images/services/wordpress-shopify-development.png",
                    imageAlt: "معاينة خدمة WordPress وShopify",
                },
            ],
        },
        stats: [
            {
                label: "الدور",
                value: "مطور واجهات أمامية",
                detail: "تركيز على تطبيقات ويب إنتاجية.",
            },
            {
                label: "التركيز الأساسي",
                value: "لوحات تحكم وأنظمة حجز",
                detail: "واجهات معقدة لعمليات تشغيل حقيقية.",
            },
            {
                label: "التقنيات الأساسية",
                value: "React وNext.js وTypeScript",
                detail: "تقنيات Frontend حديثة ببنية نظيفة.",
            },
            {
                label: "التكامل",
                value: "REST APIs وAuth وExpress",
                detail: "ربط الواجهة مع خدمات Backend فعلية.",
            },
        ],
        education: {
            degree: "تطوير Frontend",
            university: "React.js وNext.js وTypeScript وTailwind CSS",
            duration: "لوحات تحكم قابلة للتوسع ومنصات حجز",
            status: "تطبيقات ويب أمامية",
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
                    "Admin Dashboards, Booking Systems, Complex Forms, UX Flow Structuring.",
            },
            {
                title: "Backend Integration",
                description:
                    "REST APIs, Authentication flows, Basic Node.js, Express.js, MySQL.",
            },
        ],
        projects: {
            eyebrow: "المشاريع",
            title: "أبرز المشاريع",
            description:
                "منصات إنتاجية تركز على الحجز ولوحات التحكم والواجهات المعتمدة على البيانات.",
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
        cv: {
            eyebrow: "السيرة",
            title: "السيرة الذاتية والملف المهني التقني",
            description:
                "مطور Frontend بخبرة 3+ سنوات في بناء تطبيقات ويب إنتاجية حديثة.",
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
                "للاستفسارات حول المشاريع أو التعاون أو مناقشة الأفكار، يمكنكم التواصل عبر القنوات التالية.",
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
            headline: "أبني منتجات Frontend حديثة لعمليات أعمال حقيقية.",
            description:
                "تطوير React وNext.js وTypeScript لمنتجات ويب قابلة للتوسع.",
            contactLabel: "تواصل",
            rightsReserved: "جميع الحقوق محفوظة.",
        },
        seo: {
            title: "عبد الرحمن جعفر | معرض أعمال",
            description:
                "موقع عبد الرحمن جعفر، مطور واجهات أمامية متخصص في تطبيقات ويب حديثة ولوحات تحكم قابلة للتوسع ومنصات حجز باستخدام React وNext.js.",
            keywords:
                "عبد الرحمن جعفر, مطور واجهات أمامية, React.js, Next.js, TypeScript, لوحات تحكم, منصات حجز, تطبيقات ويب, بورتفوليو",
            ogTitle: "عبد الرحمن جعفر - معرض أعمال مطور Frontend",
            ogDescription:
                "استعرض مشاريع Frontend إنتاجية في أنظمة الحجز واللوجستيات ولوحات التحكم.",
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
