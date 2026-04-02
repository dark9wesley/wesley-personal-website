import { createClient } from "next-sanity"
import { getSanityConfig, hasSanityConfig } from "../env"

export function getSanityClient() {
  if (!hasSanityConfig()) {
    return null
  }

  const config = getSanityConfig()

  return createClient({
    projectId: config.projectId,
    dataset: config.dataset,
    apiVersion: config.apiVersion,
    useCdn: config.useCdn,
    token: config.readToken,
    perspective: "published",
  })
}
