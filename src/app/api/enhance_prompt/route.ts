
import { NextRequest, NextResponse } from 'next/server';
import { CONFIG } from '@/lib/config';
import { SYSTEM_PROMPT } from '@/lib/constants';

export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();

        if (!CONFIG.DEEPSEEK_API_KEY) {
            console.warn("DEEPSEEK_API_KEY not set");
            return NextResponse.json({ error: "DeepSeek API key not configured" }, { status: 500 });
        }

        const messages = [];
        if (SYSTEM_PROMPT) {
            messages.push({ role: "system", content: SYSTEM_PROMPT });
        }
        messages.push({ role: "user", content: prompt });

        const payload = {
            model: "deepseek-reasoner",
            messages: messages,
            stream: false
        };

        const res = await fetch(CONFIG.DEEPSEEK_API_URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${CONFIG.DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error("DeepSeek API Error:", errorText);
            return NextResponse.json({ error: `DeepSeek API error: ${errorText}` }, { status: res.status });
        }

        const result = await res.json();
        const content = result.choices[0].message.content;

        return NextResponse.json({ enhanced_prompt: content });

    } catch (error) {
        console.error("Enhance prompt error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
