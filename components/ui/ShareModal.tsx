"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Twitter, Facebook, Linkedin, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./Button";

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    url: string;
}

export function ShareModal({ isOpen, onClose, title, url }: ShareModalProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy!", err);
        }
    };

    const shareLinks = [
        {
            name: "Twitter",
            icon: Twitter,
            color: "bg-[#1DA1F2]",
            href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            color: "bg-[#0A66C2]",
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        },
        {
            name: "Facebook",
            icon: Facebook,
            color: "bg-[#1877F2]",
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        },
        {
            name: "Email",
            icon: Mail,
            color: "bg-gray-600",
            href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`
        }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-jet-black-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-white">Share Product</h3>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <p className="text-gray-400 mb-6 font-medium">
                                Spread the word about sustainable choices.
                            </p>

                            <div className="grid grid-cols-4 gap-4 mb-8">
                                {shareLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-col items-center gap-2 group"
                                    >
                                        <div className={`p-3 rounded-2xl ${link.color} text-white transition-transform group-hover:scale-110 active:scale-95 shadow-lg`}>
                                            <link.icon className="h-6 w-6" />
                                        </div>
                                        <span className="text-xs text-gray-400 font-medium">{link.name}</span>
                                    </a>
                                ))}
                            </div>

                            <div className="relative">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                                    Copy Link
                                </label>
                                <div className="flex gap-2">
                                    <div className="flex-grow bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300 truncate font-mono">
                                        {url}
                                    </div>
                                    <Button
                                        variant="primary"
                                        onClick={handleCopy}
                                        className="!rounded-xl px-4"
                                    >
                                        {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                                    </Button>
                                </div>
                                {copied && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="absolute -bottom-6 left-0 text-xs text-tea-green-400 font-bold"
                                    >
                                        Copied to clipboard!
                                    </motion.p>
                                )}
                            </div>
                        </div>

                        {/* Liquid decorative background */}
                        <div className="absolute top-0 right-0 -z-10 opacity-20">
                            <div className="w-32 h-32 bg-cerulean-500 rounded-full blur-3xl translate-x-10 -translate-y-10" />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
