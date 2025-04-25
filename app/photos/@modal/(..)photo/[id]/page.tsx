import { getPhotoById } from "@/app/photo/[id]/page";
import ImageModal from "./ImageModal";

export default async function PhotoModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const photo = await getPhotoById(id);

  if (!photo) {
    return null;
  }

  return (
    <ImageModal photo={photo} />
  );
}
