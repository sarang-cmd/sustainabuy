"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Search, Filter, ScanLine, RotateCcw, Leaf } from "lucide-react";
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
    const [visibleCount, setVisibleCount] = useState(8);
    const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
    const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

    const trendingBrands = [
        { name: "Allbirds", icon: "🌿", description: "Natural Materials" },
        { name: "Patagonia", icon: "🏔️", description: "Worn Wear Fix" },
        { name: "Adidas", icon: "👟", description: "Recycled Ocean Plastic" },
        { name: "Nike", icon: "⚡", description: "Move to Zero" },
        { name: "Stanley", icon: "🥤", description: "Built for Life" }
    ];

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Load recently viewed from localStorage
    useEffect(() => {
        const stored = localStorage.getItem("recentlyViewed");
        if (stored) {
            try {
                setRecentlyViewed(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse recently viewed:", e);
            }
        }
    }, []);

    // Sync search term with URL param
    useEffect(() => {
        if (queryParam) setSearchTerm(queryParam);
    }, [queryParam]);

    const categories = ["All", "Clothing", "Footwear", "Accessories", "Food", "Technology"];

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // Fetch all products first (in V2 we'd filter at DB level for performance)
                const data = await getAllProducts(selectedCategory);
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [selectedCategory]);

    const filteredProducts = products.filter(product => {
        const intent = parseSearchIntent(debouncedSearch);
        const normalizedName = normalizeQuery(product.name);
        const normalizedBrand = normalizeQuery(product.brand);

        // 1. Category Filter
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
        if (!matchesCategory) return false;

        // 2. Search Filter (Intent Based)
        if (!debouncedSearch) return true;

        // Check if intent brand matches exactly or partially
        if (intent.brand && (normalizedBrand.includes(normalizeQuery(intent.brand)) || normalizeQuery(intent.brand).includes(normalizedBrand))) return true;

        // Check if intent category matches
        if (intent.category && product.category === intent.category) return true;

        // General keyword match
        return intent.keywords.some(keyword =>
            normalizedName.includes(keyword) || normalizedBrand.includes(keyword)
        );
    });

    // Recommendations logic: Top 4 products with highest scores, prioritized by "Verified" status
    const recommendedProducts = [...products]
        .sort((a, b) => {
            if (a.isVerified && !b.isVerified) return -1;
            if (!a.isVerified && b.isVerified) return 1;
            return b.score - a.score;
        })
        .slice(0, 4);

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
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <div className="relative min-h-screen">
            {/* Background Blobs */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[15%] right-[10%] w-[500px] h-[500px] bg-cerulean-500/10 rounded-full blur-[130px] animate-pulse"></div>
                <div className="absolute bottom-[25%] left-[10%] w-[600px] h-[600px] bg-tropical-teal-500/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl relative z-10">
                {/* Hero Section */}
                <div className="mb-20">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
                        <div className="space-y-2">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2 text-cerulean-400 text-xs font-bold uppercase tracking-[0.3em] mb-2"
                            >
                                <div className="h-1 w-8 bg-cerulean-500/50 rounded-full" />
                                Curated Marketplace
                            </motion.div>
                            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-none">Sustainable <span className="text-transparent bg-clip-text bg-gradient-to-r from-cerulean-400 to-tea-green-400">Finds.</span></h1>
                            <p className="text-gray-400 text-lg max-w-xl leading-relaxed">Discover and support eco-conscious brands committed to transparency and the planet.</p>
                        </div>

                        <div className="flex w-full md:w-auto flex-col sm:flex-row gap-4">
                            <div className="relative flex-grow md:w-96 group">
                                <div className="absolute inset-0 bg-cerulean-500/10 blur-xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
                                <Input
                                    placeholder="Search by name, brand or category..."
                                    icon={<Search className="h-5 w-5 text-gray-400 group-focus-within:text-cerulean-400 transition-colors" />}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="bg-jet-black-900/60 border-white/10 h-14 !rounded-2xl relative z-10 focus:border-cerulean-500/50"
                                />
                            </div>
                            <div className="flex gap-3">
                                <Link href="/add-product" className="flex-grow sm:flex-grow-0">
                                    <Button variant="primary" className="h-14 px-8 flex items-center gap-2 shadow-2xl shadow-cerulean-500/20 !rounded-2xl w-full">
                                        <ScanLine className="h-5 w-5" />
                                        <span>Add Product</span>
                                    </Button>
                                </Link>
                                <Button
                                    variant="secondary"
                                    className="h-14 w-14 !p-0 !rounded-2xl border-white/10 hover:bg-white/5"
                                    onClick={async () => {
                                        const { seedDemoProducts } = await import('@/lib/seed');
                                        await seedDemoProducts();
                                        window.location.reload();
                                    }}
                                    title="Seed Demo Data"
                                >
                                    <Filter className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar">
                        {categories.map((category, idx) => (
                            <motion.button
                                key={category}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-8 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all duration-300 border ${selectedCategory === category
                                    ? "bg-cerulean-500 border-cerulean-400 text-white shadow-xl shadow-cerulean-500/30 scale-105"
                                    : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:border-white/10"
                                    }`}
                            >
                                {category}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Recommendations Section - Only show if not searching/filtering */}
                {selectedCategory === "All" && debouncedSearch === "" && !loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="mb-24"
                    >
                        <div className="flex items-center justify-between mb-10">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-tea-green-500/20 rounded-xl text-tea-green-400">
                                    <Leaf className="h-6 w-6" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-white tracking-tight">Handpicked for You</h2>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest mt-1 font-bold">Top Scoring Sustainable Goods</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {recommendedProducts.map(product => (
                                <ProductCard key={`rec-${product.id}`} {...product} />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Recently Viewed Section */}
                {recentlyViewed.length > 0 && debouncedSearch === "" && selectedCategory === "All" && (
                    <div className="mb-24">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="p-3 bg-cerulean-500/20 rounded-xl text-cerulean-400">
                                <RotateCcw className="h-6 w-6" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-white tracking-tight">Your History</h2>
                                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1 font-bold">Products you recently explored</p>
                            </div>
                        </div>
                        <div className="flex gap-8 overflow-x-auto pb-8 no-scrollbar">
                            {recentlyViewed.map(product => (
                                <div key={`recent-${product.id}`} className="w-80 flex-shrink-0">
                                    <ProductCard {...product} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Main Grid */}
                <div className="mb-20">
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-baseline gap-4">
                            <h2 className="text-3xl font-bold text-white tracking-tight">
                                {selectedCategory === "All" ? "Collection Library" : `${selectedCategory} Collection`}
                            </h2>
                            <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">{filteredProducts.length} Sustainable Finds</span>
                        </div>
                        {debouncedSearch && (
                            <span className="text-sm bg-white/5 px-4 py-2 rounded-full border border-white/10 text-gray-400">
                                Results for <span className="text-white font-bold">"{debouncedSearch}"</span>
                            </span>
                        )}
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-40 space-y-6">
                            <div className="w-16 h-16 border-4 border-cerulean-500 border-t-transparent rounded-full animate-spin shadow-[0_0_30px_rgba(80,151,175,0.3)]" />
                            <div className="text-center">
                                <p className="text-white font-bold uppercase tracking-[0.3em] text-xs">Accessing Data Bank</p>
                                <p className="text-[10px] text-gray-600 uppercase tracking-widest mt-2 animate-pulse">Scanning Global Transparency Reports</p>
                            </div>
                        </div>
                    ) : (
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10"
                        >
                            <AnimatePresence>
                                {filteredProducts.slice(0, visibleCount).map(product => (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ProductCard {...product} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}

                    {filteredProducts.length > visibleCount && !loading && (
                        <div className="flex justify-center mt-20">
                            <Button
                                variant="secondary"
                                onClick={() => setVisibleCount(prev => prev + 8)}
                                className="px-12 py-6 text-lg !rounded-2xl border-white/10 hover:border-cerulean-500/50 hover:bg-white/5 transition-all shadow-xl"
                            >
                                Explore More Findings
                            </Button>
                        </div>
                    )}

                    {!loading && filteredProducts.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-40 bg-white/[0.02] rounded-[40px] border border-dashed border-white/10 backdrop-blur-sm"
                        >
                            <div className="mx-auto w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8">
                                <Search className="h-10 w-10 text-gray-600" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-3">No findings match</h3>
                            <p className="text-gray-500 max-w-sm mx-auto mb-10 text-lg">We couldn't find any sustainable products matching your current discovery filters.</p>
                            <div className="flex justify-center gap-4">
                                <Button
                                    variant="secondary"
                                    onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
                                    className="!rounded-xl px-8"
                                >
                                    Reset Discovery
                                </Button>
                                <Link href="/add-product">
                                    <Button className="bg-cerulean-500 !rounded-xl px-8 shadow-xl shadow-cerulean-500/20">Contribute Findings</Button>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={<div className="p-20 text-center text-white">Loading products...</div>}>
            <ProductsContent />
        </Suspense>
    );
}
