"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/lib/db";

interface CartItem extends Product {
    quantity: number;
    // Compatibility fields for the V3 Cart UI
    productName: string;
    variantName: string;
    sellerName: string;
}

interface CartContextType {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    itemCount: number;
    total: number;
    isOpen: boolean;
    toggleCart: () => void;
    closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    // Load from LocalStorage
    useEffect(() => {
        const saved = localStorage.getItem("sb-cart-v3");
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load cart", e);
            }
        }
    }, []);

    // Save to LocalStorage
    useEffect(() => {
        localStorage.setItem("sb-cart-v3", JSON.stringify(items));
    }, [items]);

    const addItem = (product: Product) => {
        setItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => 
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            // Map product to CartItem with UI compatibility fields
            const newItem: CartItem = { 
                ...product, 
                quantity: 1,
                productName: product.name,
                variantName: product.category,
                sellerName: product.brand
            };
            return [...prev, newItem];
        });
        // Auto-open cart for feedback
        setIsOpen(true);
    };

    const removeFromCart = (productId: string) => {
        setItems(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }
        setItems(prev => prev.map(item => 
            item.id === productId ? { ...item, quantity } : item
        ));
    };

    const clearCart = () => setItems([]);
    const toggleCart = () => setIsOpen(!isOpen);
    const closeCart = () => setIsOpen(false);

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ 
            items, 
            addItem, 
            removeFromCart, 
            updateQuantity,
            clearCart, 
            itemCount, 
            total,
            isOpen,
            toggleCart,
            closeCart
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
}
