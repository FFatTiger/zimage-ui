import { NextRequest, NextResponse } from 'next/server';

const { getDB } = require('@/lib/db');

/**
 * GET /api/history/all
 * 获取所有用户的历史记录（管理员专用）
 */
export async function GET(request: NextRequest) {
    try {
        const db = getDB();
        const history = db.getAllHistory();

        return NextResponse.json({ history });
    } catch (error) {
        console.error('Error fetching all history:', error);
        return NextResponse.json(
            { error: 'Failed to fetch all history' },
            { status: 500 }
        );
    }
}
