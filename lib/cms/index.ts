import { unstable_cache } from "next/cache"
import { getSanityClient } from "@/sanity/lib/client"
import { normalizePhoto, normalizePostDetail, normalizePostPreview } from "./normalize"
import { photoBySlugQuery, photosQuery, postBySlugQuery, postsQuery } from "./queries"

export * from "./grouping"
export * from "./normalize"
export * from "./revalidate"
export * from "./types"

const getCachedPosts = unstable_cache(
  async () => {
    const client = getSanityClient()

    if (!client) {
      return []
    }

    const posts = await client.fetch(postsQuery)
    return posts.map(normalizePostPreview)
  },
  ["sanity-posts"],
  {
    tags: ["articles", "rss"],
  },
)

const getCachedPhotos = unstable_cache(
  async () => {
    const client = getSanityClient()

    if (!client) {
      return []
    }

    const photos = await client.fetch(photosQuery)
    return photos.map(normalizePhoto)
  },
  ["sanity-photos"],
  {
    tags: ["photos"],
  },
)

export async function getPosts() {
  return getCachedPosts()
}

export async function getPostBySlug(slug: string) {
  const getCachedPost = unstable_cache(
    async () => {
      const client = getSanityClient()

      if (!client) {
        return null
      }

      const post = await client.fetch(postBySlugQuery, { slug })
      return post ? normalizePostDetail(post) : null
    },
    ["sanity-post", slug],
    {
      tags: [`article:${slug}`],
    },
  )

  return getCachedPost()
}

export async function getPhotos() {
  return getCachedPhotos()
}

export async function getPhotoBySlug(slug: string) {
  const getCachedPhoto = unstable_cache(
    async () => {
      const client = getSanityClient()

      if (!client) {
        return null
      }

      const photo = await client.fetch(photoBySlugQuery, { slug })
      return photo ? normalizePhoto(photo) : null
    },
    ["sanity-photo", slug],
    {
      tags: [`photo:${slug}`],
    },
  )

  return getCachedPhoto()
}
