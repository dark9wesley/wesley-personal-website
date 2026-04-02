export interface CmsPostPreview {
  id: string
  title: string
  slug: string
  excerpt: string
  publishDay: string
  coverImage?: string
}

export interface CmsTag {
  title: string
  slug: string
}

export interface CmsPostDetail extends CmsPostPreview {
  body: any[]
  readTime: string
  tags: CmsTag[]
  seoTitle?: string
  seoDescription?: string
}

export interface CmsPhoto {
  id: string
  slug: string
  title: string
  publishDay: string
  pageCover: string
  description: string
  alt: string
  blurDataURL?: string
}
