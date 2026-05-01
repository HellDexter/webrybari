import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Image as ImageIcon } from 'lucide-react'
import PhotoGrid from '@/components/PhotoGrid'

export default async function GalleryDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const supabase = await createClient()
  const resolvedParams = await params

  // Načtení detailu alba a všech jeho fotek
  const { data: album } = await supabase
    .from('galleries')
    .select('*, photos(*), category:gallery_categories(name)')
    .eq('id', resolvedParams.id)
    .single()

  if (!album) {
    notFound()
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Link 
          href="/fotogalerie" 
          className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-semibold mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Zpět do fotogalerie
        </Link>

        <div className="mb-12">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider">
            {album.category?.name || 'Bez kategorie'}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {album.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-6 text-sm text-gray-500 font-medium">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              {album.event_date ? new Date(album.event_date).toLocaleDateString('cs-CZ') : 'Datum neuvedeno'}
            </div>
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-gray-400" />
              {album.photos?.length || 0} fotografií
            </div>
          </div>
          {album.description && (
            <p className="mt-6 text-lg text-gray-600 max-w-3xl leading-relaxed">
              {album.description}
            </p>
          )}
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
          {album.photos && album.photos.length > 0 ? (
            <PhotoGrid photos={album.photos} />
          ) : (
            <div className="text-center py-20 text-gray-400">
              <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>V tomto albu zatím nejsou žádné fotky.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
