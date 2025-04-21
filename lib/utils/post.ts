import { getPageTableOfContents } from "notion-utils"
import { getPage } from "../notion/getPostBlocks"
import { ExtendedRecordMap } from "notion-types"
import { appendText, fnGetCpmisWords } from "./string"

/**
 * 处理文章数据
 * @param props
 * @param from
 */
export async function processPostData(post: Record<string, any>) {
  // 文章内容加载
  if (!post?.blockMap) {
    post.blockMap = await getPage(post.id)
  }

  if (post?.blockMap?.block) {
    // 目录默认加载
    post.content = Object.keys(post.blockMap.block).filter(
      key => post.blockMap.block[key]?.value?.parent_id === post.id
    )
    // post.toc = getPageTableOfContents(post, post.blockMap)
    const pageContentText = getPageContentText(post, post.blockMap)
    const { wordCount, readTime } = countWords(pageContentText)
    post.wordCount = wordCount
    post.readTime = readTime
    // await getPageAISummary(props, pageContentText)
  }
}

export function getPageContentText(post: Record<string, any>, pageBlockMap: ExtendedRecordMap) {
  let indexContent: string[] = []
  // 防止搜到加密文章的内容
  if (pageBlockMap && pageBlockMap.block && !post.password) {
    const contentIds = Object.keys(pageBlockMap.block)
    contentIds.forEach(id => {
      const properties = pageBlockMap?.block[id]?.value?.properties
      indexContent = appendText(indexContent, properties, 'title')
      indexContent = appendText(indexContent, properties, 'caption')
    })
  }
  return indexContent.join('')
}

/**
 * 更新字数统计和阅读时间
 */
export function countWords(pageContentText: string) {
  const wordCount = fnGetCpmisWords(pageContentText)
  // 阅读速度 300-500每分钟
  const readTime = Math.floor(wordCount / 400) + 1
  return { wordCount, readTime }
}
