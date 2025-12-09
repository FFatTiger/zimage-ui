
import { NextRequest, NextResponse } from 'next/server';
import { CONFIG } from '@/lib/config';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    // In Next.js 15, params is a Promise
    const { id } = await params;

    try {
        const res = await fetch(`${CONFIG.COMFY_URL}/history/${id}`);

        if (!res.ok) {
            // If 404, ComfyUI returns 404 usually? Or {}?
            // Logic from main.py: "History not found"
            return NextResponse.json({ error: "History not found" }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
