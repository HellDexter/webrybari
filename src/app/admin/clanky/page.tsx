import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import ArticlesTableClient from './ArticlesTableClient'

export default async function ArticlesAdminPage() {
  const supabase = await createClient()

  const { data: articles, error } = await supabase
    .from('articles')
    .select('*, category:categories(name)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error("Fetch articles error:", error)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Správa článků</h1>
        <Link 
          href="/admin/clanky/nova" 
          className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500"
        >
          <Plus className="w-4 h-4" /> Nový článek
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg font-mono text-sm border border-red-200">
          Chyba načítání z DB: {error.message}
        </div>
      )}

      {/* Renderování klientské tabulky s filtrací */}
      <ArticlesTableClient articles={articles || []} />
    </div>
  )
}
