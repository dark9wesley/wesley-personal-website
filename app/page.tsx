import Link from "next/link"
import { Github, Twitter } from "lucide-react"
import FadeIn from "@/components/fade-in"
import PageTransition from "@/components/page-transition"

export default function Home() {
  return (
    <PageTransition>
      <div className="space-y-8">
        <FadeIn>
          <section className="space-y-4">
            <h1 className="text-4xl font-bold text-center">Wesley Peng</h1>
            <p className="text-center text-muted-foreground">全栈工程师 | 独立开发者</p>
          </section>
        </FadeIn>

        <FadeIn delay={0.3}>
          <section className="space-y-4">
            <p>
              我正在专注于构建自己的产品，将创意转化为现实是我的热情所在。我热衷于开发能够提高自己和他人工作效率的工具，享受创造的过程。你可以在
              <Link href="/projects" className="text-foreground underline underline-offset-4">
                这里查看我的项目列表
              </Link>
              。
            </p>

            <p>
              我会在
              <Link href="/articles" className="text-foreground underline underline-offset-4">
                博客
              </Link>
              上分享关于开源、编程和产品开发的心得。
            </p>

            <p>
              除了编程，我还喜欢摄影和旅行。我会在
              <Link href="/photos" className="text-foreground underline underline-offset-4">
                这个页面
              </Link>
              分享一些照片。我也喜欢动漫、电影和剧集。
            </p>
          </section>
        </FadeIn>

        <FadeIn delay={0.4}>
          <section className="space-y-4">
            <h2 className="text-xl font-medium">在这些地方找到我</h2>
            <div className="flex flex-wrap gap-3">
              <a href="#" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
                <Github size={16} className="inline" />
                <span>GitHub</span>
              </a>
              <a href="#" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
                <Twitter size={16} className="inline" />
                <span>Twitter</span>
              </a>
              <a href="#" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
                <span>Discord Server</span>
              </a>
              <a href="#" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
                <span>Instagram</span>
              </a>
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={0.5}>
          <section className="space-y-4">
            <p>或者发邮件联系我：hi@wesleypeng.me</p>
          </section>
        </FadeIn>
      </div>
    </PageTransition>
  )
}
