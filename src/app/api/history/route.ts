import { NextRequest, NextResponse } from 'next/server';

const { getDB } = require('@/lib/db');

/**
 * GET /api/history?username=xxx
 * 获取指定用户的历史记录
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
        const history = db.getUserHistory(username);

        return NextResponse.json({ history });
    } catch (error) {
        console.error('Error fetching history:', error);
        return NextResponse.json(
            { error: 'Failed to fetch history' },
            { status: 500 }
        );
    }
}

/**
 * POST /api/history
 * 添加新的历史记录
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, item } = body;

        if (!username || !item) {
            return NextResponse.json(
                { error: 'Username and item are required' },
                { status: 400 }
            );
        }

        const db = getDB();
        db.addHistory({
            ...item,
            username
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error adding history:', error);
        return NextResponse.json(
            { error: 'Failed to add history' },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/history?id=xxx&username=xxx
 * 删除历史记录
 */
export async function DELETE(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');
        const username = searchParams.get('username');

        if (!id || !username) {
            return NextResponse.json(
                { error: 'ID and username are required' },
                { status: 400 }
            );
        }

        const db = getDB();
        db.deleteHistory(id, username);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting history:', error);
        return NextResponse.json(
            { error: 'Failed to delete history' },
            { status: 500 }
        );
    }
}
