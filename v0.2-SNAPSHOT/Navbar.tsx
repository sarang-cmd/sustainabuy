"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/Button";
import { Leaf, ShoppingCart, User as UserIcon, LogIn } from "lucide-react";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();
    const router = useRouter();
    const { toggleCart, itemCount } = useCart();

    return (
        <nav className="border-b border-white/5 bg-jet-black-950/50 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2 group">
                            <div className="bg-cerulean-500/20 p-2 rounded-xl group-hover:bg-cerulean-500/30 transition-colors">
                                <Leaf className="h-6 w-6 text-cerulean-400" />
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">SustainaBuy</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/products" className="text-gray-400 hover:text-white transition-colors font-medium">Marketplace</Link>
                        <Link href="/databank" className="text-gray-400 hover:text-white transition-colors font-medium">Data Bank</Link>

                        <div className="flex items-center space-x-4 border-l border-white/10 pl-8">
                            <button
                                onClick={toggleCart}
                                className="relative p-2 text-gray-400 hover:text-white transition-colors"
                            >
                                <ShoppingCart className="h-6 w-6" />
                                {itemCount > 0 && (
                                    <span className="absolute top-0 right-0 bg-cerulean-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-jet-black-950">
                                        {itemCount}
                                    </span>
                                )}
                            </button>

                            {user ? (
                                <Link href="/account">
                                    <Button variant="secondary" size="sm" className="flex items-center gap-2 pr-4 pl-2 !rounded-full">
                                        <div className="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
                                            {user.photoURL ? (
                                                <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-cerulean-500/20">
                                                    <span className="text-[10px] font-bold text-cerulean-400">
                                                        {user.displayName?.charAt(0) || "U"}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-sm font-bold">My Account</span>
                                    </Button>
                                </Link>
                            ) : (
                                <Link href="/login">
                                    <Button size="sm" className="flex items-center gap-2 px-6 !rounded-full">
                                        <LogIn className="h-4 w-4" /> Sign In
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
