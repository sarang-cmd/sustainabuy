import { NextResponse } from 'next/server';
import { performGlobalSearch } from '@/lib/services/indexer';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
        return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 });
    }

    try {
        const results = await performGlobalSearch(query);
        return NextResponse.json({ results });
    } catch (error) {
        console.error("API Search Error:", error);
        return NextResponse.json({ error: "Failed to perform global search" }, { status: 500 });
    }
}
