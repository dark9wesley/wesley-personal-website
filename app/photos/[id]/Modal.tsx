import {
  CircleX,
} from "lucide-react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Photo } from "./page";

interface SharedModalProps {
  index: number;
  currentPhoto?: Photo;
  closeModal: () => void;
  navigation: boolean;
  direction?: number;
}

export default function SharedModal({
  index,
  closeModal,
  navigation,
  currentPhoto,
  direction,
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
        className="relative z-50 flex aspect-[3/2] w-full max-w-7xl items-center wide:h-full xl:taller-than-854:h-auto"
      >
        <div className="w-full overflow-hidden">
          <div className="relative flex aspect-[3/2] items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={{
                  enter: (direction: number) => {
                    return {
                      x: direction > 0 ? 1000 : -1000,
                      opacity: 0,
                    };
                  },
                  center: {
                    x: 0,
                    opacity: 1,
                  },
                  exit: (direction: number) => {
                    return {
                      x: direction < 0 ? 1000 : -1000,
                      opacity: 0,
                    };
                  },
                }}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute"
              >
                <Image
                  src={currentImage?.pageCover ?? ''}
                  width={navigation ? 1280 : 1920}
                  height={navigation ? 853 : 1280}
                  priority
                  alt="Next.js Conf image"
                  onLoad={() => setLoaded(true)}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Buttons + bottom nav bar */}
        <div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-center">
          {loaded && (
            <div className="absolute top-0 left-0 flex items-center gap-2 p-3 text-white">
            <button
              onClick={() => closeModal()}
              className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
            >
              <CircleX className="h-5 w-5" />
            </button>
          </div>
          )}
        </div>
        
      </div>
    </MotionConfig>
  );
}
