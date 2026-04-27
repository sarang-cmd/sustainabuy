"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import { Menu, X, Leaf, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { CartDrawer } from "@/components/ui/CartDrawer";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, userProfile } = useAuth();
    const router = useRouter();
    const { toggleCart, itemCount } = useCart();

    return (
        <nav className="glass-header">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="bg-cerulean-500/20 p-2 rounded-xl group-hover:bg-cerulean-500/30 transition-colors">
                            <Leaf className="h-6 w-6 text-cerulean-400 group-hover:text-cerulean-300 transition-colors" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-cerulean-300 to-tropical-teal-300 bg-clip-text text-transparent">
                            SustainaBuy
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <Link href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Home
                            </Link>
                            <Link href="/products" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Products
                            </Link>
                            <Link href="/databank" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Data Bank
                            </Link>
                        </div>
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-2">
                        <form
                            onSubmit={(e: FormEvent) => {
                                e.preventDefault();
                                const query = (e.target as any).search.value;
                                if (query.trim()) router.push(`/products?q=${encodeURIComponent(query)}`);
                            }}
                            className="relative group mr-2"
                        >
                            <input
                                name="search"
                                type="text"
                                placeholder="Search products..."
                                className="bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cerulean-500/50 w-48 transition-all group-hover:bg-white/10"
                            />
                            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                                <Search className="h-4 w-4 text-gray-500 group-hover:text-cerulean-400 transition-colors" />
                            </button>
                        </form>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="!p-2 relative group"
                            onClick={toggleCart}
                        >
                            <ShoppingBag className="h-5 w-5 group-hover:text-cerulean-400 transition-colors" />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 h-4 w-4 bg-cerulean-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-cerulean-500/40">
                                    {itemCount}
                                </span>
                            )}
                        </Button>
                        <div className="h-6 w-px bg-white/10 mx-2"></div>

                        {user ? (
                            <Link href="/account">
                                <Button variant="secondary" size="sm" className="flex items-center gap-2 pr-4 pl-2 !rounded-full">
                                    <div className="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
                                        {userProfile?.photoURL || user.photoURL ? (
                                            <img src={userProfile?.photoURL || user.photoURL || ""} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-cerulean-500/20">
                                                <span className="text-[10px] font-bold text-cerulean-400">
                                                    {(userProfile?.displayName || user.displayName)?.charAt(0) || "U"}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <span className="text-xs font-medium text-gray-200">Account</span>
                                </Button>
                            </Link>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="secondary" size="sm">Log In</Button>
                                </Link>
                                <Link href="/signup">
                                    <Button variant="primary" size="sm">Sign Up</Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white p-2 rounded-md"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden glass-card mx-4 mt-2 p-4 animate-in slide-in-from-top-2">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                            Home
                        </Link>
                        <Link href="/products" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                            Products
                        </Link>
                        <Link href="/databank" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                            Data Bank
                        </Link>
                    </div>
                    <div className="pt-4 pb-3 border-t border-white/10 flex flex-col gap-3">
                        <Link href="/login" className="w-full">
                            <Button variant="secondary" className="w-full justify-center">Log In</Button>
                        </Link>
                        <Link href="/signup" className="w-full">
                            <Button variant="primary" className="w-full justify-center">Sign Up</Button>
                        </Link>
                    </div>
                </div>
            )}

            <CartDrawer />
        </nav>
    );
}
