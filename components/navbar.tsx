"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"
import { Github, Twitter, Rss, Camera, Book, Lightbulb } from "lucide-react"
import AnimatedLogo from "./animated-logo"
import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

const navItems = [
  { name: "文稿", href: "/articles", icon: <Book size={18} />  },
  { name: "项目", href: "/projects", icon: <Lightbulb size={18} /> },
]

export default function Navbar() {
  const pathname = usePathname()
  const isMobile = useMobile()

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.1,
      },
    }),
  }

  return (
    <motion.header
      className="py-6 flex items-center justify-between"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <Link href="/" className="font-medium">
          <AnimatedLogo />
        </Link>
      </div>

      <div className="flex items-center space-x-1">
        {!isMobile && navItems.map((item, i) => (
          <motion.div key={item.href} custom={i} variants={navItemVariants} initial="hidden" animate="visible">
            <Link href={item.href} className={cn("nav-link", pathname === item.href && "nav-link-active")}>
              {item.name}
            </Link>
          </motion.div>
        ))}

        <motion.div
          className="flex items-center ml-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {isMobile && (
            navItems.map((item) => (
            <Link key={item.href} href={item.href}  className="icon-btn">
                {item.icon}
              </Link>
            ))
          )}
          <a href="https://github.com/dark9wesley" target="_blank" rel="noopener noreferrer" className="icon-btn">
            <Github size={18} />
          </a>
          <a href="https://x.com/dark9wesley" target="_blank" rel="noopener noreferrer" className="icon-btn">
            <Twitter size={18} />
          </a>
          <Link href="/photos" className="icon-btn">
            <Camera size={18} />
          </Link>
          <a href="/rss.xml" target="_blank" rel="noopener noreferrer" className="icon-btn">
            <Rss size={18} />
          </a>
          <ThemeToggle />
        </motion.div>
      </div>
    </motion.header>
  )
}
