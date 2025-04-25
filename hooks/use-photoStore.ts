import { Photo } from "@/types"
import { create } from "zustand"

interface PhotoStore {
  selectedPhoto: Photo | null
  setSelectedPhoto: (photo: Photo) => void
  clearSelectedPhoto: () => void
}

export const usePhotoStore = create<PhotoStore>((set) => ({
  selectedPhoto: null,
  setSelectedPhoto: (photo) => set({ selectedPhoto: photo }),
  clearSelectedPhoto: () => set({ selectedPhoto: null }),
}))
