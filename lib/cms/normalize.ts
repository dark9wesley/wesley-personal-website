import dayjs from "dayjs"
import { fnGetCpmisWords } from "@/lib/utils/string"
import type { CmsPhoto, CmsPostDetail, CmsPostPreview } from "./types"

function getPortableTextPlainText(value: any[] = []) {
  return value
    .flatMap((block) => {
      if (!Array.isArray(block?.children)) {
        return []
      }

      return block.children.map((child: { text?: string }) => child.text ?? "")
    })
    .join("")
}

function estimateReadTime(value: any[]) {
  const wordCount = fnGetCpmisWords(getPortableTextPlainText(value))
  return `${Math.max(1, Math.floor(wordCount / 400) + 1)}min`
}

export function normalizePostPreview(post: Record<string, any>): CmsPostPreview {
  return {
    id: post._id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt ?? "",
    publishDay: dayjs(post.publishedAt).format("YYYY-MM-DD"),
    coverImage: post.coverImage ?? undefined,
  }
}

export function normalizePhoto(photo: Record<string, any>): CmsPhoto {
  return {
    id: photo._id,
    slug: photo.slug,
    title: photo.title,
    publishDay: dayjs(photo.publishedAt).format("YYYY-MM-DD"),
    pageCover: photo.imageUrl,
    description: photo.description ?? "",
    alt: photo.alt ?? "",
  }
}

export function normalizePostDetail(post: Record<string, any>): CmsPostDetail {
  return {
    ...normalizePostPreview(post),
    body: post.body ?? [],
    readTime: estimateReadTime(post.body ?? []),
    tags: post.tags ?? [],
    seoTitle: post.seoTitle ?? undefined,
    seoDescription: post.seoDescription ?? undefined,
  }
}
