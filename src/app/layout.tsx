import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/font.scss";
import "@/styles/common.scss";
import "@/styles/global.scss";
import MainLayout from "@/components/MainLayout";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "yoonhr's devlog",
    description: "A developer's journal sharing insights, tutorials, and experiences in coding and technology.",
    icons: {
        icon: "/favicon.svg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <MainLayout>{children}</MainLayout>
            </body>
        </html>
    );
}
