import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import PageTransition from "@/components/page-transition"
import FadeIn from "@/components/fade-in"
import { getNotionPageData } from "@/lib/notion"
import { idToUuid } from "notion-utils"

import { processPostData } from "@/lib/utils/post"
import NotionPage from "@/components/notion-page"
import { ExtendedRecordMap } from "notion-types"

// 定义文章类型
interface Article {
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
  relatedArticles?: Array<{
    slug: string
    title: string
  }>
}

// 生成静态路径
export async function generateStaticParams() {
  const pageData = await getNotionPageData();
  const articles = pageData?.allPages?.filter((item) => item.type === 'Post' && item.status === 'Published') || [];
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// 获取文章数据
async function getArticleBySlug(slug: string): Promise<Article | null> {
  const pageData = await getNotionPageData();
  // 在列表内查找文章
  const post = pageData?.allPages?.find(p => {
    return (
      p.type.indexOf('Menu') < 0 &&
      (p.slug === slug || p.id === idToUuid(slug))
    )
  }) as Article | undefined;

  if (!post) {
    return null;
  }

  await processPostData(post);

  return post;
}


export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await Promise.resolve(params);

  // 确保params.slug是有效的
  if (!resolvedParams || !resolvedParams.slug) {
    notFound();
  }
  
  const slug = resolvedParams.slug;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // 检查文章是否需要密码
  const isPasswordProtected = article?.password && article?.password !== '';

  return (
    <PageTransition>
      <article className="max-w-3xl mx-auto">
        <FadeIn>
          <div className="mb-8">
            <Link
              href="/articles"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to articles
            </Link>
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <span className="flex items-center">
                <Calendar size={14} className="mr-1" />
                {article.date?.start_date || article.publishDay}
              </span>
              <span className="mx-2">·</span>
              <span className="flex items-center">
                <Clock size={14} className="mr-1" />
                {article.readTime + 'min' || '5min'}
              </span>
              {isPasswordProtected && (
                <>
                  <span className="mx-2">·</span>
                  <span className="flex items-center text-yellow-500">
                    🔒 密码保护
                  </span>
                </>
              )}
            </div>
          </div>
        </FadeIn>

        {isPasswordProtected ? (
          <FadeIn>
            <div>1</div>
          </FadeIn>
        ) : (
          <FadeIn>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <NotionPage 
                recordMap={article.blockMap}
              />
            </div>
          </FadeIn>
        )}
      </article>
    </PageTransition>
  );
}
