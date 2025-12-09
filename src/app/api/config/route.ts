import { NextResponse } from 'next/server';
import { loadConfig } from '@/lib/load-config';

export async function GET() {
    try {
        const config = loadConfig();

        // 仅返回客户端需要的配置信息
        return NextResponse.json({
            ADMIN_USERNAMES: (config as any).ADMIN_USERNAMES || []
        });
    } catch (error) {
        console.error('Error loading config:', error);
        return NextResponse.json(
            { error: 'Failed to load config' },
            { status: 500 }
        );
    }
}
