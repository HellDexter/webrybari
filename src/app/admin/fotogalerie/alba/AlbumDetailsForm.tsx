'use client'

import { useState } from 'react'
import { createGallery, updateGallery } from '../actions'
import { Save, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Album = {
  id?: string
  name: string
  slug: string
  category_id: string | null
  event_date: string | null
  description: string | null
}

export default function AlbumDetailsForm({ 
  categories, 
  initialData 
}: { 
  categories: any[], 
  initialData?: Album 
}) {
  const [isSaving, setIsSaving] = useState(false)
  const [name, setName] = useState(initialData?.name || '')
  const router = useRouter()

  const generateSlug = (text: string) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, "-")
  }

  const handleSave = async (formData: FormData) => {
    setIsSaving(true)
    
    if (initialData?.id) {
      // EDITACE
      const result = await updateGallery(initialData.id, formData)
      if (result?.error) {
        alert(result.error)
      } else {
        alert('Změny byly uloženy.')
      }
    } else {
      // VYTVOŘENÍ NOVÉHO
      formData.append('slug', generateSlug(name))
      const result = await createGallery(formData)
      if (result?.error) {
        alert(result.error)
      } else if (result?.success) {
        router.push(`/admin/fotogalerie/alba/${result.galleryId}`)
      }
    }
    setIsSaving(false)
  }

  return (
    <form action={handleSave} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Základní údaje alba</h2>

      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
          Název alba *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="např. Jarní závody 2026"
          className="w-full rounded-lg border-2 border-gray-300 bg-white text-gray-900 px-4 py-2.5 focus:border-green-500 focus:ring-green-500 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-semibold text-gray-700 mb-2">
          URL adresa (slug)
        </label>
        <input
          type="text"
          id="slug"
          name="slug"
          required
          defaultValue={initialData?.slug || ''}
          placeholder="vygeneruje se automaticky"
          className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 text-gray-500 px-4 py-2.5 cursor-not-allowed"
          readOnly={!initialData?.id} // U nového se generuje, u starého je zobrazen
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="category_id" className="block text-sm font-semibold text-gray-700 mb-2">
            Kategorie
          </label>
          <select
            id="category_id"
            name="category_id"
            defaultValue={initialData?.category_id || ''}
            className="w-full rounded-lg border-2 border-gray-300 bg-white text-gray-900 px-4 py-2.5 focus:border-green-500 focus:ring-green-500 transition-colors"
          >
            <option value="">-- Nezařazeno --</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="event_date" className="block text-sm font-semibold text-gray-700 mb-2">
            Datum události (volitelné)
          </label>
          <input
            type="date"
            id="event_date"
            name="event_date"
            defaultValue={initialData?.event_date || ''}
            className="w-full rounded-lg border-2 border-gray-300 bg-white text-gray-900 px-4 py-2.5 focus:border-green-500 focus:ring-green-500 transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
          Popis alba (zobrazí se na webu u náhledu)
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={initialData?.description || ''}
          placeholder="Stručný popis toho, co v albu najdeme..."
          className="w-full rounded-lg border-2 border-gray-300 bg-white text-gray-900 px-4 py-2.5 focus:border-green-500 focus:ring-green-500 transition-colors"
        />
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-100">
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-500 transition disabled:opacity-50 shadow-md"
        >
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {isSaving ? 'Ukládám...' : (initialData?.id ? 'Uložit změny' : 'Vytvořit album a přejít k nahrání fotek')}
        </button>
      </div>
    </form>
  )
}
