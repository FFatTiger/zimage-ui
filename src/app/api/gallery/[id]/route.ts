import { NextRequest, NextResponse } from 'next/server';
import { getDB } from '@/lib/db';

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const db = getDB();

        const result = db.deleteFromGallery(id);

        if (result.changes > 0) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: "Item not found" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error deleting from gallery:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
