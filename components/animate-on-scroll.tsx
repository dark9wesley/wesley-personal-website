"use client"

import { useRef, useEffect, useState, type ReactNode } from "react"
import { motion, useAnimation } from "framer-motion"

interface AnimateOnScrollProps {
  children: ReactNode
  className?: string
  animation?: "fadeIn" | "fadeInUp" | "fadeInLeft" | "fadeInRight" | "zoom" | "flip"
  delay?: number
  duration?: number
  threshold?: number
  once?: boolean
}

const animations = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  zoom: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  flip: {
    hidden: { opacity: 0, rotateX: 90 },
    visible: { opacity: 1, rotateX: 0 },
  },
}

export default function AnimateOnScroll({
  children,
  className = "",
  animation = "fadeInUp",
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  once = true,
}: AnimateOnScrollProps) {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          controls.start("visible")
          if (once && ref.current) {
            observer.unobserve(ref.current)
          }
        } else if (!once) {
          setIsInView(false)
          controls.start("hidden")
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [controls, once, threshold])

  const selectedAnimation = animations[animation]
  const transition = { duration, delay, ease: "easeOut" }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={selectedAnimation}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  )
}
