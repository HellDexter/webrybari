'use client'

import Link from 'next/link'
import { Image as ImageIcon, Trash2 } from 'lucide-react'
import { deleteGallery } from './actions'

type Album = {
  id: string
  name: string
  cover_image_url: string | null
  event_date: string | null
  photoCount: number
  category: { name: string } | null
}

export default function GalleryList({ initialAlbums }: { initialAlbums: Album[] }) {
  const handleDelete = async (id: string) => {
    if (confirm('Opravdu chcete celé album smazat?')) {
      const result = await deleteGallery(id)
      if (result?.error) {
        alert(result.error)
      } else {
        window.location.reload()
      }
    }
  }

  if (initialAlbums.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-200 rounded-xl">
        Zatím nemáte žádná alba. Klikněte na zelené tlačítko a vytvořte první!
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {initialAlbums.map((album) => (
        <div key={album.id} className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition bg-white relative">
          <div className="aspect-[4/3] bg-gray-100 relative flex items-center justify-center">
            {album.cover_image_url ? (
              <img src={album.cover_image_url} alt={album.name} className="w-full h-full object-cover" />
            ) : (
              <ImageIcon className="w-12 h-12 text-gray-300" />
            )}
            
            {/* Delete button */}
            <div className="absolute top-2 right-2 z-20">
              <button 
                onClick={() => handleDelete(album.id)}
                className="bg-red-600 text-white p-2 rounded-lg shadow-lg hover:bg-red-500 transition opacity-0 group-hover:opacity-100"
                title="Smazat album"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center z-10">
              <Link 
                href={`/admin/fotogalerie/alba/${album.id}`}
                className="bg-white text-gray-900 px-4 py-2 rounded-lg font-bold shadow hover:scale-105 transition"
              >
                Spravovat fotky
              </Link>
            </div>
          </div>
          <div className="p-4">
            <div className="text-xs font-bold text-green-600 mb-1 uppercase tracking-wider">
              {album.category?.name || 'Nezařazeno'}
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-1">{album.name}</h3>
            <div className="flex justify-between items-center text-sm text-gray-500 mt-3">
              <span>{album.photoCount} fotek</span>
              <span>
                {album.event_date ? new Date(album.event_date).toLocaleDateString('cs-CZ') : 'Bez data'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
