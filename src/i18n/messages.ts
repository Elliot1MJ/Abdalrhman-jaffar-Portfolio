import type { PortfolioProject } from "../data/portfolio";

export type Language = "en" | "ar";

type ProjectCategory = PortfolioProject["category"];

type ProjectTranslationMap = Record<
    string,
    {
        name?: string;
        description?: string;
    }
>;

export interface MessageCatalog {
    nav: {
        portfolio: string;
        home: string;
        about: string;
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
        availability: string;
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
    "LUJJH – Boat Booking Platform": {
        name: "LUJJH - منصة حجز القوارب",
        description:
            "منصة حجز قوارب للسوق السعودي تتضمن تدفق حجز كامل، ولوحة تحكم إدارية، وصفحة هبوط موجهة للتحويل.",
    },
    "Tariq Al-Shahba – Logistics & Cargo Management System": {
        name: "Tariq Al-Shahba - نظام إدارة الشحن واللوجستيات",
        description:
            "نظام تشغيلي لإدارة الشحن من الإمارات إلى سوريا مع تتبع عبر QR، ونماذج تسعير جمركي منظمة، وتصدير PDF وExcel.",
    },
    "Ibtisama Clinic – Appointment Booking System": {
        name: "Ibtisama Clinic - نظام حجز المواعيد",
        description:
            "نظام مواعيد عيادة يتضمن تقويم جدولة لشهرين، ولوحات بحسب الدور (الطبيب/الاستقبال)، وصلاحيات دخول متدرجة.",
    },
    "Yogo Kids – Childcare Booking Platform": {
        name: "Yogo Kids - منصة حجز ورعاية الأطفال",
        description:
            "منصة قيد التطوير لإدارة تسجيل الأطفال مع لوحة تحكم شاملة موجهة للتشغيل اليومي.",
    },
    "Tatabu – Location Tracking Platform": {
        name: "Tatabu - منصة تتبع المواقع",
        description:
            "تحسين منصة تتبع قائمة عبر إعادة تنظيم تدفقات لوحة التحكم لرفع الوضوح والأداء وسهولة الصيانة.",
    },
};

export const messages: Record<Language, MessageCatalog> = {
    en: {
        nav: {
            portfolio: "Portfolio",
            home: "Home",
            about: "About",
            projects: "Projects",
            cv: "Resume",
            contact: "Contact",
            menu: "Menu",
            navigate: "Navigate",
            openMenu: "Open menu",
            closeMenu: "Close menu",
            toggleTheme: "Toggle color theme",
            toggleLanguage: "Switch language",
            startProject: "Discuss a role",
            downloadCV: "View resume",
        },
        sectionAria: {
            home: "Home",
            about: "About",
            projects: "Projects",
            cv: "Resume",
            contact: "Contact",
        },
        profile: {
            fullName: "Abdalrhman Mohammed Jaffar",
            shortName: "Abdalrhman",
            title: "Frontend Engineer (React & Next.js Specialist)",
            location: "Open to remote roles",
        },
        hero: {
            badge: "Frontend Engineer (React & Next.js Specialist)",
            headingLine1: "Scalable Booking",
            headingLine2: "& Dashboard Systems",
            headingLine3: "for Real Operations",
            summary:
                "I build production-ready React and Next.js platforms for booking, operations, and admin workflows with clean architecture, performance awareness, and security-conscious implementation.",
            seeProjects: "View projects",
            downloadCV: "View resume",
            imageAlt: "Abdalrhman Mohammed Jaffar portrait",
        },
        about: {
            eyebrow: "About",
            title: "Frontend Engineer Focused on Business Systems",
            description:
                "I design and build structured frontend systems for booking workflows, operational dashboards, and role-based platforms.",
            paragraphOne:
                "I am Abdalrhman Mohammed Jaffar, a frontend engineer with 3 years of experience delivering business-facing web applications across freelance work and team collaboration.",
            paragraphTwo:
                "My work emphasizes maintainable architecture, clear component boundaries, and reliable API integration for booking flows, logistics operations, and appointment management.",
            paragraphThree:
                "I use AI-assisted workflows to accelerate implementation while preserving code quality, security boundaries, and long-term maintainability. I am currently seeking a remote frontend role.",
            educationTitle: "Education",
            principlesTitle: "Engineering Focus",
            durationLabel: "Timeline",
            statusLabel: "Current status",
        },
        stats: [
            {
                label: "Experience",
                value: "3 Years",
                detail: "Frontend delivery across freelance and team environments.",
            },
            {
                label: "Production Systems",
                value: "Booking, Logistics, Healthcare",
                detail: "Built for real operations and day-to-day workflows.",
            },
            {
                label: "Specialization",
                value: "Dashboards & Booking",
                detail: "Structured admin interfaces and booking workflows.",
            },
            {
                label: "Core Stack",
                value: "React + Next.js",
                detail: "With TypeScript, TailwindCSS, and Express.js integration.",
            },
        ],
        education: {
            degree: "Bachelor's Degree in Computer & Control Engineering",
            university: "Lattakia University (formerly Tishreen University)",
            duration: "Expected Graduation: 2028",
            status: "Undergraduate student",
            coursework: [
                "Computer Engineering Fundamentals",
                "Control Systems",
                "Algorithms",
                "Database Systems",
                "Software Engineering",
            ],
        },
        values: [
            {
                title: "Clean & Maintainable Code",
                description:
                    "Readable code, reusable patterns, and clear ownership across components and modules.",
            },
            {
                title: "Structured Architecture",
                description:
                    "Feature structure, state boundaries, and API contracts are planned before implementation.",
            },
            {
                title: "Performance, Security & AI Workflow",
                description:
                    "I optimize rendering behavior, respect authentication and permission boundaries, and use AI-assisted workflows to speed up reliable delivery.",
            },
        ],
        projects: {
            eyebrow: "Projects",
            title: "Business Platforms I Built",
            description:
                "Production-oriented systems focused on booking workflows, dashboards, and operational management.",
            filters: {
                featured: "Featured Systems",
                all: "All Projects",
            },
            filtersAria: "Project filter tabs",
            categories: {
                javascript: "JavaScript",
                react: "React",
                fullstack: "Fullstack",
            },
            actions: {
                github: "GitHub",
                live: "Live",
            },
            projectCopy: {},
        },
        cv: {
            eyebrow: "Resume",
            title: "Frontend Engineer Resume",
            description:
                "3 years of experience building production systems with specialization in booking workflows and dashboards.",
            openCV: "Open resume",
            downloadPDF: "Download PDF",
            iframeTitle: "Abdalrhman resume",
            mobilePreviewNotice:
                "Resume preview is disabled on small screens for better performance. Use the buttons above to open or download the PDF.",
        },
        contact: {
            eyebrow: "Contact",
            title: "Available for Remote Frontend Roles",
            description:
                "If you are hiring a frontend engineer to build scalable booking systems and structured dashboards, I am available for remote opportunities and focused project collaborations.",
            fields: {
                name: "Name",
                email: "Email",
                message: "Message",
            },
            placeholders: {
                name: "Your name",
                email: "you@example.com",
                message:
                    "Share role details, project scope, timeline, and expected outcomes.",
            },
            submit: "Prepare message",
            submitting: "Preparing email...",
            ways: {
                whatsappLabel: "WhatsApp",
                whatsappValue: "Direct message",
                instagramLabel: "Instagram",
                instagramValue: "@abdalrhman_jaffar",
                emailLabel: "Email",
            },
            emailTemplate: {
                subjectPrefix: "Opportunity from",
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
                "Building structured frontend systems for real business operations.",
            description:
                "React and Next.js engineering for booking platforms, dashboards, and role-based workflows.",
            contactLabel: "Contact",
            availability: "Available for remote frontend opportunities.",
            rightsReserved: "All rights reserved.",
        },
        seo: {
            title: "Abdalrhman Mohammed Jaffar | Frontend Engineer",
            description:
                "Frontend portfolio of Abdalrhman Mohammed Jaffar, focused on scalable booking systems, structured dashboards, and production business platforms built with React and Next.js.",
            keywords:
                "Abdalrhman Mohammed Jaffar, Frontend Engineer, React.js, Next.js, TypeScript, Dashboard Systems, Booking Platform, Business Systems, Portfolio",
            ogTitle:
                "Abdalrhman Mohammed Jaffar - Frontend Engineer for Booking & Dashboard Systems",
            ogDescription:
                "Explore production-focused frontend work in booking platforms, logistics systems, and role-based operational dashboards.",
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
            projects: "المشاريع",
            cv: "السيرة",
            contact: "تواصل",
            menu: "القائمة",
            navigate: "التنقل",
            openMenu: "فتح القائمة",
            closeMenu: "إغلاق القائمة",
            toggleTheme: "تبديل المظهر",
            toggleLanguage: "تبديل اللغة",
            startProject: "ناقش فرصة عمل",
            downloadCV: "عرض السيرة",
        },
        sectionAria: {
            home: "الرئيسية",
            about: "نبذة",
            projects: "المشاريع",
            cv: "السيرة الذاتية",
            contact: "التواصل",
        },
        profile: {
            fullName: "عبد الرحمن محمد جعفر",
            shortName: "عبد الرحمن",
            title: "مهندس واجهات أمامية (متخصص React وNext.js)",
            location: "متاح لفرص عمل عن بُعد",
        },
        hero: {
            badge: "مهندس واجهات أمامية (متخصص React وNext.js)",
            headingLine1: "أنظمة حجز قابلة للتوسع",
            headingLine2: "ولوحات تحكم منظمة",
            headingLine3: "لعمليات الأعمال الفعلية",
            summary:
                "أبني منصات React وNext.js جاهزة للإنتاج لأنظمة الحجز والتشغيل ولوحات الإدارة، مع بنية نظيفة، ووعي بالأداء، وتطبيقات تراعي الأمان.",
            seeProjects: "استعرض المشاريع",
            downloadCV: "عرض السيرة",
            imageAlt: "صورة عبد الرحمن محمد جعفر",
        },
        about: {
            eyebrow: "نبذة",
            title: "مهندس واجهات أمامية يركز على أنظمة الأعمال",
            description:
                "أصمم وأبني واجهات منظمة لأنظمة الحجز ولوحات التشغيل والمنصات المعتمدة على الصلاحيات.",
            paragraphOne:
                "أنا عبد الرحمن محمد جعفر، مهندس واجهات أمامية بخبرة 3 سنوات في إنشاء تطبيقات ويب عملية ضمن العمل الحر والتعاون مع فرق تطوير.",
            paragraphTwo:
                "يرتكز عملي على بنية قابلة للصيانة، وحدود واضحة للمكونات، وتكامل API موثوق لأنظمة الحجز وإدارة الشحن ومواعيد العيادات.",
            paragraphThree:
                "أستخدم سير عمل مدعومًا بالذكاء الاصطناعي لتسريع التنفيذ مع الحفاظ على جودة الكود، وحدود الأمان، وقابلية التوسع على المدى الطويل.",
            educationTitle: "التعليم",
            principlesTitle: "تركيز العمل الهندسي",
            durationLabel: "المدة",
            statusLabel: "الحالة الحالية",
        },
        stats: [
            {
                label: "الخبرة",
                value: "3 سنوات",
                detail: "تنفيذ Frontend عملي ضمن مشاريع حرة وبيئات عمل جماعية.",
            },
            {
                label: "أنظمة إنتاجية",
                value: "حجز، لوجستيات، عيادات",
                detail: "حلول مبنية لعمليات تشغيل يومية فعلية.",
            },
            {
                label: "التخصص",
                value: "الحجز ولوحات التحكم",
                detail: "واجهات إدارية منظمة وتدفقات حجز عملية.",
            },
            {
                label: "التركيز التقني",
                value: "React + Next.js",
                detail: "مع TypeScript وTailwindCSS وتكامل Express.js.",
            },
        ],
        education: {
            degree: "بكالوريوس هندسة الحاسوب والتحكم",
            university: "جامعة اللاذقية (تشرين سابقًا)",
            duration: "موعد التخرج المتوقع: 2028",
            status: "طالب بكالوريوس",
            coursework: [
                "مبادئ هندسة الحاسوب",
                "أنظمة التحكم",
                "الخوارزميات",
                "أنظمة قواعد البيانات",
                "هندسة البرمجيات",
            ],
        },
        values: [
            {
                title: "كود نظيف وقابل للصيانة",
                description:
                    "أعتمد كودًا واضحًا وأنماطًا قابلة لإعادة الاستخدام مع مسؤوليات دقيقة بين المكونات.",
            },
            {
                title: "بنية واجهات منظمة",
                description:
                    "أخطط لبنية المزايا وحدود الحالة وتعاقدات API قبل التنفيذ لضمان استمرارية المشروع.",
            },
            {
                title: "أداء وأمان وسير عمل ذكي",
                description:
                    "أحسّن سلوك الواجهة، وألتزم بحدود المصادقة والصلاحيات، وأستخدم أدوات الذكاء الاصطناعي لتسريع التسليم بجودة موثوقة.",
            },
        ],
        projects: {
            eyebrow: "المشاريع",
            title: "منصات أعمال قمت بتنفيذها",
            description:
                "أنظمة إنتاجية تركّز على تدفقات الحجز ولوحات التحكم والإدارة التشغيلية.",
            filters: {
                featured: "أنظمة مميزة",
                all: "كل المشاريع",
            },
            filtersAria: "تبويبات تصفية المشاريع",
            categories: {
                javascript: "جافاسكريبت",
                react: "ريأكت",
                fullstack: "متكامل",
            },
            actions: {
                github: "جيت هب",
                live: "معاينة",
            },
            projectCopy: arabicProjectCopy,
        },
        cv: {
            eyebrow: "السيرة",
            title: "السيرة المهنية لمهندس Frontend",
            description:
                "خبرة 3 سنوات في بناء أنظمة إنتاجية مع تخصص في منصات الحجز ولوحات التحكم.",
            openCV: "فتح السيرة",
            downloadPDF: "تحميل PDF",
            iframeTitle: "سيرة عبد الرحمن",
            mobilePreviewNotice:
                "تم تعطيل معاينة السيرة على الشاشات الصغيرة لتحسين الأداء. استخدم الأزرار بالأعلى للفتح أو التحميل.",
        },
        contact: {
            eyebrow: "تواصل",
            title: "متاح لوظائف Frontend",
            description:
                "إذا كنتم تبحثون عن مهندس واجهات أمامية لبناء أنظمة حجز قابلة للتوسع ولوحات تشغيل منظمة، فأنا متاح لفرص العمل والتعاون على مشاريع ذات أثر.",
            fields: {
                name: "الاسم",
                email: "البريد الإلكتروني",
                message: "الرسالة",
            },
            placeholders: {
                name: "اسمك",
                email: "you@example.com",
                message:
                    "شارك تفاصيل الدور أو المشروع، النطاق، الجدول الزمني، والنتائج المتوقعة.",
            },
            submit: "تجهيز الرسالة",
            submitting: "جارٍ تجهيز الرسالة...",
            ways: {
                whatsappLabel: "واتساب",
                whatsappValue: "تواصل مباشر",
                instagramLabel: "إنستغرام",
                instagramValue: "@abdalrhman_jaffar",
                emailLabel: "البريد",
            },
            emailTemplate: {
                subjectPrefix: "فرصة من",
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
            headline: "أبني أنظمة واجهات أمامية منظمة لعمليات الأعمال الفعلية.",
            description:
                "هندسة React وNext.js لمنصات الحجز ولوحات التحكم والأنظمة المعتمدة على الصلاحيات.",
            contactLabel: "تواصل",
            availability: "متاح لفرص Frontend.",
            rightsReserved: "جميع الحقوق محفوظة.",
        },
        seo: {
            title: "عبد الرحمن محمد جعفر | مهندس واجهات أمامية",
            description:
                "موقع عبد الرحمن محمد جعفر، مهندس واجهات أمامية متخصص في بناء أنظمة حجز قابلة للتوسع ولوحات تحكم منظمة ومنصات أعمال إنتاجية باستخدام React وNext.js.",
            keywords:
                "عبد الرحمن محمد جعفر, مهندس واجهات أمامية, React.js, Next.js, TypeScript, لوحات تحكم, أنظمة حجز, أنظمة أعمال, بورتفوليو",
            ogTitle:
                "عبد الرحمن محمد جعفر - مهندس Frontend لأنظمة الحجز ولوحات التحكم",
            ogDescription:
                "استعرض مشاريع إنتاجية في أنظمة الحجز واللوجستيات ولوحات التحكم التشغيلية المبنية باستخدام React وNext.js.",
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
