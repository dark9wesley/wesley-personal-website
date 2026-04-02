# Sanity CMS 迁移设计

## 背景

当前站点基于 Next.js 15 App Router 部署在 Vercel，博客与照片内容统一从 Notion 拉取。现状存在两个核心问题：

1. Notion 已经不可用，当前内容链路失效。
2. 现有内容管理方式不适合作为真正的后台系统，无法在网站内完成稳定的登录、发布、图片管理与快速上线。

本次重构目标不是替换编辑器，而是将站点内容系统升级为可长期维护的 CMS。

## 目标

1. 在当前站点内提供可登录的后台入口，路径暂定为 `/studio`。
2. 支持在后台创建、编辑、发布博客与照片内容。
3. 发布内容后无需重新部署 Vercel，即可在前台站点生效。
4. 完全移除对 Notion 作为在线内容源的依赖。
5. 保持现有前台 URL 结构与主要视觉表现尽量稳定。

## 非目标

1. 本阶段不做多作者、审批流、评论系统。
2. 本阶段不优先实现照片 EXIF 展示与复杂图库筛选。
3. 本阶段不迁移到 Markdown-first 架构。

## 方案结论

选择 Sanity 作为新的内容管理系统，并将 Sanity Studio 嵌入现有 Next.js 项目中。

选择原因：

1. 与 Next.js、Vercel 集成成熟，适合当前技术栈。
2. Studio 可作为站内路由提供后台体验，符合“登录网站后台发布内容”的目标。
3. 自带图片资产管理，适合博客封面与照片库场景。
4. 内容发布后可通过 webhook 与 Next.js 按需刷新实现“免发版上线”。
5. 相比 Contentful、Storyblok，更适合个人站点和轻量内容团队。

## 对比方案

### 方案 A：Sanity

优点：

1. Studio 可嵌入当前项目。
2. 结构化内容模型适合文章和照片两类内容。
3. 图片工作流成熟。
4. 与 Vercel 配合实现按需刷新简单。

缺点：

1. 需要将文章正文从 Notion block 渲染迁移为 Portable Text 渲染。

### 方案 B：Storyblok

优点：

1. 可视化编辑能力强。
2. 图片管理体验成熟。

缺点：

1. 更偏页面可视化编辑，不如 Sanity 适合当前博客和照片型内容模型。
2. 后台工作流与当前站内嵌诉求贴合度低于 Sanity。

### 方案 C：Contentful

优点：

1. 平台成熟。
2. 企业能力完整。

缺点：

1. 对当前个人站点场景偏重。
2. 接入与维护复杂度高于本项目实际需要。

## 内容编辑策略

博客正文采用 Sanity 默认的 Portable Text 编辑器，不采用 Markdown-first 方案。

原因：

1. 更适合图片、引用、代码块、链接等富内容结构。
2. 前台渲染扩展性更强。
3. 更符合“后台发布内容”的使用方式。

## 目标架构

### 后台

1. 在当前项目中集成 Sanity Studio。
2. Studio 挂载到 `/studio` 路由。
3. 后台访问依赖 Sanity 身份认证。

### 数据层

1. 新增 `lib/cms` 作为统一内容访问层。
2. 前台页面仅依赖 `lib/cms`，不再直接依赖 `lib/notion`。
3. `lib/cms` 暴露统一接口，例如：
   - `getPosts`
   - `getPostBySlug`
   - `getPhotos`
   - `getPhotoBySlug`
   - `getPublishedTags`

### 前台

1. 保留现有主要路由结构：
   - `/articles`
   - `/articles/[slug]`
   - `/photos`
   - `/photo/[slug]` 或 `/photos/[slug]`
2. 列表页、详情页、RSS 改为从 Sanity 取数。
3. 文章详情使用 Portable Text Renderer 渲染正文。

### 发布链路

1. 内容在 Sanity Studio 中保存与发布。
2. 发布时由 Sanity webhook 调用站内 `/api/revalidate`。
3. 该 API 根据文档类型和 slug 执行 Next.js 按需刷新。

## 数据模型

### post

字段：

1. `title`：标题，必填。
2. `slug`：文章路径，必填且唯一。
3. `excerpt`：摘要，用于列表与 SEO。
4. `publishedAt`：发布时间，必填。
5. `status`：`draft` / `published`。
6. `coverImage`：封面图，可选。
7. `tags`：关联标签，可选。
8. `body`：Portable Text 正文，必填。
9. `seoTitle`：可选。
10. `seoDescription`：可选。

规则：

1. 前台仅展示 `status == "published"` 的内容。
2. `slug` 延续现有文章 URL 模式，避免外链失效。

### photo

字段：

1. `title`：标题，必填。
2. `slug`：路径标识，必填且唯一。
3. `publishedAt`：发布时间，必填。
4. `status`：`draft` / `published`。
5. `image`：图片资源，必填。
6. `alt`：替代文本，建议必填。
7. `description`：说明，可选。
8. `location`：地点，可选。
9. `shootingDate`：拍摄时间，可选。
10. `tags`：关联标签，可选。

规则：

1. 照片从 Notion `id` 路由迁移为 `slug` 路由。
2. 新路由更可读，也彻底去除旧系统痕迹。

