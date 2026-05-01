import { createClient } from '@/utils/supabase/server'
import CategoryManager from './CategoryManager'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function CategoriesPage() {
  const supabase = await createClient()

  const { data: categories } = await supabase
    .from('gallery_categories')
    .select('*')
    .order('created_at', { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/fotogalerie" className="p-2 text-gray-500 hover:text-gray-900 bg-white rounded-lg border border-gray-200 shadow-sm transition">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Kategorie Fotogalerií</h1>
      </div>

      <CategoryManager initialCategories={categories || []} />
    </div>
  )
}
