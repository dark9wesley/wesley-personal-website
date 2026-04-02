"use client"

import { NextStudio } from "next-sanity/studio"
import config from "@/sanity.config"
import { hasSanityConfig } from "@/sanity/env"

export default function StudioPage() {
  if (!hasSanityConfig()) {
    return (
      <div className="mx-auto max-w-2xl space-y-4 py-20">
        <h1 className="text-3xl font-semibold">Sanity 尚未配置</h1>
        <p className="text-muted-foreground">
          请先配置 `NEXT_PUBLIC_SANITY_PROJECT_ID`、`NEXT_PUBLIC_SANITY_DATASET`、
          `NEXT_PUBLIC_SANITY_API_VERSION`、`SANITY_API_READ_TOKEN` 和 `SANITY_REVALIDATE_SECRET`。
        </p>
      </div>
    )
  }

  return <NextStudio config={config} />
}
