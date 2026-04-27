import { Leaf, Target, Users, ShieldCheck } from "lucide-react";
import { LiquidCard } from "@/components/ui/LiquidCard";

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-4xl">
            <header className="text-center mb-20 animate-in fade-in slide-in-from-top-10 duration-700">
                <div className="inline-block p-4 rounded-3xl bg-cerulean-500/10 mb-6 border border-cerulean-500/20">
                    <Leaf className="h-10 w-10 text-cerulean-400" />
                </div>
                <h1 className="text-5xl font-bold text-white mb-6">Our Mission</h1>
                <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
                    We believe that every purchase is a vote for the world you want to live in. SustainaBuy empowers you to vote for a greener future.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                <LiquidCard className="p-8 group hover:bg-cerulean-500/5 transition-colors">
                    <Target className="h-8 w-8 text-cerulean-400 mb-4 group-hover:scale-110 transition-transform" />
                    <h2 className="text-2xl font-bold text-white mb-4">Precision Scoring</h2>
                    <p className="text-gray-400 leading-relaxed">
                        Our AI-driven heuristic engine analyzes cross-verified data points from materials, manufacturing, and supply chains to provide a transparent sustainability score.
                    </p>
                </LiquidCard>

                <LiquidCard className="p-8 group hover:bg-tea-green-500/5 transition-colors">
                    <ShieldCheck className="h-8 w-8 text-tea-green-400 mb-4 group-hover:scale-110 transition-transform" />
                    <h2 className="text-2xl font-bold text-white mb-4">Unbiased Data</h2>
                    <p className="text-gray-400 leading-relaxed">
                        We remain independent. Our scoring logic is open and based on global eco-standards, ensuring that "greenwashing" has no place in our library.
                    </p>
                </LiquidCard>
            </div>

            <section className="bg-white/5 rounded-[40px] border border-white/5 p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cerulean-500/10 blur-[100px] rounded-full -mr-32 -mt-32"></div>
                <Users className="h-12 w-12 text-gray-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-white mb-6">Built for the Global Community</h2>
                <p className="text-gray-400 leading-relaxed max-w-xl mx-auto mb-10">
                    Founded in 2026, SustainaBuy started as a small project to solve a big problem: the lack of clarity in sustainable shopping. Today, we are a growing community of conscious consumers.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-gray-500 uppercase tracking-widest">
                        Based in Berlin
                    </div>
                    <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-gray-500 uppercase tracking-widest">
                        100% Remote Squad
                    </div>
                </div>
            </section>
        </div>
    );
}
