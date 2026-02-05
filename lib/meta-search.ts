/**
 * Meta-Search Engine mapping for SustainaBuy.
 * This file maps user-entered keywords to known categories, brands, and search intents.
 * Built for 100% free and unlimited scaling.
 */

export interface SearchIntent {
    category?: string;
    brand?: string;
    keywords: string[];
}

const INTENT_MAP: Record<string, SearchIntent> = {
    "stanley": {
        brand: "Stanley",
        category: "Drinkware",
        keywords: ["cup", "tumbler", "bottle"]
    },
    "sneakers": {
        category: "Footwear",
        keywords: ["shoes", "kicks", "running"]
    },
    "nike": {
        brand: "Nike",
        category: "Footwear",
        keywords: ["shoes", "apparel"]
    },
    "allbirds": {
        brand: "Allbirds",
        category: "Footwear",
        keywords: ["wool", "sustainable shoes"]
    },
    "patagonia": {
        brand: "Patagonia",
        category: "Clothing",
        keywords: ["jacket", "outdoor", "recycled"]
    }
};

/**
 * Normalizes a search query for consistent matching.
 */
export function normalizeQuery(query: string): string {
    return query.toLowerCase().trim().replace(/[^\w\s]/g, "");
}

/**
 * Parses user intent from a raw search string.
 */
export function parseSearchIntent(query: string): SearchIntent {
    const normalized = normalizeQuery(query);
    const tokens = normalized.split(/\s+/);

    // Default intent
    let finalIntent: SearchIntent = {
        keywords: tokens
    };

    // Check for explicit brand/category matches in our map
    for (const [key, intent] of Object.entries(INTENT_MAP)) {
        if (normalized.includes(key)) {
            finalIntent = {
                ...finalIntent,
                ...intent,
                keywords: Array.from(new Set([...finalIntent.keywords, ...(intent.keywords || [])]))
            };
        }
    }

    return finalIntent;
}
