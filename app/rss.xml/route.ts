import { NextResponse } from "next/server"
import { generateRSS } from "@/lib/rss"

export async function GET() {
  try {
    const rssXml = await generateRSS()

    return new NextResponse(rssXml, {
      headers: {
        "Content-Type": "application/xml",
      },
    })
  } catch (error) {
    console.error("Error generating RSS feed:", error)
    return new NextResponse("Error generating RSS feed", { status: 500 })
  }
}
