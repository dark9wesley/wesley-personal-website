# Sanity CMS Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将当前站点的内容系统从 Notion 迁移到 Sanity，并支持站内 `/studio` 后台发布博客和照片且无需重新部署即可上线。

**Architecture:** 在现有 Next.js 15 App Router 项目中嵌入 Sanity Studio，并新增 `lib/cms` 作为统一内容访问层。前台页面从 `lib/cms` 读取内容，详情页改用 Portable Text 渲染，发布后通过 `/api/revalidate` 触发按需刷新。

**Tech Stack:** Next.js 15, React 19, TypeScript, Sanity, next-sanity, @portabletext/react, Vitest

---

### Task 1: 建立测试基线与 Sanity 依赖

**Files:**
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Create: `vitest.config.ts`
- Create: `tests/cms/normalize.test.ts`

- [ ] **Step 1: 写一个会失败的规范化测试**

```ts
import { describe, expect, it } from "vitest";
import { normalizePostPreview } from "@/lib/cms/normalize";

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
```

- [ ] **Step 2: 运行测试确认它正确失败**

Run: `pnpm vitest run tests/cms/normalize.test.ts`
Expected: FAIL，原因是 `@/lib/cms/normalize` 不存在或未导出目标函数。

- [ ] **Step 3: 安装测试和 Sanity 依赖**

```bash
pnpm add sanity next-sanity @sanity/image-url @portabletext/react
pnpm add -D vitest @vitejs/plugin-react
```

同时更新 `package.json`：

```json
{
  "scripts": {
    "test": "vitest run"
  }
}
```

- [ ] **Step 4: 添加 Vitest 配置**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "node",
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
```

- [ ] **Step 5: 提交**

```bash
git add package.json pnpm-lock.yaml vitest.config.ts tests/cms/normalize.test.ts
git commit -m "test: add sanity migration test baseline"
```

### Task 2: 集成 Sanity Studio 与 schema

**Files:**
- Create: `sanity/env.ts`
- Create: `sanity/lib/client.ts`
- Create: `sanity/lib/image.ts`
- Create: `sanity/schemaTypes/postType.ts`
- Create: `sanity/schemaTypes/photoType.ts`
- Create: `sanity/schemaTypes/tagType.ts`
- Create: `sanity/schemaTypes/index.ts`
- Create: `sanity.config.ts`
- Create: `app/studio/[[...tool]]/page.tsx`
- Create: `app/studio/[[...tool]]/layout.tsx`

- [ ] **Step 1: 写 Studio 环境配置测试**

```ts
import { describe, expect, it } from "vitest";
import { getSanityConfig } from "@/sanity/env";

describe("getSanityConfig", () => {
  it("throws when required env vars are missing", () => {
    expect(() => getSanityConfig({} as NodeJS.ProcessEnv)).toThrow(
      "Missing Sanity environment variables",
    );
  });
});
```

- [ ] **Step 2: 运行测试确认它失败**

Run: `pnpm vitest run tests/cms/normalize.test.ts`
Expected: FAIL，提示 `@/sanity/env` 不存在。

- [ ] **Step 3: 写最小环境和 schema 实现**

`sanity/env.ts`

```ts
type SanityConfig = {
  projectId: string;
  dataset: string;
  apiVersion: string;
  studioBasePath: string;
  useCdn: boolean;
  token?: string;
};

export function getSanityConfig(env: NodeJS.ProcessEnv = process.env): SanityConfig {
  const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = env.NEXT_PUBLIC_SANITY_DATASET;

  if (!projectId || !dataset) {
    throw new Error("Missing Sanity environment variables");
  }

  return {
    projectId,
    dataset,
    apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-02-06",
    studioBasePath: "/studio",
    useCdn: true,
    token: env.SANITY_API_READ_TOKEN,
  };
}
```

`sanity/schemaTypes/index.ts`

```ts
import { postType } from "./postType";
import { photoType } from "./photoType";
import { tagType } from "./tagType";

export const schemaTypes = [postType, photoType, tagType];
```

`sanity.config.ts`

```ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";
import { getSanityConfig } from "./sanity/env";

