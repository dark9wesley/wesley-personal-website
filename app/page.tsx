import FadeIn from "@/components/fade-in"
import PageTransition from "@/components/page-transition"
import TypingEffect from "@/components/typeping-effect"
import AnimatedLink from "@/components/animated-link"
import { Mail } from "lucide-react"

export default function Home() {
  const titles = [
    "你好，我是 Wesley Peng，热爱探索的全栈工程师。", 
    "你好，我是 Wesley Peng，异想天开的独立开发者。", 
    "你好，我是 Wesley Peng，两只猫的铲屎官。", 
  ]

  return (
    <PageTransition>
      <div className="space-y-8 text-muted-foreground">
        <FadeIn>
          <section className="space-y-4">
            <h1 className="text-foreground text-4xl font-bold text-center">Wesley Peng</h1>
          </section>
        </FadeIn>

        <FadeIn delay={0.3}>
          <section className="space-y-4">
            <TypingEffect titles={titles} className="text-center" />
          </section>
        </FadeIn>

        <FadeIn delay={0.5}>
          <section className="space-y-4">
            <p>
              我正在专注于构建自己的产品，将创意转化为现实是我的热情所在。我热衷于开发能够提高自己和他人工作效率的工具，享受创造的过程。你可以在
              <AnimatedLink href="/projects" className="text-foreground underline underline-offset-4">
                这里查看我的项目列表
              </AnimatedLink>
              。
            </p>

            <p>
              我会在
              <AnimatedLink href="/articles" className="text-foreground underline underline-offset-4">
                文稿
              </AnimatedLink>
              分享关于开源、编程和产品开发的心得。
            </p>

            <p>
              除了编程，我还喜欢摄影和旅行。我会在
              <AnimatedLink href="/photos" className="text-foreground underline underline-offset-4">
                这个页面
              </AnimatedLink>
              分享一些照片。我也喜欢动漫、电影和剧集。
            </p>
          </section>
        </FadeIn>

        <FadeIn delay={0.8}>
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span>如果对我感兴趣的话，可以联系</span>
              <AnimatedLink href="mailto:pengyw97@gmail.com" className="text-foreground">
                <span className="underline underline-offset-4 inline-flex items-center gap-1"><Mail size={16} />pengyw97@gmail.com</span>
              </AnimatedLink>
            </div>
          </section>
        </FadeIn>
      </div>
    </PageTransition>
  )
}
