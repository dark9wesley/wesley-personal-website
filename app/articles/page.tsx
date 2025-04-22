import Link from "next/link"
import PageTransition from "@/components/page-transition"
import FadeIn from "@/components/fade-in"
import StaggeredFadeIn from "@/components/staggered-fade-in"
import { getNotionPageData } from "@/lib/notion"
import dayjs from 'dayjs'

// 按年份分组文章
const groupByYear = (articles: Record<string, any>[]) => {
  const grouped: Record<string, typeof articles> = {}

  articles.forEach((article: Record<string, any>) => {
    const year = new Date(article.publishDate).getFullYear().toString()
    if (!grouped[year]) {
      grouped[year] = []
    }
    grouped[year].push(article)
  })

  return grouped
}

const formatDate = (dateString: string) => {
  return dayjs(dateString).format('MMM D')
}

// 设置页面每小时重新验证一次
export const revalidate = 1800 // 3600秒 = 1小时

export default async function ArticlesPage() {
  const pageData = await getNotionPageData();
  const articles = pageData?.allPages?.filter((item) => item.type === 'Post' && item.status === 'Published') || [];
  const groupedArticles = groupByYear(articles)
  const years = Object.keys(groupedArticles).sort((a, b) => Number.parseInt(b) - Number.parseInt(a))

  return (
    <PageTransition>
      <div className="space-y-12">
        <FadeIn>
          <div className="text-center space-y-4">
            <div className="text-sm text-muted-foreground uppercase tracking-wider">Wesley Peng</div>
            <h1 className="section-title">Blog</h1>
            <div className="flex justify-center space-x-4 text-muted-foreground">
              <Link href="/articles" className="hover:text-foreground">
                Blog
              </Link>
              <Link href="/projects" className="hover:text-foreground">
                Projects
              </Link>
            </div>
          </div>
        </FadeIn>

        {years.map((year, yearIndex) => (
          <section key={year} className="space-y-2">
            <FadeIn delay={0.1 * (yearIndex + 1)}>
              <h2 className="text-5xl font-bold text-muted-foreground/20">{year}</h2>
            </FadeIn>
            <div className="space-y-0">
              <StaggeredFadeIn initialDelay={0.1 * (yearIndex + 1)} staggerDelay={0.05} direction="up">
                {groupedArticles[year].map((article) => (
                  <article key={article.id} className="article-item">
                    <Link href={`/articles/${article.slug}`} className="article-title">
                      {article.title}
                    </Link>
                    <div className="article-date">
                      {formatDate(article.publishDay)}
                    </div>
                  </article>
                ))}
              </StaggeredFadeIn>
            </div>
          </section>
        ))}
      </div>
    </PageTransition>
  )
}
