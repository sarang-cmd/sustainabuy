"use client";

import { motion, useMotionValue, useSpring, useTransform, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import React, { useRef } from "react";

interface LiquidCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    tiltIntensity?: number;
}

export function LiquidCard({ children, className, tiltIntensity = 10, ...props }: LiquidCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [tiltIntensity, -tiltIntensity]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-tiltIntensity, tiltIntensity]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseXPos = e.clientX - rect.left;
        const mouseYPos = e.clientY - rect.top;

        const xPct = mouseXPos / width - 0.5;
        const yPct = mouseYPos / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                boxShadow: "var(--liquid-shadow)",
                willChange: "transform",
            }}
            className={cn(
                "relative rounded-2xl transition-all duration-200 ease-out",
                "bg-jet-black-900/40 backdrop-blur-md border border-white/10",
                "group isolate", // Isolate for blend modes
                className
            )}
            {...props}
        >
            {/* Liquid Noise Texture Layer */}
            <div
                className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none z-0"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Shining Border Gradient */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-white/30 transition-all duration-500 z-10" />

            {/* Radial Gradient Glow on Hover */}
            <div
                className="absolute -inset-[100px] bg-gradient-to-r from-cerulean-500/0 via-cerulean-500/10 to-tropical-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl -z-10"
            />

            {/* Content Layer (Lifted) */}
            <div className="relative z-20" style={{ transform: "translateZ(20px)" }}>
                {children}
            </div>

            {/* Specular Reflection Highlight */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none z-30 mix-blend-overlay" />
        </motion.div>
    );
}
