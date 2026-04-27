"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LiquidCard } from "@/components/ui/LiquidCard";
import { Button } from "@/components/ui/Button";
import { getProduct, toggleWishlist, getUserProfile, Product, ProductVariant, SellerOffer } from "@/lib/db";
import { generateMetaOffers } from "@/lib/comparison";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import { ChevronRight, ShoppingCart, Info, TrendingDown, ExternalLink, Leaf, ShieldCheck, Share2, Heart, ArrowLeft } from "lucide-react";

export default function ProductDetailContent({ id }: { id: string }) {
    const router = useRouter();
    const { user } = useAuth();
    const { addToCart } = useCart();

    const [product, setProduct] = useState<Product | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
    const [offers, setOffers] = useState<SellerOffer[]>([]);
    const [loading, setLoading] = useState(true);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [wishlistLoading, setWishlistLoading] = useState(false);
    const [sortBy, setSortBy] = useState<"price" | "score" | "delivery">("price");

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            setLoading(true);
            try {
                // 1. Fetch Product
                const productData = await getProduct(id);
                setProduct(productData);

                if (productData) {
                    // Initialize first variant
                    const firstVariant = productData.variants?.[0] || {
                        id: "default",
                        groupId: productData.id,
                        name: "Standard Edition",
                        basePrice: productData.price,
                        specs: {}
                    };
                    setSelectedVariant(firstVariant);

                    // Generate or Fetch Offers
                    const initialOffers = productData.offers && productData.offers.length > 0
                        ? productData.offers
                        : generateMetaOffers(productData, firstVariant);

                    setOffers(initialOffers.sort((a, b) => a.price - b.price));
                }
            } catch (error) {
                console.error("Error fetching details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, user]);

    // Recently Viewed History Tracking
    useEffect(() => {
        if (product && !loading) {
            try {
                const stored = localStorage.getItem("recentlyViewed");
                let history: Product[] = stored ? JSON.parse(stored) : [];
                // Remove if already exists to move to top
                history = history.filter(p => p.id !== product.id);
                // Prepend current product
                history.unshift(product);
                // Keep only last 10
                const updatedHistory = history.slice(0, 10);
                localStorage.setItem("recentlyViewed", JSON.stringify(updatedHistory));
            } catch (error) {
                console.error("Error updating recently viewed history:", error);
            }
        }
    }, [product, loading]);

    const handleWishlistToggle = async () => {
        if (!user) {
            router.push("/login");
            return;
        }
        if (!product) return;

        setWishlistLoading(true);
        try {
            await toggleWishlist(user.uid, product.id, !isInWishlist);
            setIsInWishlist(!isInWishlist);
        } catch (error) {
            console.error("Error toggling wishlist:", error);
        } finally {
            setWishlistLoading(false);
        }
    };

    if (loading) return <div className="p-20 text-center text-white">Loading product details...</div>;
    if (!product) return (
        <div className="p-20 text-center">
            <h2 className="text-xl text-white mb-4">Product not found</h2>
            <Link href="/products"><Button>Back to Products</Button></Link>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <Link href="/products" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Products
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Image Section */}
                <div className="relative h-[500px] rounded-2xl overflow-hidden group bg-jet-black-800">
                    {product.image ? (
                        <img
                            src={product.image}
                            alt={product.name}
                            className="object-cover w-full h-full"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-600">No Image</div>
                    )}

                    <div className="absolute top-4 right-4">
                        <Button
                            variant="secondary"
                            className={`rounded-full h-12 w-12 !p-0 flex items-center justify-center backdrop-blur-md ${isInWishlist ? 'bg-red-500/20 border-red-500/50 text-red-500' : 'bg-black/20 text-white'}`}
                            onClick={handleWishlistToggle}
                            disabled={wishlistLoading}
                        >
                            <Heart className={`h-6 w-6 ${isInWishlist ? 'fill-current' : ''}`} />
                        </Button>
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col h-full">
                    <div className="mb-6">
                        <h2 className="text-cerulean-400 font-medium tracking-wide uppercase text-sm mb-2">{product.brand}</h2>
                        <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-3xl font-bold text-white">${product.price.toFixed(2)}</span>
                            <div className="bg-tea-green-500/20 px-3 py-1 rounded-full flex items-center gap-2 border border-tea-green-500/30">
                                {product.isVerified ? <ShieldCheck className="h-4 w-4 text-tea-green-400" /> : <Leaf className="h-4 w-4 text-tea-green-400" />}
                                <span className="text-tea-green-400 font-bold text-sm">Score: {product.score}/100</span>
                            </div>
                        </div>
                        <p className="text-gray-300 leading-relaxed mb-8">
                            {product.description}
                        </p>
                    </div>

                    {/* Variant Selector */}
                    {product.variants && product.variants.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Select Variant</h3>
                            <div className="flex flex-wrap gap-3">
                                {product.variants.map((v) => (
                                    <button
                                        key={v.id}
                                        onClick={() => {
                                            setSelectedVariant(v);
                                            setOffers(generateMetaOffers(product, v).sort((a, b) => a.price - b.price));
                                        }}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${selectedVariant?.id === v.id
                                            ? "bg-cerulean-500 border-cerulean-400 text-white shadow-lg shadow-cerulean-500/20"
                                            : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                                            }`}
                                    >
                                        {v.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Meta-Comparison Table */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Price Comparison</h3>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <TrendingDown className="h-3 w-3 text-tea-green-400" />
                                <span>Cheapest first</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {offers.map((offer) => (
                                <div
                                    key={offer.id}
                                    className="group flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:border-cerulean-500/30"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-jet-black-800 flex items-center justify-center border border-white/5 group-hover:border-cerulean-500/20">
                                            <span className="text-[10px] font-bold text-gray-500">{offer.sellerName.charAt(0)}</span>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-sm flex items-center gap-1">
                                                {offer.sellerName}
                                                {offer.isVerified && <ShieldCheck className="h-3 w-3 text-cerulean-400" />}
                                            </h4>
                                            <p className="text-[10px] text-gray-500">{offer.deliveryTime} • Shipping ${offer.shippingCost.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-white">${offer.price.toFixed(2)}</p>
                                            <p className={`text-[10px] ${offer.stockStatus === 'in_stock' ? 'text-tea-green-400' : 'text-yellow-500'}`}>
                                                {offer.stockStatus === 'in_stock' ? 'In Stock' : 'Low Stock'}
                                            </p>
                                        </div>
                                        <Link href={offer.buyLink} target="_blank">
                                            <Button size="sm" variant="secondary" className="!rounded-lg group-hover:bg-cerulean-500 group-hover:text-white transition-colors">
                                                Shop <ExternalLink className="h-3 w-3 ml-2" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 mb-12">
                        <Button
                            onClick={() => {
                                if (product && selectedVariant && offers.length > 0) {
                                    addToCart(product, selectedVariant, offers[0]); // Adds cheapest by default
                                }
                            }}
                            className="flex-1 py-4 text-lg bg-cerulean-500 shadow-xl shadow-cerulean-500/20 group"
                        >
                            <ShoppingCart className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                            Add to Cart
                        </Button>
                        <Button variant="secondary" className="px-6 hover:bg-white/10 transition-colors">
                            <Share2 className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Sustainability Breakdown (Condensed) */}
                    <LiquidCard className="p-6">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-cerulean-400" />
                            Sustainability Breakdown
                        </h3>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Materials</span>
                                    <span className="text-white font-medium">{product.breakdown?.materials}/100</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-cerulean-500" style={{ width: `${product.breakdown?.materials}%` }}></div>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Manufacturing & Labor</span>
                                    <span className="text-white font-medium">{product.breakdown?.manufacturing}/100</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-tropical-teal-500" style={{ width: `${product.breakdown?.manufacturing}%` }}></div>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Circular Lifecycle</span>
                                    <span className="text-white font-medium">{product.breakdown?.circularity}/100</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-tea-green-500" style={{ width: `${product.breakdown?.circularity}%` }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                            {product.certifications && product.certifications.length > 0 ? (
                                product.certifications.map((cert, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <ShieldCheck className="h-5 w-5 text-tea-green-400 mt-0.5" />
                                        <div>
                                            <h4 className="text-white text-sm font-medium">{cert}</h4>
                                            <p className="text-gray-500 text-xs">Verified</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-xs col-span-2">No specific certifications listed.</p>
                            )}
                        </div>
                    </LiquidCard>
                </div>
            </div>
        </div>
    );
}
