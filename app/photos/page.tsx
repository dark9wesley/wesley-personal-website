import { getBlurredPhotoList } from "@/lib/getBlurredPhotoList";
import { getPhotos } from "@/lib/cms"
import { Photo } from "@/types";
import PhotoItem from "./PhotoItem"

export default async function PhotosPage() {
  const rawPhotos = await getPhotos()
  const photos = await getBlurredPhotoList(rawPhotos as Photo[]);

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {photos.map((photo) => (
        <PhotoItem key={photo.id} photo={photo} />
      ))}
    </div>
  )
}
