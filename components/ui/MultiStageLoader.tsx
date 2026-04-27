"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Search, Zap, CheckCircle2 } from "lucide-react";

interface MultiStageLoaderProps {
    onComplete?: () => void;
    duration?: number;
}

const STAGES = [
    { id: 1, text: "Locating secure data nodes...", icon: Search, color: "text-cerulean-400" },
    { id: 2, text: "Decrypting sustainability reports...", icon: Shield, color: "text-tropical-teal-400" },
    { id: 3, text: "Validating ethical certifications...", icon: Zap, color: "text-tea-green-400" },
    { id: 4, text: "Finalizing transparency score...", icon: CheckCircle2, color: "text-white" }
];

export function MultiStageLoader({ onComplete, duration }: MultiStageLoaderProps) {
    const [currentStage, setCurrentStage] = useState(0);

    useEffect(() => {
        const stageDuration = duration ? duration / STAGES.length : 450;
        if (currentStage < STAGES.length) {
            const timer = setTimeout(() => {
                setCurrentStage(prev => prev + 1);
            }, stageDuration);
            return () => clearTimeout(timer);
        } else {
            const finalTimer = setTimeout(() => {
                if (onComplete) onComplete();
            }, 300);
            return () => clearTimeout(finalTimer);
        }
    }, [currentStage, onComplete, duration]);

    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-jet-black-950/90 backdrop-blur-xl">
            {/* Background Decor */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-cerulean-500/5 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-tea-green-500/5 rounded-full blur-[100px] animate-pulse delay-700"></div>
            </div>

            <div className="relative w-80 space-y-8 text-center">
                <div className="relative h-24 w-24 mx-auto mb-12">
                    {/* Pulsing rings */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 border-2 border-cerulean-500/20 rounded-full"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0, 0.2] }}
                        transition={{ repeat: Infinity, duration: 2.5 }}
                        className="absolute inset-[-10px] border border-cerulean-500/10 rounded-full"
                    />

                    {/* Center Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStage < STAGES.length ? currentStage : "done"}
                                initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                exit={{ scale: 1.5, opacity: 0, rotate: 45 }}
                                className="p-5 bg-white/5 border border-white/10 rounded-3xl"
                            >
                                {currentStage < STAGES.length ? (
                                    React.createElement(STAGES[currentStage].icon, {
                                        className: `h-10 w-10 ${STAGES[currentStage].color}`
                                    })
                                ) : (
                                    <CheckCircle2 className="h-10 w-10 text-tea-green-400" />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <div className="space-y-4">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={currentStage < STAGES.length ? currentStage : "done"}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="text-white font-bold tracking-tight uppercase text-xs"
                        >
                            {currentStage < STAGES.length ? STAGES[currentStage].text : "Verification Complete"}
                        </motion.p>
                    </AnimatePresence>

                    {/* Progress Dots */}
                    <div className="flex justify-center gap-2">
                        {STAGES.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1 rounded-full transition-all duration-500 ${i <= currentStage
                                        ? "w-8 bg-cerulean-500 shadow-[0_0_10px_rgba(80,151,175,0.5)]"
                                        : "w-2 bg-white/10"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                <div className="pt-8">
                    <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em] font-black animate-pulse">
                        Neural Engine V4.2 Protocol
                    </p>
                </div>
            </div>
        </div>
    );
}
