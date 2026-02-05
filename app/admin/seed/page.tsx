"use client";

import { useState } from "react";
import { addProductToDb, Product } from "@/lib/db";
import { LiquidCard } from "@/components/ui/LiquidCard";
import { Button } from "@/components/ui/Button";
import { Database, Check, AlertCircle, Loader2 } from "lucide-react";

// Mock "Real" Data to Seed
const SEED_DATA: Partial<Product>[] = [
    {
        name: "Nano Puff Jacket",
        brand: "Patagonia",
        price: 239.00,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800",
        score: 94,
        category: "Clothing",
        description: "Warm, windproof, water-resistant—the Nano Puff® Jacket uses incredibly lightweight and highly compressible 60-g PrimaLoft® Gold Insulation Eco 100% postconsumer recycled polyester with P.U.R.E.™ (Produced Using Reduced Emissions) technology, wrapped in a 100% recycled polyester shell and lining.",
        materials: ["Recycled Polyester", "PrimaLoft Gold Eco"],
        certifications: ["Fair Trade Certified", "Bluesign Approved"],
        breakdown: { materials: 98, manufacturing: 90, supplyChain: 95, longevity: 92, circularity: 88 }
    },
    {
        name: "Tree Runners",
        brand: "Allbirds",
        price: 98.00,
        image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800",
        score: 91,
        category: "Footwear",
        description: "Our light and breezy Eucalyptus fiber provides next-level comfort. Breathable, silky-smooth, and cool to the touch.",
        materials: ["Eucalyptus Fiber", "Sugarcane EVA", "Recycled Bottles"],
        certifications: ["B Corp", "Carbon Neutral"],
        breakdown: { materials: 95, manufacturing: 85, supplyChain: 92, longevity: 80, circularity: 90 }
    },
    {
        name: "Organic Cotton T-Shirt",
        brand: "Pact",
        price: 35.00,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
        score: 89,
        category: "Clothing",
        description: "Soft, breathable, and built to last. Made with GOTS Certified Organic Cotton in a Fair Trade Certified Factory.",
        materials: ["Organic Cotton"],
        certifications: ["GOTS Organic", "Fair Trade"],
        breakdown: { materials: 92, manufacturing: 88, supplyChain: 85, longevity: 85, circularity: 95 }
    },
    {
        name: "Insulated Water Bottle",
        brand: "Klean Kanteen",
        price: 39.95,
        image: "https://images.unsplash.com/photo-1602143407151-01114192003b?auto=format&fit=crop&q=80&w=800",
        score: 96,
        category: "Accessories",
        description: "Our vacuum insulated water bottles keep drinks hot or cold all day long. 90% recycled 18/8 stainless steel.",
        materials: ["Recycled Stainless Steel", "Silicone"],
        certifications: ["B Corp", "Climate Neutral"],
        breakdown: { materials: 95, manufacturing: 90, supplyChain: 92, longevity: 99, circularity: 100 }
    },
    {
        name: "Better Sweater Fleece",
        brand: "Patagonia",
        price: 149.00,
        image: "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?auto=format&fit=crop&q=80&w=800",
        score: 88,
        category: "Clothing",
        description: "A warm, low-bulk full-zip jacket made of soft, sweater-knit recycled polyester fleece.",
        materials: ["Recycled Polyester Fleece"],
        certifications: ["Fair Trade Certified", "Bluesign Approved"],
        breakdown: { materials: 90, manufacturing: 88, supplyChain: 90, longevity: 95, circularity: 80 }
    },
    {
        name: "Campo Chromefree Leather",
        brand: "Veja",
        price: 175.00,
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800",
        score: 85,
        category: "Footwear",
        description: "Upper made from ChromeFree leather. Logo V made of rubber and rice waste.",
        materials: ["ChromeFree Leather", "Amazonian Rubber", "Rice Waste"],
        certifications: ["B Corp"],
        breakdown: { materials: 85, manufacturing: 82, supplyChain: 88, longevity: 90, circularity: 75 }
    }
    // User can extend this list endlessly
];

export default function AdminSeedPage() {
    const [status, setStatus] = useState<"idle" | "seeding" | "success" | "error">("idle");
    const [log, setLog] = useState<string[]>([]);

    const handleSeed = async () => {
        setStatus("seeding");
        setLog([]);

        try {
            for (const product of SEED_DATA) {
                setLog(prev => [...prev, `Seeding: ${product.name}...`]);
                await addProductToDb(product as any); // Assuming db.ts handles IDs
                setLog(prev => [...prev, `✅ Added ${product.name}`]);
                // Small delay to prevent rate limiting in a loop
                await new Promise(r => setTimeout(r, 200));
            }
            setStatus("success");
        } catch (e) {
            console.error(e);
            setStatus("error");
            setLog(prev => [...prev, `❌ Error: ${e}`]);
        }
    };

    return (
        <div className="container mx-auto px-4 py-20 flex justify-center">
            <LiquidCard className="max-w-xl w-full p-10">
                <div className="text-center mb-8">
                    <Database className="h-12 w-12 text-cerulean-400 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-white mb-2">Database Seeder</h1>
                    <p className="text-gray-400">
                        Automatically populate your Firestore with {SEED_DATA.length} premium sustainable products.
                        <br />
                        <span className="text-xs text-red-400">Warning: This will add duplicate items if run multiple times.</span>
                    </p>
                </div>

                <div className="flex justify-center mb-8">
                    <Button
                        onClick={handleSeed}
                        disabled={status === "seeding" || status === "success"}
                        className="w-full h-14 text-lg"
                    >
                        {status === "idle" && "Run Seed Script"}
                        {status === "seeding" && <><Loader2 className="mr-2 animate-spin" /> Seeding...</>}
                        {status === "success" && <><Check className="mr-2" /> Seeding Complete</>}
                        {status === "error" && <><AlertCircle className="mr-2" /> Failed</>}
                    </Button>
                </div>

                <div className="bg-jet-black-950/50 rounded-xl p-4 h-64 overflow-y-auto font-mono text-xs text-gray-400 border border-white/5">
                    {log.length === 0 ? (
                        <span className="opacity-50">Log output will appear here...</span>
                    ) : (
                        log.map((line, i) => <div key={i}>{line}</div>)
                    )}
                </div>
            </LiquidCard>
        </div>
    );
}
