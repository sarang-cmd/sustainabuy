"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { LiquidCard } from "@/components/ui/LiquidCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Leaf, Github, Mail, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { signInWithGoogle, signInWithGithub } = useAuth();
    const router = useRouter();

    const handleGoogleSignIn = async () => {
        try {
            setLoading(true);
            setError("");
            await signInWithGoogle();
            router.push("/");
        } catch (error: any) {
            setError("Failed to sign in with Google.");
        } finally {
            setLoading(false);
        }
    };

    const handleGithubSignIn = async () => {
        try {
            setLoading(true);
            setError("");
            await signInWithGithub();
            router.push("/");
        } catch (error: any) {
            setError("Failed to sign in with GitHub.");
        } finally {
            setLoading(false);
        }
    };

    const handleEmailSignIn = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder as instructed in V1
        setError("Email/Password login is currently disabled for security. Please use Social Login.");
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
            {/* Dynamic Background */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-cerulean-500/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-tropical-teal-500/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full max-w-md"
            >
                <LiquidCard className="p-10 w-full backdrop-blur-3xl">
                    <div className="flex flex-col items-center mb-8">
                        <div className="bg-white/10 p-4 rounded-2xl mb-4 ring-1 ring-white/20 shadow-lg shadow-cerulean-500/10">
                            <Leaf className="h-8 w-8 text-tea-green-400" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-gray-400 text-center">Sign in to continue your sustainable journey</p>
                    </div>

                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
                                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 text-red-200 text-sm overflow-hidden"
                            >
                                <AlertCircle className="h-5 w-5 shrink-0" />
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="space-y-4">
                        <Button
                            type="button"
                            variant="secondary"
                            className="w-full h-12 relative overflow-hidden group border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all"
                            onClick={handleGoogleSignIn}
                            disabled={loading}
                        >
                            <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <span className="relative flex items-center justify-center gap-2">
                                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : (
                                    <>
                                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                                            <path
                                                fill="currentColor"
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                className="text-white"
                                            />
                                            <path
                                                fill="currentColor"
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                className="text-white"
                                            />
                                            <path
                                                fill="currentColor"
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                className="text-white"
                                            />
                                            <path
                                                fill="currentColor"
                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                className="text-white"
                                            />
                                        </svg>
                                        Continue with Google
                                    </>
                                )}
                            </span>
                        </Button>

                        <Button
                            type="button"
                            variant="secondary"
                            className="w-full h-12 relative overflow-hidden group border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all"
                            onClick={handleGithubSignIn}
                            disabled={loading}
                        >
                            <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <span className="relative flex items-center justify-center gap-2">
                                <Github className="h-5 w-5" />
                                Continue with GitHub
                            </span>
                        </Button>
                    </div>

                    <div className="my-8 flex items-center gap-4">
                        <div className="h-px bg-white/10 flex-1"></div>
                        <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">Or continue with email</span>
                        <div className="h-px bg-white/10 flex-1"></div>
                    </div>

                    <form onSubmit={handleEmailSignIn} className="space-y-4">
                        <Input
                            type="email"
                            placeholder="Email address"
                            icon={<Mail className="h-5 w-5" />}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-black/20"
                        />
                        {/* Simple Password Input (could be upgraded in V4) */}
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-black/20"
                        />
                        <Button className="w-full h-12 text-md mt-2" disabled={loading}>
                            Sign In
                        </Button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-400">
                        Don&apos;t have an account?{" "}
                        <button
                            onClick={() => router.push("/signup")}
                            className="text-cerulean-400 hover:text-cerulean-300 font-medium hover:underline transition-all"
                        >
                            Sign up
                        </button>
                    </div>
                </LiquidCard>
            </motion.div>
        </div>
    );
}
