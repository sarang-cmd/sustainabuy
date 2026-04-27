import { ProductDetailClient } from "@/components/product/ProductDetailClient";

// Allow dynamic params so new products synced from external sites can be viewed immediately
export const dynamicParams = true;

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <ProductDetailClient id={id} />;
}
