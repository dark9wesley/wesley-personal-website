import { Code, Server, Layout, ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import PageTransition from "@/components/page-transition"
import FadeIn from "@/components/fade-in"
import StaggeredFadeIn from "@/components/staggered-fade-in"

// 示例项目数据
const currentFocusProjects = [
  {
    id: 1,
    title: "Project A",
    description: "Inspect the intermediate state of your plugins and pipelines.",
    icon: <Layout size={24} />,
    link: "#",
    github: "https://github.com",
  },
  {
    id: 2,
    title: "Project B",
    description: "Modern Next.js Developer Experience.",
    icon: <Server size={24} />,
    link: "#",
    github: "https://github.com",
  },
  {
    id: 3,
    title: "Project C",
    description: "Interactive Playground for learning Next.js.",
    icon: <Code size={24} />,
    link: "#",
    github: "https://github.com",
  },
]

const frameworkEcosystem = [
  {
    id: 1,
    title: "Framework Core",
    description: "The intuitive Vue Framework.",
    icon: <Code size={24} />,
    link: "#",
    github: "https://github.com",
  },
  {
    id: 2,
    title: "Framework Playground",
    description: "Interactive Playground for learning Framework.",
    icon: <Server size={24} />,
    link: "#",
    github: "https://github.com",
  },
  {
    id: 3,
    title: "Framework DevTools",
    description: "Modern Framework Developer Experience.",
    icon: <Layout size={24} />,
    link: "#",
    github: "https://github.com",
  },
  {
    id: 4,
    title: "Framework ESLint",
    description: "All-in-one ESLint plugin for Framework.",
    icon: <Code size={24} />,
    link: "#",
    github: "https://github.com",
  },
  {
    id: 5,
    title: "Framework Icon",
    description: "Use thousands of icons in Framework.",
    icon: <Server size={24} />,
    link: "#",
    github: "https://github.com",
  },
  {
    id: 6,
    title: "Framework Test Utils",
    description: "Testing utilities for Framework powered by Vitest.",
    icon: <Layout size={24} />,
    link: "#",
    github: "https://github.com",
  },
]

const devTools = [
  {
    id: 1,
    title: "DevTool A",
    description: "Modern Framework Developer Experience.",
    icon: <Code size={24} />,
    link: "#",
    github: "https://github.com",
  },
  {
    id: 2,
    title: "Node Modules Inspector",
    description: "Visualize and inspect your node_modules.",
    icon: <Server size={24} />,
    link: "#",
    github: "https://github.com",
  },
  {
    id: 3,
    title: "ESLint Config Inspector",
    description: "A visual tool for inspecting and understanding your ESLint flat config.",
    icon: <Layout size={24} />,
    link: "#",
    github: "https://github.com",
  },
]

export default function ProjectsPage() {
  return (
    <PageTransition>
      <div className="space-y-16">
        <FadeIn>
          <div className="text-center space-y-4">
            <h1 className="section-title">Projects</h1>
            <p className="section-subtitle">Projects that I created or maintaining.</p>
            <div className="flex justify-center space-x-4 text-muted-foreground">
              <Link href="https://github.com" className="hover:text-foreground inline-flex items-center gap-1">
                <Github size={16} />
                <span>GitHub</span>
              </Link>
              <Link href="#" className="hover:text-foreground">
                Recent Releases
              </Link>
            </div>
          </div>
        </FadeIn>

        <section>
          <FadeIn delay={0.2}>
            <h2 className="project-section-title">Current Focus</h2>
          </FadeIn>
          <StaggeredFadeIn className="project-grid" staggerDelay={0.1} initialDelay={0.3}>
            {currentFocusProjects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-icon">{project.icon}</div>
                <h3 className="font-medium mb-1">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                <div className="mt-auto flex gap-2">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="icon-btn">
                      <Github size={16} />
                    </a>
                  )}
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="icon-btn">
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </StaggeredFadeIn>
        </section>

        <section>
          <FadeIn delay={0.4}>
            <h2 className="project-section-title">Framework Ecosystem</h2>
          </FadeIn>
          <StaggeredFadeIn className="project-grid" staggerDelay={0.1} initialDelay={0.5}>
            {frameworkEcosystem.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-icon">{project.icon}</div>
                <h3 className="font-medium mb-1">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                <div className="mt-auto flex gap-2">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="icon-btn">
                      <Github size={16} />
                    </a>
                  )}
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="icon-btn">
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </StaggeredFadeIn>
        </section>

        <section>
          <FadeIn delay={0.6}>
            <h2 className="project-section-title">DevTools</h2>
          </FadeIn>
          <StaggeredFadeIn className="project-grid" staggerDelay={0.1} initialDelay={0.7}>
            {devTools.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-icon">{project.icon}</div>
                <h3 className="font-medium mb-1">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                <div className="mt-auto flex gap-2">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="icon-btn">
                      <Github size={16} />
                    </a>
                  )}
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="icon-btn">
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </StaggeredFadeIn>
        </section>
      </div>
    </PageTransition>
  )
}
