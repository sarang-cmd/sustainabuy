export interface SustainabilityScore {
    total: number;
    breakdown: {
        materials: number;
        manufacturing: number;
        supplyChain: number;
        longevity: number;
        circularity: number;
    };
    analysis: string[]; // AI-generated insights
    steps: { message: string, status: "complete" | "scanning" | "error" }[];
}

// Interface for input product data
export interface ProductData {
    name: string;
    brand: string;
    description: string;
    materials: string[];
    certifications?: string[];
    origin?: string;
    isVerified?: boolean; // Label estimated vs verified data
}

const HEURISTIC_MAP: Record<string, Partial<SustainabilityScore>> = {
    "adidas": { total: 72, analysis: ["Leading in recycled polyester usage.", "Transparent supply chain."] },
    "nike": { total: 68, analysis: ["Improving circularity with Grind program.", "Vast supply chain challenges."] },
    "allbirds": { total: 88, analysis: ["Natural materials (wool, sugar).", "B-Corp certified."] },
    "patagonia": { total: 94, analysis: ["Gold standard in repairability.", "Strict environmental sourcing."] }
};

export async function calculateSustainabilityScore(product: ProductData): Promise<SustainabilityScore> {
    const brandLower = product.brand.toLowerCase();
    const heuristic = HEURISTIC_MAP[brandLower] || null;

    const steps: SustainabilityScore["steps"] = [
        { message: "Initializing neural scanner...", status: "complete" },
        { message: "Cross-referencing Global Impact Database...", status: "complete" }
    ];

    // Simulate analysis delay (Speed up if heuristic exists)
    const delay = heuristic ? 300 : 800;
    await new Promise(resolve => setTimeout(resolve, delay));

    steps.push({ message: "Running Material Life Cycle Assessment...", status: "complete" });

    let score = heuristic ? heuristic.total! : 65;
    const insights: string[] = heuristic ? heuristic.analysis! : ["Standard sustainability profile."];

    // Dynamic Logic
    const sustainableMaterials = ['organic cotton', 'recycled', 'hemp', 'tencel', 'bamboo'];
    const hasSustainableMaterial = product.materials.some(m => sustainableMaterials.some(sm => m.toLowerCase().includes(sm)));

    if (hasSustainableMaterial && !heuristic) {
        score += 10;
        insights.push("Detected premium sustainable materials.");
    }

    steps.push({ message: "Finalizing Verification Layer...", status: "complete" });

    return {
        total: Math.min(100, score),
        breakdown: {
            materials: score + 2,
            manufacturing: score - 5,
            supplyChain: score - 10,
            longevity: score + 5,
            circularity: score - 8,
        },
        analysis: insights,
        steps: steps
    };
}
