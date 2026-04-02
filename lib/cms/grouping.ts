import type { CmsPostPreview } from "./types"

export function buildArticlesByYear(articles: CmsPostPreview[]) {
  const grouped = articles.reduce<Record<string, CmsPostPreview[]>>((acc, article) => {
    const year = new Date(article.publishDay).getFullYear().toString()

    if (!acc[year]) {
      acc[year] = []
    }

    acc[year].push(article)

    return acc
  }, {})

  return Object.fromEntries(
    Object.entries(grouped).sort((a, b) => Number.parseInt(b[0]) - Number.parseInt(a[0])),
  )
}
