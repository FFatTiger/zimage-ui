import { NextRequest, NextResponse } from 'next/server';

const { getDB } = require('@/lib/db');

/**
 * GET /api/history/sync/status?username=xxx
 * 获取同步状态
 */
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const username = searchParams.get('username');

        if (!username) {
            return NextResponse.json(
                { error: 'Username is required' },
                { status: 400 }
            );
        }

        const db = getDB();
        const status = db.getSyncStatus(username);

        return NextResponse.json({ status });
    } catch (error) {
        console.error('Error fetching sync status:', error);
        return NextResponse.json(
            { error: 'Failed to fetch sync status' },
            { status: 500 }
        );
    }
}
