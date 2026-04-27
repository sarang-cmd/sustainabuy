"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, ArrowRight, Leaf, ShieldCheck, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { LiquidCard } from "@/components/ui/LiquidCard";
import { ProductCard } from "@/components/product/ProductCard";
import { useRouter } from "next/navigation"; // Added useRouter import

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    // Assuming useAuth is a custom hook and needs to be imported if used.
    // For now, commenting out or removing if not defined elsewhere.
    // const { user } = useAuth();
    const router = useRouter();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const yHero = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    // Mock data for trending products
    const trendingProducts = [
        {
            id: "1",
            name: "Eco-Knit Sneaker",
            brand: "Allbirds",
            price: 98.00,
            image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800",
            score: 92,
            category: "Footwear",
            breakdown: { materials: 95, manufacturing: 88, supplyChain: 90, longevity: 85, circularity: 98 }
        },
        {
            id: "2",
            name: "Recycled Denim Jacket",
            brand: "Patagonia",
            price: 199.00,
            image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800",
            score: 88,
            category: "Clothing",
            breakdown: { materials: 95, manufacturing: 88, supplyChain: 90, longevity: 85, circularity: 98 }
        },
        {
            id: "3",
            name: "Bamboo Organic Tee",
            brand: "Organic Basics",
            price: 45.00,
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
            score: 95,
            category: "Clothing",
            breakdown: { materials: 95, manufacturing: 88, supplyChain: 90, longevity: 85, circularity: 98 }
        },
        {
            id: "4",
            name: "Solar Charging Backpack",
            brand: "Solgaard",
            price: 165.00,
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
            score: 85,
            category: "Accessories",
            breakdown: { materials: 95, manufacturing: 88, supplyChain: 90, longevity: 85, circularity: 98 }
        }
    ];

    return (
        <div ref={containerRef} className="flex flex-col gap-32 pb-32 overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Animated Background Gradients (Parallax) */}
                <motion.div
                    style={{ y: yHero }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-cerulean-500/20 rounded-full blur-[100px] animate-pulse"></div>
                    <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-tropical-teal-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
                </motion.div>

                <motion.div
                    style={{ opacity: opacityHero, y: yHero }}
                    className="container mx-auto px-4 text-center z-10 relative"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-tea-green-500 shadow-[0_0_10px_rgba(72,101,52,0.8)] animate-pulse-dot"></span>
                        <span className="text-xs font-bold text-tea-green-300 uppercase tracking-widest">AI Powered Analysis</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter leading-none"
                    >
                        Shop <span className="text-transparent bg-clip-text bg-gradient-to-r from-cerulean-400 via-tropical-teal-300 to-tea-green-400 animate-gradient-x">Consciously.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
                    >
                        Instant sustainability scoring for millions of products.
                        <br className="hidden md:block" />
                        Powered by AI to help you make choices that matter.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="max-w-3xl mx-auto relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-cerulean-500/30 to-tropical-teal-500/30 blur-3xl rounded-3xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
                        <LiquidCard className="p-2 flex flex-col md:flex-row items-center relative z-10 !bg-jet-black-950/60 !border-white/20 gap-2">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (searchQuery.trim()) router.push(`/products?q=${encodeURIComponent(searchQuery)}`);
                                }}
                                className="flex items-center w-full"
                            >
                                <Search className="ml-4 h-6 w-6 text-cerulean-400 flex-shrink-0" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for sustainable sneakers, brands, etc..."
                                    className="w-full bg-transparent border-none text-white text-lg placeholder-gray-500 focus:ring-0 px-6 py-4 font-medium outline-none"
                                />
                                <Button type="submit" className="hidden" aria-hidden="true">
                                    Search
                                </Button>
                            </form>
                            <Button
                                onClick={() => searchQuery.trim() && router.push(`/products?q=${encodeURIComponent(searchQuery)}`)}
                                className="w-full md:w-auto !rounded-xl px-10 py-7 text-lg shadow-lg shadow-cerulean-500/30 hover:scale-[1.02] active:scale-95 transition-all"
                            >
                                Search
                            </Button>
                        </LiquidCard>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="mt-16 flex flex-wrap justify-center gap-6 text-sm text-gray-400 font-medium"
                    >
                        <span className="text-gray-500">Trending:</span>
                        {["#Sneakers", "#Denim", "#ZeroWaste", "#Organic"].map((tag, i) => (
                            <Link key={i} href={`/products?q=${tag.replace('#', '')}`} className="hover:text-cerulean-300 transition-colors duration-200">
                                {tag}
                            </Link>
                        ))}
                    </motion.div>
                </motion.div>
            </section>

            {/* Value Props - Staggered Scroll Reveal */}
            <section className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Globe,
                            title: "Eco-Impact Analysis",
                            desc: "Deep supply chain analysis and footprint tracking.",
                            color: "text-cerulean-400",
                            bg: "bg-cerulean-500/20"
                        },
                        {
                            icon: Leaf,
                            title: "AI-Powered Scoring",
                            desc: "Real-time evaluation of materials and durability.",
                            color: "text-tea-green-400",
                            bg: "bg-tea-green-500/20"
                        },
                        {
                            icon: ShieldCheck,
                            title: "Verified Certifications",
                            desc: "Cross-referenced data from trusted global bodies.",
                            color: "text-tropical-teal-400",
                            bg: "bg-tropical-teal-500/20"
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <LiquidCard className="p-10 text-center h-full hover:bg-white/5 transition-colors">
                                <div className={`${item.bg} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-inner`}>
                                    <item.icon className={`h-8 w-8 ${item.color}`} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed text-lg">
                                    {item.desc}
                                </p>
                            </LiquidCard>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Trending Section - Horizontal Scroll Animation */}
            <section className="container mx-auto px-4 relative">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4"
                >
                    <h2 className="text-4xl font-bold text-white tracking-tight">Trending Sustainable Finds</h2>
                    <Link href="/products" className="text-cerulean-400 hover:text-cerulean-300 font-medium flex items-center group bg-white/5 px-6 py-3 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                        View All <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {trendingProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <ProductCard {...product} />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Newsletter / CTA */}
            <section className="container mx-auto px-4 relative mb-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <LiquidCard className="p-16 text-center relative overflow-hidden bg-gradient-to-b from-jet-black-900/80 to-jet-black-950/90">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cerulean-500/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-tea-green-500/10 rounded-full blur-[100px] -z-10 animate-pulse delay-700"></div>

                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Join the Movement</h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Get weekly sustainability tips, exclusive eco-friendly deals, and updates on the latest green innovations.
                        </p>
                        <div className="max-w-lg mx-auto flex gap-4">
                            <Input placeholder="Enter your email" className="bg-jet-black-950/50 h-14 text-lg" />
                            <Button size="lg" className="h-14 px-8 text-lg">Subscribe</Button>
                        </div>
                    </LiquidCard>
                </motion.div>
            </section>
        </div>
    );
}
