export interface Tool {
    slug: string;
    name: string;
    tagline: string;
    description: string;
    stack: string[];
    npmUrl?: string;
    repoUrl?: string;
}

export const tools: Tool[] = [
    {
        slug: "dlpdrop",
        name: "dlpdrop",
        tagline: "CLI video & audio downloader",
        description:
            "A terminal tool for downloading video and audio, built on yt-dlp and ffmpeg. Published under The Octopus.",
        stack: ["Node.js", "yt-dlp", "ffmpeg", "CLI"],
        npmUrl: "https://www.npmjs.com/package/dlpdrop",
        repoUrl: "https://gitlab.com/dev.elliot.j/dlpdrop",
    },
];
