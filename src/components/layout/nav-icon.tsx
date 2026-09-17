"use client";

import {
    FiUser,
    FiFileText,
    FiGrid,
    FiPackage,
    FiCode,
    FiServer,
    FiBookOpen,
    FiMessageCircle,
} from "react-icons/fi";
import type { NavIcon as NavIconKey } from "@/components/layout/nav-items";

const ICONS = {
    user: FiUser,
    file: FiFileText,
    grid: FiGrid,
    package: FiPackage,
    code: FiCode,
    server: FiServer,
    book: FiBookOpen,
    chat: FiMessageCircle,
} as const;

/**
 * Resolves the serializable icon key carried by nav data into a component.
 * Keeps `nav-items.ts` free of JSX so it can stay a plain data module.
 */
export function NavIcon({
    name,
    className,
}: {
    name: NavIconKey;
    className?: string;
}) {
    const Icon = ICONS[name] ?? FiGrid;
    return <Icon aria-hidden className={className} />;
}
