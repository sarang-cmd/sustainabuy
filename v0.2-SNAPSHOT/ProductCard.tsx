"use client";

import Link from "next/link";
import { LiquidCard } from "@/components/ui/LiquidCard";
import { Leaf } from "lucide-react";

interface ProductCardProps {
    id: string;
    name: string;
    brand: string;
    price: number;
    image: string;
    score: number;
}

export function ProductCard({ id, name, brand, price, image, score }: ProductCardProps) {
    // Determine color based on score
    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-tea-green-500";
        if (score >= 60) return "text-yellow-500";
        return "text-red-500";
    };

    return (
        <Link href={`/products/${id}`}>
            <LiquidCard className="group h-full flex flex-col overflow-hidden">
                <div className="aspect-square overflow-hidden bg-white/5 relative">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3 bg-jet-black-900/80 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1.5">
                        <Leaf className={`h-3 w-3 ${getScoreColor(score)}`} />
                        <span className={`text-xs font-bold ${getScoreColor(score)}`}>{score}</span>
                    </div>
                </div>
                <div className="p-4 flex-grow flex flex-col">
                    <div className="text-xs text-gray-400 font-medium uppercase tracking-widest mb-1">{brand}</div>
                    <h3 className="text-white font-bold text-lg mb-2 line-clamp-1 group-hover:text-cerulean-400 transition-colors">{name}</h3>
                    <div className="mt-auto flex items-center justify-between">
                        <span className="text-cerulean-300 font-bold">${price}</span>
                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">View Details</div>
                    </div>
                </div>
            </LiquidCard>
        </Link>
    );
}
