import { Leaf, Github, Twitter, Instagram } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-jet-black-950/50 backdrop-blur-sm mt-auto">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <div className="bg-cerulean-500/20 p-1.5 rounded-lg">
                                <Leaf className="h-5 w-5 text-cerulean-400" />
                            </div>
                            <span className="text-lg font-bold text-white">SustainaBuy</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Empowering conscious consumers to make sustainable choices with AI-driven insights and transparency.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Platform</h3>
                        <ul className="space-y-3">
                            <li><Link href="/products" className="text-gray-400 hover:text-white transition-colors text-sm">Browse Products</Link></li>
                            <li><Link href="/databank" className="text-gray-400 hover:text-white transition-colors text-sm">Sustainability Data Bank</Link></li>
                            <li><Link href="/compare" className="text-gray-400 hover:text-white transition-colors text-sm">Compare Items</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Company</h3>
                        <ul className="space-y-3">
                            <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</Link></li>
                            <li><Link href="/careers" className="text-gray-400 hover:text-white transition-colors text-sm">Careers</Link></li>
                            <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Connect</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Github className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t border-white/5 pt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} SustainaBuy. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
