"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { SellerOffer, Product } from "@/lib/db";

export interface CartItem {
    id: string; // offer ID
    productId: string;
    variantId: string;
    productName: string;
    variantName: string;
    sellerName: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, variant: any, offer: SellerOffer) => void;
    removeFromCart: (offerId: string) => void;
    updateQuantity: (offerId: string, quantity: number) => void;
    clearCart: () => void;
    total: number;
    itemCount: number;
    isOpen: boolean;
    toggleCart: () => void;
    closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("sustainabuy-cart");
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    // Save cart to localStorage on change
    useEffect(() => {
        localStorage.setItem("sustainabuy-cart", JSON.stringify(items));
    }, [items]);

    const addToCart = (product: Product, variant: any, offer: SellerOffer) => {
        setItems(prev => {
            const existingItem = prev.find(item => item.id === offer.id);
            if (existingItem) {
                return prev.map(item =>
                    item.id === offer.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, {
                id: offer.id,
                productId: product.id,
                variantId: variant.id,
                productName: product.name,
                variantName: variant.name,
                sellerName: offer.sellerName,
                price: offer.price,
                image: product.image,
                quantity: 1
            }];
        });
        setIsOpen(true); // Open cart when item added
    };

    const removeFromCart = (offerId: string) => {
        setItems(prev => prev.filter(item => item.id !== offerId));
    };

    const updateQuantity = (offerId: string, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(offerId);
            return;
        }
        setItems(prev => prev.map(item =>
            item.id === offerId ? { ...item, quantity } : item
        ));
    };

    const clearCart = () => setItems([]);
    const toggleCart = () => setIsOpen(prev => !prev);
    const closeCart = () => setIsOpen(false);

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            items, addToCart, removeFromCart, updateQuantity, clearCart,
            total, itemCount, isOpen, toggleCart, closeCart
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
