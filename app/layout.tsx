import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ArtisticBackground from "@/components/artistic-background"
import ProgressProvider from "@/components/progress-provider"

import 'react-notion-x/src/styles.css'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Wesley Peng",
  description: "Wesley Peng的个人网站 - 全栈工程师 | 独立开发",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ArtisticBackground />
          <div className="flex min-h-screen flex-col max-w-3xl mx-auto px-4">
            <Navbar />
            <ProgressProvider>
              <main className="flex-1 py-10">{children}</main>
            </ProgressProvider>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
