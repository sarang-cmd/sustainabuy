import { db } from "./firebase";
import { collection, doc, setDoc, Timestamp, getDocs, query, limit, Firestore } from "firebase/firestore";
import { Product } from "./db";
import { calculateSustainabilityScore } from "./scoring";

/**
 * Maps Open Food Facts data to our internal Product interface
 */
function mapOFFToProduct(offItem: any): Omit<Product, "id" | "createdAt"> {
    const ecoScore = offItem.ecoscore_score || 0;
    
    return {
        name: offItem.product_name || "Unknown Product",
        brand: offItem.brands || "Unknown Brand",
        description: offItem.ingredients_text || "Sustainable food choice.",
        materials: offItem.ingredients_hierarchy || ["Food Grade"],
        certifications: offItem.labels_hierarchy || ["Eco-Friendly"],
        origin: offItem.countries || "Unknown",
        price: Math.floor(Math.random() * 15) + 3,
        image: offItem.image_url || "https://images.unsplash.com/photo-1542831371-29b0f74f9713",
        score: Math.min(100, Math.max(0, ecoScore)),
        baseScore: Math.min(100, Math.max(0, ecoScore)),
        thumbnail: offItem.image_small_url || offItem.image_url,
        category: "Food",
        breakdown: {
            materials: ecoScore,
            manufacturing: 85,
            supplyChain: 80,
            longevity: 100,
            circularity: 70
        }
    };
}

/**
 * Syncs with Open Food Facts
 */
export async function syncWithOpenFoodFacts() {
    console.log("Starting Data Bank sync with Open Food Facts...");
    
    try {
        const response = await fetch(
            "https://world.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=ecoscore_grade&tag_contains_0=contains&tag_0=a&json=true&page_size=24"
        );
        const data = await response.json();
        let count = 0;

        for (const item of data.products) {
            if (!item.product_name || !item.brands) continue;
            
            const productData = mapOFFToProduct(item);
            const slug = `off-${item.code || Math.random().toString(36).substr(2, 9)}`;
            
            const docRef = doc(db, "products", slug);
            await setDoc(docRef, {
                ...productData,
                createdAt: Timestamp.now()
            });
            count++;
        }
        
        return { success: true, count };
    } catch (error) {
        console.error("OFF Sync failed:", error);
        return { success: false, error };
    }
}

/**
 * Syncs with a curated Sustainability Index
 */
export async function syncWithSustainabilityIndex() {
    console.log("Syncing with Global Sustainability Index...");
    
    const SUSTAINABLE_CATALOG: Omit<Product, "id" | "createdAt">[] = [
        {
            name: "Eco-Knit Sneaker",
            brand: "Allbirds",
            description: "Sustainable performance. Recycled materials.",
            materials: ["Eucalyptus Fiber", "Sugarcane Foam"],
            certifications: ["B Corp", "FSC"],
            origin: "Vietnam",
            price: 98.00,
            image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800",
            score: 92,
            baseScore: 92,
            thumbnail: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=200",
            category: "Footwear",
            breakdown: { materials: 94, manufacturing: 88, supplyChain: 90, longevity: 85, circularity: 98 }
        },
        {
            name: "Recycled Denim Jacket",
            brand: "Patagonia",
            description: "Warm, low-bulk full-zip jacket made of soft recycled polyester fleece.",
            materials: ["100% Recycled Polyester"],
            certifications: ["Fair Trade", "Bluesign"],
            origin: "Vietnam",
            price: 199.00,
            image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800",
            score: 88,
            baseScore: 88,
            thumbnail: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=200",
            category: "Clothing",
            breakdown: { materials: 92, manufacturing: 85, supplyChain: 80, longevity: 95, circularity: 90 }
        },
        {
            name: "Bamboo Organic Tee",
            brand: "Organic Basics",
            description: "Soft, breathable, and highly sustainable t-shirt.",
            materials: ["Organic Bamboo Fiber"],
            certifications: ["GOTS Certified"],
            origin: "Turkey",
            price: 45.00,
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
            score: 95,
            baseScore: 95,
            thumbnail: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=200",
            category: "Clothing",
            breakdown: { materials: 98, manufacturing: 92, supplyChain: 94, longevity: 88, circularity: 96 }
        },
        {
            name: "Solar Charging Backpack",
            brand: "Solgaard",
            description: "High-tech backpack with integrated solar panels.",
            materials: ["Ocean Plastic", "Solar Panels"],
            certifications: ["Certified B Corp"],
            origin: "China",
            price: 165.00,
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
            score: 85,
            baseScore: 85,
            thumbnail: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=200",
            category: "Accessories",
            breakdown: { materials: 88, manufacturing: 80, supplyChain: 82, longevity: 85, circularity: 90 }
        }
    ];

    try {
        let count = 0;
        for (const productData of SUSTAINABLE_CATALOG) {
            const slug = productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const docRef = doc(db, "products", slug);
            await setDoc(docRef, {
                ...productData,
                createdAt: Timestamp.now()
            });
            count++;
        }
        return { success: true, count };
    } catch (error) {
        console.error("Index Sync failed:", error);
        return { success: false, error };
    }
}

/**
 * Triggers a full system sync
 */
export async function performFullSystemSync() {
    const offResult = await syncWithOpenFoodFacts();
    const indexResult = await syncWithSustainabilityIndex();
    
    // Also ensure premium demo products are seeded
    const { seedDemoProducts } = (await import('./seed')) as any;
    await seedDemoProducts();
    
    return {
        success: offResult.success && indexResult.success,
        count: (offResult.count || 0) + (indexResult.count || 0),
        details: { off: offResult, index: indexResult }
    };
}
