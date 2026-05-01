import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ArticleEditForm from './ArticleEditForm'
import { redirect } from 'next/navigation'

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const resolvedParams = await params

  // Načteme existující článek
  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('id', resolvedParams.id)
    .single()

  if (!article) {
    redirect('/admin/clanky')
  }

  // Načteme kategorie pro select box
  // Poznámka: Pokud nemáte tabulku public.categories, nechte prázdné nebo použijte gallery_categories
  // Zde předpokládáme gallery_categories pro jednoduchost (záleží, jaké kategorie článků chcete mít)
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/clanky" className="p-2 text-gray-500 hover:text-gray-900 bg-white rounded-lg border border-gray-200 shadow-sm transition">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Úprava článku</h1>
      </div>

      <div className="max-w-4xl">
        <ArticleEditForm article={article} categories={categories || []} />
      </div>
    </div>
  )
}
