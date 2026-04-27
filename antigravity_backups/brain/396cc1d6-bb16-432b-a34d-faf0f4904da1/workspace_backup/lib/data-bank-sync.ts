import { db } from "./firebase";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { Product } from "./db";

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
        price: Math.floor(Math.random() * 15) + 3, // Mock price for food
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
 * Syncs the data bank with Open Food Facts
 */
export async function syncWithOpenFoodFacts() {
    console.log("Starting Data Bank sync with Open Food Facts...");
    
    try {
        // Query OFF for products with Eco-Score A
        const response = await fetch(
            "https://world.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=ecoscore_grade&tag_contains_0=contains&tag_0=a&json=true&page_size=20"
        );
        const data = await response.json();
        const productsRef = collection(db, "products");

        for (const item of data.products) {
            const productData = mapOFFToProduct(item);
            const slug = `off-${item.code || Math.random().toString(36).substr(2, 9)}`;
            
            const docRef = doc(db, "products", slug);
            await setDoc(docRef, {
                ...productData,
                createdAt: Timestamp.now()
            });
            
            console.log(`Synced: ${productData.name}`);
        }
        
        console.log("Sync complete!");
        return { success: true, count: data.products.length };
    } catch (error) {
        console.error("Sync failed:", error);
        return { success: false, error };
    }
}
