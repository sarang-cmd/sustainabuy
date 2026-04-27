import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Providers } from '@/components/Providers';

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
        <html lang="en" suppressHydrationWarning>
            <body className="flex flex-col min-h-screen" suppressHydrationWarning>
                <Providers>
                    <Navbar />
                    <main className="flex-grow pt-4">
                        {children}
                    </main>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
