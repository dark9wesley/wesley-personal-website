import { getNotionPageData } from "@/lib/notion"
import Link from "next/link";

export default async function PhotosPage() {
  const pageData = await getNotionPageData();
  const photos = pageData?.allPages?.filter((item) => item.type === 'Photo' && item.status === 'Published') || [];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="section-title">拾光集</h1>
        <p className="section-subtitle italic">「快门声里的晨昏」</p>
      </div>

      {photos.map((photo) => (
        <Link
          key={photo.id}
          href={`photos/${photo.id}`}
          shallow
          className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
        >
          <img
            alt={photo.title}
            className="transform rounded-lg transition will-change-auto"
            style={{ transform: "translate3d(0, 0, 0)" }}
            src={photo.pageCoverThumbnail}
            width={720}
            height={480}
            sizes="(max-width: 640px) 100vw,
              (max-width: 1280px) 50vw,
              (max-width: 1536px) 33vw,
              25vw"
          />
        </Link>
      ))}
    </div>
  )
}
