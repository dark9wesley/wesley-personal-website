import { CollectionViewMap } from "notion-types";

export default function getAllPageIds (collectionQuery: any, collectionId: string, collectionView?: CollectionViewMap, viewIds?: string[]) {
  if (!collectionQuery && !collectionView) {
    return []
  }
  // 优先按照第一个视图排序
  let pageIds = []
  try {
    if (viewIds && viewIds.length > 0) {
      const ids = collectionQuery[collectionId][viewIds[0]]?.collection_group_results?.blockIds
      for (const id of ids) {
        pageIds.push(id)
      }
    }
  } catch (error) {
    console.error('Error fetching page IDs:', error);
    return [];
  }

  // 否则按照数据库原始排序
  if (pageIds.length === 0 && collectionQuery && Object.values(collectionQuery).length > 0) {
    const pageSet = new Set()
    Object.values(collectionQuery[collectionId]).forEach((view: any) => {
      view?.blockIds?.forEach((id: string) => pageSet.add(id)) // group视图
      view?.collection_group_results?.blockIds?.forEach((id: string) => pageSet.add(id)) // table视图
    })
    pageIds = [...pageSet]
  }
  return pageIds
}
