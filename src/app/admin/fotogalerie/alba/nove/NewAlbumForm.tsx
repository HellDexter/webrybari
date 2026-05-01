'use client'

import { useState } from 'react'
import { createGallery } from '../../actions'
import { Save } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function NewAlbumForm({ categories }: { categories: any[] }) {
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  const generateSlug = (text: string) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, "-")
  }

  const handleSave = async (formData: FormData) => {
    setIsSaving(true)
    const name = formData.get('name') as string
    formData.append('slug', generateSlug(name))
    
    const result = await createGallery(formData)
    if (result?.error) {
      alert(result.error)
      setIsSaving(false)
    } else if (result?.success) {
      // Přesměrujeme rovnou do nového alba pro nahrání fotek
      router.push(`/admin/fotogalerie/alba/${result.galleryId}`)
    }
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
          placeholder="např. Jarní závody 2026"
          className="w-full rounded-lg border-2 border-gray-300 bg-white text-gray-900 px-4 py-2.5 focus:border-green-500 focus:ring-green-500"
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
            className="w-full rounded-lg border-2 border-gray-300 bg-white text-gray-900 px-4 py-2.5 focus:border-green-500 focus:ring-green-500"
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
            className="w-full rounded-lg border-2 border-gray-300 bg-white text-gray-900 px-4 py-2.5 focus:border-green-500 focus:ring-green-500"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-100">
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-500 transition disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {isSaving ? 'Ukládám...' : 'Vytvořit album a přejít k nahrání fotek'}
        </button>
      </div>
    </form>
  )
}
