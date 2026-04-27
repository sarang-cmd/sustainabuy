"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { findOrAddProduct } from "@/lib/db";
import { LiquidCard } from "@/components/ui/LiquidCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Scan, Sparkles, Search } from "lucide-react";

export default function AddProductPage() {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState<"idle" | "scanning" | "analyzing" | "complete">("idle");
    const [scannerSteps, setScannerSteps] = useState<{ message: string, status: string }[]>([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const handleScan = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setStep("scanning");

        try {
            // Initial steps (simulated)
            setScannerSteps([
                { message: "Initializing neural scanner...", status: "complete" },
                { message: "Searching global manufacturers...", status: "scanning" }
            ]);

            const product = await findOrAddProduct(query);

            if (product) {
                // In a real app, products from findOrAddProduct would have steps. 
                // Since findOrAddProduct returns a Product, we might need a separate call for scoring steps 
                // or just mock them here for the UI if they weren't returned.
                // For now, let's just complete the UI flow.
                setStep("complete");
                setScannerSteps(prev => [...prev.map(s => ({ ...s, status: "complete" })), { message: "Analysis complete!", status: "complete" }]);

                setTimeout(() => {
                    router.push(`/products/${product.id}`);
                }, 1000);
            }
        } catch (error) {
            console.error("Error finding product:", error);
            setStep("idle");
            setScannerSteps([{ message: "Error identifying product. Try again.", status: "error" }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[60vh]">
            <LiquidCard className="w-full max-w-xl p-10 text-center relative overflow-hidden">
                {/* Ambient Background */}
                <div className={`absolute inset-0 bg-cerulean-500/10 transition-opacity duration-1000 ${loading ? 'opacity-100 animate-pulse' : 'opacity-0'}`}></div>

                <div className="relative z-10">
                    <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10">
                        {loading ? (
                            <Sparkles className="h-10 w-10 text-cerulean-400 animate-spin" />
                        ) : (
                            <Scan className="h-10 w-10 text-white" />
                        )}
                    </div>

                    <h1 className="text-3xl font-bold text-white mb-4">AI Product Scanner</h1>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto">
                        Can't find what you're looking for? Enter a product name and our AI will analyze its sustainability impact instantly.
                    </p>

                    <form onSubmit={handleScan} className="max-w-md mx-auto space-y-4">
                        <Input
                            placeholder="e.g. Adidas Ultraboost, Hydro Flask..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            disabled={loading}
                            className="text-lg py-3 text-center"
                            icon={<Search className="h-5 w-5" />}
                        />

                        <Button
                            className="w-full py-3 text-lg relative overflow-hidden"
                            disabled={loading}
                        >
                            {step === "idle" && "Scan & Analyze"}
                            {step === "scanning" && "Searching Global Database..."}
                            {step === "analyzing" && "Calculating Sustainability Score..."}
                            {step === "complete" && "Analysis Complete!"}
                        </Button>
                    </form>

                    {loading && (
                        <div className="mt-8 space-y-3">
                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-cerulean-500 animate-progress"></div>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                {scannerSteps.length > 0 && (
                                    <p className="text-xs text-cerulean-400 font-mono animate-pulse">
                                        {scannerSteps[scannerSteps.length - 1].message}
                                    </p>
                                )}
                                <p className="text-[10px] text-gray-600 uppercase tracking-widest">Verification in progress</p>
                            </div>
                        </div>
                    )}
                </div>
            </LiquidCard>
        </div>
    );
}
