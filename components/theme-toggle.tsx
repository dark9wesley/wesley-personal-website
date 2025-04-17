"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="icon-btn opacity-0">
        <Sun size={18} />
      </button>
    )
  }

  return (
    <button className="icon-btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="切换主题">
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
