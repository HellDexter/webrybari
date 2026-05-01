import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { ArrowLeft, Trash2, ExternalLink } from 'lucide-react'
import AlbumManager from './AlbumManager'
import AlbumDetailsForm from '../AlbumDetailsForm'
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
  const photosPromise = supabase
    .from('photos')
    .select('*')
    .eq('gallery_id', resolvedParams.id)
    .order('created_at', { ascending: false })

  // Načtení kategorií pro formulář
  const categoriesPromise = supabase
    .from('gallery_categories')
    .select('*')
    .order('name')

  const [photosRes, categoriesRes] = await Promise.all([photosPromise, categoriesPromise])

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/fotogalerie" className="p-2 text-gray-500 hover:text-gray-900 bg-white rounded-lg border border-gray-200 shadow-sm transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="text-xs font-black text-green-600 uppercase tracking-[0.2em] mb-1">
              Správa alba
            </div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">{album.name}</h1>
          </div>
        </div>
        
        <Link 
          href={`/fotogalerie/${album.id}`} 
          target="_blank"
          className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-green-600 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm transition"
        >
          <ExternalLink className="w-4 h-4" /> Zobrazit na webu
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Levý sloupec - Základní údaje */}
        <div className="lg:col-span-1">
          <AlbumDetailsForm 
            categories={categoriesRes.data || []} 
            initialData={album} 
          />
        </div>

        {/* Pravý sloupec - Správa fotek */}
        <div className="lg:col-span-2">
          <AlbumManager galleryId={album.id} initialPhotos={photosRes.data || []} />
        </div>
      </div>
    </div>
  )
}
