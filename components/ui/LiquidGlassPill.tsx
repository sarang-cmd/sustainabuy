"use client";

import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { ShieldCheck, Zap } from "lucide-react";
import { useUI } from "@/contexts/UIContext";

export function LiquidGlassPill() {
    const { isCompanionEnabled } = useUI();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const pillRef = useRef<HTMLDivElement>(null);

    // Spring physics for smooth following
    const springX = useSpring(0, { stiffness: 150, damping: 20 });
    const springY = useSpring(0, { stiffness: 150, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
            // Offset to follow mouse but stay a bit away
            springX.set(e.clientX + 20);
            springY.set(e.clientY + 20);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [springX, springY]);

    if (!isCompanionEnabled) return null;

    return (
        <motion.div
            ref={pillRef}
            style={{
                x: springX,
                y: springY,
                filter: "url(#liquid-displacement)",
            }}
            className="fixed top-0 left-0 z-[9999] pointer-events-none select-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-4 py-2 flex items-center gap-3 shadow-2xl relative overflow-hidden">
                {/* Internal Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-cerulean-500/20 to-tropical-teal-500/20 opacity-50" />
                
                <div className="relative flex items-center gap-3">
                    <div className="bg-cerulean-500 p-1.5 rounded-full shadow-lg shadow-cerulean-500/40">
                        <ShieldCheck className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-white/50 uppercase tracking-widest leading-none mb-0.5">SustainaMode</span>
                        <span className="text-sm font-bold text-white tracking-tight leading-none">Low Friction</span>
                    </div>
                    <div className="w-2 h-2 bg-tea-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(107,212,107,0.8)]" />
                </div>
            </div>

            {/* SVG Filter Definition */}
            <svg className="absolute w-0 h-0 invisible">
                <defs>
                    <filter id="liquid-displacement">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.01 0.05"
                            numOctaves="2"
                            result="noise"
                        >
                            <animate
                                attributeName="baseFrequency"
                                values="0.01 0.05; 0.02 0.08; 0.01 0.05"
                                dur="10s"
                                repeatCount="indefinite"
                            />
                        </feTurbulence>
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="noise"
                            scale="15"
                            xChannelSelector="R"
                            yChannelSelector="G"
                        />
                    </filter>
                </defs>
            </svg>
        </motion.div>
    );
}
