"use client";

import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { UIProvider } from '@/contexts/UIContext';
import { CartDrawer } from '@/components/ui/CartDrawer';
import { LiquidGlassPill } from '@/components/ui/LiquidGlassPill';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <UIProvider>
                <ToastProvider>
                    <CartProvider>
                        <WishlistProvider>
                            {children}
                            <CartDrawer />
                            <LiquidGlassPill />
                        </WishlistProvider>
                    </CartProvider>
                </ToastProvider>
            </UIProvider>
        </AuthProvider>
    );
}
