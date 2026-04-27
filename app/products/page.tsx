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
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            {/* Hero Section */}
            <div className="mb-16">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Sustainable Finds</h1>
                        <p className="text-gray-400">Discover and support eco-conscious brands.</p>
                    </div>

                    <div className="flex w-full md:w-auto gap-3">
                        <div className="relative flex-grow md:w-80 group">
                            <Input
                                placeholder="Search by name or brand..."
                                icon={<Search className="h-5 w-5 text-gray-400 group-focus-within:text-cerulean-400 transition-colors" />}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-jet-black-900/50 border-white/10"
                            />
                        </div>
                        <Link href="/add-product">
                            <Button variant="primary" className="flex items-center gap-2 shadow-xl shadow-cerulean-500/20">
                                <ScanLine className="h-5 w-5" />
                                <span className="hidden sm:inline">Add Product</span>
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Categories */}
                <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2.5 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all duration-300 border ${selectedCategory === category
                                ? "bg-cerulean-500 border-cerulean-400 text-white shadow-lg shadow-cerulean-500/30 scale-105"
                                : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:border-white/10"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Recommendations Section - Only show if not searching/filtering */}
            {selectedCategory === "All" && debouncedSearch === "" && !loading && (
                <div className="mb-20">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="h-2 w-2 rounded-full bg-tea-green-500 animate-pulse" />
                        <h2 className="text-2xl font-bold text-white">Recommended for You</h2>
                    </div>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {recommendedProducts.map(product => (
                            <motion.div key={`rec-${product.id}`} variants={itemVariants}>
                                <ProductCard {...product} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            )}

            {/* Recently Viewed Section */}
            {recentlyViewed.length > 0 && debouncedSearch === "" && selectedCategory === "All" && (
                <div className="mb-20">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="h-2 w-2 rounded-full bg-cerulean-500" />
                        <h2 className="text-2xl font-bold text-white">Recently Viewed</h2>
                    </div>
                    <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar">
                        {recentlyViewed.map(product => (
                            <div key={`recent-${product.id}`} className="w-72 flex-shrink-0">
                                <ProductCard {...product} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Trending Brands Section */}
            {debouncedSearch === "" && selectedCategory === "All" && (
                <div className="mb-20">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="h-2 w-2 rounded-full bg-cerulean-500 animate-pulse" />
                        <h2 className="text-2xl font-bold text-white">Trending Sustainable Brands</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                        {trendingBrands.map((brand) => (
                            <button
                                key={brand.name}
                                onClick={() => setSearchTerm(brand.name)}
                                className="group p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-cerulean-500/10 hover:border-cerulean-500/30 transition-all duration-300 text-left"
                            >
                                <span className="text-3xl mb-4 block group-hover:scale-110 transition-transform">{brand.icon}</span>
                                <h3 className="text-white font-bold mb-1">{brand.name}</h3>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest">{brand.description}</p>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Main Grid */}
            <div className="mb-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-white">
                        {selectedCategory === "All" ? "All Products" : `${selectedCategory} Collection`}
                        {debouncedSearch && <span className="text-gray-500 font-normal ml-3">Results for &quot;{debouncedSearch}&quot;</span>}
                    </h2>
                    <span className="text-sm text-gray-500 font-medium">{filteredProducts.length} items</span>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 space-y-4">
                        <div className="w-12 h-12 border-4 border-cerulean-500 border-t-transparent rounded-full animate-spin" />
                        <div className="text-center">
                            <p className="text-gray-400 animate-pulse">Scanning the data bank...</p>
                            <p className="text-[10px] text-gray-600 uppercase tracking-widest mt-2">Checking Global Eco-Standards</p>
                        </div>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    >
                        {filteredProducts.slice(0, visibleCount).map(product => (
                            <motion.div key={product.id} variants={itemVariants}>
                                <ProductCard {...product} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {filteredProducts.length > visibleCount && !loading && (
                    <div className="flex justify-center mt-12 pb-12">
                        <Button
                            variant="secondary"
                            onClick={() => setVisibleCount(prev => prev + 8)}
                            className="px-8 border-white/10 hover:border-cerulean-500/50 transition-colors"
                        >
                            Load More Sustainable Finds
                        </Button>
                    </div>
                )}

                {!loading && filteredProducts.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-32 bg-white/5 rounded-3xl border border-dashed border-white/10"
                    >
                        <div className="mx-auto w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
                            <Search className="h-8 w-8 text-gray-600" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
                        <p className="text-gray-500 max-w-xs mx-auto mb-8">We couldn&apos;t find any sustainable finds matching your current filters.</p>
                        <div className="flex justify-center gap-4">
                            <Button
                                variant="ghost"
                                onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
                                className="hover:bg-white/5"
                            >
                                Clear All Filters
                            </Button>
                            <Link href="/add-product">
                                <Button className="bg-cerulean-500">Add a New Product</Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
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
