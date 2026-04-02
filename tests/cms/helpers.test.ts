import { describe, expect, it } from "vitest"
import { buildArticlesByYear } from "@/lib/cms/grouping"
import { resolveRevalidateTags } from "@/lib/cms/revalidate"

describe("buildArticlesByYear", () => {
  it("groups article previews by publish year in descending order", () => {
    const grouped = buildArticlesByYear([
      {
        id: "1",
        title: "A",
        slug: "a",
        excerpt: "",
        publishDay: "2026-01-02",
      },
      {
        id: "2",
        title: "B",
        slug: "b",
        excerpt: "",
        publishDay: "2025-01-02",
      },
      {
        id: "3",
        title: "C",
        slug: "c",
        excerpt: "",
        publishDay: "2026-02-02",
      },
    ])

    expect(Object.keys(grouped).sort()).toEqual(["2025", "2026"])
    expect(grouped["2026"]).toHaveLength(2)
  })
})

describe("resolveRevalidateTags", () => {
  it("returns article tags for a post payload", () => {
    expect(
      resolveRevalidateTags({
        _type: "post",
        slug: { current: "hello-world" },
      }),
    ).toEqual(["articles", "article:hello-world", "rss"])
  })

  it("returns photo tags for a photo payload", () => {
    expect(
      resolveRevalidateTags({
        _type: "photo",
        slug: { current: "morning" },
      }),
    ).toEqual(["photos", "photo:morning"])
  })
})
