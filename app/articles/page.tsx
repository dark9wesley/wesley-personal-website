import Link from "next/link"
import PageTransition from "@/components/page-transition"
import FadeIn from "@/components/fade-in"
import StaggeredFadeIn from "@/components/staggered-fade-in"
import { getNotionPageData } from "@/lib/notion"

// 示例文稿数据
const articles = [
  {
    id: 1,
    title: "Next.js 13 中的 App Router 详解",
    date: "Apr 8",
    readingTime: "7min",
    link: "#",
    year: "2023",
  },
  {
    id: 2,
    title: "使用 Tailwind CSS 构建响应式界面",
    date: "Mar 12",
    readingTime: "5min",
    link: "#",
    year: "2023",
  },
  {
    id: 3,
    title: "Async, Sync, in Between",
    date: "Mar 2",
    readingTime: "8min",
    link: "#",
    year: "2023",
  },
  {
    id: 4,
    title: "Move on to ESM-only",
    date: "Feb 5",
    readingTime: "10min",
    link: "#",
    year: "2023",
  },
  {
    id: 5,
    title: "Epoch Semantic Versioning",
    date: "Jan 7",
    readingTime: "6min",
    link: "#",
    year: "2023",
  },
  {
    id: 6,
    title: "Introducing Nuxt Icon v1",
    date: "Nov 28",
    readingTime: "25min",
    link: "#",
    year: "2022",
  },
  {
    id: 7,
    title: "Initiative on Sponsorship Forwarding",
    date: "Jul 20",
    readingTime: "9min",
    link: "#",
    year: "2022",
  },
  {
    id: 8,
    title: "Refreshed Nuxt ESLint Integrations",
    date: "Apr 10",
    readingTime: "15min",
    link: "#",
    year: "2022",
  },
]

// 按年份分组文章
const groupByYear = (articles: any) => {
  const grouped: Record<string, typeof articles> = {}

  articles.forEach((article: any) => {
    if (!grouped[article.year]) {
      grouped[article.year] = []
    }
    grouped[article.year].push(article)
  })

  return grouped
}

export default async function ArticlesPage() {
  const pageData = await getNotionPageData();
  const groupedArticles = groupByYear(articles)
  const years = Object.keys(groupedArticles).sort((a, b) => Number.parseInt(b) - Number.parseInt(a))

  return (
    <PageTransition>
      <div className="space-y-12">
        <FadeIn>
          <div className="text-center space-y-4">
            <div className="text-sm text-muted-foreground uppercase tracking-wider">Wesley Peng</div>
            <h1 className="section-title">Blog</h1>
            {/* 移除不必要的导航链接 */}
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
                {groupedArticles[year].map((article: any) => (
                  <article key={article.id} className="article-item">
                    <Link href={article.link} className="article-title">
                      {article.title}
                    </Link>
                    <div className="article-date">
                      {article.date} · {article.readingTime}
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
