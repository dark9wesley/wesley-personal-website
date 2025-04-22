"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function AnimatedLogo() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  // 添加动画状态跟踪
  const [animationState, setAnimationState] = useState("initial")

  useEffect(() => {
    setMounted(true)
  }, [])

  // 控制动画循环
  useEffect(() => {
    if (!mounted) return

    // 初始动画完成后，等待3秒，然后开始消失动画
    if (animationState === "initial") {
      const timer = setTimeout(() => {
        setAnimationState("visible")
      }, 1500) // 初始动画大约需要1.5秒
      return () => clearTimeout(timer)
    }

    // 可见状态等待3秒后开始消失
    if (animationState === "visible") {
      const timer = setTimeout(() => {
        setAnimationState("disappearing")
      }, 5000) // 等待3秒
      return () => clearTimeout(timer)
    }

    // 消失动画完成后，等待短暂时间，然后重新开始
    if (animationState === "disappearing") {
      const timer = setTimeout(() => {
        setAnimationState("hidden")
      }, 500) // 消失动画大约需要1秒
      return () => clearTimeout(timer)
    }

    // 隐藏状态短暂停留后重新开始循环
    if (animationState === "hidden") {
      const timer = setTimeout(() => {
        setAnimationState("initial")
      }, 500) // 隐藏0.5秒后重新开始
      return () => clearTimeout(timer)
    }
  }, [animationState, mounted])

  const strokeColor = mounted ? (theme === "dark" ? "#fff" : "#000") : "#000"

  // 定义动画变量
  const pathVariants = {
    initial: { pathLength: 0, opacity: 0 },
    visible: (custom: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          type: "spring",
          duration: 1.2,
          bounce: 0,
          delay: custom * 0.1,
        },
        opacity: { duration: 0.3, delay: custom * 0.1 },
      },
    }),
    disappearing: (custom: number) => ({
      pathLength: 0,
      opacity: 0,
      transition: {
        pathLength: {
          type: "spring",
          duration: 1.0,
          bounce: 0,
          delay: (1 - custom) * 0.1, // 反向延迟，使其从尾部开始消失
        },
        opacity: { duration: 0.3, delay: (1 - custom) * 0.1 + 0.7 }, // 路径消失后再淡出
      },
    }),
    hidden: { pathLength: 0, opacity: 0 },
  }

  return (
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-8 h-8 flex items-center justify-center"
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 简化的 W 字母 */}
        <motion.path
          d="M6 8L11 24L16 14L21 24L26 8"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          custom={0}
          variants={pathVariants}
          initial="initial"
          animate={animationState}
        />

        {/* 装饰性横线 */}
        <motion.path
          d="M4 16H28"
          stroke={strokeColor}
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="1 3"
          custom={1}
          variants={pathVariants}
          initial="initial"
          animate={animationState}
        />
      </svg>
    </motion.div>
  )
}
