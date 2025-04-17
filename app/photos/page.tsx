"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useMobile } from "@/hooks/use-mobile"
import { motion } from "framer-motion"
import PageTransition from "@/components/page-transition"
import FadeIn from "@/components/fade-in"

// 示例照片数据
const photos = [
  {
    id: 1,
    src: "/placeholder.svg?height=400&width=300",
    alt: "照片 1",
    width: 300,
    height: 400,
  },
  {
    id: 2,
    src: "/placeholder.svg?height=300&width=400",
    alt: "照片 2",
    width: 400,
    height: 300,
  },
  {
    id: 3,
    src: "/placeholder.svg?height=500&width=300",
    alt: "照片 3",
    width: 300,
    height: 500,
  },
  {
    id: 4,
    src: "/placeholder.svg?height=350&width=350",
    alt: "照片 4",
    width: 350,
    height: 350,
  },
  {
    id: 5,
    src: "/placeholder.svg?height=450&width=300",
    alt: "照片 5",
    width: 300,
    height: 450,
  },
  {
    id: 6,
    src: "/placeholder.svg?height=300&width=450",
    alt: "照片 6",
    width: 450,
    height: 300,
  },
  {
    id: 7,
    src: "/placeholder.svg?height=400&width=300",
    alt: "照片 7",
    width: 300,
    height: 400,
  },
  {
    id: 8,
    src: "/placeholder.svg?height=350&width=400",
    alt: "照片 8",
    width: 400,
    height: 350,
  },
  {
    id: 9,
    src: "/placeholder.svg?height=500&width=300",
    alt: "照片 9",
    width: 300,
    height: 500,
  },
]

export default function PhotosPage() {
  const isMobile = useMobile()
  const [columns, setColumns] = useState(3)

  useEffect(() => {
    if (isMobile) {
      setColumns(1)
    } else if (window.innerWidth < 1024) {
      setColumns(2)
    } else {
      setColumns(3)
    }

    const handleResize = () => {
      if (window.innerWidth < 640) {
        setColumns(1)
      } else if (window.innerWidth < 1024) {
        setColumns(2)
      } else {
        setColumns(3)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isMobile])

  // 将照片分配到不同的列
  const getPhotosByColumn = () => {
    const photosByColumn: any[] = Array.from({ length: columns }, () => [])

    photos.forEach((photo, index) => {
      const columnIndex = index % columns
      photosByColumn[columnIndex].push(photo)
    })

    return photosByColumn
  }

  const photosByColumn = getPhotosByColumn()

  return (
    <PageTransition>
      <div className="space-y-8">
        <FadeIn>
          <div className="text-center space-y-4">
            <h1 className="section-title">Photos</h1>
            <p className="section-subtitle">A collection of photos I've taken during my travels and daily life.</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {photosByColumn.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-4">
              {column.map((photo: any, photoIndex: number) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + columnIndex * 0.1 + photoIndex * 0.05, duration: 0.5 }}
                  className="relative overflow-hidden rounded-md hover:opacity-90 transition-opacity"
                >
                  <Image
                    src={photo.src || "/placeholder.svg"}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    className="w-full h-auto"
                  />
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
