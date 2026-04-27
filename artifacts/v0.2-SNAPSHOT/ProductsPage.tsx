"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Search, Filter, ScanLine } from "lucide-react";
import { getAllProducts, Product } from "@/lib/db";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { parseSearchIntent, normalizeQuery } from "@/lib/meta-search";
import { Suspense } from "react";

function ProductsContent() {
    const searchParams = useSearchParams();
    const queryParam = searchParams.get("q") || "";

    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState(queryParam);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const data = await getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const categories = ["All", "Apparel", "Home", "Accessories", "Personal Care"];

    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
        const query = normalizeQuery(searchTerm);
        const intent = parseSearchIntent(searchTerm);

        if (!matchesCategory) return false;
        if (!searchTerm) return true;

        if (intent.brand && product.brand.toLowerCase().includes(intent.brand.toLowerCase())) return true;
        if (intent.category && product.category === intent.category) return true;

        return (
            product.name.toLowerCase().includes(query) ||
            product.brand.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                <div className="relative w-full md:w-2/3">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                    <Input
                        className="pl-12 py-6 text-lg bg-jet-black-800/50 border-white/5 focus:border-cerulean-500/50 transition-all rounded-2xl"
                        placeholder="Search for sustainable brands or products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <Link href="/add-product" className="w-full md:w-auto">
                        <Button variant="secondary" className="w-full flex items-center gap-2 px-6 py-6 rounded-2xl">
                            <ScanLine className="h-5 w-5" /> Scan & Score
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="mb-12 overflow-x-auto">
                <div className="flex gap-3 pb-4">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === category
                                    ? "bg-cerulean-500 text-white shadow-lg shadow-cerulean-500/20"
                                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>

            {filteredProducts.length === 0 && !loading && (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">No sustainable products found matching your search.</p>
                </div>
            )}
        </div>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={<div className="p-20 text-center text-white">Loading marketplace...</div>}>
            <ProductsContent />
        </Suspense>
    );
}
