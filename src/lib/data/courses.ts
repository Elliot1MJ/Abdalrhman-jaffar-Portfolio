/**
 * Course catalogue.
 *
 * Only structural, language-neutral data lives here (slug, level, duration,
 * whether it's the consultation offer). All human-readable copy is in
 * `messages.ts` keyed by slug, so both AR and EN stay in sync — deliberately
 * unlike `tools.ts`, which hardcodes English and therefore stays English in
 * Arabic mode.
 *
 * TODO(owner): pricing is intentionally absent. Add a `price` field here and a
 * matching label in `messages.ts` once you've decided the numbers.
 */

export type CourseSlug =
    | "frontend"
    | "backend"
    | "programming-foundations"
    | "consultation";

export interface Course {
    slug: CourseSlug;
    /**
     * Rough hour count. `null` means the duration is not expressed in hours —
     * the consultation is a single session, and "1 hours" reads as a bug.
     */
    hours: number | null;
    /** Drives the level chip; copy comes from `text.courses.levels[level]`. */
    level: "beginner" | "intermediate" | "all-levels";
    /** Technology names — always Latin, rendered with `data-latin`. */
    stack: string[];
    /** The consultation is a service, not a course; it renders highlighted. */
    featured?: boolean;
}

export const courses: Course[] = [
    {
        slug: "frontend",
        hours: 40,
        level: "beginner",
        stack: ["HTML", "CSS", "JavaScript", "React.js", "Next.js", "TypeScript"],
    },
    {
        slug: "backend",
        hours: 35,
        level: "intermediate",
        stack: ["Node.js", "Express.js", "MySQL", "REST APIs", "Auth"],
    },
    {
        slug: "programming-foundations",
        hours: 20,
        level: "beginner",
        stack: ["Git", "Algorithms", "Data Structures", "Problem Solving"],
    },
    {
        slug: "consultation",
        hours: null,
        level: "all-levels",
        stack: ["Code Review", "Architecture", "Career"],
        featured: true,
    },
];
