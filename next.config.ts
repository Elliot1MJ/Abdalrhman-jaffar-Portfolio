import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Lets a verification build run in its own directory so it never collides
    // with a `next dev` server writing into `.next` at the same time.
    ...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),
    async redirects() {
        return [
            // `/projects` and `/tools` merged into `/work`; `/cv` folded into
            // the About page. Permanent (308) so existing links and any search
            // index entries carry over rather than 404.
            { source: "/projects", destination: "/work", permanent: true },
            { source: "/tools", destination: "/work", permanent: true },
            { source: "/cv", destination: "/about#resume", permanent: true },
        ];
    },
};

export default nextConfig;
