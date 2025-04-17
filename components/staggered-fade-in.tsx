"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface StaggeredFadeInProps {
  children: ReactNode[]
  staggerDelay?: number
  initialDelay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  className?: string
}

export default function StaggeredFadeIn({
  children,
  staggerDelay = 0.1,
  initialDelay = 0,
  direction = "up",
  className = "",
}: StaggeredFadeInProps) {
  const directionOffset = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
    none: {},
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, ...directionOffset[direction] },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className={className}>
      {children.map((child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
