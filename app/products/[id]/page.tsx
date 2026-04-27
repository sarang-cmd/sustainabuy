import { getAllProducts } from "@/lib/db";
import { ProductDetailClient } from "@/components/product/ProductDetailClient";

export const dynamicParams = false;

export async function generateStaticParams() {
    try {
        const products = await getAllProducts();

        // If no products in DB yet, return demo IDs to allow build/dev to proceed
        if (products.length === 0) {
            return [
                { id: "everleaf-runner-pro" },
                { id: "recycled-denim-jacket" },
                { id: "bamboo-organic-tee" },
                { id: "solar-charging-backpack" },
                { id: "ethically-sourced-coffee" },
                { id: "sustainable-smartphone-case" },
                { id: "organic-cotton-bedding-set" },
                { id: "zero-waste-shaving-kit" }
            ];
        }

        return products.map((product) => ({
            id: product.id,
        }));
    } catch (error) {
        console.error("Error generating static params:", error);
        // Fallback IDs for build stability
        return [{ id: "1" }, { id: "2" }];
    }
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <ProductDetailClient id={id} />;
}
