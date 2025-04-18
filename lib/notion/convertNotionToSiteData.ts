import { CollectionPropertySchemaMap, RecordMap } from "notion-types";
import { idToUuid } from "notion-utils";
import getAllPageIds from "./getAllPageIds";
import { fetchInBatches } from "./getPostBlocks";
import BLOG from '@/blog.config'
import getPageProperties, { adjustPageProperties } from "./getPageProperties";
import { getAllCategories, getCategoryOptions } from "./getAllCategories";
import { getAllTags } from "./getAllTags";

const pageId = BLOG.NOTION_BLOG_PAGE_ID;

/**
 * 获取标签选项
 * @param schema
 * @returns {undefined}
 */
function getTagOptions(schema: CollectionPropertySchemaMap) {
  if (!schema) return []
  const tagSchema = Object.values(schema).find(
    e => e.name === BLOG.NOTION_PROPERTY_NAME.tags
  )
  return tagSchema?.options || []
}

/**
 * 空的默认数据
 */
const EmptyData = (pageId: string) => {
  const empty = {
    notice: null,
    allPages: [
      {
        id: 1,
        title: `无法获取Notion数据，请检查Notion_ID： \n 当前 ${pageId}`,
        summary: 'null',
        status: 'Published',
        type: 'Post',
        slug: 'oops',
        publishDay: '2024-11-13',
        pageCoverThumbnail: '',
        date: {
          start_date: '',
          lastEditedDay: '',
          tagItems: []
        }
      }
    ],
    allNavPages: [],
    collection: [],
    collectionQuery: {},
    collectionId: null,
    collectionView: {},
    viewIds: [],
    block: {},
    schema: {},
    tagOptions: [],
    categoryOptions: [],
    rawMetadata: {},
    customNav: [],
    customMenu: [],
    postCount: 1,
    pageIds: [],
    latestPosts: []
  }
  return empty
}

/**
 * 获取最新文章 根据最后修改时间倒序排列
 * @param {*}} param0
 * @returns
 */
function getLatestPosts({ allPages, latestPostCount }: { allPages: Record<string, any>[], latestPostCount: number }) {
  const allPosts = allPages?.filter(
    page => page.type === 'Post' && page.status === 'Published'
  )

  const latestPosts = Object.create(allPosts).sort((a: Record<string, any>, b: Record<string, any>) => {
    const dateA = new Date(a?.lastEditedDate || a?.publishDate)
    const dateB = new Date(b?.lastEditedDate || b?.publishDate)
    return dateB.getTime() - dateA.getTime()
  })
  return latestPosts.slice(0, latestPostCount)
}


export async function convertNotionToSiteData(recordMap: RecordMap) {
  if (!recordMap) {
    console.error('can`t get Notion Data ; Which id is: ', pageId)
    return {}
  }

  const id = idToUuid(pageId)
  let block = recordMap.block || {}
  const rawMetadata = block[id]?.value

  if (
    rawMetadata?.type !== 'collection_view_page' &&
    rawMetadata?.type !== 'collection_view'
  ) {
    console.error(`pageId "${pageId}" is not a database`)
    return EmptyData(id)
  }

  const collection = Object.values(recordMap.collection || {})[0]?.value || {}
  const collectionId = rawMetadata?.collection_id ?? ''
  // @ts-expect-error
  const collectionQuery = recordMap.collection_query
  const collectionView = recordMap.collection_view
  const schema = collection?.schema

  const viewIds = rawMetadata?.view_ids
  const collectionData = []

  const pageIds = getAllPageIds(
    collectionQuery,
    collectionId,
    collectionView,
    viewIds
  )

  if (pageIds?.length === 0) {
    console.error(
      '获取到的文章列表为空，请检查notion模板',
      collectionQuery,
      collection,
      collectionView,
      viewIds,
      recordMap
    )
  } 

  const blockIdsNeedFetch = []
  for (let i = 0; i < pageIds.length; i++) {
    const id = pageIds[i]
    const value = block[id]?.value
    if (!value) {
      blockIdsNeedFetch.push(id)
    }
  }
  const fetchedBlocks = await fetchInBatches(blockIdsNeedFetch)
  block = Object.assign({}, block, fetchedBlocks)

  // 获取每篇文章基础数据
  for (let i = 0; i < pageIds.length; i++) {
    const id = pageIds[i]
    const value = block[id]?.value || fetchedBlocks[id]?.value
    const properties =
      (await getPageProperties(
        id,
        value,
        schema,
        null,
        getTagOptions(schema)
      )) || null

    if (properties) {
      collectionData.push(properties)
    }
  }

  // TODO 站点配置优读取配置表格，否则读取blog.config.js 文件
  const NOTION_CONFIG = {}

  // 处理每一条数据的字段
  collectionData.forEach(function (element) {
    adjustPageProperties(element, NOTION_CONFIG)
  })

  // TODO 站点基础信息
  const siteInfo = {}

  // 文章计数
  let postCount = 0

  // 查找所有的Post和Page
  const allPages = collectionData.filter(post => {
    if (post?.type === 'Post' && post.status === 'Published') {
      postCount++
    }

    return (
      post &&
      post?.slug &&
      //   !post?.slug?.startsWith('http') &&
      (post?.status === 'Invisible' || post?.status === 'Published')
    )
  })

  allPages.sort((a, b) => {
    return b?.publishDate - a?.publishDate
  })

   // TODO Notice
  const notice = null

  const categoryOptions = getAllCategories({
    allPages,
    categoryOptions: getCategoryOptions(schema)
  })

  // 所有标签
  const tagOptions =
    getAllTags({
      allPages,
      tagOptions: getTagOptions(schema),
    }) || null

  // 旧的菜单
  const customNav: Record<string, any>[] = []
  // 新的菜单
  const customMenu: Record<string, any>[] = []
  const allNavPages: Record<string, any>[] = []
  const latestPosts: Record<string, any>[] = getLatestPosts({ allPages, latestPostCount: 6 })

  return {
    NOTION_CONFIG,
    notice,
    siteInfo,
    allPages,
    allNavPages,
    collection,
    collectionQuery,
    collectionId,
    collectionView,
    viewIds,
    block,
    schema,
    tagOptions,
    categoryOptions,
    rawMetadata,
    customNav,
    customMenu,
    postCount,
    pageIds,
    latestPosts
  }
}
