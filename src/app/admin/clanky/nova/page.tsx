import ArticleForm from './ArticleForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'

export default async function NewArticlePage() {
  const supabase = await createClient()

  // Získání kategorií z databáze
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name')
    .order('name')

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/clanky" className="text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Napsat nový článek</h1>
      </div>
      
      <ArticleForm categories={categories || []} />
    </div>
  )
}
