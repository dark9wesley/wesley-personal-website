import createImageUrlBuilder from "@sanity/image-url"
import type { Image } from "sanity"
import { getSanityConfig, hasSanityConfig } from "../env"

export function urlForImage(source: Image) {
  if (!hasSanityConfig()) {
    throw new Error("Missing Sanity environment variables")
  }

  const config = getSanityConfig()
  const builder = createImageUrlBuilder({
    projectId: config.projectId,
    dataset: config.dataset,
  })

  return builder.image(source)
}
