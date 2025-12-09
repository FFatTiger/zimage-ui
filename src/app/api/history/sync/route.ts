import { NextRequest, NextResponse } from 'next/server';

const { getDB } = require('@/lib/db');

/**
 * POST /api/history/sync
 * 同步历史记录（支持断点续传）
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, items, syncStatus } = body;

        if (!username || !items || !Array.isArray(items)) {
            return NextResponse.json(
                { error: 'Username and items array are required' },
                { status: 400 }
            );
        }

        const db = getDB();

        // 批量添加历史记录
        const itemsWithUsername = items.map(item => ({
            ...item,
            username
        }));

        db.batchAddHistory(itemsWithUsername);

        // 更新同步状态
        if (syncStatus) {
            db.updateSyncStatus(username, syncStatus);
        }

        return NextResponse.json({
            success: true,
            syncedCount: items.length
        });
    } catch (error) {
        console.error('Error syncing history:', error);
        return NextResponse.json(
            { error: 'Failed to sync history' },
            { status: 500 }
        );
    }
}
