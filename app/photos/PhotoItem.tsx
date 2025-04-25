'use client'

import { Photo } from "@/types"
import { usePhotoStore } from "@/hooks/use-photoStore"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function PhotoItem({ photo }: { photo: Photo }) {
  const router = useRouter()
  const { setSelectedPhoto } = usePhotoStore()

  const handleClick = () => {
    setSelectedPhoto(photo)
    router.push(`/photo/${photo.id}`, { scroll: false })
  }

  return (
    <div
      className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:shadow-highlight"
      onClick={handleClick}
    >
      <div className="relative w-full pb-[100%] flex items-center justify-center">
        <div className="absolute top-0 left-0 w-full h-full">
          <Image
            alt={photo.title}
            className="transform transition will-change-auto object-cover"
            style={{ transform: "translate3d(0, 0, 0)" }}
            src={photo.pageCover}
            placeholder="blur"
            blurDataURL={photo.blurDataURL}
            fill
          />
        </div>
      </div>
    </div>
  )
}
