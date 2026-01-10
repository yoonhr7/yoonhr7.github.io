import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // 개발 모드에서는 output: 'export'를 비활성화
    ...(process.env.NODE_ENV === 'production' && { output: "export" }),
    images: {
        unoptimized: true, // GitHub Pages는 Next.js Image Optimization 미지원
    },
    basePath: "",
    trailingSlash: true, // URL 끝에 슬래시 추가 (GitHub Pages 호환성)
};

export default nextConfig;
