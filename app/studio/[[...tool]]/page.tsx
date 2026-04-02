"use client"

import { NextStudio } from "next-sanity/studio"
import { hasSanityPublicConfig } from "@/sanity/env"
import { createSanityStudioConfig } from "@/sanity.config"

export default function StudioPage() {
  const env = {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  }

  const hasPublicConfig = hasSanityPublicConfig(env)

  if (!hasPublicConfig) {
    return (
      <div className="mx-auto max-w-2xl space-y-4 py-20">
        <h1 className="text-3xl font-semibold">Sanity 尚未配置</h1>
        <p className="text-muted-foreground">
          请先配置 `NEXT_PUBLIC_SANITY_PROJECT_ID` 和 `NEXT_PUBLIC_SANITY_DATASET`。
        </p>
      </div>
    )
  }

  const config = createSanityStudioConfig(env)

  return <NextStudio config={config} />
}
