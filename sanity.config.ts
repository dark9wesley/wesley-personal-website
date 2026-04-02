import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { getSanityConfig, hasSanityConfig } from "./sanity/env"
import { schemaTypes } from "./sanity/schemaTypes"

const config = hasSanityConfig()
  ? getSanityConfig()
  : {
      projectId: "missing-project-id",
      dataset: "production",
      apiVersion: "2025-02-06",
      studioBasePath: "/studio",
      useCdn: false,
    }

export default defineConfig({
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
