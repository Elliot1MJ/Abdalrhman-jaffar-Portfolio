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
            "منصة حجز قوارب موجهة للسوق السعودي تتضمن صفحة هبوط عالية التحويل ولوحة تحكم كاملة ونظام حجز ودفع متكامل.",
    },
    "Tariq Al-Shahba – Logistics & Cargo Management System": {
        name: "Tariq Al-Shahba - نظام إدارة الشحن واللوجستيات",
        description:
            "نظام رقمي لإدارة الشحن من الإمارات إلى سوريا مع إدخال تسعير جمركي وتتبع عبر QR ولوحات بيانات وتصدير PDF وExcel.",
    },
    "Ibtisama Clinic – Dental Booking System": {
        name: "Ibtisama Clinic - نظام حجز مواعيد الأسنان",
        description:
            "نظام حجز عيادة أسنان مع تقويم لمواعيد شهرين ولوحة صلاحيات متعددة وإدارة كاملة لسير العمل داخل العيادة.",
    },
    "TATABU – Location Tracking Platform": {
        name: "TATABU - منصة تتبع المواقع",
        description:
            "تحسين منصة تتبع مواقع قائمة عبر إعادة تنظيم البيانات ورفع الأداء وتقديم تجربة استخدام أوضح.",
    },
    "YOGO Kids – Childcare Booking Platform": {
        name: "YOGO Kids - منصة حجز ورعاية الأطفال",
        description:
            "منصة قيد التطوير لإدارة تسجيل الأطفال والجداول من خلال لوحة تحكم حديثة مبنية باستخدام shadcn/ui.",
    },
    "Blisscet Store": {
        name: "Blisscet Store",
        description:
            "متجر إلكتروني MERN مع تسجيل دخول ومسارات محمية وسلة مشتريات وهيكلية جاهزة للتوسع وإدارة البيانات.",
    },
    "Todo App": {
        name: "Todo App",
        description:
            "تطبيق إدارة مهام ببنية مكونات واضحة وتفاعل سريع وتدفق استخدام بسيط يركز على الإنتاجية.",
    },
    "Sunnyside Agency": {
        name: "Sunnyside Agency",
        description:
            "صفحة هبوط تسويقية تركز على التصميم المتجاوب وتوزيع بصري حديث وحركات واجهة سلسة.",
    },
    "Book Mark Master": {
        name: "Book Mark Master",
        description:
            "واجهة هبوط بأسلوب منتج مع أقسام UI مرتبة وتفاعلات ناعمة وتجربة محسنة للموبايل.",
    },
    "Contact Form Page": {
        name: "Contact Form Page",
        description:
            "صفحة نموذج تواصل مع تحقق بيانات على الواجهة ومعالجة أخطاء واضحة وتجربة إدخال سهلة.",
    },
    "CURDS App": {
        name: "CURDS App",
        description:
            "تطبيق CRUD بإدارة حالة فعالة وتحديثات جدول مباشرة والتعامل مع بيانات محلية بشكل منظم.",
    },
    "Multi Step App": {
        name: "Multi Step App",
        description:
            "تدفق متعدد الخطوات مع تحقق بيانات وحالة تقدم واضحة وانتقالات واجهة مصقولة.",
    },
    "Product List App": {
        name: "Product List App",
        description:
            "تجربة سلة تفاعلية تشمل عرض منتجات والتحكم بالكميات وحفظ سلوك السلة بشكل مستمر.",
    },
    "FAQ Accordion": {
        name: "FAQ Accordion",
        description:
            "مكون أكورديون قابل للوصول مع مكونات قابلة لإعادة الاستخدام وانتقالات تعتمد على الحالة.",
    },
    "Interactive Rating": {
        name: "Interactive Rating",
        description:
            "واجهة تقييم تفاعلية بتغذية راجعة فورية وشاشة نجاح مع تصميم يركز على المكونات.",
    },
    "Article Preview": {
        name: "Article Preview",
        description:
            "بطاقة مشاركة بمستوى بصري دقيق وسلوك متجاوب متناسق عبر مختلف أحجام الشاشات.",
    },
    "Base Apparel": {
        name: "Base Apparel",
        description:
            "صفحة قادمة قريبًا موجهة للتحويل تتضمن جمع بريد إلكتروني وتجربة تحقق سهلة.",
    },
    "Intro Signup Form": {
        name: "Intro Signup Form",
        description:
            "واجهة نموذج تسجيل مع رسائل تحقق واضحة وهيكل HTML دلالي سهل الاستخدام.",
    },
    "Ping Coming Soon": {
        name: "Ping Coming Soon",
        description:
            "صفحة إطلاق خفيفة بتصميم بسيط وبنية سريعة ومتجاوبة مع جميع الشاشات.",
    },
};

