"use client"

import { useState, useEffect } from "react"
import { TypeAnimation } from "react-type-animation"

interface TypingEffectProps {
  titles: string[]
  className?: string
}

export default function TypingEffect({ titles, className = "" }: TypingEffectProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className={className}>{titles[0]}</div>
  }

  // 构建TypeAnimation所需的序列
  const sequence = titles.flatMap((title) => [title, 3000])

  return (
    <div className={`${className} flex items-center`}>
      <TypeAnimation
        sequence={sequence}
        wrapper="span"
        cursor={true}
        repeat={Number.POSITIVE_INFINITY}
        style={{ display: "inline-block" }}
      />
    </div>
  )
}
