
import { NextRequest, NextResponse } from 'next/server';
import { CONFIG } from '@/lib/config';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const filename = searchParams.get('filename');
    const subfolder = searchParams.get('subfolder') || '';
    const type_ = searchParams.get('type') || 'output'; // 'type' is a reserved keyword in some contexts, using type_

    if (!filename) {
        return NextResponse.json({ error: "filename required" }, { status: 400 });
    }

    try {
        const params = new URLSearchParams({
            filename,
            subfolder,
            type: type_
        });

        // We stream the response
        const res = await fetch(`${CONFIG.COMFY_URL}/view?${params.toString()}`);

        if (!res.ok) {
            return NextResponse.json({ error: "Image not found" }, { status: res.status });
        }

        // Set cache headers - replicate main.py logic
        const headers = new Headers(res.headers);
        headers.set("Cache-Control", "public, max-age=31536000, immutable");

        // Return the stream
        return new NextResponse(res.body, {
            headers,
            status: res.status
        });

    } catch (error) {
        console.error("View API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
