
import { NextRequest, NextResponse } from 'next/server';
import { loadGallery, saveGallery, GalleryItem } from '@/lib/gallery';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const galleryData = loadGallery();

        const newItem: GalleryItem = {
            id: uuidv4(),
            username: body.username,
            prompt: body.prompt,
            negative_prompt: body.negative_prompt,
            imageUrl: body.imageUrl,
            params: body.params,
            timestamp: body.timestamp,
            timeTaken: body.timeTaken
        };

        // Add to beginning
        galleryData.items.unshift(newItem);

        if (saveGallery(galleryData)) {
            return NextResponse.json({ success: true, id: newItem.id });
        } else {
            return NextResponse.json({ error: "Failed to save to gallery" }, { status: 500 });
        }

    } catch (error) {
        console.error("Gallery share error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
