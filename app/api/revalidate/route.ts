import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"
import { resolveRevalidateTags, verifyRevalidateSecret } from "@/lib/cms/revalidate"

export async function POST(request: Request) {
  if (!verifyRevalidateSecret(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 })
  }

  const payload = await request.json()
  const tags = resolveRevalidateTags(payload)

  tags.forEach((tag) => {
    revalidateTag(tag)
  })

  return NextResponse.json({
    ok: true,
    revalidated: tags,
  })
}
