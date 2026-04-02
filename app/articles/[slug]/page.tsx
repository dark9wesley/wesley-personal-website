import { notFound } from "next/navigation"
import { Calendar, Clock } from "lucide-react"
import PageTransition from "@/components/page-transition"
import FadeIn from "@/components/fade-in"
import { getPostBySlug } from "@/lib/cms"
import PortableTextRenderer from "@/components/portable-text"
import AnimatedCD from "@/components/animated-cd"


export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await Promise.resolve(params);

  // 确保params.slug是有效的
  if (!resolvedParams || !resolvedParams.slug) {
    notFound();
  }
  
  const slug = resolvedParams.slug;
  const article = await getPostBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <PageTransition>
      <article className="max-w-3xl mx-auto">
        <FadeIn>
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <span className="flex items-center">
                <Calendar size={14} className="mr-1" />
                {article.publishDay}
              </span>
              <span className="mx-2">·</span>
              <span className="flex items-center">
                <Clock size={14} className="mr-1" />
                {article.readTime}
              </span>
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <PortableTextRenderer value={article.body} />
          </div>
        </FadeIn>
      </article>
      <AnimatedCD href="/articles" />
    </PageTransition>
  );
}
