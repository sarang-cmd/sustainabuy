import { Shield, Eye, Lock, Globe } from "lucide-react";
import { LiquidCard } from "@/components/ui/LiquidCard";

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-3xl">
            <header className="mb-16">
                <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
                <p className="text-gray-500 text-sm uppercase tracking-widest">Last Updated: February 2026</p>
            </header>

            <div className="space-y-12 leading-relaxed">
                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-cerulean-500/10">
                            <Eye className="h-5 w-5 text-cerulean-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Data We Collect</h2>
                    </div>
                    <p className="text-gray-400 mb-4">
                        To provide the SustainaBuy experience, we collect specific information about your interactions with the platform:
                    </p>
                    <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                        <li>Account Information: Name, email, and social profile data for authentication.</li>
                        <li>Discovery Data: Recently viewed products and search history to improve recommendations.</li>
                        <li>Product Feedback: Custom scores and data submitted to our AI scanner.</li>
                    </ul>
                </section>

                <LiquidCard className="p-8 border-cerulean-500/20 bg-cerulean-500/5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-cerulean-500/20">
                            <Lock className="h-5 w-5 text-cerulean-400" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Your Security</h2>
                    </div>
                    <p className="text-gray-400 text-sm">
                        All personal data is encrypted and stored using Google Firebase. We never sell your personal shopping habits to third-party advertisers. Our revenue is driven by affiliate transparency, not data brokerage.
                    </p>
                </LiquidCard>

                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-tea-green-500/10">
                            <Globe className="h-5 w-5 text-tea-green-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Third-Party Services</h2>
                    </div>
                    <p className="text-gray-400">
                        We use Firebase for authentication and database management. When you click on a seller's link, you are redirected to their platform, which maintains its own privacy policies.
                    </p>
                </section>

                <footer className="pt-12 border-t border-white/5 text-center">
                    <p className="text-sm text-gray-500 mb-4">Questions about your data?</p>
                    <a href="mailto:privacy@sustainabuy.example.com" className="text-cerulean-400 hover:text-cerulean-300 font-medium transition-colors">
                        privacy@sustainabuy.example.com
                    </a>
                </footer>
            </div>
        </div>
    );
}
