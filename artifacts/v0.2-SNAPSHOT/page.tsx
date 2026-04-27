import { Leaf, Search, Scan, Zap, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { LiquidCard } from "@/components/ui/LiquidCard";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-jet-black-950">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
                            Shop <span className="text-cerulean-400">Consciously</span>, <br />
                            Live Sustainably.
                        </h1>
                        <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                            The AI-powered assistant that scans, scores, and suggests
                            the most sustainable products for your lifestyle.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/products">
                                <Button size="lg" className="px-8 py-7 rounded-2xl text-lg flex items-center gap-2">
                                    Browse Marketplace <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/add-product">
                                <Button variant="secondary" size="lg" className="px-8 py-7 rounded-2xl text-lg border-white/5 bg-white/5 hover:bg-white/10">
                                    <Scan className="h-5 w-5 mr-2" /> Scan a Product
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Decorative background elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0">
                    <div className="absolute top-[10%] left-[20%] w-64 h-64 bg-cerulean-500/10 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-[20%] right-[20%] w-96 h-96 bg-tea-green-500/10 rounded-full blur-[100px]"></div>
                </div>
            </section>

            {/* Features Preview */}
            <section className="py-20 bg-white/5 border-y border-white/5">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <LiquidCard className="p-8">
                            <div className="bg-cerulean-500/10 p-3 rounded-xl w-fit mb-6">
                                <Zap className="h-6 w-6 text-cerulean-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">AI-Powered Analysis</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Our neural engine analyzes thousands of data points to give you an accurate sustainability score instantly.
                            </p>
                        </LiquidCard>

                        <LiquidCard className="p-8">
                            <div className="bg-cerulean-500/10 p-3 rounded-xl w-fit mb-6">
                                <Shield className="h-6 w-6 text-cerulean-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Verified Transparency</h3>
                            <p className="text-gray-400 leading-relaxed">
                                We partner with certified eco-labels to ensure the products you buy are as green as they claim to be.
                            </p>
                        </LiquidCard>

                        <LiquidCard className="p-8">
                            <div className="bg-cerulean-500/10 p-3 rounded-xl w-fit mb-6">
                                <Leaf className="h-6 w-6 text-cerulean-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Circular Rewards</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Earn points for every sustainable choice you make and unlock exclusive discounts from top eco-brands.
                            </p>
                        </LiquidCard>
                    </div>
                </div>
            </section>
        </div>
    );
}
