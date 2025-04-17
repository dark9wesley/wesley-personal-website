import Link from "next/link"
import { Code, Server, Layout, Github, Twitter } from "lucide-react"
import FadeIn from "@/components/fade-in"
import PageTransition from "@/components/page-transition"

export default function Home() {
  return (
    <PageTransition>
      <div className="space-y-8">
        <FadeIn>
          <section className="space-y-4">
            <h1 className="text-4xl font-bold text-center">Wesley Peng</h1>
            <p className="text-center text-muted-foreground">
              Hey! I'm Wesley Peng, a fanatical full-stack engineer and open source enthusiast.
            </p>
          </section>
        </FadeIn>

        <FadeIn delay={0.2}>
          <section className="space-y-4">
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <span>Working at</span>
                <a href="#" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
                  <Code size={16} className="inline" />
                  <span>Company</span>
                </a>
              </p>

              <p className="flex items-center gap-2">
                <span>Creator of</span>
                <a href="#" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
                  <Server size={16} className="inline" />
                  <span>Project A</span>
                </a>
                <a href="#" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
                  <Layout size={16} className="inline" />
                  <span>Project B</span>
                </a>
              </p>

              <p className="flex items-center gap-2">
                <span>Core team of</span>
                <a href="#" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
                  <Code size={16} className="inline" />
                  <span>Framework X</span>
                </a>
              </p>

              <p className="flex items-center gap-2">
                <span>Maintaining</span>
                <a href="#" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
                  <Server size={16} className="inline" />
                  <span>Library Y</span>
                </a>
              </p>
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={0.3}>
          <section className="space-y-4">
            <p>
              Dreaming up cool ideas and making them come true is where my passion lies. I am enthusiastic about
              building tools that help myself and others to be more productive and enjoy the process of crafting. You
              can find my{" "}
              <Link href="/projects" className="text-foreground underline underline-offset-4">
                full projects list here
              </Link>
              .
            </p>

            <p>
              I write{" "}
              <Link href="/articles" className="text-foreground underline underline-offset-4">
                blog posts
              </Link>{" "}
              about open source, coding, etc. Occasionally, I do live coding streams on{" "}
              <a href="#" className="text-foreground underline underline-offset-4">
                YouTube
              </a>{" "}
              and{" "}
              <a href="#" className="text-foreground underline underline-offset-4">
                Bilibili
              </a>
              .
            </p>

            <p>
              Outside of programming, I enjoy doing photography and traveling. I post{" "}
              <Link href="/photos" className="text-foreground underline underline-offset-4">
                photos on this page
              </Link>
              . I also love anime, movies and dramas. I am trying to hit my media consumption.
            </p>
          </section>
        </FadeIn>

        <FadeIn delay={0.4}>
          <section className="space-y-4">
            <h2 className="text-xl font-medium">Find me on</h2>
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
                <span>YouTube</span>
              </a>
              <a href="#" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
                <span>Instagram</span>
              </a>
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={0.5}>
          <section className="space-y-4">
            <p>Or mail me at hi@wesleypeng.me</p>
          </section>
        </FadeIn>
      </div>
    </PageTransition>
  )
}
