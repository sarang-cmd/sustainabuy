import { getAllProducts } from "@/lib/db";
import { ProductDetailClient } from "@/components/product/ProductDetailClient";

export const dynamicParams = false;

export async function generateStaticParams() {
    try {
        const products = await getAllProducts();

        // Fallback demo IDs to ensure paths exist for output: export
        const demoIds = [
            "everleaf-runner-pro",
            "recycled-denim-jacket",
            "bamboo-organic-tee",
            "solar-charging-backpack",
            "ethically-sourced-coffee",
            "sustainable-smartphone-case",
            "organic-cotton-bedding-set",
            "zero-waste-shaving-kit"
        ];

        if (!products || products.length === 0) {
            return demoIds.map(id => ({ id }));
        }

        const productIds = products.map((product) => ({
            id: product.id,
        }));

        // Combine both to be safe
        return [...productIds, ...demoIds.map(id => ({ id }))];
    } catch (error) {
        console.error("Error generating static params:", error);
        return [{ id: "everleaf-runner-pro" }];
    }
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <ProductDetailClient id={id} />;
}
