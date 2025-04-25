// lib/getBlurredPhotoList.ts
// 确保在 Node.js runtime 下执行（app router 默认即可，或者显示指定：export const runtime = 'nodejs'）
import { getPlaiceholder } from 'plaiceholder'
import { Buffer } from 'buffer'
import { Photo } from '@/types'

export async function getBlurredPhotoList(photos: Photo[]): Promise<Photo[]> {
  return await Promise.all(
    photos.map(async (photo) => {
      try {
        // 1. 拉取远程图片
        const res = await fetch(photo.pageCover)
        if (!res.ok) {
          throw new Error(`Fetch failed with status ${res.status}`)
        }
        // 2. 转 ArrayBuffer -> Buffer
        const arrayBuffer = await res.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        // 3. 生成低质量占位图
        const { base64 } = await getPlaiceholder(buffer)
        return {
          ...photo,
          blurDataURL: base64,
        }
      } catch (err) {
        console.warn(`Failed to generate blurDataURL for photo ${photo.id}:`, err)
        return {
          ...photo,
          blurDataURL: '',
        }
      }
    })
  )
}
