
import { NextRequest, NextResponse } from 'next/server';
import { CONFIG } from '@/lib/config';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        // Ensure we send the required fields for ComfyUI
        if (!formData.has('type')) formData.append('type', 'input');
        if (!formData.has('overwrite')) formData.append('overwrite', 'true');

        const res = await fetch(`${CONFIG.COMFY_URL}/upload/image`, {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) {
            const errorText = await res.text();
            return NextResponse.json({ error: errorText }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
