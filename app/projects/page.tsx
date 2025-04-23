import { Layout } from "lucide-react"
import PageTransition from "@/components/page-transition"
import FadeIn from "@/components/fade-in"
import StaggeredFadeIn from "@/components/staggered-fade-in"
import Link from "next/link"

const currentFocusProjects = [
  {
    id: 1,
    title: "Wesley's personal website",
    description: "个人博客项目",
    icon: <Layout size={24} />,
    link: "https://github.com/dark9wesley/wesley-personal-website",
  },
]

export default function ProjectsPage() {
  return (
    <PageTransition>
      <div className="space-y-16">
        <FadeIn>
          <div className="text-center space-y-4">
            <h1 className="section-title">项目</h1>
            <p className="section-subtitle italic">「时光淬炼的二进制」</p>
          </div>
        </FadeIn>

        <section>
          <FadeIn delay={0.2}>
            <h2 className="project-section-title">Current Focus</h2>
          </FadeIn>
          <StaggeredFadeIn className="project-grid" staggerDelay={0.1} initialDelay={0.3}>
            {currentFocusProjects.map((project) => (
              <Link key={project.id} className="project-card" href={project.link} target="_blank">
                <div className="project-icon">{project.icon}</div>
                <h3 className="font-medium mb-1">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
              </Link>
            ))}
          </StaggeredFadeIn>
        </section>
      </div>
    </PageTransition>
  )
}
