
import { NextRequest, NextResponse } from 'next/server';
import { CONFIG } from '@/lib/config';
import { prepareGenerateWorkflow, GenerateParams } from '@/lib/workflow';
import { translate } from 'google-translate-api-x';

export async function POST(req: NextRequest) {
    try {
        const body: GenerateParams = await req.json();

        if (body.google_translate && body.prompt) {
            try {
                const res = await translate(body.prompt, { to: 'en' });
                body.prompt = res.text;
            } catch (error) {
                console.error("Translation error:", error);
            }
        }

        const workflow = prepareGenerateWorkflow(body);
        if (!workflow) {
            return NextResponse.json({ error: "Failed to load workflow template" }, { status: 500 });
        }

        const payload = {
            prompt: workflow,
            client_id: body.client_id
        };

        const res = await fetch(`${CONFIG.COMFY_URL}/prompt`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            return NextResponse.json({ error: await res.text() }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Generate error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
