import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"
import { KAAVYA_SYSTEM_PROMPT } from "@/lib/kaavya-context"
import { getFallbackResponse } from "@/lib/fallback-responses"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { message, conversationHistory } = await req.json()

    // Debug logging
    console.log("API Route called with message:", message)
    console.log("OpenAI API Key exists:", !!process.env.OPENAI_API_KEY)

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.log("No OpenAI API key found, using fallback")
      return Response.json({
        response: getFallbackResponse(message),
        fallback: true,
      })
    }

    // Build messages array for OpenAI
    const messages = [
      { role: "system", content: KAAVYA_SYSTEM_PROMPT },
      ...conversationHistory.map((msg: any) => ({
        role: msg.isUser ? "user" : "assistant",
        content: msg.text,
      })),
      { role: "user", content: message },
    ]

    console.log("Attempting OpenAI API call...")

    const result = await streamText({
      model: openai("gpt-4o-mini"), // Using cheaper model for testing
      messages,
      temperature: 0.7,
      maxTokens: 500,
    })

    console.log("OpenAI API call successful")
    return result.toDataStreamResponse()
  } catch (error: any) {
    console.error("API Error:", error)

    // If it's an API key or quota error, use fallback
    if (
      error.message?.includes("API key") ||
      error.message?.includes("quota") ||
      error.message?.includes("billing") ||
      error.status === 401 ||
      error.status === 429
    ) {
      console.log("Using fallback due to API/billing issue")
      return Response.json({
        response: getFallbackResponse(req.body ? JSON.parse(await req.text()).message : "Hello"),
        fallback: true,
      })
    }

    // For other errors, also use fallback
    console.log("Using fallback due to other error")
    const { message } = await req.json()
    return Response.json({
      response: getFallbackResponse(message),
      fallback: true,
      error: error.message,
    })
  }
}
