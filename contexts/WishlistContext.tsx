"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/lib/db";
import { useToast } from "./ToastContext";

interface WishlistContextType {
    wishlist: Product[];
    toggleWishlist: (product: Product) => void;
    isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const [wishlist, setWishlist] = useState<Product[]>([]);
    const { showToast } = useToast();

    // Load from LocalStorage
    useEffect(() => {
        const saved = localStorage.getItem("sb-wishlist");
        if (saved) {
            try {
                setWishlist(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load wishlist", e);
            }
        }
    }, []);

    // Save to LocalStorage
    useEffect(() => {
        localStorage.setItem("sb-wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    const toggleWishlist = (product: Product) => {
        setWishlist(prev => {
            const exists = prev.some(item => item.id === product.id);
            if (exists) {
                showToast(`Removed ${product.name} from favorites`, "info");
                return prev.filter(item => item.id !== product.id);
            } else {
                showToast(`Added ${product.name} to favorites`, "success");
                return [...prev, product];
            }
        });
    };

    const isInWishlist = (productId: string) => {
        return wishlist.some(item => item.id === productId);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (!context) throw new Error("useWishlist must be used within a WishlistProvider");
    return context;
}
