'use client'

import { useState, useRef } from 'react'
import { uploadPhotoToGallery, deletePhoto, updatePhotoTitle } from '../../actions'
import { UploadCloud, Trash2, Loader2, Image as ImageIcon, Save, Check } from 'lucide-react'

type Photo = {
  id: string
  image_url: string
  title: string
}

export default function AlbumManager({ galleryId, initialPhotos }: { galleryId: string, initialPhotos: Photo[] }) {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos)
  const [isUploading, setIsUploading] = useState(false)
  const [editingTitles, setEditingTitles] = useState<Record<string, string>>({})
  const [savingId, setSavingId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    setIsUploading(true)
    const files = Array.from(e.target.files)

    // Nahráváme jednu po druhé (pro jednoduchost, ideálně by to chtělo Promise.all)
    for (const file of files) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('title', file.name)
      
      const result = await uploadPhotoToGallery(galleryId, formData)
      if (result?.error) {
        alert(`Chyba u souboru ${file.name}: ${result.error}`)
      }
    }
    
    setIsUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
    window.location.reload() // Načteme nové fotky ze serveru
  }
  
  const handleUpdateTitle = async (photoId: string) => {
    const newTitle = editingTitles[photoId]
    if (newTitle === undefined) return
    
    setSavingId(photoId)
    const result = await updatePhotoTitle(photoId, newTitle, galleryId)
    setSavingId(null)
    
    if (result?.error) {
      alert(result.error)
    } else {
      // Vyčistíme lokální stav editace po úspěšném uložení
      const newEditing = { ...editingTitles }
      delete newEditing[photoId]
      setEditingTitles(newEditing)
    }
  }

  const handleDelete = async (photoId: string, url: string) => {
    if (confirm('Opravdu chcete tuto fotku trvale smazat?')) {
      // Optimistický update (zmizí hned)
      setPhotos(photos.filter(p => p.id !== photoId))
      await deletePhoto(photoId, url, galleryId)
    }
  }

  return (
    <div className="space-y-8">
      {/* Nahrávací zóna */}
      <div 
        className="border-2 border-dashed border-green-300 bg-green-50 rounded-2xl p-8 text-center hover:bg-green-100 transition cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        {isUploading ? (
          <div className="flex flex-col items-center justify-center text-green-700">
            <Loader2 className="w-12 h-12 animate-spin mb-4" />
            <h3 className="text-xl font-bold mb-2">Nahrávám fotografie...</h3>
            <p>Prosím, nezavírejte tuto stránku.</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-green-700">
            <UploadCloud className="w-12 h-12 mb-4 text-green-500" />
            <h3 className="text-xl font-bold mb-2">Nahrát nové fotky do alba</h3>
            <p className="mb-4 text-green-600">Klikněte sem a vyberte fotky (můžete vybrat i více fotek naráz)</p>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple 
              accept="image/*" 
              className="hidden" 
            />
          </div>
        )}
      </div>

      {/* Seznam fotek v albu */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-gray-400" />
          Fotografie v tomto albu ({photos.length})
        </h2>

        {photos.length === 0 ? (
          <div className="text-center py-12 text-gray-500 bg-white border border-gray-100 rounded-xl">
            Zatím v tomto albu nejsou žádné fotky.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                <img 
                  src={photo.image_url} 
                  alt={photo.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                  <div className="flex gap-1 items-start">
                    <input 
                      type="text"
                      className="flex-grow bg-white/20 border border-white/30 rounded px-2 py-1 text-[10px] text-white placeholder-white/50 focus:bg-white focus:text-gray-900 focus:outline-none transition-all"
                      value={editingTitles[photo.id] !== undefined ? editingTitles[photo.id] : photo.title}
                      onChange={(e) => setEditingTitles({ ...editingTitles, [photo.id]: e.target.value })}
                      placeholder="Přidat popisek..."
                      onClick={(e) => e.stopPropagation()}
                    />
                    <button
                      onClick={(e) => { e.stopPropagation(); handleUpdateTitle(photo.id); }}
                      disabled={savingId === photo.id}
                      className="bg-green-600 text-white p-1 rounded hover:bg-green-500 disabled:bg-gray-400 transition shadow-sm"
                      title="Uložit popisek"
                    >
                      {savingId === photo.id ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : editingTitles[photo.id] !== undefined ? (
                        <Save className="w-3 h-3" />
                      ) : (
                        <Check className="w-3 h-3 opacity-50" />
                      )}
                    </button>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDelete(photo.id, photo.image_url); }}
                    className="self-end bg-red-600 text-white p-2 rounded-lg hover:bg-red-500 transition shadow-md"
                    title="Smazat fotku"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