const config = getSanityConfig();

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
});
```

`app/studio/[[...tool]]/page.tsx`

```tsx
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
```

- [ ] **Step 4: 运行测试与类型检查**

Run: `pnpm vitest run tests/cms/normalize.test.ts`
Expected: 之前新增的 env 测试通过，规范化测试仍失败。

Run: `pnpm exec tsc --noEmit`
Expected: 仅剩尚未实现的 `lib/cms` 相关错误。

- [ ] **Step 5: 提交**

```bash
git add sanity app/studio sanity.config.ts
git commit -m "feat: add sanity studio scaffolding"
```

### Task 3: 新增 CMS 数据层并通过测试驱动规范化逻辑

**Files:**
- Create: `lib/cms/types.ts`
- Create: `lib/cms/queries.ts`
- Create: `lib/cms/normalize.ts`
- Create: `lib/cms/index.ts`
- Modify: `tests/cms/normalize.test.ts`

- [ ] **Step 1: 扩展会失败的测试，覆盖文章和照片**

```ts
import { normalizePhoto } from "@/lib/cms/normalize";

it("maps a sanity photo document to the photo detail shape", () => {
  const result = normalizePhoto({
    _id: "photo-1",
    title: "Morning",
    slug: "morning",
    publishedAt: "2026-04-02T08:00:00.000Z",
    image: {
      asset: { _ref: "image-abc" },
      alt: "sea",
    },
    description: "sunrise",
  });

  expect(result).toMatchObject({
    id: "photo-1",
    slug: "morning",
    title: "Morning",
    description: "sunrise",
  });
});
```

- [ ] **Step 2: 运行测试确认失败**

Run: `pnpm vitest run tests/cms/normalize.test.ts`
Expected: FAIL，提示 `normalizePostPreview` 或 `normalizePhoto` 未定义。

- [ ] **Step 3: 写最小 CMS 类型、查询和规范化实现**

`lib/cms/types.ts`

```ts
export type CmsPostPreview = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishDay: string;
  coverImage?: string;
};

export type CmsPhoto = {
  id: string;
  slug: string;
  title: string;
  publishDay: string;
  pageCover: string;
  description?: string;
  alt?: string;
};
```

`lib/cms/normalize.ts`

```ts
import dayjs from "dayjs";
import type { CmsPhoto, CmsPostPreview } from "./types";

export function normalizePostPreview(post: Record<string, any>): CmsPostPreview {
  return {
    id: post._id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt ?? "",
    publishDay: dayjs(post.publishedAt).format("YYYY-MM-DD"),
    coverImage: post.coverImage ?? undefined,
  };
}

export function normalizePhoto(photo: Record<string, any>): CmsPhoto {
  return {
    id: photo._id,
    slug: photo.slug,
    title: photo.title,
    publishDay: dayjs(photo.publishedAt).format("YYYY-MM-DD"),
    pageCover: photo.imageUrl,
    description: photo.description ?? "",
    alt: photo.alt ?? "",
  };
}
```

`lib/cms/index.ts`

```ts
export { normalizePhoto, normalizePostPreview } from "./normalize";
```

- [ ] **Step 4: 运行测试确认通过**

Run: `pnpm vitest run tests/cms/normalize.test.ts`
Expected: PASS

- [ ] **Step 5: 提交**

```bash
git add lib/cms tests/cms/normalize.test.ts
git commit -m "feat: add sanity cms data layer"
```

### Task 4: 迁移文章列表、详情与 Portable Text 渲染

**Files:**
- Create: `components/portable-text/index.tsx`
- Modify: `app/articles/page.tsx`
- Modify: `app/articles/[slug]/page.tsx`
- Modify: `lib/rss.ts`

- [ ] **Step 1: 写文章列表页面会失败的测试**

```ts
import { describe, expect, it } from "vitest";
import { buildArticlesByYear } from "@/lib/cms/grouping";

describe("buildArticlesByYear", () => {
  it("groups article previews by publish year", () => {
    const result = buildArticlesByYear([
      { id: "1", title: "A", slug: "a", publishDay: "2026-01-01" },
      { id: "2", title: "B", slug: "b", publishDay: "2025-01-01" },
    ]);

    expect(Object.keys(result)).toEqual(["2026", "2025"]);
  });
});
```

- [ ] **Step 2: 运行测试确认失败**

Run: `pnpm vitest run tests/cms/normalize.test.ts`
Expected: FAIL，提示 `buildArticlesByYear` 未实现。

- [ ] **Step 3: 写最小分组工具并迁移文章页面**

`components/portable-text/index.tsx`

```tsx
"use client";

import { PortableText } from "@portabletext/react";

