'use client'

import { useState } from 'react'
import { createArticle } from '../actions'
import ReactQuillEditor from '@/components/ReactQuillEditor'
import Link from 'next/link'

type Category = { id: string, name: string }

export default function ArticleForm({ categories }: { categories: Category[] }) {
  const [content, setContent] = useState('')

  const handleAction = async (formData: FormData) => {
    const result = await createArticle(formData)
    if (result?.error) {
      alert(result.error)
    }
  }

  return (
    <form action={handleAction} className="space-y-6 max-w-4xl bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
            Nadpis článku
          </label>
          <div className="mt-2">
            <input
              id="title"
              name="title"
              type="text"
              required
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              placeholder="Zadejte chytlavý nadpis..."
            />
          </div>
        </div>

        <div>
          <label htmlFor="category_id" className="block text-sm font-medium leading-6 text-gray-900">
            Kategorie
          </label>
          <div className="mt-2">
            <select
              id="category_id"
              name="category_id"
              required
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
            >
              <option value="">-- Vyberte kategorii --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="cover_image" className="block text-sm font-medium leading-6 text-gray-900 mb-2">
            Úvodní (náhledový) obrázek
          </label>
          <input 
            type="file" 
            id="cover_image" 
            name="cover_image" 
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
        </div>

        <div>
          <label htmlFor="gallery_images" className="block text-sm font-medium leading-6 text-gray-900 mb-2">
            Další fotky do galerie (více najednou)
          </label>
          <input 
            type="file" 
            id="gallery_images" 
            name="gallery_images" 
            accept="image/*"
            multiple
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
          Obsah
        </label>
        {/* Hidden input to hold the HTML content for the FormData */}
        <input type="hidden" name="content" value={content} />
        <ReactQuillEditor content={content} onChange={setContent} />
      </div>

      <div className="flex items-center gap-x-3">
        <input
          id="published"
          name="published"
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
        />
        <label htmlFor="published" className="block text-sm font-medium leading-6 text-gray-900">
          Ihned publikovat (viditelné pro veřejnost)
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <Link 
          href="/admin/clanky"
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Zrušit
        </Link>
        <button
          type="submit"
          className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          Uložit článek
        </button>
      </div>
    </form>
  )
}
