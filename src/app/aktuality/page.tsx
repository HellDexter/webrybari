import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { CalendarDays, Fish, ArrowRight } from 'lucide-react'

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

  // 2. Načtení článků
  let query = supabase
    .from('articles')
    .select('*, category:categories(name)')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (categoryParam) {
    // Pokud máme UUID, filtrujeme přímo
    if (categoryParam.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
      query = query.eq('category_id', categoryParam)
    } else {
      // Pokud máme název, hledáme PŘESNOU shodu (ignore case)
      const { data: catData } = await supabase
        .from('categories')
        .select('id')
        .ilike('name', categoryParam) // Bez %, aby to byla přesná shoda
        .maybeSingle()
      
      if (catData) {
        query = query.eq('category_id', catData.id)
      }
    }
  }

  const { data: articles } = await query

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
          {articles && articles.length > 0 ? (
            articles.map((article) => (
              <article key={article.id} className="group flex flex-col bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
                <Link href={`/aktuality/${article.slug}`} className="relative aspect-[16/10] overflow-hidden block">
                  {article.featured_image_url ? (
                    <img src={article.featured_image_url} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300">
                      <Fish className="w-12 h-12" />
                    </div>
                  )}
                  <div className="absolute top-5 left-5">
                    <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-green-700 shadow-sm border border-white">
                      {article.category?.name || 'Aktualita'}
                    </span>
                  </div>
                </Link>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
                    <CalendarDays className="w-4 h-4 text-green-500" />
                    {new Date(article.created_at).toLocaleDateString('cs-CZ')}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors leading-snug mb-4">
                    <Link href={`/aktuality/${article.slug}`}>{article.title}</Link>
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-8 flex-grow">
                    {article.content
                      ?.replace(/<[^>]*>?/gm, '')
                      .replace(/&nbsp;/g, ' ')
                      .substring(0, 160)}...
                  </p>
                  <Link 
                    href={`/aktuality/${article.slug}`} 
                    className="inline-flex items-center gap-2 text-sm font-bold text-green-600 hover:text-green-700 group/link"
                  >
                    Číst celý článek
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
                <h3 className="text-xl font-bold text-gray-900 mb-2">Žádné články nenalezeny</h3>
                <p className="text-gray-500">Zkuste vybrat jinou kategorii nebo se vraťte později.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
