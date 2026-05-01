'use client'

import { useState } from 'react'
import { createCategory, deleteCategory } from '../actions'
import { Trash2, Plus } from 'lucide-react'

export default function CategoryManager({ initialCategories }: { initialCategories: any[] }) {
  const [name, setName] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  // Vytvoříme jednoduchý slug: zbavíme diakritiky, mezery na pomlčky, malá písmena
  const generateSlug = (text: string) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, "-")
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    const slug = generateSlug(name)
    const result = await createCategory(name, slug)
    if (result?.error) alert(result.error)
    else setName('')
    setIsSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Smazat kategorii? Pokud obsahuje alba, smažou se také! (Je lepší je nejdřív přesunout)')) {
      await deleteCategory(id)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Kategorie alb</h2>

      <form onSubmit={handleSave} className="flex gap-4 mb-8">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nová kategorie (např. Výlovy rybníků)"
          required
          className="flex-grow rounded-lg border-2 border-gray-300 bg-white text-gray-900 py-2.5 px-4 focus:ring-2 focus:ring-green-600 focus:border-green-600"
        />
        <button
          type="submit"
          disabled={isSaving || !name}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-green-500 transition disabled:opacity-50"
        >
          <Plus className="w-5 h-5" />
          Přidat
        </button>
      </form>

      <div className="space-y-2">
        {initialCategories.length === 0 ? (
          <p className="text-gray-500">Žádné kategorie.</p>
        ) : (
          initialCategories.map((cat) => (
            <div key={cat.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div>
                <span className="font-bold text-gray-900">{cat.name}</span>
                <span className="text-gray-400 text-sm ml-4">URL: /{cat.slug}</span>
              </div>
              <button 
                onClick={() => handleDelete(cat.id)}
                className="text-red-500 hover:text-red-700 p-2"
                title="Smazat kategorii"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
