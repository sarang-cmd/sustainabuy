import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';

export const metadata: Metadata = {
    title: 'SustainaBuy - Sustainable Shopping Assistant',
    description: 'Shop smarter and more sustainably with AI-powered insights.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="flex flex-col min-h-screen">
                <AuthProvider>
                    <CartProvider>
                        <Navbar />
                        <main className="flex-grow pt-4">
                            {children}
                        </main>
                        <Footer />
                    </CartProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
