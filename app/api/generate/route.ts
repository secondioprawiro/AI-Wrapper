import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/lib/db";
import { headers } from "next/headers";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { topic, tone, type } = body;

        // 1. Identification
        const headersList = await headers();
        const ip = headersList.get("x-forwarded-for") || "127.0.0.1";

        // 2. Rate Limiting Strategy
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let userLimit = await db.userLimit.findUnique({
            where: { ipAddress: ip },
        });

        if (userLimit) {
            const lastReset = new Date(userLimit.lastResetDate);
            lastReset.setHours(0, 0, 0, 0);

            if (lastReset.getTime() < today.getTime()) {
                // New day, reset
                userLimit = await db.userLimit.update({
                    where: { ipAddress: ip },
                    data: { count: 0, lastResetDate: new Date() }
                });
            }
        } else {
            userLimit = await db.userLimit.create({
                data: { ipAddress: ip, count: 0, lastResetDate: new Date() }
            });
        }

        if (userLimit.count >= 3) {
            return new Response("Daily limit reached. Upgrade for more.", { status: 429 });
        }

        // Increment Usage
        await db.userLimit.update({
            where: { ipAddress: ip },
            data: { count: userLimit.count + 1 }
        });

        // 3. AI Generation
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return new Response("API Key not configured", { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `Write a ${tone} ${type} about "${topic}". Make it engaging and impactful.`;

        const result = await model.generateContentStream(prompt);

        // Create a readable stream from the generator
        const stream = new ReadableStream({
            async start(controller) {
                let fullContent = "";
                for await (const chunk of result.stream) {
                    const chunkText = chunk.text();
                    fullContent += chunkText;
                    controller.enqueue(chunkText);
                }
                controller.close();

                // Save to Database after streaming
                try {
                    await db.generation.create({
                        data: {
                            ipAddress: ip,
                            prompt: prompt,
                            content: fullContent,
                        }
                    });
                } catch (dbError) {
                    console.error("Failed to save generation log:", dbError);
                }
            },
        });

        return new Response(stream, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
            },
        });

    } catch (error) {
        console.error("Generate error:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "127.0.0.1";

    const userLimit = await db.userLimit.findUnique({
        where: { ipAddress: ip },
    });

    // Logic to verify if reseet needed (duplicate from POST, ideally refactor to util)
    let count = userLimit?.count || 0;
    if (userLimit) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const lastReset = new Date(userLimit.lastResetDate);
        lastReset.setHours(0, 0, 0, 0);
        if (lastReset.getTime() < today.getTime()) {
            count = 0;
        }
    }

    return NextResponse.json({
        remaining: Math.max(0, 3 - count),
        used: count,
        limit: 3
    });
}
