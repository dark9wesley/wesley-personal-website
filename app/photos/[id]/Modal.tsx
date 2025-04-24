import {
  X,
} from "lucide-react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Photo } from "./page";

interface SharedModalProps {
  index: number;
  currentPhoto?: Photo;
  closeModal: () => void;
}

export default function SharedModal({
  index,
  closeModal,
  currentPhoto,
}: SharedModalProps) {
  const [loaded, setLoaded] = useState(false);
  let currentImage = currentPhoto;

  return (
    <MotionConfig
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div
        className="relative z-50 flex w-full h-full max-w-7xl items-center "
      >
        <div className="w-full h-full">
          <AnimatePresence initial={false} custom={5}>
            <motion.div
              key={index}
              custom={5}
              variants={{
                enter: {
                  x: 1000,
                  opacity: 0,
                },
                center: {
                  x: 0,
                  opacity: 1,
                },
                exit: {
                  x: -1000,
                  opacity: 0,
                },
              }}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full h-full"
            >
              <Image
                src={currentImage?.pageCover ?? ''}
                fill
                objectFit="contain"
                priority
                alt={currentImage?.title ?? ''}
                onLoad={() => setLoaded(true)}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Buttons + bottom nav bar */}
        <div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-center">
          {loaded && (
            <div className="absolute top-0 left-0 flex items-center gap-2 p-3 text-white">
            <button
              onClick={() => closeModal()}
              className="rounded-full bg-black/50 p-1 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          )}
        </div>
        
      </div>
    </MotionConfig>
  );
}
