'use client'

import { Photo } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ImageModal({ photo }: {photo: Photo}) {
  const router = useRouter()
  const back = () => {
    router.back()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed top-0 left-0 !my-0 w-screen h-screen backdrop-blur-sm overflow-hidden z-50"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="absolute top-4 left-4 z-10"
        >
          <X className="h-5 w-5 cursor-pointer hover:opacity-80" onClick={back} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative w-full h-full flex items-center justify-center"
        >
          <Image
            src={photo.pageCover}
            fill
            priority
            alt={photo.title}
            className="object-contain"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
