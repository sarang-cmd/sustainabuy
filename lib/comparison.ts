import { ProductGroup, ProductVariant, SellerOffer } from "./db";

/**
 * Generates simulated seller offers for a product variant.
 * In a real-world $0 budget app, this would use free web-scrapers or 
 * search engine mapping to simulate live data.
 */
export function generateMetaOffers(group: ProductGroup, variant: ProductVariant): SellerOffer[] {
    const sellers = [
        { name: "Amazon", priceMultiplier: 0.95, shipping: 0 },
        { name: "eBay", priceMultiplier: 0.85, shipping: 5.99 },
        { name: "Allbirds", priceMultiplier: 1.1, shipping: 0 },
        { name: "Sustainable Goods Co.", priceMultiplier: 1.2, shipping: 0 }
    ];

    return sellers.map((seller, index) => {
        const basePrice = variant.basePrice || 100;
        const finalPrice = Number((basePrice * seller.priceMultiplier).toFixed(2));

        // Generate a search link instead of a direct buy link for free scaling
        const searchLink = `https://www.google.com/search?q=${encodeURIComponent(`${group.brand} ${group.name} ${variant.name} ${seller.name}`)}&tbm=shop`;

        return {
            id: `offer-${variant.id}-${index}`,
            variantId: variant.id,
            sellerName: seller.name,
            price: finalPrice,
            currency: "USD",
            shippingCost: seller.shipping,
            deliveryTime: index % 2 === 0 ? "2-3 days" : "5-7 days",
            stockStatus: index === 3 ? "low_stock" : "in_stock",
            buyLink: searchLink,
            isVerified: index % 2 === 0
        };
    });
}
