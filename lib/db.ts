import {
    collection,
    doc,
    getDocs,
    getDoc,
    setDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    writeBatch,
    arrayUnion,
    arrayRemove,
    query,
    where,
    limit,
    Timestamp
} from "firebase/firestore";
import { Leaf, ShieldCheck } from "lucide-react";
import { db } from "./firebase";
import { calculateSustainabilityScore, ProductData } from "./scoring";
import { getProductSlug } from "./demo-data";

// Types
export interface UserProfile {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    bio?: string;
    birthday?: string;
    avatarId?: string;
    sustainabilityScore: number; // Gamification score
    wishlist: string[]; // Array of Product IDs
    createdAt: Timestamp;
}

export interface ProductGroup extends ProductData {
    id: string;
    category: string;
    baseScore?: number;
    thumbnail?: string;
    createdAt: Timestamp;
}

export interface ProductVariant {
    id: string;
    groupId: string;
    name: string; // e.g. "Size 10, White"
    specs: Record<string, any>;
    basePrice: number;
}

export interface SellerOffer {
    id: string;
    variantId: string;
    sellerName: string;
    price: number;
    currency: string;
    shippingCost: number;
    deliveryTime: string; // e.g. "2-3 days"
    stockStatus: "in_stock" | "low_stock" | "out_of_stock";
    buyLink: string;
    score: number;
    isVerified?: boolean;
}

export interface Product extends ProductGroup {
    variants?: ProductVariant[];
    offers?: SellerOffer[];
    // Keeping old fields for compatibility during transition
    price: number;
    image: string;
    score: number;
    rating?: number;
    breakdown: {
        materials: number;
        manufacturing: number;
        supplyChain: number;
        longevity: number;
        circularity: number;
    };
}

// User Operations
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
        return userDoc.data() as UserProfile;
    }
    return null;
}

export async function createUserProfile(user: any) {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        const newProfile: UserProfile = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            sustainabilityScore: 0,
            wishlist: [],
            createdAt: Timestamp.now(),
        };
        await setDoc(userRef, newProfile);
        return newProfile;
    }
    return userSnap.data() as UserProfile;
}

export async function toggleWishlist(uid: string, productId: string, isAdding: boolean) {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
        wishlist: isAdding ? arrayUnion(productId) : arrayRemove(productId)
    });
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>) {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, data);
}

export async function getWishlistProducts(productIds: string[]): Promise<Product[]> {
    if (!productIds || productIds.length === 0) return [];

    const products: Product[] = [];
    for (const id of productIds) {
        const p = await getProduct(id);
        if (p) products.push(p);
    }
    return products;
}

// Product Operations
export async function getProduct(id: string): Promise<Product | null> {
    // 1. Immediate fallback for simple numeric IDs or legacy demo- IDs
    const numericId = parseInt(id.replace('demo-', ''));
    if (!isNaN(numericId) && (id.startsWith('demo-') || (numericId >= 1 && numericId <= 10))) {
        try {
            const { DEMO_PRODUCTS } = await import("./demo-data");
            const index = id.startsWith('demo-') ? numericId : (numericId - 1);
            const safeIndex = Math.max(0, Math.min(index, DEMO_PRODUCTS.length - 1));
            const product = DEMO_PRODUCTS[safeIndex];
            return { ...product, id: id } as Product;
        } catch (e) {
            console.error("Critical fallback failure:", e);
        }
    }

    try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            const product = { id: docSnap.id, ...docSnap.data() } as Product;

            // Fetch variants if they exist (V3 Hierarchy)
            const variantsRef = collection(db, "products", id, "variants");
            const variantsSnap = await getDocs(variantsRef);
            product.variants = variantsSnap.docs.map(v => ({ id: v.id, ...v.data() } as ProductVariant));

            // Fetch offers for the variants
            const offers: SellerOffer[] = [];
            for (const variant of product.variants) {
                const offersRef = collection(db, "products", id, "variants", variant.id, "offers");
                const offersSnap = await getDocs(offersRef);
                offers.push(...offersSnap.docs.map(o => ({ id: o.id, ...o.data() } as SellerOffer)));
            }
            product.offers = offers;

            return product;
        }

        // If not in Firestore, attempt to find in demo products by slug
        const { DEMO_PRODUCTS } = await import("./demo-data");
        const found = DEMO_PRODUCTS.find((p: any) => getProductSlug(p.name) === id);
        if (found) return { ...found, id } as Product;
        
        return null;
    } catch (error) {
        console.error("Error getting product, using fallback check:", error);
        // Attempt to find in demo products by slug fallback
        const { DEMO_PRODUCTS } = await import("./demo-data");
        const found = DEMO_PRODUCTS.find((p: any) => getProductSlug(p.name) === id);
        if (found) return { ...found, id } as Product;
        return null;
    }
}

export async function getAllProducts(category?: string): Promise<Product[]> {
    try {
        const productsRef = collection(db, "products");
        let q = query(productsRef, limit(50));

        if (category && category !== "All") {
            q = query(productsRef, where("category", "==", category), limit(50));
        }

        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            const { DEMO_PRODUCTS } = await import("./demo-data");
            return DEMO_PRODUCTS.map((p: any) => ({ ...p, id: getProductSlug(p.name) } as Product));
        }

        return querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                baseScore: data.baseScore || data.score,
                thumbnail: data.thumbnail || data.image,
                score: data.score || data.baseScore,
                image: data.image || data.thumbnail
            } as Product;
        });
    } catch (error) {
        console.error("Firestore error, using demo fallback:", error);
        try {
            const { DEMO_PRODUCTS } = await import("./demo-data");
            return DEMO_PRODUCTS.map((p: any) => ({ ...p, id: getProductSlug(p.name) } as Product));
        } catch (e) {
            console.error("Critical: Could not load demo products fallback.");
            return [];
        }
    }
}

export async function addProductToDb(productData: Omit<Product, "id" | "createdAt">) {
    const productsRef = collection(db, "products");
    return await addDoc(productsRef, {
        ...productData,
        createdAt: Timestamp.now()
    });
}

export async function findOrAddProduct(name: string): Promise<Product | null> {
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("name", "==", name), limit(1));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        return { id: doc.id, ...doc.data() } as Product;
    }

    const mockExternalData: ProductData = {
        name: name,
        brand: "Generic Sustainable Brand",
        description: `A sustainable version of ${name} found by our AI scanner.`,
        materials: ["Recycled Polyester", "Organic Cotton"],
        certifications: ["Fair Trade"],
        origin: "Portugal"
    };

    const scoreData = await calculateSustainabilityScore(mockExternalData);

    const newProduct = {
        ...mockExternalData,
        price: Math.floor(Math.random() * 100) + 20,
        image: `https://source.unsplash.com/random/800x800?sustainable,${name}`,
        score: scoreData.total,
        baseScore: scoreData.total,
        thumbnail: `https://source.unsplash.com/random/800x800?sustainable,${name}`,
        breakdown: scoreData.breakdown,
        category: "Uncategorized",
        createdAt: Timestamp.now()
    };

    const docRef = await addDoc(productsRef, newProduct);
    return { id: docRef.id, ...newProduct } as Product;
}

export async function clearProducts() {
    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);
    const batch = writeBatch(db);
    
    snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
    });
    
    await batch.commit();
}
