'use client'

import { useState } from 'react'
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'

type Photo = {
  id: string
  image_url: string
  title?: string
}

export default function PhotoGrid({ photos }: { photos: Photo[] }) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setSelectedPhotoIndex(null)
    document.body.style.overflow = 'auto'
  }

  const nextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % photos.length)
    }
  }

  const prevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + photos.length) % photos.length)
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <div 
            key={photo.id}
            onClick={() => openLightbox(index)}
            className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100 cursor-pointer"
          >
            <img 
              src={photo.image_url} 
              alt={photo.title || ""} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Maximize2 className="text-white w-8 h-8" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-10"
          onClick={closeLightbox}
        >
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-50"
          >
            <X className="w-10 h-10" />
          </button>

          <button 
            onClick={prevPhoto}
            className="absolute left-4 md:left-10 text-white hover:bg-white/10 p-3 rounded-full transition-all z-50"
          >
            <ChevronLeft className="w-12 h-12" />
          </button>

          <div className="relative max-w-full max-h-full flex flex-col items-center">
            <img 
              src={photos[selectedPhotoIndex].image_url} 
              alt="" 
              className="max-w-full max-h-[85vh] object-contain shadow-2xl select-none"
              onClick={(e) => e.stopPropagation()}
            />
            {photos[selectedPhotoIndex].title && (
              <p className="text-white mt-4 text-lg font-medium">
                {photos[selectedPhotoIndex].title}
              </p>
            )}
            <p className="text-gray-400 mt-2 text-sm">
              {selectedPhotoIndex + 1} / {photos.length}
            </p>
          </div>

          <button 
            onClick={nextPhoto}
            className="absolute right-4 md:right-10 text-white hover:bg-white/10 p-3 rounded-full transition-all z-50"
          >
            <ChevronRight className="w-12 h-12" />
          </button>
        </div>
      )}
    </>
  )
}
