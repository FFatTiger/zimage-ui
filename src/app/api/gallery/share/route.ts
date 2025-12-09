import { NextRequest, NextResponse } from 'next/server';
import { getDB } from '@/lib/db';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const db = getDB();

        let historyId = body.historyId;

        // Verify or Find History
        if (historyId) {
            if (!db.exists(historyId)) {
                // Should not happen if historyId came from trusted source, but handle it
                console.warn(`History ID ${historyId} not found, trying fallback`);
                historyId = null;
            }
        }

        if (!historyId) {
            // Try to find by Image URL
            // better-sqlite3 doesn't have a direct findByUrl, we can use a query or add one.
            // For now, let's assume we might need to recreate the history item if it's missing
            // (e.g. if it was from a session that didn't sync yet, or legacy)

            // To properly handle this, we should really expose a method in db.js to findByUrl
            // Or we check if we can insert it.

            // Let's rely on db.addHistory's "INSERT OR REPLACE" logic if we have the full object.
            // But we need an ID.

            // If the client didn't send an ID, we might be in trouble if we want exact linking.
            // However, let's assume body.id might be the history id if passed.
            if (body.id) {
                historyId = body.id;
                // Ensure it exists
                if (!db.exists(historyId)) {
                    // Insert it
                    db.addHistory({
                        id: historyId,
                        username: body.username,
                        prompt: body.prompt,
                        negative_prompt: body.negative_prompt,
                        imageUrl: body.imageUrl,
                        params: body.params,
                        timestamp: new Date(body.timestamp).getTime(),
                        timeTaken: body.timeTaken
                    });
                }
            } else {
                return NextResponse.json({ error: "Missing history ID" }, { status: 400 });
            }
        }

        try {
            db.addToGallery(historyId, body.username);
            return NextResponse.json({ success: true, id: historyId }); // Returning historyId as ref, or we could return gallery entry id
        } catch (e) {
            console.error("DB Error adding to gallery:", e);
            return NextResponse.json({ error: "Failed to save to gallery" }, { status: 500 });
        }

    } catch (error) {
        console.error("Gallery share error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
