import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { createStudioConfig } from "./sanity/env"
import { schemaTypes } from "./sanity/schemaTypes"

export function createSanityStudioConfig(env?: {
  NEXT_PUBLIC_SANITY_PROJECT_ID?: string
  NEXT_PUBLIC_SANITY_DATASET?: string
  NEXT_PUBLIC_SANITY_API_VERSION?: string
  SANITY_API_READ_TOKEN?: string
  SANITY_REVALIDATE_SECRET?: string
}) {
  const config = createStudioConfig(env)

  return defineConfig({
    name: "default",
    title: "Wesley Personal Website",
    projectId: config.projectId,
    dataset: config.dataset,
    basePath: config.studioBasePath,
    plugins: [structureTool()],
    schema: {
      types: schemaTypes,
    },
  })
}

export default createSanityStudioConfig()
