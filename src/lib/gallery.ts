
import fs from 'fs';
import path from 'path';

export interface GalleryItem {
    id: string;
    username: string;
    prompt: string;
    negative_prompt: string;
    imageUrl: string;
    params: Record<string, any>;
    timestamp: string;
    timeTaken: number;
}

export interface GalleryData {
    items: GalleryItem[];
}

const GALLERY_FILE = 'gallery.json';

export function loadGallery(): GalleryData {
    const filePath = path.join(process.cwd(), GALLERY_FILE);
    if (fs.existsSync(filePath)) {
        try {
            return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        } catch (e) {
            console.error("Error loading gallery:", e);
        }
    }
    return { items: [] };
}

export function saveGallery(data: GalleryData): boolean {
    try {
        const filePath = path.join(process.cwd(), GALLERY_FILE);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
        return true;
    } catch (e) {
        console.error("Error saving gallery:", e);
        return false;
    }
}
