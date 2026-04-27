"use client";

import React, { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/contexts/ToastContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShoppingCart, CheckCircle2 } from "lucide-react";
import { Button } from "./Button";
import { LiquidCard } from "./LiquidCard";
import Link from "next/link";

export function CartDrawer() {
    const { isOpen, closeCart, items, removeFromCart, updateQuantity, total, itemCount, clearCart } = useCart();
    const { showToast } = useToast();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [step, setStep] = useState<"cart" | "success">("cart");

    const handleCheckout = () => {
        setIsCheckingOut(true);
        // Simulate processing
        setTimeout(() => {
            setStep("success");
            setIsCheckingOut(false);
            showToast("Order placed successfully!", "success");
            clearCart();
        }, 2000);
    };

    const handleClose = () => {
        closeCart();
        // Reset step after animation
        setTimeout(() => setStep("cart"), 500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[9998]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-jet-black-950 border-l border-white/10 z-[9999] flex flex-col shadow-[-40px_0_100px_rgba(0,0,0,0.8)]"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-jet-black-900/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-cerulean-500/20 text-cerulean-400">
                                    <ShoppingBag className="h-5 w-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">{step === 'cart' ? 'Your Cart' : 'Success'}</h2>
                                    <p className="text-xs text-gray-500">{step === 'cart' ? `${itemCount} items selected` : 'Order #SB-8291'}</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" onClick={handleClose} className="!p-2 hover:bg-white/5 rounded-full">
                                <X className="h-6 w-6 text-gray-400" />
                            </Button>
                        </div>

                        {/* Content */}
                        <div className="flex-grow overflow-y-auto p-6 no-scrollbar">
                            <AnimatePresence mode="wait">
                                {step === 'cart' ? (
                                    <motion.div
                                        key="cart-content"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-6"
                                    >
                                        {items.length === 0 ? (
                                            <div className="h-full flex flex-col items-center justify-center text-center py-20">
                                                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                                                    <ShoppingCart className="h-10 w-10 text-gray-700" />
                                                </div>
                                                <h3 className="text-xl font-bold text-white mb-2">Cart is empty</h3>
                                                <p className="text-gray-500 mb-8 max-w-[200px]">Looks like you haven&apos;t added any sustainable finds yet.</p>
                                                <Button onClick={handleClose} className="bg-cerulean-500 shadow-lg shadow-cerulean-500/20">Start Shopping</Button>
                                            </div>
                                        ) : (
                                            items.map((item) => (
                                                <LiquidCard key={item.id} className="p-4 !bg-white/5 border-white/5 group">
                                                    <div className="flex gap-4">
                                                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                                                            <img src={item.image} alt={item.productName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                        </div>
                                                        <div className="flex-grow min-w-0">
                                                            <div className="flex justify-between items-start mb-1">
                                                                <h4 className="text-white font-bold text-sm truncate pr-2">{item.productName}</h4>
                                                                <button onClick={() => removeFromCart(item.id)} className="text-gray-600 hover:text-red-400 transition-colors">
                                                                    <Trash2 className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                            <p className="text-[10px] text-cerulean-400 uppercase tracking-widest font-bold mb-2">{item.variantName} • {item.sellerName}</p>

                                                            <div className="flex items-center justify-between mt-auto">
                                                                <p className="text-lg font-bold text-white">${(item.price * item.quantity).toFixed(2)}</p>
                                                                <div className="flex items-center bg-black/40 rounded-lg p-1 border border-white/5">
                                                                    <button
                                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                        className="p-1 hover:bg-white/5 rounded-md transition-colors"
                                                                    >
                                                                        <Minus className="h-3 w-3 text-gray-400" />
                                                                    </button>
                                                                    <span className="px-3 text-xs font-bold text-white">{item.quantity}</span>
                                                                    <button
                                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                        className="p-1 hover:bg-white/5 rounded-md transition-colors"
                                                                    >
                                                                        <Plus className="h-3 w-3 text-gray-400" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </LiquidCard>
                                            ))
                                        )}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="success-content"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="h-full flex flex-col items-center justify-center text-center py-10"
                                    >
                                        <div className="w-24 h-24 bg-tea-green-500/20 rounded-full flex items-center justify-center mb-8 border border-tea-green-500/30">
                                            <CheckCircle2 className="h-12 w-12 text-tea-green-500" />
                                        </div>
                                        <h2 className="text-3xl font-black text-white mb-4">Thank You!</h2>
                                        <p className="text-gray-400 mb-10 max-w-[250px]">Your sustainable choices are making a difference. We&apos;ve sent a confirmation to your email.</p>
                                        <div className="w-full space-y-4">
                                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-left">
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-gray-500">Estimated Delivery</span>
                                                    <span className="text-white font-bold">April 30, 2026</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-500">Shipping Method</span>
                                                    <span className="text-white font-bold">Eco-Express (Carbon Neutral)</span>
                                                </div>
                                            </div>
                                            <Button onClick={handleClose} className="w-full py-6 text-lg bg-cerulean-500">Back to Shop</Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Footer */}
                        {items.length > 0 && step === 'cart' && (
                            <div className="p-6 bg-jet-black-900/80 border-t border-white/10 backdrop-blur-xl">
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Subtotal</span>
                                        <span className="text-white">${total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Shipping</span>
                                        <span className="text-tea-green-400 font-medium">Free</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-bold pt-3 border-t border-white/5">
                                        <span className="text-white">Total</span>
                                        <span className="text-cerulean-400">${total.toFixed(2)}</span>
                                    </div>
                                </div>
                                <Button 
                                    onClick={handleCheckout}
                                    disabled={isCheckingOut}
                                    className="w-full py-6 text-lg bg-cerulean-500 shadow-xl shadow-cerulean-500/20 group overflow-hidden relative"
                                >
                                    {isCheckingOut ? (
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Processing...
                                        </div>
                                    ) : (
                                        <div className="flex items-center">
                                            Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    )}
                                </Button>
                                <p className="text-[10px] text-center text-gray-600 mt-4 uppercase tracking-[0.2em]">Secure Checkout Powered by SustainaBuy</p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
