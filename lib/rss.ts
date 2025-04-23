import { getNotionPageData } from "./notion";

// RSS生成函数
export async function generateRSS() {
  const pageData = await getNotionPageData();
  const articles = pageData?.allPages?.filter((item) => item.type === 'Post' && item.status === 'Published') || [];

  // 生成RSS XML
  const site_url = "https://wespeng.me"

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Wesley Peng</title>
  <link>${site_url}</link>
  <description>Wesley Peng的个人网站</description>
  <language>en</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${site_url}/rss.xml" rel="self" type="application/rss+xml"/>
  ${articles
    .map(
      (article) => `
  <item>
    <title><![CDATA[${article.title}]]></title>
    <link>${site_url}/articles/${article.slug}</link>
    <guid isPermaLink="true">${site_url}/articles/${article.slug}</guid>
    <pubDate>${new Date(article.publishDay).toUTCString()}</pubDate>
  </item>
  `,
    )
    .join("")}
</channel>
</rss>`

  return rssXml
}
