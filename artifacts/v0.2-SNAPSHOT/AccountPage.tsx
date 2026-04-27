"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserProfile, UserProfile } from "@/lib/db";
import { LiquidCard } from "@/components/ui/LiquidCard";
import { Button } from "@/components/ui/Button";
import { Leaf, Award, Heart, LogOut, Settings } from "lucide-react";

export default function AccountPage() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            router.push("/login");
            return;
        }

        const fetchProfile = async () => {
            try {
                const data = await getUserProfile(user.uid);
                setProfile(data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user, router]);

    if (loading) return <div className="p-20 text-center text-white">Loading profile...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-white mb-8">My Account</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Card */}
                <LiquidCard className="p-8 col-span-1 md:col-span-1 h-fit">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 rounded-full bg-jet-black-800 border-2 border-cerulean-500 mb-4 overflow-hidden relative">
                            {user?.photoURL ? (
                                <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-2xl text-cerulean-500 font-bold">
                                    {user?.displayName?.charAt(0) || "U"}
                                </div>
                            )}
                        </div>
                        <h2 className="text-xl font-bold text-white mb-1">{user?.displayName || "User"}</h2>
                        <p className="text-gray-400 text-sm mb-6">{user?.email}</p>

                        <div className="w-full space-y-3">
                            <Button variant="secondary" className="w-full flex items-center justify-center gap-2">
                                <Settings className="h-4 w-4" /> Settings
                            </Button>
                            <Button
                                variant="ghost"
                                className="w-full flex items-center justify-center gap-2 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                                onClick={async () => {
                                    await logout();
                                    router.push("/");
                                }}
                            >
                                <LogOut className="h-4 w-4" /> Sign Out
                            </Button>
                        </div>
                    </div>
                </LiquidCard>

                {/* Dashboard & Stats */}
                <div className="col-span-1 md:col-span-2 space-y-8">
                    {/* Gamification / Impact Score */}
                    <LiquidCard className="p-8 bg-gradient-to-br from-jet-black-900/40 to-cerulean-900/10">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Award className="h-6 w-6 text-yellow-400" />
                                Sustainability Impact
                            </h3>
                            <span className="bg-cerulean-500/20 text-cerulean-300 px-3 py-1 rounded-full text-sm font-medium">
                                Level 1: Conscious Consumer
                            </span>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="p-4 rounded-xl bg-white/5">
                                <div className="text-3xl font-bold text-white mb-1">{profile?.sustainabilityScore || 0}</div>
                                <div className="text-xs text-gray-400 uppercase tracking-wide">Points Earned</div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5">
                                <div className="text-3xl font-bold text-white mb-1">{profile?.wishlist?.length || 0}</div>
                                <div className="text-xs text-gray-400 uppercase tracking-wide">Saved Items</div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5">
                                <div className="text-3xl font-bold text-white mb-1">0kg</div>
                                <div className="text-xs text-gray-400 uppercase tracking-wide">CO2 Avoided</div>
                            </div>
                        </div>
                    </LiquidCard>

                    {/* Quick Links */}
                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            className="h-32 flex flex-col items-center justify-center gap-3 bg-jet-black-800/50 hover:bg-jet-black-800 border border-white/5"
                            onClick={() => router.push('/wishlist')}
                        >
                            <Heart className="h-8 w-8 text-red-400" />
                            <span className="text-lg">My Wishlist</span>
                        </Button>
                        <Button
                            className="h-32 flex flex-col items-center justify-center gap-3 bg-jet-black-800/50 hover:bg-jet-black-800 border border-white/5"
                            onClick={() => router.push('/products')}
                        >
                            <Leaf className="h-8 w-8 text-tea-green-400" />
                            <span className="text-lg">Discover Products</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
