const DEFAULT_API_VERSION = "2025-02-06"

type SanityPublicEnv = {
  NEXT_PUBLIC_SANITY_PROJECT_ID?: string
  NEXT_PUBLIC_SANITY_DATASET?: string
  NEXT_PUBLIC_SANITY_API_VERSION?: string
  SANITY_API_READ_TOKEN?: string
  SANITY_REVALIDATE_SECRET?: string
}

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

export function hasSanityPublicConfig(env?: SanityPublicEnv) {
  const publicEnv = env ?? {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  }

  return Boolean(publicEnv.NEXT_PUBLIC_SANITY_PROJECT_ID && publicEnv.NEXT_PUBLIC_SANITY_DATASET)
}

export function createStudioConfig(env?: SanityPublicEnv): SanityEnvConfig {
  const studioEnv = env ?? {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN,
    SANITY_REVALIDATE_SECRET: process.env.SANITY_REVALIDATE_SECRET,
  }

  if (!hasSanityPublicConfig(studioEnv)) {
    throw new Error("Missing Sanity public environment variables")
  }

  return {
    projectId: studioEnv.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
    dataset: studioEnv.NEXT_PUBLIC_SANITY_DATASET as string,
    apiVersion: studioEnv.NEXT_PUBLIC_SANITY_API_VERSION ?? DEFAULT_API_VERSION,
    studioBasePath: "/studio",
    useCdn: false,
    readToken: studioEnv.SANITY_API_READ_TOKEN,
    revalidateSecret: studioEnv.SANITY_REVALIDATE_SECRET,
  }
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
