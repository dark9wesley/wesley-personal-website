import { getPhotoById } from "@/app/photo/[id]/page";
import ImageModal from "./ImageModal";
import { getBlurredPhotoList } from "@/lib/getBlurredPhotoList";

export default async function PhotoModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rowPhoto = await getPhotoById(id);

  if (!rowPhoto) {
    return null;
  }

  const photo = await getBlurredPhotoList([rowPhoto])

  return (
    <ImageModal photo={photo[0]} />
  );
}
