import { groq } from "next-sanity"

export const postsQuery = groq`*[_type == "post" && status == "published"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  "coverImage": coverImage.asset->url
}`

export const postBySlugQuery = groq`*[_type == "post" && status == "published" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  body,
  seoTitle,
  seoDescription,
  "coverImage": coverImage.asset->url,
  "tags": tags[]->{
    title,
    "slug": slug.current
  }
}`

export const photosQuery = groq`*[_type == "photo" && status == "published"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  description,
  "alt": image.alt,
  "imageUrl": image.asset->url
}`

export const photoBySlugQuery = groq`*[_type == "photo" && status == "published" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  description,
  "alt": image.alt,
  "imageUrl": image.asset->url
}`