export const messages: Record<Language, MessageCatalog> = {
    en: {
        nav: {
            portfolio: "Portfolio",
            home: "Home",
            about: "About",
            projects: "Projects",
            cv: "CV",
            contact: "Contact",
            menu: "Menu",
            navigate: "Navigate",
            openMenu: "Open menu",
            closeMenu: "Close menu",
            toggleTheme: "Toggle color theme",
            toggleLanguage: "Switch language",
            startProject: "Start a project",
            downloadCV: "Download CV",
        },
        sectionAria: {
            home: "Home",
            about: "About",
            projects: "Projects",
            cv: "CV",
            contact: "Contact",
        },
        profile: {
            fullName: "Abdalrhman Mohammed Jaffar",
            shortName: "Abdalrhman",
            title: "Frontend Developer",
            location: "Lattakia, Syria",
        },
        hero: {
            badge: "Frontend Developer",
            headingLine1: "Abdalrhman",
            headingLine2: "builds dashboards",
            headingLine3: "for booking & tracking.",
            summary:
                "Frontend Developer specialized in building dashboards and booking/tracking systems with React.js and TypeScript. I focus on fast, structured, scalable interfaces with high UI quality and smooth user experience.",
            seeProjects: "See projects",
            downloadCV: "Download CV",
            imageAlt: "Abdalrhman Mohammed Jaffar portrait",
        },
        about: {
            eyebrow: "About me",
            title: "Abdalrhman, Frontend Developer",
            description:
                "Frontend Developer specialized in dashboards, booking, and tracking systems built with React.js and TypeScript.",
            paragraphOne:
                "I am Abdalrhman Jaffar, a Frontend Developer who builds admin dashboards and booking/tracking systems with React.js and TypeScript. I focus on fast, structured, and scalable interfaces with high UI quality and smooth user experience.",
            paragraphTwo:
                "I turn ideas into production-ready products, from architecture planning to final delivery. I have experience with complex admin systems, advanced forms, role-based access, API integrations, payments, and tracking.",
            paragraphThree:
                "Available for freelance and remote projects.",
            educationTitle: "Education",
            principlesTitle: "Working principles",
            durationLabel: "Duration",
            statusLabel: "Status",
        },
        stats: [
            {
                label: "Dashboards",
                value: "Admin-Grade",
                detail: "Structured, scalable dashboards built for real operations.",
            },
            {
                label: "Booking Systems",
                value: "End-to-End",
                detail: "From scheduling to payments and tracking workflows.",
            },
            {
                label: "Role-Based Access",
                value: "RBAC",
                detail: "Secure permissions and role-driven experiences.",
            },
            {
                label: "Languages",
                value: "2",
                detail: "Arabic, English",
            },
        ],
        education: {
            degree: "BSc in Computer Science Engineering",
            university: "Lattakia University (formerly Tishreen University)",
            duration: "2022 - 2028 (Expected)",
            status: "3rd Year Student",
            coursework: [
                "Data Structures",
                "Algorithms",
                "Database Systems",
                "Software Engineering",
                "Web Development",
            ],
        },
        values: [
            {
                title: "Performance First",
                description:
                    "I prioritize lazy loading, compact bundles, and smooth rendering from day one.",
            },
            {
                title: "Clean Architecture",
                description:
                    "Readable, maintainable code and predictable component boundaries are part of every project.",
            },
            {
                title: "Product Thinking",
                description:
                    "I build features with user behavior, conversion, and long-term scaling in mind.",
            },
        ],
        projects: {
            eyebrow: "Portfolio",
            title: "Projects I shipped",
            description:
                "Featured dashboards, booking, and tracking systems built with React.js and TypeScript. Filter by stack and explore the full list.",
            filters: {
                featured: "Featured Apps",
                all: "All",
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
            title: "Curriculum Vitae",
            description: "Open the PDF in a new tab or download it directly.",
            openCV: "Open CV",
            downloadPDF: "Download PDF",
            iframeTitle: "Abdalrhman CV",
            mobilePreviewNotice:
                "CV preview is disabled on small screens for better performance. Use the buttons above to open or download the PDF.",
        },
        contact: {
            eyebrow: "Contact",
            title: "Let us build your next project",
            description:
                "Tell me what you are building, timeline, and goals. I will reply with a clear execution plan.",
            fields: {
                name: "Name",
                email: "Email",
                message: "Message",
            },
            placeholders: {
                name: "Your name",
                email: "you@example.com",
                message: "Share your project goals, deadline, and required features.",
            },
            submit: "Send message",
            submitting: "Preparing email...",
            ways: {
                whatsappLabel: "WhatsApp",
                whatsappValue: "Quick chat",
                instagramLabel: "Instagram",
                instagramValue: "@abdalrhman_jaffar",
                emailLabel: "Email",
            },
            emailTemplate: {
                subjectPrefix: "Project inquiry from",
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
            headline: "Let us build a modern, fast web experience together.",
            description:
                "High-performance interfaces for dashboards, booking, and tracking systems.",
            contactLabel: "Contact",
            availability: "Available for freelance & remote projects.",
            rightsReserved: "All rights reserved.",
        },
        seo: {
            title: "Abdalrhman Jaffar | Frontend Developer",
            description:
                "Frontend portfolio of Abdalrhman Jaffar, specialized in React.js and TypeScript dashboards, booking systems, tracking platforms, and scalable UI architecture.",
            keywords:
                "Abdalrhman Jaffar, Frontend Developer, React.js, TypeScript, Dashboard Developer, Booking System, Tracking System, UI Engineer, Portfolio",
            ogTitle:
                "Abdalrhman Jaffar - Frontend Developer for Dashboards and Product Systems",
            ogDescription:
                "Explore featured projects in dashboards, booking, logistics, and tracking systems built with React.js and TypeScript.",
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
            about: "من أنا",
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
            downloadCV: "تحميل السيرة",
        },
        sectionAria: {
            home: "الرئيسية",
            about: "من أنا",
            projects: "المشاريع",
            cv: "السيرة الذاتية",
            contact: "التواصل",
        },
        profile: {
            fullName: "عبد الرحمن محمد جعفر",
            shortName: "عبد الرحمن",
            title: "مطور واجهات أمامية",
            location: "اللاذقية، سوريا",
        },
        hero: {
            badge: "مطور واجهات أمامية",
            headingLine1: "عبد الرحمن",
            headingLine2: "يبني لوحات تحكم",
            headingLine3: "للحجز والتتبع.",
            summary:
                "مطور Frontend متخصص في بناء لوحات التحكم وأنظمة الحجز والتتبع باستخدام React.js وTypeScript. أركز على واجهات سريعة ومنظمة وقابلة للتوسع مع جودة UI عالية وتجربة استخدام سلسة.",
            seeProjects: "شاهد المشاريع",
            downloadCV: "تحميل السيرة",
            imageAlt: "صورة عبد الرحمن محمد جعفر",
        },
        about: {
            eyebrow: "من أنا",
            title: "عبد الرحمن، مطور واجهات أمامية",
            description:
                "مطور واجهات أمامية متخصص في أنظمة لوحات التحكم والحجز والتتبع باستخدام React.js وTypeScript.",
            paragraphOne:
                "أنا عبد الرحمن جعفر، Frontend Developer متخصص في بناء لوحات التحكم (Dashboards) وأنظمة الحجز والتتبع باستخدام React.js وTypeScript. أركز على تطوير واجهات احترافية سريعة ومنظمة وقابلة للتوسع، مع اهتمام كبير بجودة UI وسلاسة تجربة المستخدم.",
            paragraphTwo:
                "أعمل على تحويل الأفكار إلى منتجات عملية جاهزة للاستخدام، بدءًا من التخطيط المعماري وحتى التسليم النهائي. لدي خبرة في بناء أنظمة إدارية معقدة ونماذج متقدمة وصلاحيات مستخدمين (Role-Based Access)، إضافة إلى تكامل APIs وأنظمة الدفع والتتبع.",
            paragraphThree: "متاح للعمل الحر والمشاريع الريموت.",
            educationTitle: "التعليم",
            principlesTitle: "مبادئ العمل",
            durationLabel: "المدة",
            statusLabel: "الحالة",
        },
        stats: [
            {
                label: "لوحات التحكم",
                value: "مستوى احترافي",
                detail: "لوحات إدارية منظمة وقابلة للتوسع ومبنية للاستخدام الفعلي.",
            },
            {
                label: "أنظمة الحجز",
                value: "من البداية للنهاية",
                detail: "من الجدولة وحتى الدفع والتتبع ضمن سير عمل متكامل.",
            },
            {
                label: "الصلاحيات",
                value: "RBAC",
                detail: "نظام صلاحيات آمن وتجربة استخدام مبنية على الأدوار.",
            },
            {
                label: "اللغات",
                value: "2",
                detail: "العربية، الإنجليزية",
            },
        ],
        education: {
            degree: "بكالوريوس هندسة المعلوماتية",
            university: "جامعة اللاذقية (تشرين سابقًا)",
            duration: "2022 - 2028 (متوقع)",
            status: "طالب سنة ثالثة",
            coursework: [
                "هياكل البيانات",
                "الخوارزميات",
                "أنظمة قواعد البيانات",
                "هندسة البرمجيات",
                "تطوير الويب",
            ],
        },
        values: [
            {
                title: "الأداء أولًا",
                description:
                    "أركز على التحميل الكسول وتقليل حجم الملفات وسلاسة العرض من أول مرحلة بالمشروع.",
            },
            {
                title: "بنية نظيفة",
                description:
                    "الكود القابل للصيانة وحدود المكونات الواضحة جزء أساسي من كل مشروع.",
            },
            {
                title: "تفكير منتجي",
                description:
                    "أبني الميزات بناءً على سلوك المستخدم والتحويل وإمكانية التوسع على المدى الطويل.",
            },
        ],
        projects: {
            eyebrow: "المعرض",
            title: "مشاريع تم تنفيذها",
            description:
                "لوحات تحكم وأنظمة حجز وتتبع مبنية باستخدام React.js وTypeScript. اختر المشاريع المميزة أو استعرض الكل.",
            filters: {
                featured: "مشاريع مميزة",
                all: "الكل",
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
            eyebrow: "السيرة الذاتية",
            title: "Curriculum Vitae",
            description: "افتح ملف PDF في تبويب جديد أو قم بتحميله مباشرة.",
            openCV: "فتح السيرة",
            downloadPDF: "تحميل PDF",
            iframeTitle: "سيرة عبد الرحمن",
            mobilePreviewNotice:
                "تم إيقاف معاينة السيرة على الشاشات الصغيرة لتحسين الأداء. استخدم الأزرار بالأعلى للفتح أو التحميل.",
        },
        contact: {
            eyebrow: "التواصل",
            title: "لنبدأ مشروعك القادم",
            description:
                "أخبرني ماذا تريد أن تبني، المدة الزمنية، والأهداف. وسأعود لك بخطة تنفيذ واضحة.",
            fields: {
                name: "الاسم",
                email: "البريد الإلكتروني",
                message: "الرسالة",
            },
            placeholders: {
                name: "اسمك",
                email: "you@example.com",
                message: "شارك تفاصيل المشروع، الموعد النهائي، والميزات المطلوبة.",
            },
            submit: "إرسال الرسالة",
            submitting: "جاري تجهيز البريد...",
            ways: {
                whatsappLabel: "واتساب",
                whatsappValue: "محادثة سريعة",
                instagramLabel: "إنستغرام",
                instagramValue: "@abdalrhman_jaffar",
                emailLabel: "البريد",
            },
            emailTemplate: {
                subjectPrefix: "استفسار مشروع من",
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
            headline: "دعنا نبني تجربة ويب حديثة وسريعة معًا.",
            description:
                "واجهات عالية الأداء للوحات التحكم وأنظمة الحجز والتتبع.",
            contactLabel: "تواصل",
            availability: "متاح للعمل الحر والمشاريع الريموت.",
            rightsReserved: "جميع الحقوق محفوظة.",
        },
        seo: {
            title: "عبد الرحمن جعفر | مطور واجهات أمامية",
            description:
                "الموقع الشخصي لعبد الرحمن جعفر، مطور Frontend متخصص في React.js وTypeScript لبناء لوحات التحكم وأنظمة الحجز والتتبع بواجهات احترافية قابلة للتوسع.",
            keywords:
                "عبد الرحمن جعفر, مطور واجهات أمامية, React.js, TypeScript, لوحات تحكم, نظام حجز, نظام تتبع, تطوير واجهات, بورتفوليو",
            ogTitle:
                "عبد الرحمن جعفر - مطور واجهات أمامية لأنظمة لوحات التحكم والحجز",
            ogDescription:
                "تعرّف على المشاريع المميزة في لوحات التحكم وأنظمة الحجز واللوجستيات والتتبع المبنية باستخدام React.js وTypeScript.",
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
