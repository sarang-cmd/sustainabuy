"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { updateUserProfile } from "@/lib/db";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { LiquidCard } from "@/components/ui/LiquidCard";
import { ShieldCheck, User as UserIcon, Calendar, FileText, Check } from "lucide-react";

const AVATAR_PRESETS = [
    { id: "nature-1", url: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=150", label: "Green Forest" },
    { id: "ocean-1", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=150", label: "Deep Sea" },
    { id: "mountain-1", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=150", label: "Snow Peak" },
    { id: "leaf-1", url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=150", label: "Eco Leaf" },
    { id: "sunset-1", url: "https://images.unsplash.com/photo-1470252649358-96f3c8024219?auto=format&fit=crop&q=80&w=150", label: "Warm Sunset" },
];

export function AccountSettingsContent() {
    const { user, userProfile, refreshProfile } = useAuth();
    const [name, setName] = useState(userProfile?.displayName || "");
    const [bio, setBio] = useState(userProfile?.bio || "");
    const [birthday, setBirthday] = useState(userProfile?.birthday || "");
    const [selectedAvatarId, setSelectedAvatarId] = useState(userProfile?.avatarId || "");
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSave = async () => {
        if (!user) return;
        setSaving(true);
        setSuccess(false);

        try {
            const avatarUrl = AVATAR_PRESETS.find(a => a.id === selectedAvatarId)?.url || user.photoURL;

            await updateUserProfile(user.uid, {
                displayName: name,
                bio,
                birthday,
                avatarId: selectedAvatarId,
                photoURL: avatarUrl
            });
            await refreshProfile();
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section>
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <UserIcon className="h-5 w-5 text-cerulean-400" />
                    Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 font-medium">Display Name</label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 font-medium">Birthday</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <input
                                type="date"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:ring-1 focus:ring-cerulean-500/50 transition-all"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-cerulean-400" />
                    About You
                </h3>
                <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-medium">Short Bio</label>
                    <textarea
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:ring-1 focus:ring-cerulean-500/50 transition-all min-h-[120px] resize-none"
                        placeholder="Tell the community about your sustainability journey..."
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                </div>
            </section>

            <section>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-cerulean-400" />
                        Avatar Presets
                    </h3>
                    <span className="text-xs text-gray-500 uppercase tracking-widest">Premium Collection</span>
                </div>
                <div className="flex flex-wrap gap-4">
                    {AVATAR_PRESETS.map((avatar) => (
                        <button
                            key={avatar.id}
                            onClick={() => setSelectedAvatarId(avatar.id)}
                            className={`group relative w-16 h-16 rounded-2xl overflow-hidden border-2 transition-all ${selectedAvatarId === avatar.id
                                    ? "border-cerulean-500 scale-110 shadow-lg shadow-cerulean-500/20"
                                    : "border-transparent opacity-60 hover:opacity-100"
                                }`}
                        >
                            <img src={avatar.url} alt={avatar.label} className="w-full h-full object-cover" />
                            {selectedAvatarId === avatar.id && (
                                <div className="absolute inset-0 bg-cerulean-500/20 flex items-center justify-center">
                                    <Check className="h-6 w-6 text-white" />
                                </div>
                            )}
                        </button>
                    ))}
                    <button
                        onClick={() => setSelectedAvatarId("")}
                        className={`w-16 h-16 rounded-2xl bg-white/5 border-2 flex flex-col items-center justify-center gap-1 transition-all ${selectedAvatarId === ""
                                ? "border-cerulean-500 scale-110"
                                : "border-transparent opacity-60 hover:opacity-100"
                            }`}
                    >
                        <UserIcon className="h-5 w-5 text-gray-400" />
                        <span className="text-[10px] text-gray-500 uppercase">Default</span>
                    </button>
                </div>
            </section>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <p className="text-xs text-gray-500">All data is stored securely in your SustainaBuy profile.</p>
                <Button
                    onClick={handleSave}
                    disabled={saving}
                    className={`min-w-[140px] ${success ? "bg-tea-green-500 hover:bg-tea-green-600" : ""}`}
                >
                    {saving ? "Saving..." : success ? "Profile Updated!" : "Save Changes"}
                </Button>
            </div>
        </div>
    );
}
