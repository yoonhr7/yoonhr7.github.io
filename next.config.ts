import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export", // 정적 HTML로 export
    images: {
        unoptimized: true, // GitHub Pages는 Next.js Image Optimization 미지원
    },
    basePath: "",
    trailingSlash: true, // URL 끝에 슬래시 추가 (GitHub Pages 호환성)
};

export default nextConfig;