### tag

字段：

1. `title`
2. `slug`

## 缓存与刷新策略

### 原则

不依赖全量重新部署，而依赖数据缓存和按需刷新实现实时发布。

### 实现要点

1. 列表页和详情页不再依赖 `generateStaticParams` 预生成全部内容路径。
2. 改为请求时读取 Sanity 内容，并配合 Next.js 缓存。
3. 使用按标签失效策略，建议标签如下：
   - `articles`
   - `article:<slug>`
   - `photos`
   - `photo:<slug>`
   - `rss`

### 刷新规则

1. 发布文章时刷新：
   - `articles`
   - `article:<slug>`
   - `rss`
2. 发布照片时刷新：
   - `photos`
   - `photo:<slug>`

## 现有代码影响范围

### 将被替换或下线

1. `/lib/notion/*`
2. [components/notion-renderer/index.tsx](/Users/pengyw/projects/self/wesley-personal-website/components/notion-renderer/index.tsx)
3. [lib/utils/post.ts](/Users/pengyw/projects/self/wesley-personal-website/lib/utils/post.ts) 中依赖 Notion blockMap 的正文处理逻辑

### 将被改造

1. [app/articles/page.tsx](/Users/pengyw/projects/self/wesley-personal-website/app/articles/page.tsx)
2. [app/articles/[slug]/page.tsx](/Users/pengyw/projects/self/wesley-personal-website/app/articles/[slug]/page.tsx)
3. [app/photos/page.tsx](/Users/pengyw/projects/self/wesley-personal-website/app/photos/page.tsx)
4. [app/photo/[id]/page.tsx](/Users/pengyw/projects/self/wesley-personal-website/app/photo/[id]/page.tsx)
5. [lib/rss.ts](/Users/pengyw/projects/self/wesley-personal-website/lib/rss.ts)
6. [lib/getBlurredPhotoList.ts](/Users/pengyw/projects/self/wesley-personal-website/lib/getBlurredPhotoList.ts)

### 可保留

1. 现有页面布局与动画组件。
2. 文章列表与照片墙的大部分 UI 结构。
3. 基于 `plaiceholder` 的模糊占位图逻辑，但数据源改为 Sanity 图片 URL。

## 迁移顺序

### 第一阶段：基础设施

1. 安装并初始化 Sanity。
2. 在项目内集成 `/studio` 路由。
3. 配置项目 ID、dataset、token、webhook secret。

### 第二阶段：内容模型

1. 定义 `post`、`photo`、`tag` schema。
2. 完成后台表单配置和基础校验。

### 第三阶段：数据访问层

1. 新建 `lib/cms`。
2. 实现 Sanity client、查询语句与类型。
3. 为前台提供统一查询接口。

### 第四阶段：前台页面迁移

1. 文章列表页改接 Sanity。
2. 文章详情页改用 Portable Text。
3. 照片列表与详情页改接 Sanity。
4. RSS 改接 Sanity。

### 第五阶段：发布与刷新

1. 新增 `/api/revalidate`。
2. 配置 Sanity webhook。
3. 验证发布后列表页、详情页、RSS 的刷新行为。

### 第六阶段：清理

1. 删除 Notion 相关依赖与环境变量。
2. 删除废弃工具函数和渲染组件。
3. 清理无用类型与数据转换代码。

## 路由决策

文章保留 `/articles/[slug]`。

照片建议改为 `/photo/[slug]`，以减少改动范围。后续如果需要统一语义，可再迁移到 `/photos/[slug]`，但不作为本次重构必做项。

## 安全与权限

1. 写入权限 token 仅服务端使用，不暴露到浏览器。
2. webhook API 使用独立 secret 校验。
3. 前台只使用只读能力。

## 验收标准

1. 访问 `/studio` 可登录并管理文章与照片。
2. 新建并发布文章后，`/articles` 与对应详情页无需重新部署即可访问。
3. 新建并发布照片后，`/photos` 与对应详情页无需重新部署即可访问。
4. RSS 输出正确反映已发布文章。
5. 项目中不再依赖 Notion 作为在线内容源。

## 风险与应对

### 风险 1：正文渲染差异

Notion block 渲染与 Portable Text 渲染存在差异，旧文章样式可能无法完全一致。

应对：

1. 优先保证结构与可读性一致。
2. 在 Portable Text 组件中补齐标题、代码块、引用、图片等常用样式。

### 风险 2：旧内容迁移成本

Notion 已不可用时，历史内容导出可能受限。

应对：

1. 新系统先支撑未来发布。
2. 历史内容按可恢复程度逐步回填。

### 风险 3：照片 URL 变化

从 Notion 图像迁移到 Sanity 后，旧图片 URL 将变化。

应对：

1. 前台仅消费 CMS 返回的数据，不依赖旧图链规则。
2. 重新生成模糊图占位数据。

## 实施建议

本次实施采用“最终切到 Sanity，但中间通过统一数据层平滑迁移”的方式进行。也就是说，项目最终只保留 Sanity 作为 CMS，但代码改造时先建立 `lib/cms`，再逐步替换页面和 RSS，避免一次性大面积改动导致站点不可控。
