"use client";

import React from "react";
import { useWishlist } from "@/contexts/WishlistContext";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Trash2, ArrowRight, Star, Leaf } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LiquidCard } from "@/components/ui/LiquidCard";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

export default function WishlistPage() {
    const { wishlist, toggleWishlist } = useWishlist();
    const { addItem } = useCart();

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
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="min-h-screen bg-jet-black-950 text-white pt-24 pb-20 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16 text-center"
                >
                    <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] font-black uppercase tracking-[3px] mb-6">
                        Personal Collection
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-4">
                        Your Favorites
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        A curated selection of your most loved sustainable finds. Ready to make them yours?
                    </p>
                </motion.div>

                {wishlist.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-20 text-center"
                    >
                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10 text-gray-700">
                            <Heart className="w-12 h-12" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
                        <p className="text-gray-500 mb-10 max-w-sm">
                            Explore our catalog and save the items that inspire your sustainable journey.
                        </p>
                        <Link href="/products">
                            <Button variant="primary" size="lg" className="px-10">
                                Discover Products
                            </Button>
                        </Link>
                    </motion.div>
                ) : (
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {wishlist.map((product) => (
                                <motion.div key={product.id} variants={itemVariants} layout exit={{ opacity: 0, scale: 0.9 }}>
                                    <LiquidCard className="group relative h-full flex flex-col p-6 hover:border-red-500/30 transition-all duration-500">
                                        {/* Remove Button */}
                                        <button 
                                            onClick={() => toggleWishlist(product)}
                                            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 text-gray-400 hover:text-red-400 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>

                                        {/* Image */}
                                        <div className="relative aspect-square mb-8 rounded-2xl overflow-hidden bg-white/5 p-4 flex items-center justify-center">
                                            <img 
                                                src={product.image} 
                                                alt={product.name} 
                                                className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700" 
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-grow space-y-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-cerulean-500">{product.category}</span>
                                                    <h3 className="text-xl font-bold text-white group-hover:text-cerulean-300 transition-colors">{product.name}</h3>
                                                </div>
                                                <div className="text-xl font-black text-white">${product.price}</div>
                                            </div>

                                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                                    {product.rating || 4.8}
                                                </span>
                                                <span className="flex items-center gap-1 text-tea-green-400 font-bold">
                                                    <Leaf className="w-3 h-3" />
                                                    Score: {product.score}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="mt-8 pt-6 border-t border-white/5 flex gap-3">
                                            <Button 
                                                variant="primary" 
                                                size="sm" 
                                                className="flex-1"
                                                onClick={() => addItem(product)}
                                            >
                                                <ShoppingCart className="w-4 h-4 mr-2" />
                                                Add to Cart
                                            </Button>
                                            <Link href={`/products/${product.id}`} className="flex-1">
                                                <Button variant="secondary" size="sm" className="w-full">
                                                    Details
                                                    <ArrowRight className="w-4 h-4 ml-2" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </LiquidCard>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
