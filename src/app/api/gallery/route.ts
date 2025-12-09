
import { NextResponse } from 'next/server';
import { loadGallery } from '@/lib/gallery';

export async function GET() {
    try {
        const galleryData = loadGallery();
        return NextResponse.json(galleryData);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
