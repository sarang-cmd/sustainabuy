"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ShieldCheck,
    Leaf,
    Star,
    ShoppingCart,
    ChevronRight,
    ExternalLink,
    ArrowLeft,
    Heart,
    Share2,
    Info,
    TrendingUp,
    Zap,
    Box,
    Truck,
    RefreshCw,
    X
} from \"lucide-react\";
import Link from "next/link";
import { Product } from "@/lib/db";
import { MultiStageLoader } from "@/components/ui/MultiStageLoader";
import { LiquidCard } from "@/components/ui/LiquidCard";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/contexts/ToastContext";
import { useWishlist } from "@/contexts/WishlistContext";

interface ProductDetailClientProps {
    id: string;
}

export function ProductDetailClient({ id }: ProductDetailClientProps) {
    const { addItem } = useCart();
    const { showToast } = useToast();
    const { toggleWishlist, isInWishlist } = useWishlist();
    
    const [product, setProduct] = useState<Product | null>(null);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedSeller, setSelectedSeller] = useState("EcoStride");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { getProduct } = await import("@/lib/db");
                const data = await getProduct(id);
                if (data) {
                    setProduct(data);
                } else {
                    setError("Product not found in our sustainability records. Ensure you have synced the Data Bank.");
                }
            } catch (err: any) {
                console.error("Fetch error:", err);
                setError(`Connection Error: ${err.message || 'Could not retrieve product data.'}`);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
        window.scrollTo(0, 0);
    }, [id]);

    const handleShare = async () => {
        if (!product) return;
        const shareData = {
            title: `SustainaBuy - ${product.name}`,
            text: `Check out this sustainable find: ${product.name} by ${product.brand}`,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
                showToast("Shared successfully!");
            } else {
                await navigator.clipboard.writeText(window.location.href);
                showToast("Link copied to clipboard!");
            }
        } catch (err) {
            console.error("Share failed:", err);
        }
    };

    if (loading) {
        return <MultiStageLoader onComplete={() => setLoading(false)} duration={1800} />;
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-jet-black-950 flex flex-col items-center justify-center p-8 text-center">
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10"
                >
                    <Leaf className="w-12 h-12 text-gray-600" />
                </motion.div>
                <h2 className="text-3xl font-bold text-white mb-4">{error || "Product Not Found"}</h2>
                <p className="text-gray-400 max-w-md mb-10 leading-relaxed">
                    The transparency data for this item is currently unavailable. Our AI engines are working to re-index this product.
                </p>
                <Link href="/products">
                    <Button variant="primary" size="lg" className="px-10">
                        Return to Catalog
                    </Button>
                </Link>
            </div>
        );
    }

    const sellers = [
        { name: "EcoStride", price: product.price, rating: 4.9, reviews: 1240, shipping: "Free", delivery: "2 days" },
        { name: "GreenShop", price: product.price + 4.99, rating: 4.7, reviews: 850, shipping: "$5.99", delivery: "3 days" },
        { name: "PureEarth", price: product.price - 2.50, rating: 4.2, reviews: 420, shipping: "$12.00", delivery: "5 days" }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="min-h-screen bg-jet-black-950 text-white font-inter selection:bg-cerulean-500/30">
            {/* Ambient Background Effects */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-cerulean-500/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-tropical-teal-500/5 blur-[100px] rounded-full" />
                <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[40%] bg-tea-green-500/5 blur-[150px] rounded-full" />
            </div>

            <div className="container mx-auto px-6 py-8 relative z-10 max-w-7xl">
                {/* Navigation & Header */}
                <header className="flex items-center justify-between mb-12">
                    <Link href="/products" className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all">
                        <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:border-cerulean-500/50 group-hover:bg-cerulean-500/10 transition-all">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium tracking-wide uppercase">Back to Collection</span>
                    </Link>
                    
                    <div className="flex items-center gap-4">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toggleWishlist(product)}
                            className={`p-3 rounded-full border transition-all ${isInWishlist(id) ? 'bg-red-500/10 border-red-500/30 text-red-500' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'}`}
                        >
                            <Heart className={`w-5 h-5 ${isInWishlist(id) ? 'fill-current' : ''}`} />
                        </motion.button>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleShare}
                            className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                        >
                            <Share2 className="w-5 h-5" />
                        </motion.button>
                    </div>
                </header>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 lg:grid-cols-12 gap-12"
                >
                    {/* Visual Section (Left) */}
                    <div className="lg:col-span-6 space-y-8">
                        <motion.div variants={itemVariants} className="relative aspect-square rounded-3xl overflow-hidden glass-card p-1">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-10" />
                            <div className="absolute top-6 left-6 z-20">
                                <div className="flex items-center gap-2 bg-jet-black-900/80 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2">
                                    <div className="w-2 h-2 bg-tea-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(107,212,107,0.8)]" />
                                    <span className="text-[10px] font-bold tracking-[2px] uppercase text-tea-green-400">Authenticity Verified</span>
                                </div>
                            </div>

                            <div className="w-full h-full bg-jet-black-900/50 flex items-center justify-center p-12">
                                <motion.img
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    src={product.image}
                                    alt={product.name}
                                    className="max-w-full max-h-full object-contain drop-shadow-[0_32px_64px_rgba(0,0,0,0.8)]"
                                />
                            </div>
                        </motion.div>

                        {/* Thumbnails / Small Details */}
                        <motion.div variants={itemVariants} className="grid grid-cols-4 gap-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="aspect-square rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all cursor-pointer flex items-center justify-center overflow-hidden">
                                    <img src={product.image} className="w-1/2 h-1/2 object-contain opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all" alt="detail" />
                                </div>
                            ))}
                            <div className="aspect-square rounded-2xl border border-white/10 bg-cerulean-500/10 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-cerulean-500/20 transition-all">
                                <Box className="w-5 h-5 text-cerulean-400" />
                                <span className="text-[10px] font-bold text-cerulean-400 uppercase">3D View</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Content Section (Right) */}
                    <div className="lg:col-span-6 space-y-10">
                        <motion.div variants={itemVariants}>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-cerulean-500 font-bold tracking-widest text-xs uppercase">{product.brand || "Eco Collective"}</span>
                                <span className="text-gray-600">/</span>
                                <span className="text-gray-400 text-xs uppercase tracking-widest">{product.category}</span>
                            </div>
                            <h1 className="text-5xl lg:text-6xl font-black tracking-tighter mb-6 leading-[1.05]">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-6 mb-8">
                                <div className="text-4xl font-bold text-white">${product.price}</div>
                                <div className="h-8 w-px bg-white/10" />
                                <div className="flex items-center gap-2 bg-tea-green-500/10 border border-tea-green-500/20 rounded-full px-4 py-2">
                                    <Leaf className="w-4 h-4 text-tea-green-400" />
                                    <span className="text-tea-green-400 font-bold">Eco Score: {product.score}/100</span>
                                </div>
                            </div>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                                {product.description}
                            </p>
                        </motion.div>

                        {/* Sustainability Pulse */}
                        <motion.div variants={itemVariants}>
                            <LiquidCard className="p-8 border-cerulean-500/20 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-cerulean-500/10 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-cerulean-500/20 transition-all" />
                                
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xl font-bold flex items-center gap-3">
                                        <ShieldCheck className="w-6 h-6 text-cerulean-400" />
                                        Impact Assessment
                                    </h3>
                                    <div className="text-sm text-gray-500 flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4 text-tea-green-400" />
                                        Top 5% in category
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {Object.entries(product.breakdown || { materials: 85, manufacturing: 72, circularity: 90 }).map(([key, value]) => (
                                        <div key={key} className="space-y-3">
                                            <div className="flex justify-between items-end">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{key}</span>
                                                <span className="text-sm font-bold text-white">{value}%</span>
                                            </div>
                                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${value}%` }}
                                                    transition={{ duration: 1.5, ease: "circOut", delay: 0.5 }}
                                                    className={`h-full bg-gradient-to-r ${
                                                        key === 'materials' ? 'from-cerulean-500 to-cerulean-400' : 
                                                        key === 'manufacturing' ? 'from-tropical-teal-500 to-tropical-teal-400' : 
                                                        'from-tea-green-500 to-tea-green-400'
                                                    }`} 
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </LiquidCard>
                        </motion.div>

                        {/* Marketplace Section */}
                        <motion.div variants={itemVariants} className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-bold uppercase tracking-[3px] text-gray-500">Compare Offers</h3>
                                <div className="flex items-center gap-2 text-xs text-cerulean-400 font-medium cursor-pointer hover:underline">
                                    View shipping details <ExternalLink className="w-3 h-3" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                {sellers.map((seller) => (
                                    <div 
                                        key={seller.name}
                                        onClick={() => setSelectedSeller(seller.name)}
                                        className={`group flex items-center justify-between p-5 rounded-2xl border transition-all cursor-pointer ${
                                            selectedSeller === seller.name 
                                            ? 'bg-cerulean-500/10 border-cerulean-500/40 shadow-[0_0_20px_rgba(59,130,246,0.1)]' 
                                            : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                                        }`}
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg ${
                                                selectedSeller === seller.name ? 'bg-cerulean-500 text-white' : 'bg-white/5 text-gray-500'
                                            }`}>
                                                {seller.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-white">{seller.name}</span>
                                                    {seller.rating >= 4.8 && <Zap className="w-3 h-3 text-yellow-500 fill-current" />}
                                                </div>
                                                <div className="text-xs text-gray-500 flex items-center gap-3">
                                                    <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-500 text-yellow-500" /> {seller.rating}</span>
                                                    <span>• {seller.shipping} shipping</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xl font-black text-white">${seller.price.toFixed(2)}</div>
                                            <div className="text-[10px] font-bold text-tea-green-500 uppercase tracking-wider">{seller.delivery} delivery</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Primary CTA */}
                        <motion.div variants={itemVariants} className="flex gap-4 pt-4">
                            <Button 
                                variant="primary" 
                                size="lg" 
                                className="flex-1 h-16 text-lg font-black group relative overflow-hidden"
                                onClick={() => {
                                    if (product) {
                                        addItem(product);
                                        showToast(`${product.name} added to your collection!`);
                                    }
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-cerulean-600 to-cerulean-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="relative flex items-center justify-center gap-3">
                                    <ShoppingCart className="w-6 h-6" />
                                    Add to Collection
                                </span>
                            </Button>
                            <Button 
                                variant=\"secondary\" 
                                size=\"lg\" 
                                className=\"w-16 h-16 flex items-center justify-center p-0\"
                                onClick={() => setIsInfoModalOpen(true)}
                            >
                                <Info className=\"w-6 h-6\" />
                            </Button>
                        </motion.div>

                        <AnimatePresence>
                            {isInfoModalOpen && (
                                <>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onClick={() => setIsInfoModalOpen(false)}
                                        className=\"fixed inset-0 bg-black/60 backdrop-blur-md z-[10000]\"
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                        className=\"fixed inset-0 m-auto w-full max-w-2xl h-fit bg-jet-black-950 border border-white/10 rounded-[40px] z-[10001] overflow-hidden shadow-2xl\"
                                    >
                                        <div className=\"p-12 relative\">
                                            <button 
                                                onClick={() => setIsInfoModalOpen(false)}
                                                className=\"absolute top-8 right-8 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 transition-all\"
                                            >
                                                <X className=\"w-5 h-5\" />
                                            </button>

                                            <div className=\"flex items-center gap-4 mb-8\">
                                                <div className=\"p-3 bg-cerulean-500/20 rounded-2xl text-cerulean-400\">
                                                    <ShieldCheck className=\"w-8 h-8\" />
                                                </div>
                                                <div>
                                                    <h2 className=\"text-3xl font-black text-white\">Sustainability Disclosure</h2>
                                                    <p className=\"text-xs text-gray-500 uppercase tracking-widest font-bold mt-1\">Verified Transparency Report</p>
                                                </div>
                                            </div>

                                            <div className=\"space-y-8\">
                                                <p className=\"text-gray-400 leading-relaxed\">
                                                    This score represents a comprehensive Life Cycle Assessment (LCA) performed by our AI engines, cross-referenced with global sustainability databases.
                                                </p>

                                                <div className=\"grid grid-cols-1 md:grid-cols-2 gap-6\">
                                                    {Object.entries(product.breakdown || {}).map(([key, value]) => (
                                                        <div key={key} className=\"p-6 rounded-3xl bg-white/5 border border-white/10\">
                                                            <div className=\"flex justify-between items-end mb-4\">
                                                                <span className=\"text-[10px] font-black uppercase tracking-widest text-cerulean-500\">{key}</span>
                                                                <span className=\"text-xl font-black text-white\">{value}%</span>
                                                            </div>
                                                            <div className=\"h-2 bg-black/40 rounded-full overflow-hidden\">
                                                                <motion.div 
                                                                    initial={{ width: 0 }}
                                                                    animate={{ width: `${value}%` }}
                                                                    className=\"h-full bg-cerulean-500\"
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className=\"p-8 rounded-3xl bg-tea-green-500/10 border border-tea-green-500/20\">
                                                    <div className=\"flex items-center gap-3 mb-4 text-tea-green-400\">
                                                        <Zap className=\"w-5 h-5\" />
                                                        <span className=\"font-bold uppercase tracking-widest text-xs\">AI Insight</span>
                                                    </div>
                                                    <p className=\"text-sm text-tea-green-300/80 leading-relaxed italic\">
                                                        \"This product excels in circularity. Its 'Take-Back' program ensures that 95% of its components can be reclaimed for new manufacturing cycles, significantly reducing landfill impact.\"
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>

                        {/* Reassurance Bars */}
                        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 pt-4">
                            <div className="flex flex-col items-center gap-2 text-center">
                                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-500">
                                    <Truck className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Carbon Neutral Shipping</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-500">
                                    <RefreshCw className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">30-Day Circular Returns</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-500">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">SB Verified Impact</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Technical Specifications / Expanded Info */}
                <motion.section 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 pt-32 border-t border-white/10"
                >
                    <div className="max-w-4xl mx-auto">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-cerulean-500/10 border border-cerulean-500/30 text-cerulean-400 text-[10px] font-black uppercase tracking-[3px] mb-8">
                            Full Disclosure
                        </div>
                        <h2 className="text-4xl font-bold mb-12">Product Transparency Report</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            <div className="space-y-8">
                                <div>
                                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                        <Leaf className="w-5 h-5 text-tea-green-500" />
                                        Material Origin
                                    </h4>
                                    <p className="text-gray-400 leading-relaxed">
                                        Sourced from certified organic cooperatives and recycled marine plastics. Our supply chain is 100% traceable from raw material to final assembly.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-yellow-500" />
                                        Energy Usage
                                    </h4>
                                    <p className="text-gray-400 leading-relaxed">
                                        Manufactured in facilities powered by 100% renewable energy (wind and solar). Net-zero carbon emissions throughout the production cycle.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="space-y-8">
                                <div>
                                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                        <Box className="w-5 h-5 text-cerulean-500" />
                                        Packaging
                                    </h4>
                                    <p className="text-gray-400 leading-relaxed">
                                        Shipped in 100% biodegradable, FSC-certified compostable packaging. Zero plastic-tape policy and soy-based ink printing.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                        <RefreshCw className="w-5 h-5 text-tropical-teal-500" />
                                        End of Life
                                    </h4>
                                    <p className="text-gray-400 leading-relaxed">
                                        Part of our 'Take-Back' program. Return this product at the end of its life for a store credit and guaranteed professional recycling.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>
            </div>
            
            {/* Sticky Mobile Add to Cart (Visible only on small screens) */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-jet-black-950/80 backdrop-blur-2xl border-t border-white/10 z-50">
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">Total</div>
                        <div className="text-2xl font-black">${product.price}</div>
                    </div>
                    <Button variant="primary" className="flex-[2] h-14 font-black">
                        Add to Collection
                    </Button>
                </div>
            </div>
        </div>
    );
}
