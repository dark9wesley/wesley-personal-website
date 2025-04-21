import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import PageTransition from "@/components/page-transition"
import FadeIn from "@/components/fade-in"
import CodeBlock from "@/components/code-block"
import VideoPlayer from "@/components/video-player"

// 模拟文章数据获取函数
async function getArticleBySlug(slug: string) {
  // 这里应该是从数据库或API获取文章数据
  // 现在我们使用模拟数据
  const articles = {
    "example-1": {
      title: "Hello Tokyo!",
      date: "Apr 8",
      readingTime: "7min",
      content: [
        {
          type: "text",
          content:
            "Seven years ago, my first visit to Japan - a trip to 大阪, 京都, and 北海道 - planted the seed of wanting to live in Japan one day. It was an unforgettable experience that changed the way I see the world. The meticulous attention to detail, the dedication to craftsmanship, and the seamless blend of tradition and modernity continue to inspire me.",
        },
        {
          type: "text",
          content: "Here are some photos I took back in 2018 on that trip:",
        },
        {
          type: "images",
          images: [
            {
              src: "/placeholder.svg?height=400&width=600",
              alt: "小樽 Otaru, Hokkaido",
              caption: "小樽 Otaru, Hokkaido",
            },
            {
              src: "/placeholder.svg?height=400&width=600",
              alt: "美瑛 Biei, Hokkaido",
              caption: "美瑛 Biei, Hokkaido",
            },
            {
              src: "/placeholder.svg?height=400&width=600",
              alt: "京都 Kyoto",
              caption: "京都 Kyoto",
            },
          ],
        },
        {
          type: "heading",
          content: "Moving to Japan",
        },
        {
          type: "text",
          content:
            "Fast forward to 2023, I finally made the decision to move to Tokyo. The process was challenging but incredibly rewarding. I had to navigate through visa applications, finding an apartment, and setting up a new life in a foreign country.",
        },
        {
          type: "video",
          src: "https://example.com/tokyo-arrival.mp4",
          poster: "/placeholder.svg?height=400&width=700",
          caption: "Arriving in Tokyo for the first time as a resident",
        },
        {
          type: "heading",
          content: "Learning Japanese",
        },
        {
          type: "text",
          content:
            "One of the biggest challenges has been learning Japanese. While I studied the language before moving, using it daily is a different experience altogether. Here's a simple program I wrote to help me practice kanji:",
        },
        {
          type: "code",
          language: "typescript",
          content: `
function learnKanji(kanji: string[], reviewInterval: number = 24) {
  const today = new Date();
  const reviewQueue = kanji.map(character => ({
    character,
    nextReview: today,
    level: 0,
  }));

  function reviewToday() {
    const now = new Date();
    return reviewQueue
      .filter(item => item.nextReview <= now)
      .map(item => item.character);
  }

  function markReviewed(character: string, remembered: boolean) {
    const item = reviewQueue.find(item => item.character === character);
    if (!item) return;
    
    // Spaced repetition algorithm
    if (remembered) {
      item.level += 1;
    } else {
      item.level = Math.max(0, item.level - 1);
    }
    
    // Calculate next review date based on level
    const hours = reviewInterval * Math.pow(2, item.level);
    const nextReview = new Date();
    nextReview.setHours(nextReview.getHours() + hours);
    item.nextReview = nextReview;
  }

  return {
    reviewToday,
    markReviewed,
    getStats: () => reviewQueue.map(item => ({
      character: item.character,
      level: item.level,
      nextReview: item.nextReview,
    })),
  };
}

// Usage
const myKanjiList = ['日', '本', '語', '勉', '強'];
const kanjiReviewer = learnKanji(myKanjiList);
console.log('Today\\'s review:', kanjiReviewer.reviewToday());
`,
        },
        {
          type: "text",
          content:
            "I am incredibly grateful to all my friends who supported me during this transition. Without their help, I might still be wandering the streets right now 😅.",
        },
        {
          type: "heading",
          content: "Please Reach Out",
        },
        {
          type: "text",
          content:
            "I'll usually be in between 新宿 and 秋葉原 during weekdays. If you live in Tokyo or come by to visit, please don't hesitate to reach out! I'd love to meet and chat! I'm eager to learn more about Japan and the people here (or if you're visiting, I'd be happy to show you around!).",
        },
        {
          type: "text",
          content: "You can message me on SNS, or send me an email at hello@wesleypeng.me, looking forward to that! 🌸",
        },
      ],
      relatedArticles: [
        { slug: "async-sync-in-between", title: "Async, Sync, in Between" },
        { slug: "move-on-to-esm-only", title: "Move on to ESM-only" },
      ],
    },
    "async-sync-in-between": {
      title: "Async, Sync, in Between",
      date: "Mar 2",
      readingTime: "8min",
      content: [
        {
          type: "text",
          content:
            "Another case demonstrating the coloring problem is a plugin system with async hooks. For example, imagine we are building a Markdown-to-HTML compiler with plugin support. Say the parser and compiler logic are synchronous; we could expose a sync API like:",
        },
        {
          type: "code",
          language: "typescript",
          content: `
export function markdownToHtml(markdown) {
  const ast = parse(markdown)
  // ...
  return render(ast)
}`,
        },
        {
          type: "text",
          content:
            "To make our library extensible, we might allow plugins to register hooks at multiple stages throughout the process, for example:",
        },
        {
          type: "code",
          language: "typescript",
          content: `
export interface Plugin {
  preprocess: (markdown: string) => string
  transform: (ast: AST) => AST
  postprocess: (html: string) => string
}

export function markdownToHtml(markdown, plugins) {
  for (const plugin of plugins) {
    markdown = plugin.preprocess(markdown)
  }
  let ast = parse(markdown)
  for (const plugin of plugins) {
    ast = plugin.transform(ast)
  }
  let html = render(ast)
  for (const plugin of plugins) {
    html = plugin.postprocess(html)
  }
  return html
}`,
        },
        {
          type: "text",
          content:
            "Great, now we have a plugin system. However, having markdownToHtml as a synchronous function essentially limits all plugin hooks to be synchronous as well. This limitation can be quite restrictive. For instance, consider a plugin for syntax highlighting that needs to load language definitions on demand.",
        },
      ],
      relatedArticles: [
        { slug: "hello-tokyo", title: "Hello Tokyo!" },
        { slug: "epoch-semantic-versioning", title: "Epoch Semantic Versioning" },
      ],
    },
  }

  if (!articles[slug]) {
    return null
  }

  return articles[slug]
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

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
                {article.date}
              </span>
              <span className="mx-2">·</span>
              <span className="flex items-center">
                <Clock size={14} className="mr-1" />
                {article.readingTime}
              </span>
            </div>
          </div>
        </FadeIn>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {article.content.map((block, index) => {
            if (block.type === "text") {
              return (
                <FadeIn key={index} delay={0.1 * index}>
                  <p className="mb-6">{block.content}</p>
                </FadeIn>
              )
            }

            if (block.type === "heading") {
              return (
                <FadeIn key={index} delay={0.1 * index}>
                  <h2 className="text-2xl font-bold mt-10 mb-4">{block.content}</h2>
                </FadeIn>
              )
            }

            if (block.type === "images") {
              return (
                <FadeIn key={index} delay={0.1 * index}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
                    {block.images.map((image, imgIndex) => (
                      <div key={imgIndex} className="relative">
                        <Image
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          width={600}
                          height={400}
                          className="rounded-md object-cover w-full h-auto"
                        />
                        {image.caption && (
                          <div className="text-sm text-center text-muted-foreground mt-2">{image.caption}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </FadeIn>
              )
            }

            if (block.type === "code") {
              return (
                <FadeIn key={index} delay={0.1 * index}>
                  <div className="my-6">
                    <CodeBlock language={block.language} code={block.content} />
                  </div>
                </FadeIn>
              )
            }

            if (block.type === "video") {
              return (
                <FadeIn key={index} delay={0.1 * index}>
                  <div className="my-8">
                    <VideoPlayer src={block.src} poster={block.poster} />
                    {block.caption && (
                      <div className="text-sm text-center text-muted-foreground mt-2">{block.caption}</div>
                    )}
                  </div>
                </FadeIn>
              )
            }

            return null
          })}
        </div>

        {article.relatedArticles && article.relatedArticles.length > 0 && (
          <FadeIn delay={0.5}>
            <div className="mt-16 pt-8 border-t">
              <h3 className="text-xl font-medium mb-4">Related Articles</h3>
              <div className="space-y-4">
                {article.relatedArticles.map((related, index) => (
                  <div key={index}>
                    <Link href={`/articles/${related.slug}`} className="text-lg hover:text-highlight transition-colors">
                      {related.title}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        )}
      </article>
    </PageTransition>
  )
}
