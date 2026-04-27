/**
 * SustainaBuy Global Indexer Service
 * Implements logic to aggregate data from external sources and the internal Data Bank.
 */

import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "../firebase";
import { Product } from "../db";

export interface ScrapedProduct {
    name: string;
    brand: string;
    price: number;
    image: string;
    url: string;
    source: string;
    category?: string;
    score?: number;
}

/**
 * Discovery Layer: Searches our internal high-quality index first
 */
async function searchInternalIndex(queryStr: string): Promise<Product[]> {
    const productsRef = collection(db, "products");
    const q = query(productsRef, limit(100)); // In a real app, we'd use Algolia or better Firestore queries
    const snapshot = await getDocs(q);
    
    const results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    
    // Simple fuzzy match for demo
    const searchTokens = queryStr.toLowerCase().split(' ');
    return results.filter(p => 
        searchTokens.some(token => 
            p.name.toLowerCase().includes(token) || 
            p.brand.toLowerCase().includes(token) ||
            p.category?.toLowerCase().includes(token)
        )
    );
}

/**
 * Extraction Layer: Simulates searching external sustainable marketplaces
 * In a real production app, this would call a set of scrapers or search APIs.
 */
async function discoverExternalProducts(queryStr: string): Promise<ScrapedProduct[]> {
    console.log(`[Indexer] Discovering external products for: ${queryStr}`);
    
    // Mocking real-world sustainable brand results
    const externalDatabase: ScrapedProduct[] = [
        {
            name: "Eco-Conscious Denim",
            brand: "Levi's Water<Less",
            price: 89.00,
            image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=400",
            url: "https://www.levi.com",
            source: "Levi Strauss & Co.",
            category: "Clothing",
            score: 75
        },
        {
            name: "Recycled Wool Cap",
            brand: "Fjällräven",
            price: 45.00,
            image: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&q=80&w=400",
            url: "https://www.fjallraven.com",
            source: "Fjällräven Official",
            category: "Accessories",
            score: 88
        },
        {
            name: "Sustainably Harvested Coffee",
            brand: "Stumptown",
            price: 20.00,
            image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400",
            url: "https://www.stumptowncoffee.com",
            source: "Stumptown Coffee Roasters",
            category: "Food",
            score: 82
        }
    ];

    const searchTokens = queryStr.toLowerCase().split(' ');
    return externalDatabase.filter(p => 
        searchTokens.some(token => 
            p.name.toLowerCase().includes(token) || 
            p.brand.toLowerCase().includes(token) ||
            p.category?.toLowerCase().includes(token)
        )
    );
}

/**
 * Performs a global search across internal bank and external "web"
 */
export async function performGlobalSearch(queryStr: string): Promise<ScrapedProduct[]> {
    try {
        const [internalResults, externalResults] = await Promise.all([
            searchInternalIndex(queryStr),
            discoverExternalProducts(queryStr)
        ]);
        
        // Map internal products to ScrapedProduct format for the search result view
        const mappedInternal: ScrapedProduct[] = internalResults.map(p => ({
            name: p.name,
            brand: p.brand,
            price: p.price,
            image: p.image,
            url: `/products/${p.id}`,
            source: "SustainaBuy Data Bank",
            category: p.category,
            score: p.score
        }));

        // Combine and de-duplicate (by name)
        const combined = [...mappedInternal, ...externalResults];
        const unique = Array.from(new Map(combined.map(item => [item.name, item])).values());
        
        return unique;
    } catch (error) {
        console.error("Global search failed:", error);
        return [];
    }
}
