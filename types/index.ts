import { ExtendedRecordMap } from "notion-types"

export interface Photo {
  id: string
  title: string
  slug: string
  date?: {
    start_date: string
  }
  publishDay?: string
  readTime?: string
  password?: string
  blockMap: ExtendedRecordMap
  content?: string[]
  toc?: any[]
  pageCover: string
  blurDataURL?: string
  relatedArticles?: Array<{
    slug: string
    title: string
  }>
}
