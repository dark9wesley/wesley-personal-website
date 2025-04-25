'use client'

import { usePhotoStore } from "@/hooks/use-photoStore";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ImageModal() {
  const { selectedPhoto } = usePhotoStore();
  const router = useRouter();

  if (!selectedPhoto) return null;

  const back = () => router.back();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto' };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed !my-0 top-0 left-0 w-screen h-screen backdrop-blur-sm bg-black/40"
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.98 }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1] // cubic bezier
          }}
          className="relative w-full h-full"
        >
          <Image
            src={selectedPhoto.pageCover}
            alt={selectedPhoto.title}
            fill
            priority
            className="object-contain rounded-md mx-auto md:max-w-[80vw]"
          />
          <button
            onClick={back}
            className="absolute top-4 left-4 z-10 text-white hover:opacity-80 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
