import { createClient } from '@/utils/supabase/server'
import NewAlbumForm from './NewAlbumForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function NewAlbumPage() {
  const supabase = await createClient()

  // Načtení kategorií pro Select box
  const { data: categories } = await supabase
    .from('gallery_categories')
    .select('*')
    .order('name', { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/fotogalerie" className="p-2 text-gray-500 hover:text-gray-900 bg-white rounded-lg border border-gray-200 shadow-sm transition">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Nové album</h1>
      </div>

      <div className="max-w-3xl">
        <NewAlbumForm categories={categories || []} />
      </div>
    </div>
  )
}
