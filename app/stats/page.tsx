"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
    Code2, 
    FileCode, 
    Clock, 
    Cpu, 
    Layers, 
    Zap, 
    Database, 
    Palette, 
    Globe, 
    Activity,
    ShieldCheck,
    CheckCircle2,
    BarChart3,
    Terminal
} from "lucide-react";
import { LiquidCard } from "@/components/ui/LiquidCard";

export default function StatsPage() {
    const stats = [
        { label: "Total Files", value: "76", icon: FileCode, color: "text-cerulean-400" },
        { label: "Lines of Code", value: "12,318", icon: Code2, color: "text-tropical-teal-400" },
        { label: "Development Time", value: "18h 45m", icon: Clock, color: "text-tea-green-400" },
        { label: "Tech Stack", value: "Next.js 15", icon: Cpu, color: "text-cerulean-400" },
        { label: "Components", value: "32", icon: Layers, color: "text-tropical-teal-400" },
        { label: "Current Version", value: "v0.4.5", icon: Activity, color: "text-tea-green-400" }
    ];

    const techStack = [
        { name: "Next.js 15", category: "Framework", status: "Stable", icon: Globe },
        { name: "TypeScript", category: "Language", status: "Strict", icon: Terminal },
        { name: "TailwindCSS", category: "Styling", status: "Optimized", icon: Palette },
        { name: "Framer Motion", category: "Animations", status: "Liquid", icon: Zap },
        { name: "Firebase", category: "Backend", status: "Live", icon: Database },
        { name: "Lucide React", category: "Icons", status: "Dynamic", icon: ShieldCheck }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="min-h-screen bg-jet-black-950 text-white pt-24 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-20"
                >
                    <div className="inline-block px-4 py-1.5 rounded-full bg-cerulean-500/10 border border-cerulean-500/30 text-cerulean-400 text-[10px] font-black uppercase tracking-[3px] mb-6">
                        System Overview
                    </div>
                    <h1 className="text-6xl lg:text-8xl font-black tracking-tighter mb-6 leading-none">
                        Project <span className="bg-gradient-to-r from-cerulean-400 to-tropical-teal-300 bg-clip-text text-transparent">Statistics</span>
                    </h1>
                    <p className="text-gray-400 text-xl max-w-3xl leading-relaxed">
                        A real-time breakdown of the SustainaBuy ecosystem, including code metrics, architecture choices, and development progress.
                    </p>
                </motion.div>

                {/* Main Stats Grid */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
                >
                    {stats.map((stat, i) => (
                        <motion.div key={i} variants={itemVariants}>
                            <LiquidCard className="p-8 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-cerulean-500/5 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-cerulean-500/10 transition-all" />
                                <div className="flex items-center gap-5 mb-6">
                                    <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${stat.color}`}>
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-sm font-bold text-gray-500 uppercase tracking-[2px]">{stat.label}</span>
                                </div>
                                <div className="text-4xl font-black tracking-tight">{stat.value}</div>
                            </LiquidCard>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Tech Stack & System Health */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Tech Stack */}
                    <motion.div 
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="lg:col-span-8 space-y-8"
                    >
                        <h3 className="text-2xl font-bold flex items-center gap-3">
                            <BarChart3 className="w-6 h-6 text-cerulean-400" />
                            Architecture Stack
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {techStack.map((tech, i) => (
                                <div key={i} className="flex items-center justify-between p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                                            <tech.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-white">{tech.name}</div>
                                            <div className="text-xs text-gray-500">{tech.category}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-tea-green-500/10 border border-tea-green-500/20 text-[10px] font-bold text-tea-green-400 uppercase tracking-widest">
                                        <CheckCircle2 className="w-3 h-3" />
                                        {tech.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* System Log */}
                    <motion.div 
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="lg:col-span-4"
                    >
                        <div className="glass-card p-8 rounded-[32px] border-white/5 bg-white/[0.02] h-full">
                            <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                                <Terminal className="w-5 h-5 text-gray-500" />
                                Deployment Log
                            </h3>
                            <div className="space-y-6 font-mono text-[11px]">
                                <div className="flex gap-4">
                                    <span className="text-cerulean-500 whitespace-nowrap">[17:24:45]</span>
                                    <span className="text-gray-400">Project stats initialized...</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-cerulean-500 whitespace-nowrap">[17:21:35]</span>
                                    <span className="text-gray-400">V3 Cart Logic: DEPLOYED</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-cerulean-500 whitespace-nowrap">[17:20:07]</span>
                                    <span className="text-gray-400">Liquid Mode Toggle: ACTIVE</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-cerulean-500 whitespace-nowrap">[17:19:34]</span>
                                    <span className="text-gray-400">Toast system integrated.</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-cerulean-500 whitespace-nowrap">[17:05:12]</span>
                                    <span className="text-gray-400">Hydration mismatch: RESOLVED</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-cerulean-500 whitespace-nowrap">[16:45:22]</span>
                                    <span className="text-gray-400">Seeding Data Bank... DONE</span>
                                </div>
                                <div className="pt-4 mt-4 border-t border-white/5">
                                    <div className="flex items-center gap-2 text-tea-green-400 font-bold">
                                        <div className="w-2 h-2 bg-tea-green-500 rounded-full animate-pulse" />
                                        System Online
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
