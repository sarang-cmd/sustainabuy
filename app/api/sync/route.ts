import { NextResponse } from 'next/server';
import { performFullSystemSync } from '@/lib/data-bank-sync';

async function handleSync() {
    try {
        console.log("[Sync API] Starting global synchronization...");
        const result = await performFullSystemSync();
        
        if (result.success) {
            return NextResponse.json(result);
        } else {
            return NextResponse.json({ 
                error: "Sync partially failed", 
                details: result.details 
            }, { status: 207 });
        }
    } catch (error: any) {
        console.error("[Sync API] Critical Failure:", error);
        return NextResponse.json({ 
            error: "Internal Sync Failure", 
            message: error.message 
        }, { status: 500 });
    }
}

export async function GET() {
    return handleSync();
}

export async function POST() {
    return handleSync();
}
