import { Rocket, Heart, Zap, Coffee } from "lucide-react";
import { LiquidCard } from "@/components/ui/LiquidCard";
import { Button } from "@/components/ui/Button";

export default function CareersPage() {
    const roles = [
        { title: "AI Research Engineer", type: "Full-time", location: "Remote / Berlin", icon: Rocket },
        { title: "Sustainability Analyst", type: "Full-time", location: "Remote", icon: Heart },
        { title: "Lead Frontend Artisan", type: "Contract", location: "Remote", icon: Zap },
    ];

    return (
        <div className="container mx-auto px-4 py-20 max-w-5xl">
            <header className="text-center mb-20 animate-in fade-in slide-in-from-top-10 duration-700">
                <span className="text-cerulean-400 font-bold uppercase tracking-widest text-xs mb-4 block">Join the Squad</span>
                <h1 className="text-5xl font-bold text-white mb-6">Let's build the future of commerce together.</h1>
                <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
                    We're looking for passionate individuals who care about the planet and want to build tools that matter.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                <div className="p-8 rounded-3xl bg-white/5 border border-white/5 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-cerulean-500/10 flex items-center justify-center mx-auto mb-4">
                        <Coffee className="h-6 w-6 text-cerulean-400" />
                    </div>
                    <h3 className="text-white font-bold mb-2">Remote-First</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">Work from anywhere. We value results over time zones.</p>
                </div>
                <div className="p-8 rounded-3xl bg-white/5 border border-white/5 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-tea-green-500/10 flex items-center justify-center mx-auto mb-4">
                        <Heart className="h-6 w-6 text-tea-green-400" />
                    </div>
                    <h3 className="text-white font-bold mb-2">Impact Driven</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">Every line of code you write helps a consumer choose better.</p>
                </div>
                <div className="p-8 rounded-3xl bg-white/5 border border-white/5 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center mx-auto mb-4">
                        <Zap className="h-6 w-6 text-yellow-500" />
                    </div>
                    <h3 className="text-white font-bold mb-2">Modern Stack</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">Next.js 14, Tailwind, AI, and Firebase. No legacy baggage.</p>
                </div>
            </div>

            <section>
                <h2 className="text-3xl font-bold text-white mb-10">Open Roles</h2>
                <div className="space-y-4">
                    {roles.map((role) => (
                        <LiquidCard key={role.title} className="p-6 group hover:bg-white/10 transition-all">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <role.icon className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">{role.title}</h4>
                                        <div className="flex gap-3 mt-1">
                                            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{role.type}</span>
                                            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">/</span>
                                            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{role.location}</span>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="secondary" className="group-hover:bg-cerulean-500 group-hover:text-white transition-all">
                                    Apply Now
                                </Button>
                            </div>
                        </LiquidCard>
                    ))}
                </div>
            </section>
        </div>
    );
}
