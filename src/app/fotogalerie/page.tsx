import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Folder, Image as ImageIcon, Calendar } from 'lucide-react'

export default async function FotogaleriePage({ 
  searchParams 
}: { 
  searchParams: Promise<{ kategorie?: string }> 
}) {
  const supabase = await createClient()
  const resolvedSearchParams = await searchParams
  const activeCategoryId = resolvedSearchParams.kategorie

  // 1. Načtení kategorií pro filtr
  const { data: categories } = await supabase
    .from('gallery_categories')
    .select('*')
    .order('name')

  // 2. Načtení alb (galleries)
  let query = supabase
    .from('galleries')
    .select('*, category:gallery_categories(name), photos(image_url)')
    .order('event_date', { ascending: false })

  if (activeCategoryId) {
    query = query.eq('category_id', activeCategoryId)
  }

  const { data: albums } = await query

  return (
    <div className="bg-gray-50 min-h-screen py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Fotogalerie</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Prohlédněte si snímky z našich závodů, brigád a revírů.
          </p>
        </div>

        {/* Filtr kategorií */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Link
            href="/fotogalerie"
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              !activeCategoryId 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Všechna alba
          </Link>
          {categories?.map((cat) => (
            <Link
              key={cat.id}
              href={`/fotogalerie?kategorie=${cat.id}`}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeCategoryId === cat.id 
                  ? 'bg-green-600 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
        
        {/* Mřížka alb */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {albums && albums.length > 0 ? (
            albums.map((album) => {
              // Jako náhled použijeme první fotku v albu
              const coverPhoto = album.photos?.[0]?.image_url

              return (
                <Link 
                  key={album.id} 
                  href={`/fotogalerie/${album.id}`}
                  className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                    {coverPhoto ? (
                      <img 
                        src={coverPhoto} 
                        alt={album.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                        <ImageIcon className="w-12 h-12 mb-2" />
                        <span className="text-xs">Album je prázdné</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur shadow-sm rounded-full text-[10px] font-bold text-green-700 uppercase tracking-wider">
                        {album.category?.name || 'Nezařazeno'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                      {album.title}
                    </h3>
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {album.event_date ? new Date(album.event_date).toLocaleDateString('cs-CZ') : 'Datum neuvedeno'}
                      </div>
                      <div className="flex items-center gap-1">
                        <ImageIcon className="w-4 h-4" />
                        {album.photos?.length || 0} fotek
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
              <Folder className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Žádná alba nenalezena</h3>
              <p className="text-gray-500 mt-1">Zkuste vybrat jinou kategorii nebo se vraťte později.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
