import { getBlurredPhotoList } from "@/lib/getBlurredPhotoList";
import { getNotionPageData } from "@/lib/notion"
import { Photo } from "@/types";
import PhotoItem from "./PhotoItem"

export const revalidate = 1800;

export default async function PhotosPage() {
  const pageData = await getNotionPageData();
  const rawPhotos = pageData?.allPages?.filter((item) => item.type === 'Photo' && item.status === 'Published') || [];
  const photos = await getBlurredPhotoList(rawPhotos as Photo[]);

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {photos.map((photo) => (
        <PhotoItem key={photo.id} photo={photo} />
      ))}
    </div>
  )
}
