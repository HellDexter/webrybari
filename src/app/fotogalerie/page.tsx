import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Folder, Image as ImageIcon, Calendar, ArrowRight } from 'lucide-react'

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
                  className="group block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] shadow-lg mb-6 bg-gray-100">
                    {coverPhoto ? (
                      <img 
                        src={coverPhoto} 
                        alt={album.name} 
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="h-full w-full flex flex-col items-center justify-center text-gray-300">
                        <ImageIcon className="w-12 h-12 mb-2" />
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Prázdné album</span>
                      </div>
                    )}
                    
                    {/* Badge kategorie */}
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-1.5 bg-white/95 backdrop-blur shadow-xl rounded-full text-[10px] font-black text-green-700 uppercase tracking-[0.2em]">
                        {album.category?.name || 'Ostatní'}
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                      <span className="text-white font-bold flex items-center gap-2 text-sm">
                        Otevřít album <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  <div className="px-2">
                    <h3 className="text-2xl font-black text-gray-900 group-hover:text-green-600 transition-colors leading-tight mb-2">
                      {album.name}
                    </h3>
                    
                    {album.description && (
                      <p className="text-sm text-gray-500 line-clamp-2 mb-4 font-medium leading-relaxed">
                        {album.description}
                      </p>
                    )}

                    <div className="flex items-center gap-6">
                      {album.event_date && new Date(album.event_date).getFullYear() > 1970 && (
                        <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                          <Calendar className="w-3.5 h-3.5 text-green-500" />
                          {new Date(album.event_date).toLocaleDateString('cs-CZ', { year: 'numeric', month: 'long' })}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                        <ImageIcon className="w-3.5 h-3.5 text-green-500" />
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
