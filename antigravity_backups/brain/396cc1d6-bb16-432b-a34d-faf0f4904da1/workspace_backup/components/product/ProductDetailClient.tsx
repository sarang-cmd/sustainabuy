"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ShieldCheck,
    Leaf,
    Star,
    ShoppingCart,
    ChevronRight,
    ExternalLink,
    ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { Product } from "@/lib/db";
import { MultiStageLoader } from "@/components/ui/MultiStageLoader";

interface ProductDetailClientProps {
    id: string;
}

export function ProductDetailClient({ id }: ProductDetailClientProps) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedSeller, setSelectedSeller] = useState("EcoStride");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { getProduct } = await import("@/lib/db");
                const data = await getProduct(id);
                if (data) {
                    setProduct(data);
                } else {
                    setError("Product not found in our sustainability records.");
                }
            } catch (err: any) {
                console.error("Fetch error:", err);
                if (err.code === "unavailable" || err.message?.includes("offline")) {
                    setError("Neural Link Failed: You are currently offline and this product isn't in your local cache.");
                } else {
                    setError("An unexpected error occurred while analyzing the product.");
                }
            }
        };

        fetchProduct();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return <MultiStageLoader onComplete={() => setLoading(false)} duration={1800} />;
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-[#0d1a1a] flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                    <Leaf className="w-10 h-10 text-gray-600" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">{error || "Product Not Found"}</h2>
                <p className="text-gray-400 max-w-md mb-8">
                    We couldn't retrieve the transparency data for this item. Please check your connection or try another product.
                </p>
                <Link href="/products">
                    <button className="bg-cerulean-500 text-white px-8 py-3 rounded-full font-bold shadow-xl shadow-cerulean-500/20">
                        Back to Library
                    </button>
                </Link>
            </div>
        );
    }

    const Orb = ({ fill = 100, size = "md" }: { fill?: number, size?: "sm" | "md" | "lg" }) => {
        const dimensions = size === "lg" ? "w-5.5 h-5.5" : "w-4.5 h-4.5";
        const borderClass = fill > 0 ? "border-cerulean-500/60 shadow-[0_0_7px_rgba(91,184,196,0.3)]" : "border-cerulean-500/40";

        return (
            <div className={`${dimensions} rounded-full border-1.5 bg-white/5 overflow-hidden relative flex-shrink-0 ${borderClass}`}>
                <div
                    className="absolute inset-0 bg-gradient-to-r from-cerulean-500 to-tea-green-500 rounded-full"
                    style={{ width: `${fill}%` }}
                />
            </div>
        );
    };

    const ScorePill = ({ score }: { score: number }) => {
        const orbCount = 5;
        const normalizedScore = (score / 100) * orbCount;

        return (
            <div className="flex items-center gap-2.5 bg-tea-green-500/10 border border-tea-green-500/20 rounded-full px-3.5 py-1.5">
                <div className="flex gap-1.25 items-center">
                    {Array.from({ length: orbCount }).map((_, i) => {
                        const fill = Math.max(0, Math.min(100, (normalizedScore - i) * 100));
                        return <Orb key={i} fill={fill} />;
                    })}
                </div>
                <span className="text-xs font-bold text-tea-green-500">{(score / 20).toFixed(2)} / 5</span>
            </div>
        );
    };

    const sellers = [
        { name: "EcoStride", price: product.price, rating: 4.4, reviews: 312 },
        { name: "GreenShop", price: product.price + 5.99, rating: 4.2, reviews: 145 },
        { name: "NaturalFit", price: product.price + 12.50, rating: 4.8, reviews: 89 }
    ];

    return (
        <div className="min-h-screen bg-[#0d1a1a] text-[#e8f0ef] font-inter relative overflow-x-hidden pb-20">
            {/* Background Decor */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[70%] h-[55%] bg-[radial-gradient(ellipse_at_center,rgba(30,90,85,0.32)_0%,transparent_70%)]" />
                <div className="absolute top-[70%] left-[80%] -translate-x-1/2 -translate-y-1/2 w-[40%] h-[30%] bg-[radial-gradient(ellipse_at_center,rgba(20,70,65,0.18)_0%,transparent_60%)]" />
            </div>

            <div className="container mx-auto px-8 max-w-[1200px] relative z-10">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-[13px] text-[#5a8a88] py-4.5">
                    <Link href="/" className="hover:text-cerulean-400 transition-colors">Home</Link>
                    <span className="text-[#3a6a68]">›</span>
                    <Link href="/products" className="hover:text-cerulean-400 transition-colors">Products</Link>
                    <span className="text-[#3a6a68]">›</span>
                    <span className="hover:text-cerulean-400 transition-colors capitalize">{product.category}</span>
                    <span className="text-[#3a6a68]">›</span>
                    <span className="text-[#8aacaa] cursor-default">{product.name}</span>
                </div>

                {/* Main Product Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[520px_1fr] border border-white/10 rounded-[18px] overflow-hidden bg-white/[0.02] backdrop-blur-sm">

                    {/* LEFT COLUMN */}
                    <div className="border-r border-white/10 flex flex-col bg-white/[0.015]">
                        {/* Hero Image Area */}
                        <div className="p-7 flex items-center justify-center min-h-[480px] relative">
                            <div className="w-full h-full min-h-[380px] border border-white/10 rounded-xl bg-white/[0.03] flex items-center justify-center relative overflow-hidden group">
                                <span className="absolute top-3.5 left-3.5 z-20 bg-gradient-to-br from-tea-green-500/20 to-cerulean-500/20 border border-tea-green-500/40 rounded-full px-3 py-1 text-[11px] font-bold tracking-[1px] text-tea-green-400 uppercase">
                                    🌿 {product.isVerified ? "Verified Sustainable" : "Eco Certified"}
                                </span>

                                <div className="w-[85%] h-[85%] flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="max-w-full max-h-full object-contain drop-shadow-[0_28px_56px_rgba(0,0,0,0.6)]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Price + Score Pill */}
                        <div className="px-7 py-4 border-t border-white/10 flex items-center justify-between bg-white/[0.02]">
                            <div>
                                <span className="text-2xl font-extrabold text-white">${product.price}</span>
                                <span className="text-[13px] text-[#4a7a78] line-through ml-2">${(product.price * 1.25).toFixed(2)}</span>
                            </div>
                            <ScorePill score={product.score} />
                        </div>

                        {/* Left Seller CTAs */}
                        <div className="px-7 py-4 border-t border-white/10 flex gap-2.5">
                            {sellers.map(s => (
                                <button
                                    key={s.name}
                                    onClick={() => setSelectedSeller(s.name)}
                                    className={`flex-1 py-2.5 rounded-lg text-[13px] font-semibold transition-all border ${selectedSeller === s.name
                                        ? "bg-cerulean-500/10 border-cerulean-500/40 text-white"
                                        : "bg-white/[0.04] border-white/10 text-[#8aacaa] hover:border-cerulean-500/40 hover:text-white"
                                        }`}
                                >
                                    {s.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="flex flex-col">
                        {/* Title Section */}
                        <div className="p-7 pb-5 border-b border-white/10">
                            <div className="flex items-start justify-between gap-4 mb-2">
                                <h1 className="text-[26px] font-extrabold tracking-tight text-white leading-[1.15]">
                                    {product.name}
                                </h1>
                                <span className="bg-gradient-to-br from-cerulean-500 to-cerulean-600 rounded-full px-5 py-2 text-base font-extrabold text-white whitespace-nowrap">
                                    ${product.price}
                                </span>
                            </div>
                            <div className="text-sm text-[#6a9a98] mb-2">
                                Was <strong className="text-[#c8dede] font-semibold">${(product.price * 1.25).toFixed(2)}</strong> &nbsp;·&nbsp; Save <strong className="text-[#c8dede] font-semibold">${(product.price * 0.25).toFixed(2)} (20%)</strong>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-[13.5px] text-[#7aacaa] font-medium">Sold by {selectedSeller}™ Collection</span>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4].map(i => (
                                        <Star key={i} className="w-3.5 h-3.5 fill-tea-green-500 text-tea-green-500" />
                                    ))}
                                    <Star className="w-3.5 h-3.5 text-tea-green-500/45" />
                                    <span className="text-[12.5px] text-[#5a8a88] ml-0.5">4.4 (312 reviews)</span>
                                </div>
                            </div>
                        </div>

                        {/* Description Section */}
                        <div className="p-7 py-5 border-b border-white/10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                <div>
                                    <div className="text-[11px] font-bold tracking-[0.8px] uppercase text-[#5a8a88] mb-1.5">Material</div>
                                    <p className="text-[13.5px] text-[#8aacaa] leading-relaxed">
                                        {product.description.split('.')[0]}.
                                    </p>
                                </div>
                                <div>
                                    <div className="text-[11px] font-bold tracking-[0.8px] uppercase text-[#5a8a88] mb-1.5">Highlights</div>
                                    <p className="text-[13.5px] text-[#8aacaa] leading-relaxed">
                                        {product.description.split('.').slice(1).join('.') || "Eco-certified manufacturing process and zero-waste packaging."}
                                    </p>
                                </div>
                            </div>
                            <button className="inline-flex items-center gap-2 bg-gradient-to-br from-cerulean-500 to-cerulean-600 rounded-full px-7 py-3 text-[14.5px] font-bold text-white hover:opacity-90 transition-opacity">
                                <ShoppingCart className="w-4 h-4" />
                                Buy Now
                            </button>
                        </div>

                        {/* Right Seller Selector */}
                        <div className="p-7 py-4 border-b border-white/10 flex gap-2.5">
                            {sellers.map(s => (
                                <button
                                    key={`r-${s.name}`}
                                    onClick={() => setSelectedSeller(s.name)}
                                    className={`flex-1 py-2.5 rounded-lg text-[13.5px] font-semibold transition-all border ${selectedSeller === s.name
                                        ? "bg-cerulean-500/10 border-cerulean-500/40 text-cerulean-400"
                                        : "bg-white/[0.04] border-white/10 text-[#8aacaa] hover:border-cerulean-500/40 hover:text-white hover:bg-cerulean-500/5"
                                        }`}
                                >
                                    {s.name}
                                </button>
                            ))}
                        </div>

                        {/* Bottom Info Grid */}
                        <div className="p-4 px-7 pb-7 grid grid-cols-1 md:grid-cols-2 gap-3">
                            {/* Sustainability Box */}
                            <div className="bg-tea-green-500/[0.05] border border-tea-green-500/20 rounded-xl p-4.5">
                                <div className="text-[12px] font-bold tracking-[0.8px] uppercase text-tea-green-500 flex items-center gap-1.5 mb-3.5">
                                    <div className="w-1.5 h-1.5 bg-tea-green-400 rounded-full animate-pulse shadow-[0_0_4px_#6bd46b]" />
                                    Sustainability Info
                                </div>

                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex gap-1.75">
                                        {Array.from({ length: 5 }).map((_, i) => {
                                            const fill = Math.max(0, Math.min(100, ((product.score / 20) - i) * 100));
                                            return <Orb key={i} fill={fill} size="lg" />;
                                        })}
                                    </div>
                                    <div className="text-xl font-extrabold text-white tracking-tight">
                                        {(product.score / 20).toFixed(2)} <span className="text-[12px] text-[#5a8a88] font-medium">/ 5</span>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-3">
                                    {Object.entries(product.breakdown || {}).slice(0, 3).map(([key, val]) => (
                                        <div key={key} className="flex items-center justify-between gap-2">
                                            <span className="text-[11.5px] text-[#6a9a98] capitalize w-20">{key}</span>
                                            <div className="flex-1 h-[3px] bg-white/10 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-cerulean-500 to-tea-green-500 rounded-full"
                                                    style={{ width: `${val}%` }}
                                                />
                                            </div>
                                            <span className="text-[11.5px] text-[#8aacaa] font-bold w-6 text-right">{(val / 20).toFixed(1)}</span>
                                        </div>
                                    ))}
                                </div>

                                <p className="text-[12px] text-[#6a9a98] leading-relaxed border-t border-tea-green-500/10 pt-2.5 mt-0.5">
                                    Verified via <strong className="text-[#9abcaa] font-semibold">SB Core Engine</strong> analysis. This product meets or exceeds our Tier-1 transparency requirements.
                                </p>
                            </div>

                            {/* Other Sellers Box */}
                            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4.5">
                                <div className="text-[12px] font-bold tracking-[0.8px] uppercase text-[#5a8a88] mb-3.5">Compare Offers</div>

                                <div className="space-y-0.5">
                                    {sellers.map((s, idx) => (
                                        <div key={s.name} className={`flex items-center justify-between py-2.5 ${idx !== sellers.length - 1 ? 'border-b border-white/[0.05]' : ''}`}>
                                            <div className="flex items-center gap-2.5">
                                                <div className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? 'bg-cerulean-500' : idx === 1 ? 'bg-tea-green-500' : 'bg-yellow-500'}`} />
                                                <span className="text-[13px] text-[#8aacaa] font-medium">{s.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2.5">
                                                <span className="text-[13px] text-[#c8dede] font-bold">${s.price.toFixed(2)}</span>
                                                <button className="bg-cerulean-500/10 border border-cerulean-500/30 rounded-md px-3 py-1.5 text-[11.5px] font-bold text-cerulean-400 hover:bg-cerulean-500/20 transition-all">
                                                    View
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Link href="/compare" className="block text-center mt-3 text-[12.5px] text-[#4a8a88] hover:text-cerulean-400 font-medium transition-colors">
                                    View 12 more offers &rarr;
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
