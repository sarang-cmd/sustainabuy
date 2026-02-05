"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { getUserProfile, getWishlistProducts, Product } from "@/lib/db";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { Heart } from "lucide-react";

export default function WishlistPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            router.push("/login");
            return;
        }

        const fetchWishlist = async () => {
            try {
                const profile = await getUserProfile(user.uid);
                if (profile && profile.wishlist?.length > 0) {
                    const items = await getWishlistProducts(profile.wishlist);
                    setProducts(items);
                }
            } catch (error) {
                console.error("Error fetching wishlist:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, [user, router]);

    if (loading) return <div className="p-20 text-center text-white">Loading wishlist...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-red-500/10 rounded-full">
                    <Heart className="h-8 w-8 text-red-400 fill-red-400" />
                </div>
                <h1 className="text-3xl font-bold text-white">My Wishlist</h1>
            </div>

            {products.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-gray-400 text-lg mb-4">Your wishlist is empty.</p>
                    <Button onClick={() => router.push('/products')}>Browse Sustainable Products</Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map(product => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            )}
        </div>
    );
}
