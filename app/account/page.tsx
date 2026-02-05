"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { getUserProfile, UserProfile } from "@/lib/db";
import { LiquidCard } from "@/components/ui/LiquidCard";
import { Button } from "@/components/ui/Button";
import { Leaf, Award, Heart, LogOut, Settings, History, User as UserIcon } from "lucide-react";
import { AccountSettingsContent } from "@/components/account/AccountSettingsContent";
import { ProductCard } from "@/components/product/ProductCard";
import Link from "next/link";

export default function AccountPage() {
    const { user, userProfile, logout } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"impact" | "settings" | "history">("impact");
    const [history, setHistory] = useState<any[]>([]);

    useEffect(() => {
        if (!user) {
            router.push("/login");
            return;
        }

        // Load History from localStorage
        const storedHistory = localStorage.getItem("recentlyViewed");
        if (storedHistory) {
            try {
                setHistory(JSON.parse(storedHistory));
            } catch (e) {
                console.error("Failed to parse history:", e);
            }
        }

        setLoading(false);
    }, [user, router]);

    if (loading) return <div className="p-20 text-center text-white">Loading profile...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-white mb-8">My Account</h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-1 space-y-4">
                    <LiquidCard className="p-6">
                        <div className="flex flex-col items-center text-center mb-8">
                            <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 mb-4 overflow-hidden relative">
                                {userProfile?.photoURL ? (
                                    <img src={userProfile.photoURL} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-xl text-cerulean-500 font-bold bg-cerulean-500/10">
                                        {user?.displayName?.charAt(0) || "U"}
                                    </div>
                                )}
                            </div>
                            <h2 className="text-lg font-bold text-white mb-1">{userProfile?.displayName || user?.displayName || "SustainaUser"}</h2>
                            <p className="text-xs text-gray-500 truncate w-full">{user?.email}</p>
                        </div>

                        <nav className="space-y-1">
                            {[
                                { id: "impact", label: "Dashboard", icon: Award },
                                { id: "settings", label: "Settings", icon: Settings },
                                { id: "history", label: "History", icon: History },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id
                                            ? "bg-cerulean-500 text-white shadow-lg shadow-cerulean-500/20"
                                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    <tab.icon className={`h-4 w-4 ${activeTab === tab.id ? "text-white" : "text-gray-500"}`} />
                                    {tab.label}
                                </button>
                            ))}
                            <button
                                onClick={async () => {
                                    await logout();
                                    router.push("/");
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all mt-4"
                            >
                                <LogOut className="h-4 w-4" /> Sign Out
                            </button>
                        </nav>
                    </LiquidCard>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3">
                    {activeTab === "impact" && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                            {/* Stats Grid */}
                            <LiquidCard className="p-8 bg-gradient-to-br from-jet-black-900/40 to-cerulean-900/10">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                        <Award className="h-6 w-6 text-yellow-400" />
                                        Impact Dashboard
                                    </h3>
                                    <div className="flex flex-col items-end">
                                        <span className="bg-cerulean-500/20 text-cerulean-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                            Level {Math.floor((userProfile?.sustainabilityScore || 0) / 100) + 1}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors">
                                        <div className="text-3xl font-bold text-white mb-2 group-hover:scale-105 transition-transform">{userProfile?.sustainabilityScore || 0}</div>
                                        <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Points Earned</div>
                                    </div>
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors">
                                        <div className="text-3xl font-bold text-white mb-2 group-hover:scale-105 transition-transform">{userProfile?.wishlist?.length || 0}</div>
                                        <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Saved Items</div>
                                    </div>
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors">
                                        <div className="text-3xl font-bold text-white mb-2 group-hover:scale-105 transition-transform">0kg</div>
                                        <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">CO2 Offset</div>
                                    </div>
                                </div>
                            </LiquidCard>

                            {/* Quick Discovery */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Link href="/wishlist">
                                    <LiquidCard className="p-6 hover:bg-white/10 transition-all group flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Heart className="h-6 w-6 text-red-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold">My Wishlist</h4>
                                            <p className="text-xs text-gray-500">Items saved for later</p>
                                        </div>
                                    </LiquidCard>
                                </Link>
                                <Link href="/products">
                                    <LiquidCard className="p-6 hover:bg-white/10 transition-all group flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-tea-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Leaf className="h-6 w-6 text-tea-green-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold">Marketplace</h4>
                                            <p className="text-xs text-gray-500">Discover eco-friendly finds</p>
                                        </div>
                                    </LiquidCard>
                                </Link>
                            </div>
                        </div>
                    )}

                    {activeTab === "settings" && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <LiquidCard className="p-8">
                                <AccountSettingsContent />
                            </LiquidCard>
                        </div>
                    )}

                    {activeTab === "history" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <History className="h-6 w-6 text-cerulean-400" />
                                    Browsing History
                                </h3>
                                <span className="text-xs text-gray-500 uppercase tracking-widest">{history.length} items</span>
                            </div>

                            {history.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {history.map((item) => (
                                        <ProductCard key={item.id} {...item} />
                                    ))}
                                </div>
                            ) : (
                                <div className="p-20 text-center bg-white/5 rounded-3xl border border-dashed border-white/10">
                                    <p className="text-gray-500">Your history is as clean as a fresh breeze. Start exploring!</p>
                                    <Link href="/products">
                                        <Button variant="secondary" className="mt-6">Explore Products</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
