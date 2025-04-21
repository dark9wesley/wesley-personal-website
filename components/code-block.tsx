"use client"

import { useEffect, useState } from "react"
import { Check, Copy } from "lucide-react"

interface CodeBlockProps {
  code: string
  language: string
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 2000)
      return () => clearTimeout(timeout)
    }
  }, [copied])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
  }

  return (
    <div className="relative group">
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleCopy}
          className="p-2 rounded-md bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
      <pre className="p-4 rounded-md bg-muted/50 overflow-x-auto">
        <code className={`language-${language}`}>{code.trim()}</code>
      </pre>
      {language && (
        <div className="absolute top-0 right-0 px-2 py-1 text-xs text-muted-foreground bg-muted/80 rounded-bl-md rounded-tr-md">
          {language}
        </div>
      )}
    </div>
  )
}
