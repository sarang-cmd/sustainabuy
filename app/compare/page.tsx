"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getProduct, Product } from "@/lib/db";
import { LiquidCard } from "@/components/ui/LiquidCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Leaf, ShieldCheck, Zap, Droplets, Recycle, ArrowRight } from "lucide-react";

function CompareContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchId, setSearchId] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            const idsParam = searchParams.get("products");
            if (!idsParam) {
                setLoading(false);
                return;
            }

            const ids = idsParam.split(",");
            setLoading(true);
            try {
                const fetched = await Promise.all(ids.map(id => getProduct(id)));
                setProducts(fetched.filter((p): p is Product => p !== null));
            } catch (error) {
                console.error("Error fetching comparison:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [searchParams]);

    const addProductToCompare = () => {
        if (!searchId) return;
        const currentIds = searchParams.get("products");
        const newIds = currentIds ? `${currentIds},${searchId}` : searchId;
        router.push(`/compare?products=${newIds}`);
        setSearchId("");
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-white mb-8">Compare Products</h1>

            {/* Add Product Bar (Hidden if we wanted a pure ID-based view, but useful for testing) */}
            <div className="mb-8 flex gap-4 max-w-md">
                <Input
                    placeholder="Enter Product ID to add..."
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                />
                <Button onClick={addProductToCompare}>Add</Button>
            </div>

            {loading ? (
                <div className="text-white text-center">Loading comparison...</div>
            ) : products.length === 0 ? (
                <div className="text-center text-gray-400 py-20">
                    No products selected. Go to <a href="/products" className="text-cerulean-400">Products</a> to select items.
                </div>
            ) : (
                <div className="overflow-x-auto pb-4">
                    <div className="min-w-[800px] grid grid-cols-[200px_repeat(auto-fit,minmax(250px,1fr))] gap-4">

                        {/* Labels Column */}
                        <div className="space-y-6 pt-64 font-medium text-gray-400">
                            <div className="h-8">Price</div>
                            <div className="h-8">Sustainability Score</div>
                            <div className="h-8">Materials</div>
                            <div className="h-8">Manufacturing</div>
                            <div className="h-8">Supply Chain</div>
                            <div className="h-8">Certifications</div>
                        </div>

                        {/* Product Columns */}
                        {products.map(product => (
                            <LiquidCard key={product.id} className="p-6">
                                <div className="h-64 mb-6 flex flex-col">
                                    <div className="h-40 bg-white/5 rounded-lg mb-4 overflow-hidden">
                                        {product.image && <img src={product.image} className="w-full h-full object-cover" alt={product.name} onError={(e) => e.currentTarget.style.display = 'none'} />}
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-1 truncate">{product.name}</h3>
                                    <p className="text-cerulean-400 text-sm mb-2">{product.brand}</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="h-8 text-xl font-bold text-white">${product.price}</div>
                                    <div className="h-8 flex items-center gap-2">
                                        <div className={`px-2 py-1 rounded text-sm font-bold ${product.score > 80 ? 'bg-tea-green-500/20 text-tea-green-400' : 'bg-yellow-500/20 text-yellow-500'}`}>
                                            {product.score}/100
                                        </div>
                                    </div>
                                    <div className="h-8 flex items-center gap-2 text-sm text-gray-300">
                                        <Recycle className="h-4 w-4" /> {product.breakdown?.materials || 0}
                                    </div>
                                    <div className="h-8 flex items-center gap-2 text-sm text-gray-300">
                                        <Zap className="h-4 w-4" /> {product.breakdown?.manufacturing || 0}
                                    </div>
                                    <div className="h-8 flex items-center gap-2 text-sm text-gray-300">
                                        <Droplets className="h-4 w-4" /> {product.breakdown?.supplyChain || 0}
                                    </div>
                                    <div className="h-8 text-sm text-gray-300 truncate">
                                        {product.certifications?.join(", ") || "-"}
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/10">
                                    <Button className="w-full" onClick={() => router.push(`/products/${product.id}`)}>View Details</Button>
                                </div>
                            </LiquidCard>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function ComparePage() {
    return (
        <Suspense fallback={<div className="text-white p-10">Loading...</div>}>
            <CompareContent />
        </Suspense>
    );
}