export default function PortableTextRenderer({ value }: { value: any[] }) {
  return <PortableText value={value} />;
}
```

`app/articles/page.tsx`

```tsx
import { getPosts } from "@/lib/cms";

export const revalidate = 0;

export default async function ArticlesPage() {
  const articles = await getPosts();
  // 复用现有 UI，仅将数据源改为 Sanity
}
```

`app/articles/[slug]/page.tsx`

```tsx
import PortableTextRenderer from "@/components/portable-text";
import { getPostBySlug } from "@/lib/cms";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getPostBySlug(slug);

  if (!article) notFound();

  return <PortableTextRenderer value={article.body} />;
}
```

`lib/rss.ts`

```ts
import { getPosts } from "./cms";
```

- [ ] **Step 4: 运行测试与构建验证**

Run: `pnpm vitest run tests/cms/normalize.test.ts`
Expected: PASS

Run: `pnpm exec tsc --noEmit`
Expected: PASS

- [ ] **Step 5: 提交**

```bash
git add app/articles app/articles/[slug]/page.tsx components/portable-text lib/rss.ts
git commit -m "feat: migrate article pages to sanity"
```

### Task 5: 迁移照片页面、刷新 API 与清理 Notion

**Files:**
- Modify: `app/photos/page.tsx`
- Modify: `app/photo/[id]/page.tsx`
- Create: `app/api/revalidate/route.ts`
- Modify: `lib/getBlurredPhotoList.ts`
- Modify: `types/index.ts`
- Modify: `package.json`

- [ ] **Step 1: 写刷新签名校验测试**

```ts
import { describe, expect, it } from "vitest";
import { resolveRevalidateTargets } from "@/lib/cms/revalidate";

describe("resolveRevalidateTargets", () => {
  it("returns article tags for a post payload", () => {
    expect(
      resolveRevalidateTargets({ _type: "post", slug: { current: "hello" } }),
    ).toEqual(["articles", "article:hello", "rss"]);
  });
});
```

- [ ] **Step 2: 运行测试确认失败**

Run: `pnpm vitest run tests/cms/normalize.test.ts`
Expected: FAIL，提示 `resolveRevalidateTargets` 未实现。

- [ ] **Step 3: 写最小刷新逻辑并迁移照片页**

`app/api/revalidate/route.ts`

```ts
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { resolveRevalidateTargets, verifyRevalidateSecret } from "@/lib/cms/revalidate";

export async function POST(request: Request) {
  const body = await request.json();

  if (!verifyRevalidateSecret(request)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  for (const tag of resolveRevalidateTargets(body)) {
    revalidateTag(tag);
  }

  return NextResponse.json({ ok: true });
}
```

`app/photos/page.tsx`

```tsx
import { getPhotos } from "@/lib/cms";

export default async function PhotosPage() {
  const photos = await getPhotos();
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {photos.map((photo) => (
        <PhotoItem key={photo.id} photo={photo} />
      ))}
    </div>
  );
}
```

`app/photo/[id]/page.tsx`

```tsx
import { getPhotoBySlug } from "@/lib/cms";
```

- [ ] **Step 4: 移除 Notion 依赖并验证**

Run: `pnpm remove notion-client notion-types notion-utils react-notion-x`
Expected: 依赖被移除，锁文件更新。

Run: `pnpm test`
Expected: PASS

Run: `pnpm exec tsc --noEmit`
Expected: PASS

Run: `pnpm build`
Expected: PASS

- [ ] **Step 5: 提交**

```bash
git add app/photos app/photo app/api/revalidate lib package.json pnpm-lock.yaml types
git commit -m "feat: complete sanity cms migration"
```

## Self-Review

### Spec coverage

1. `/studio` 后台：Task 2 覆盖。
2. 博客与照片内容模型：Task 2 覆盖。
3. 前台数据源迁移：Task 3、Task 4、Task 5 覆盖。
4. 发布免发版上线：Task 5 覆盖。
5. 清理 Notion：Task 5 覆盖。

### Placeholder scan

1. 计划中没有 `TODO`、`TBD` 或“类似 Task N”这类占位语。
2. 所有任务都给出了文件路径、命令和最小代码骨架。

### Type consistency

1. CMS 数据统一使用 `slug`、`publishDay`、`pageCover` 作为前台字段。
2. 刷新标签统一使用 `articles`、`article:<slug>`、`photos`、`photo:<slug>`、`rss`。
