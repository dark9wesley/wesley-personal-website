const ARTICLE_TAG = "articles"
const PHOTO_TAG = "photos"
const RSS_TAG = "rss"

export function resolveRevalidateTags(payload: {
  _type?: string
  slug?: { current?: string }
}) {
  const slug = payload.slug?.current

  if (payload._type === "post" && slug) {
    return [ARTICLE_TAG, `article:${slug}`, RSS_TAG]
  }

  if (payload._type === "photo" && slug) {
    return [PHOTO_TAG, `photo:${slug}`]
  }

  return []
}

export function verifyRevalidateSecret(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET

  if (!secret) {
    return false
  }

  return request.headers.get("x-webhook-secret") === secret
}
