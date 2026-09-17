import { Suspense } from "react";
import { projects } from "@/lib/data/portfolio";
import { tools } from "@/lib/data/tools";
import { WorkTabs } from "@/components/work/work-tabs";

// Stays a server component: `portfolio.ts` pulls in `gallery.ts`, which uses
// `node:fs` at build time to assemble the project galleries.
export default function WorkPage() {
    // `WorkTabs` reads `?tab=` via `useSearchParams`, which must sit under a
    // Suspense boundary or the whole route opts out of static rendering.
    return (
        <Suspense>
            <WorkTabs projects={projects} tools={tools} />
        </Suspense>
    );
}
