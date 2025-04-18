import { convertNotionToSiteData } from "./convertNotionToSiteData";
import notionAPI from "./getNotionAPI";

export async function getNotionPageData() {
  const recordMap = await notionAPI.getPage(process.env.NOTION_BLOG_PAGE_ID ?? '');
  
  const pageData = await convertNotionToSiteData(recordMap);

  return pageData;
}
