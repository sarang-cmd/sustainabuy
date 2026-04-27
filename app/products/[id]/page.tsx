import { ProductDetailClient } from "@/components/product/ProductDetailClient";
import { DEMO_PRODUCTS } from "@/lib/seed";

// Pre-render ALL known seed products at build time
export async function generateStaticParams() {
    return DEMO_PRODUCTS.map((product) => {
        const slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return { id: slug };
    });
}

// Required for output: export
export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <ProductDetailClient id={id} />;
}
