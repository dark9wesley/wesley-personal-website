import { getNotionPageData } from "@/lib/notion"
import Image from "next/image";
import Link from "next/link";

// 设置页面每半小时重新验证一次
export const revalidate = 1800 // 3600秒 = 1小时

export default async function PhotosPage() {
  const pageData = await getNotionPageData();
  const photos = pageData?.allPages?.filter((item) => item.type === 'Photo' && item.status === 'Published') || [];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="section-title">拾光集</h1>
        <p className="section-subtitle italic">「快门声里的晨昏」</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {photos.map((photo) => (
          <Link
            key={photo.id}
            href={`photos/${photo.id}`}
            shallow
            className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
          >
            <div className="relative w-full pb-[100%] flex items-center justify-center">
              <div className="absolute top-0 left-0 w-full h-full">
                <Image
                  alt={photo.title}
                  className="transform rounded-lg transition will-change-auto"
                  style={{ transform: "translate3d(0, 0, 0)" }}
                  src={photo.pageCoverThumbnail}
                  fill
                  objectFit="cover"
                />
              </div>
            </div>
          </Link>
      ))}
      </div>
    </div>
  )
}
