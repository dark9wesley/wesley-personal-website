import Head from "next/head";
import { notFound } from "next/navigation"
import { getNotionPageData } from "@/lib/notion";
import { ExtendedRecordMap } from "notion-types";
import { idToUuid } from "notion-utils";
import Image from "next/image";
import FadeIn from "@/components/fade-in";
import PageTransition from "@/components/page-transition";
import AnimatedCD from "@/components/animated-cd";

// 定义照片类型
export interface Photo {
  id: string
  title: string
  slug: string
  date?: {
    start_date: string
  }
  publishDay?: string
  readTime?: string
  password?: string
  blockMap: ExtendedRecordMap
  content?: string[]
  toc?: any[]
  pageCover: string
  relatedArticles?: Array<{
    slug: string
    title: string
  }>
}

// 生成静态路径
export async function generateStaticParams() {
  const pageData = await getNotionPageData();
  const photos = pageData?.allPages?.filter((item) => item.type === 'Photo' && item.status === 'Published') || [];
  return photos.map((photo) => ({
    id: photo.id,
  }));
}

// 获取图片数据
async function getPhotoById(id: string): Promise<Photo | null> {
  const pageData = await getNotionPageData();
  // 在列表内查找图片
  const photo = pageData?.allPages?.find(p => {
    return (
      p.type.indexOf('Menu') < 0 &&
      (p.id === id || p.id === idToUuid(id))
    )
  }) as Photo | undefined;

  if (!photo) {
    return null;
  }

  return photo;
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
    <PageTransition>
      <Head>
        <title>Wesley's Photo {photo.title}</title>
        <meta property="og:image" content={photo.pageCover} />
        <meta name="twitter:image" content={photo.pageCover} />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-sm">
          <div className="absolute -top-4 left-4 z-10">
            <AnimatedCD href="/photos" />
          </div>
          <FadeIn>
            <Image
              src={photo?.pageCover ?? ''}
              fill
              objectFit="contain"
              priority
              alt={photo?.title ?? ''}
              className="pointer-events-none"
            />
          </FadeIn>
        </div>
      </main>
    </PageTransition>
  );
};
