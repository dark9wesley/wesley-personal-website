"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface AnimatedLinkProps {
  href: string
  children: ReactNode
  className?: string
  external?: boolean
}

export default function AnimatedLink({ href, children, className = "", external = false }: AnimatedLinkProps) {
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {}

  return (
    <motion.div
      className="inline-block relative"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "keyframes", stiffness: 400, damping: 10 }}
    >
      <Link href={href} className={`relative text-foreground ${className}`} {...linkProps}>
        <span className="relative z-10">{children}</span>
        <motion.span
          className="absolute bottom-0 left-0 w-full h-[2px] bg-accent"
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.2 }}
        />
      </Link>
    </motion.div>
  )
}
