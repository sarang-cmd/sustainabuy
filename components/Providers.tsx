"use client";

import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { UIProvider } from '@/contexts/UIContext';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <UIProvider>
                <ToastProvider>
                    <CartProvider>
                        <WishlistProvider>
                            {children}
                        </WishlistProvider>
                    </CartProvider>
                </ToastProvider>
            </UIProvider>
        </AuthProvider>
    );
}
