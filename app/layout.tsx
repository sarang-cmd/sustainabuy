import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/Providers";
import { PageWrapper } from "@/components/ui/PageWrapper";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "SustainaBuy - Sustainable Shopping Assistant",
    description: "Your AI-powered companion for eco-friendly shopping decisions. Track carbon footprints and discover sustainable alternatives.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} font-inter antialiased bg-jet-black-950 text-white min-h-screen`} suppressHydrationWarning>
                <Providers>
                    <Navbar />
                    <PageWrapper>
                        {children}
                    </PageWrapper>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
