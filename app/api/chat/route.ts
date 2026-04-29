import { NextRequest, NextResponse } from "next/server";

import { generateAssistantReply } from "@/app/utils/assistant";

interface IncomingHistoryMessage {
  role?: "user" | "assistant";
  content?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      message?: string;
      history?: IncomingHistoryMessage[];
    };

    const message = body.message?.trim();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const backendUrl = process.env.FASTAPI_URL?.replace(/\/$/, "");

    if (backendUrl) {
      try {
        const backendResponse = await fetch(`${backendUrl}/api/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message,
            history: body.history ?? []
          }),
          cache: "no-store"
        });

        if (backendResponse.ok) {
          const data = await backendResponse.json();

          return NextResponse.json(data);
        }
      } catch (error) {
        console.error("FastAPI proxy failed, using local fallback.", error);
      }
    }

    return NextResponse.json({
      reply: generateAssistantReply(message),
      mode: "frontend-fallback",
      context: ["Local portfolio knowledge"]
    });
  } catch (error) {
    console.error("Chat route error:", error);

    return NextResponse.json(
      {
        error:
          "The assistant could not process that request right now. Please try again."
      },
      { status: 500 }
    );
  }
}
