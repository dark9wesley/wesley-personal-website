import { describe, expect, it } from "vitest";
import { normalizePhoto, normalizePostPreview } from "@/lib/cms/normalize";
import { getSanityConfig } from "@/sanity/env";

describe("normalizePostPreview", () => {
  it("maps a sanity post document to the article list shape", () => {
    const result = normalizePostPreview({
      _id: "post-1",
      title: "Hello",
      slug: "hello",
      excerpt: "summary",
      publishedAt: "2026-04-02T08:00:00.000Z",
      coverImage: null,
      tags: [],
    });

    expect(result).toMatchObject({
      id: "post-1",
      title: "Hello",
      slug: "hello",
      excerpt: "summary",
      publishDay: "2026-04-02",
    });
  });
});

describe("normalizePhoto", () => {
  it("maps a sanity photo document to the photo detail shape", () => {
    const result = normalizePhoto({
      _id: "photo-1",
      title: "Morning",
      slug: "morning",
      publishedAt: "2026-04-02T08:00:00.000Z",
      imageUrl: "https://cdn.sanity.io/images/demo/photo.jpg",
      alt: "sea",
      description: "sunrise",
    });

    expect(result).toMatchObject({
      id: "photo-1",
      slug: "morning",
      title: "Morning",
      description: "sunrise",
      pageCover: "https://cdn.sanity.io/images/demo/photo.jpg",
      publishDay: "2026-04-02",
    });
  });
});

describe("getSanityConfig", () => {
  it("throws when required env vars are missing", () => {
    expect(() => getSanityConfig({} as NodeJS.ProcessEnv)).toThrow(
      "Missing Sanity environment variables",
    );
  });
});
