"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FadeInProps {
  children: ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  duration?: number
  className?: string
}

export default function FadeIn({ children, delay = 0, direction = "up", duration = 0.5, className = "" }: FadeInProps) {
  const directionVariants = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
    none: {},
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...directionVariants[direction] }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
