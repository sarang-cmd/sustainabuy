import { ProductDetailClient } from "@/components/product/ProductDetailClient";
import { DEMO_PRODUCTS, getProductSlug } from "../../../lib/demo-data";

// Pre-render ALL known seed products at build time
export async function generateStaticParams() {
    try {
        const params = DEMO_PRODUCTS.map((product) => {
            const id = getProductSlug(product.name);
            return { id };
        });

        // Add legacy aliases for 'demo-0' to 'demo-4' to prevent crashes from old cached IDs
        for (let i = 0; i < 5; i++) {
            params.push({ id: `demo-${i}` });
        }

        return params;
    } catch (error) {
        console.error("Error in generateStaticParams:", error);
        return [];
    }
}

// Required for output: export
export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <ProductDetailClient id={id} />;
}
