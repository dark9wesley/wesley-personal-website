import { notFound } from "next/navigation"
import { getPhotoBySlug } from "@/lib/cms";
import Image from "next/image";
import FadeIn from "@/components/fade-in";
import { Photo } from "@/types";
import { getBlurredPhotoList } from "@/lib/getBlurredPhotoList";
import { X } from "lucide-react";
import Link from "next/link";

// 获取图片数据
async function getPhotoById(id: string): Promise<Photo | null> {
  const rowPhoto = await getPhotoBySlug(id)

  if (!rowPhoto) {
    return null;
  }

  const photo = await getBlurredPhotoList([rowPhoto])

  return photo[0];
}


export default async function PhotoPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await Promise.resolve(params);

   // 确保params.slug是有效的
   if (!resolvedParams || !resolvedParams.id) {
    notFound();
  }

  const id = resolvedParams.id;
  const photo = await getPhotoById(id);

  if (!photo) {
    notFound();
  }

  return (
    <div>
      <main className="mx-auto max-w-[1960px] p-4">
        <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-sm bg-black/40">
          <FadeIn>
            <Image
              src={photo?.pageCover ?? ''}
              fill
              priority
              alt={photo?.title ?? ''}
              placeholder="blur"
              blurDataURL={photo?.blurDataURL ?? ''}
              className="pointer-events-none md:max-w-[80vw] mx-auto object-contain"
            />
            <Link
              href="/photos"
              className="absolute top-4 left-4 z-10 text-white hover:opacity-80 transition"
            >
              <X className="w-6 h-6" />
            </Link>
          </FadeIn>
        </div>
      </main>
    </div>
  );
};
