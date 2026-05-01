import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { CalendarDays, Fish, ArrowRight, Shield, AlertTriangle } from 'lucide-react'

export default async function AktualityPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ kategorie?: string }> 
}) {
  const supabase = await createClient()
  const resolvedSearchParams = await searchParams
  const categoryParam = resolvedSearchParams.kategorie
  
  // 1. Načtení všech kategorií pro filtr
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  // 2. Načtení dat (články i hlášení stráže)
  const articlesPromise = supabase
    .from('articles')
    .select('*, category:categories(name)')
    .eq('published', true)
    .order('created_at', { ascending: false })

  const guardPromise = supabase
    .from('guard_messages')
    .select('*')
    .order('created_at', { ascending: false })

  const [articlesRes, guardRes] = await Promise.all([articlesPromise, guardPromise])

  // 3. Sjednocení a filtrace
  let allContent = [
    ...(articlesRes.data || []).map(a => ({ ...a, type: 'article' })),
    ...(guardRes.data || []).map(g => ({ ...g, type: 'guard' }))
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  // Aplikace filtrů
  if (categoryParam) {
    if (categoryParam.toLowerCase() === 'straz') {
      allContent = allContent.filter(item => item.type === 'guard')
    } else {
      allContent = allContent.filter(item => {
        if (item.type !== 'article') return false
        // Kontrola podle ID nebo podle názvu kategorie
        const matchesId = item.category_id === categoryParam
        const matchesName = item.category?.name?.toLowerCase() === categoryParam.toLowerCase()
        return matchesId || matchesName
      })
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-4">Dění v naší organizaci</h1>
          <p className="text-lg text-gray-600">
            Aktuální informace od vody, zprávy z výboru a termíny akcí na jednom místě.
          </p>
        </div>

        {/* Filtr kategorií */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <Link
            href="/aktuality"
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
              !categoryParam 
                ? 'bg-green-600 text-white shadow-lg shadow-green-200' 
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Všechno
          </Link>
          
          {/* Virtuální kategorie pro stráž */}
          <Link
            href="/aktuality?kategorie=straz"
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
              categoryParam === 'straz'
                ? 'bg-red-600 text-white shadow-lg shadow-red-200' 
                : 'bg-white text-red-600 hover:bg-red-50 border border-red-100'
            }`}
          >
            <Shield className="w-4 h-4" /> Rybářská stráž
          </Link>

          {categories?.map((cat) => (
            <Link
              key={cat.id}
              href={`/aktuality?kategorie=${cat.id}`}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                categoryParam === cat.id
                  ? 'bg-green-600 text-white shadow-lg shadow-green-200' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {allContent && allContent.length > 0 ? (
            allContent.map((item) => (
              <article key={item.id} className="flex flex-col items-start group">
                <div className="relative w-full aspect-[16/10] overflow-hidden rounded-[2.5rem] bg-gray-100 mb-8 shadow-lg">
                  {item.type === 'guard' ? (
                    <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                      <img 
                        src={item.image_urls && item.image_urls.length > 0 ? item.image_urls[0] : '/images/guard_default.png'} 
                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
                        alt="" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-red-950/40 to-transparent"></div>
                    </div>
                  ) : (
                    <img
                      src={item.featured_image_url || '/placeholder-news.jpg'}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Badge */}
                  <div className="absolute top-6 left-6">
                    {item.type === 'guard' ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-4 py-1.5 text-xs font-black text-white shadow-lg">
                        <Shield className="w-3.5 h-3.5" /> Rybářská stráž
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-black text-gray-900 shadow-lg border border-white">
                        {item.category?.name || 'Aktualita'}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="max-w-xl flex flex-col flex-grow w-full px-2">
                  <div className="flex items-center gap-x-4 text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-green-500" />
                      {new Date(item.created_at).toLocaleDateString('cs-CZ')}
                    </div>
                    {item.type === 'guard' && item.is_important && (
                      <span className="text-red-600 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> Důležité
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-black leading-snug text-gray-900 group-hover:text-green-600 transition-colors mb-4">
                    <Link href={item.type === 'guard' ? '/pro-rybare/rybarska-straz' : `/aktuality/${item.slug}`}>
                      {item.title}
                    </Link>
                  </h3>
                  <p className="line-clamp-3 text-base leading-relaxed text-gray-500 font-medium mb-8 flex-grow">
                    {item.type === 'guard' 
                      ? item.content 
                      : item.perex || (item.content?.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&[^;]+;/g, ' ').substring(0, 160) + '...')}
                  </p>
                  
                  <Link 
                    href={item.type === 'guard' ? '/pro-rybare/rybarska-straz' : `/aktuality/${item.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-green-600 hover:text-green-700 transition-colors group/link"
                  >
                    {item.type === 'guard' ? 'Více o hlášení' : 'Číst celý článek'} 
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full py-24 text-center bg-white rounded-[40px] border-2 border-dashed border-gray-100 shadow-inner">
              <div className="max-w-sm mx-auto">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Fish className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Žádné zprávy nenalezeny</h3>
                <p className="text-gray-500">Zkuste vybrat jinou kategorii nebo se vraťte později.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
