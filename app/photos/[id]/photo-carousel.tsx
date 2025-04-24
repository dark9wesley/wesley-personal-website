'use client'

import SharedModal from "./Modal";
import { Photo } from "./page";
import { useKeyPress } from "ahooks";
import { useRouter } from "next/navigation";

export default function PhotoCarousel({
  photo
}: {
  photo: Photo;
}) {
  const router = useRouter();

  function closeModal() {
    router.back()
  }

  useKeyPress(['esc'], () => {
     closeModal();
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <button
        className="absolute inset-0 z-30 cursor-default backdrop-blur-md"
        onClick={closeModal}
      >
      </button>
      <SharedModal
        index={Number(photo.id)}
        currentPhoto={photo}
        closeModal={closeModal}
        navigation={false}
      />
    </div>
  );
}
