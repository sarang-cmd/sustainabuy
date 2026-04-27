"use client";

import { LiquidCard } from "@/components/ui/LiquidCard";
import { Leaf, Recycle, Droplets, Zap, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function DatabankPage() {
    const topics = [
        {
            title: "Carbon Footprint",
            icon: <Zap className="h-6 w-6 text-yellow-400" />,
            description: "Understanding the total greenhouse gas emissions caused by an individual, event, organization, service, or product.",
            link: "#"
        },
        {
            title: "Water Usage",
            icon: <Droplets className="h-6 w-6 text-blue-400" />,
            description: "The amount of water used in the production process, and the impact on local water sources and ecosystems.",
            link: "#"
        },
        {
            title: "Material Circularity",
            icon: <Recycle className="h-6 w-6 text-green-400" />,
            description: "Designing products to be reused, repaired, or recycled, minimizing waste and resource extraction.",
            link: "#"
        },
        {
            title: "Fair Labor",
            icon: <Leaf className="h-6 w-6 text-tea-green-400" />,
            description: "Ensuring fair wages, safe working conditions, and workers' rights throughout the supply chain.",
            link: "#"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Sustainability Data Bank</h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                    Explore our comprehensive library of sustainability knowledge. Learn how we score products and understand the impact of your choices.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
                {topics.map((topic, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.15 }}
                    >
                        <LiquidCard className="p-10 h-full group hover:bg-white/5 transition-all duration-500">
                            <div className="flex flex-col h-full">
                                <div className="p-4 bg-white/5 rounded-2xl w-fit mb-6 group-hover:bg-cerulean-500/10 transition-colors duration-500 border border-white/5">
                                    {topic.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cerulean-300 transition-colors">
                                    {topic.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed flex-grow text-lg">
                                    {topic.description}
                                </p>
                                <div className="mt-8 flex items-center text-sm text-cerulean-400 font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                                    Explore Library <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
                                </div>
                            </div>
                        </LiquidCard>
                    </motion.div>
                ))}
            </div>

            <LiquidCard className="p-12 relative overflow-hidden group">
                {/* Background Decor */}
                <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] bg-cerulean-500/10 rounded-full blur-[120px] -z-10 group-hover:bg-cerulean-500/20 transition-colors duration-1000"></div>

                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    <div className="lg:w-2/3">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-cerulean-500/10 rounded-xl">
                                <BookOpen className="h-8 w-8 text-cerulean-400" />
                            </div>
                            <h2 className="text-3xl font-bold text-white tracking-tight">
                                AI-Powered Scoring Engine
                            </h2>
                        </div>
                        <p className="text-gray-400 text-xl leading-relaxed mb-8">
                            Our proprietary engine ingest signals from thousands of verified sustainability sources.
                            We don&apos;t just look at what brands say &mdash; we look at what they do.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[
                                { id: "sources", label: "Verified Sources", detail: "Connecting to 1,200+ global ESG report archives..." },
                                { id: "audit", label: "Supply Chain Audit", detail: "Analyzing raw material extraction and tier-1 factory logs..." },
                                { id: "carbon", label: "Carbon Analysis", detail: "Calculating CO2e intensity using current energy grid factors..." }
                            ].map((tag) => (
                                <button
                                    key={tag.id}
                                    onClick={() => alert(tag.detail)}
                                    className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-gray-300 font-medium text-center hover:bg-cerulean-500/20 hover:border-cerulean-500/30 hover:text-white transition-all active:scale-95"
                                >
                                    {tag.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="lg:w-1/3 flex justify-center">
                        <div className="relative w-48 h-48 flex items-center justify-center">
                            {/* Decorative rings */}
                            <div className="absolute inset-0 border-2 border-white/5 rounded-full"></div>
                            <div className="absolute inset-4 border-2 border-white/10 rounded-full border-dashed"></div>
                            <div className="absolute inset-0 border-2 border-cerulean-500/30 rounded-full border-t-cerulean-500 animate-[spin_3s_linear_infinite]"></div>

                            <div className="flex flex-col items-center">
                                <span className="text-4xl font-black text-white bg-clip-text">SB</span>
                                <span className="text-xs font-bold text-cerulean-400 uppercase tracking-tighter">Engine V2.0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </LiquidCard>
        </div>
    );
}
