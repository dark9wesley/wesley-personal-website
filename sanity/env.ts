const DEFAULT_API_VERSION = "2025-02-06"

export interface SanityEnvConfig {
  projectId: string
  dataset: string
  apiVersion: string
  studioBasePath: string
  useCdn: boolean
  readToken?: string
  revalidateSecret?: string
}

export function hasSanityConfig(env: NodeJS.ProcessEnv = process.env) {
  return Boolean(env.NEXT_PUBLIC_SANITY_PROJECT_ID && env.NEXT_PUBLIC_SANITY_DATASET)
}

export function getSanityConfig(env: NodeJS.ProcessEnv = process.env): SanityEnvConfig {
  if (!hasSanityConfig(env)) {
    throw new Error("Missing Sanity environment variables")
  }

  return {
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET as string,
    apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION ?? DEFAULT_API_VERSION,
    studioBasePath: "/studio",
    useCdn: env.NODE_ENV === "production",
    readToken: env.SANITY_API_READ_TOKEN,
    revalidateSecret: env.SANITY_REVALIDATE_SECRET,
  }
}
