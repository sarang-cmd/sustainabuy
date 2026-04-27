import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
    title: "SustainaBuy | Eco-Conscious Shopping Assistant",
    description: "Discover verified sustainable products with AI-powered scoring.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark scroll-smooth">
            <body className={`${inter.variable} ${outfit.variable} font-sans bg-jet-black-950 text-white min-h-screen flex flex-col`}>
                <AuthProvider>
                    <CartProvider>
                        <Navbar />
                        <main className="flex-grow">
                            {children}
                        </main>
                        <Footer />
                    </CartProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
