'use client'

import { useState } from 'react'
import { updateArticle } from '../actions'
import { Save } from 'lucide-react'
import ReactQuillEditor from '@/components/ReactQuillEditor'
import { useRouter } from 'next/navigation'

export default function ArticleEditForm({ article, categories }: { article: any, categories: any[] }) {
  const [isSaving, setIsSaving] = useState(false)
  const [content, setContent] = useState(article.content || '')
  const router = useRouter()

  const handleSave = async (formData: FormData) => {
    setIsSaving(true)
    // Add the rich text content to FormData
    formData.set('content', content)
    
    const result = await updateArticle(article.id, formData)
    
    if (result?.error) {
      alert(result.error)
      setIsSaving(false)
    } else {
      router.push('/admin/clanky')
    }
  }

  return (
    <form action={handleSave} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">Nadpis článku</label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={article.title}
            required
            className="w-full rounded-lg border-2 border-gray-300 bg-white text-gray-900 px-4 py-2.5 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="category_id" className="block text-sm font-semibold text-gray-700 mb-2">Kategorie</label>
          <select
            id="category_id"
            name="category_id"
            defaultValue={article.category_id || ''}
            className="w-full rounded-lg border-2 border-gray-300 bg-white text-gray-900 px-4 py-2.5 focus:border-green-500 focus:ring-green-500"
          >
            <option value="">-- Bez kategorie --</option>
            {categories?.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="cover_image" className="block text-sm font-semibold text-gray-700 mb-2">
            Úvodní obrázek (ponechte prázdné pro zachování)
          </label>
          {article.featured_image_url && (
            <div className="mb-2">
              <img src={article.featured_image_url} alt="Současný" className="h-20 w-auto rounded border" />
            </div>
          )}
          <input 
            type="file" 
            id="cover_image" 
            name="cover_image" 
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 border-2 border-gray-300 rounded-lg bg-white p-2"
          />
        </div>

        <div>
          <label htmlFor="gallery_images" className="block text-sm font-semibold text-gray-700 mb-2">
            Přidat další fotky do galerie
          </label>
          {article.gallery_urls && article.gallery_urls.length > 0 && (
            <div className="flex gap-2 mb-2 overflow-x-auto pb-2">
              {article.gallery_urls.map((url: string, i: number) => (
                <img key={i} src={url} className="h-12 w-12 object-cover rounded border" alt="" />
              ))}
            </div>
          )}
          <input 
            type="file" 
            id="gallery_images" 
            name="gallery_images" 
            accept="image/*"
            multiple
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border-2 border-gray-300 rounded-lg bg-white p-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Obsah</label>
        <ReactQuillEditor content={content} onChange={setContent} />
      </div>

      <div className="flex items-center gap-3 py-4 border-t border-b border-gray-100">
        <input
          type="checkbox"
          id="published"
          name="published"
          defaultChecked={article.published}
          className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-600"
        />
        <label htmlFor="published" className="text-sm font-semibold text-gray-700 cursor-pointer">
          Ihned publikovat (změní se na viditelné pro veřejnost)
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 rounded-lg font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
        >
          Zrušit
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-500 transition disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {isSaving ? 'Ukládám...' : 'Uložit změny'}
        </button>
      </div>
    </form>
  )
}
