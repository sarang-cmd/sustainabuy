"use client";

import Link from "next/link";
import { LiquidCard } from "@/components/ui/LiquidCard";
import { Leaf, ShieldCheck } from "lucide-react";

interface ProductCardProps {
    id: string;
    name: string;
    brand: string;
    price: number;
    image: string;
    score: number;
    isVerified?: boolean;
}

export function ProductCard({ id, name, brand, price, image, score, isVerified }: ProductCardProps) {
    // Determine color based on score
    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-tea-green-500 bg-tea-green-500/10 border-tea-green-500/20";
        if (score >= 60) return "text-muted-teal-400 bg-muted-teal-400/10 border-muted-teal-400/20";
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
    };

    return (
        <Link href={`/products/${id}`} className="block group">
            <LiquidCard tiltIntensity={12} className="h-full transition-all duration-300 group-hover:bg-jet-black-900/60 overflow-hidden">
                <div className="relative aspect-square bg-white/5 rounded-t-2xl overflow-hidden">
                    {/* Placeholder for image - in real app would use Next Image */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500 bg-jet-black-800 pointer-events-none">
                        <span className="text-[10px] tracking-tight opacity-50 uppercase">{name}</span>
                    </div>
                    <div className="absolute inset-0 z-10 p-2 pointer-events-none">
                        <div
                            className="w-full h-full transition-all duration-700 group-hover:scale-110 will-change-transform"
                            style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
                        >
                            <img
                                src={image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800"}
                                alt={name}
                                className="object-cover w-full h-full"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800'; // Default shoe
                                }}
                            />
                        </div>
                    </div>
                    <div className="absolute top-3 right-3 z-20">
                        <div className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full border backdrop-blur-md shadow-sm ${getScoreColor(score)}`}>
                            {isVerified ? <ShieldCheck className="h-3.5 w-3.5" /> : <Leaf className="h-3.5 w-3.5" />}
                            <span className="text-xs font-bold leading-none">{score}</span>
                        </div>
                    </div>
                </div>
                <div className="p-4">
                    <p className="text-xs text-cerulean-400 mb-1 font-medium tracking-wide uppercase">{brand}</p>
                    <h3 className="text-white font-medium mb-2 truncate group-hover:text-cerulean-300 transition-colors">{name}</h3>
                    <div className="bg-tea-green-500/20 px-3 py-1 rounded-full flex items-center gap-2 border border-tea-green-500/30 mb-4">
                        {isVerified ? <ShieldCheck className="h-4 w-4 text-tea-green-400" /> : <Leaf className="h-4 w-4 text-tea-green-400" />}
                        <span className="text-tea-green-400 font-bold text-sm">Score: {score}/100</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-white">${price.toFixed(2)}</span>
                        <div className="text-xs text-gray-500">
                            View Details &rarr;
                        </div>
                    </div>
                </div>
            </LiquidCard>
        </Link>
    );
}
