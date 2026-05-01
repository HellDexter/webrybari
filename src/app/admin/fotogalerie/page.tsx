import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Plus, FolderTree } from 'lucide-react'
import GalleryList from './GalleryList'

export default async function AdminGalleriesPage() {
  const supabase = await createClient()

  // Načteme všechna alba a přilepíme k nim název kategorie
  const { data: galleries } = await supabase
    .from('galleries')
    .select('*, category:gallery_categories(name)')
    .order('created_at', { ascending: false })

  // Spočítáme fotky v jednotlivých albech
  const getPhotoCount = async (galleryId: string) => {
    const { count } = await supabase.from('photos').select('*', { count: 'exact', head: true }).eq('gallery_id', galleryId)
    return count || 0
  }

  // Mapování alb a fotek
  const galleriesWithCounts = galleries ? await Promise.all(
    galleries.map(async (g) => {
      const count = await getPhotoCount(g.id)
      return { 
        ...g, 
        photoCount: count,
        category: g.category as { name: string } | null 
      }
    })
  ) : []

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Správa Fotogalerie</h1>
        <div className="flex gap-3">
          <Link 
            href="/admin/fotogalerie/kategorie" 
            className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 border shadow-sm transition"
          >
            <FolderTree className="w-4 h-4" />
            Kategorie
          </Link>
          <Link 
            href="/admin/fotogalerie/alba/nove" 
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-500 shadow-sm transition"
          >
            <Plus className="w-5 h-5" />
            Vytvořit nové album
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Existující alba</h2>
        
        <GalleryList initialAlbums={galleriesWithCounts} />
      </div>
    </div>
  )
}
