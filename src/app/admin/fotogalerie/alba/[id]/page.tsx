import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { ArrowLeft, Trash2, ExternalLink } from 'lucide-react'
import AlbumManager from './AlbumManager'
import { redirect } from 'next/navigation'

export default async function AlbumDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const resolvedParams = await params

  // Načtení informací o albu
  const { data: album } = await supabase
    .from('galleries')
    .select('*, category:gallery_categories(name)')
    .eq('id', resolvedParams.id)
    .single()

  if (!album) {
    redirect('/admin/fotogalerie')
  }

  // Načtení fotek v tomto albu
  const { data: photos } = await supabase
    .from('photos')
    .select('*')
    .eq('gallery_id', resolvedParams.id)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/fotogalerie" className="p-2 text-gray-500 hover:text-gray-900 bg-white rounded-lg border border-gray-200 shadow-sm transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="text-sm font-bold text-green-600 uppercase tracking-wider mb-1">
              {album.category?.name || 'Nezařazeno'}
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{album.name}</h1>
          </div>
        </div>
      </div>

      <AlbumManager galleryId={album.id} initialPhotos={photos || []} />
    </div>
  )
}
