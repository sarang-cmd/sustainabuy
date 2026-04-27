import ProductDetailContent from "./ProductDetailContent";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
    return [
        { id: "1" },
        { id: "2" }
    ];
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <ProductDetailContent id={id} />;
}
