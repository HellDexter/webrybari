import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { 
  CalendarDays, 
  FileText, 
  ArrowRight, 
  Image as ImageIcon,
  Users,
  Anchor,
  Fish,
  MapPin,
  Clock,
  Shield,
  AlertTriangle
} from "lucide-react";
import WeatherWidget from "@/components/WeatherWidget";
import Newsletter from "@/components/Newsletter";

export default async function Home() {
  const supabase = await createClient();

  // 1. Načtení novinek a hlášení stráže
  const { data: articles } = await supabase
    .from('articles')
    .select('*, category:categories(name)')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(3);

  const { data: guardMessages } = await supabase
    .from('guard_messages')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3);

  // Spojení a seřazení novinek
  const allNews = [
    ...(articles || []).map(a => ({ ...a, type: 'article' })),
    ...(guardMessages || []).map(g => ({ ...g, type: 'guard' }))
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
   .slice(0, 3);

  // 2. Načtení 3 nejnovějších alb
  const { data: latestAlbums } = await supabase
    .from('galleries')
    .select('*, photos(image_url)')
    .order('event_date', { ascending: false })
    .limit(3);

  // 3. Načtení 3 nejbližších akcí
  const { data: upcomingEvents } = await supabase
    .from('events')
    .select('*')
    .gte('date', new Date().toISOString())
    .order('date', { ascending: true })
    .limit(3);

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gray-900 pb-16 pt-14 sm:pb-20">
        <img
          src="/hero-bg.png"
          alt="Rybáři na Vltavě"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40 object-center"
        />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-32 sm:py-48 relative">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="h-px w-12 bg-green-500"></span>
              <span className="text-green-400 font-bold uppercase tracking-widest text-sm">ČRS MO Týn nad Vltavou</span>
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl leading-[1.1]">
              Rybářská tradice na <span className="text-green-500">Vltavě</span>
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-300 max-w-xl">
              Pečujeme o krásné jihočeské revíry, sdružujeme generace rybářů a společně chráníme bohatství našich vod.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                href="/aktuality"
                className="rounded-full bg-green-600 px-8 py-4 text-base font-bold text-white shadow-xl hover:bg-green-500 transition-all hover:scale-105 active:scale-95"
              >
                Co je nového?
              </Link>
              <Link href="/pro-rybare/reviry" className="text-base font-bold leading-6 text-white hover:text-green-400 transition-colors flex items-center gap-2">
                Naše revíry <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
          <div className="w-full lg:max-w-[320px] mt-12 lg:mt-0 lg:absolute lg:top-8 lg:-right-12 xl:-right-32 z-10">
            <WeatherWidget />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Dashboard rozcestník */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 -mt-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { img: "/images/home/reviry_clean.png", title: "Naše revíry", desc: "Mapy a popisy lokalit", href: "/pro-rybare/reviry", accent: "bg-blue-50" },
            { img: "/images/home/rad_clean.png", title: "Rybářský řád", desc: "Aktuální pravidla lovu", href: "/pro-rybare/rad", accent: "bg-green-50" },
            { img: "/images/home/povolenky_clean.png", title: "Povolenky", desc: "Ceník a výdejní místa", href: "/clenstvi/ceny", accent: "bg-amber-50" },
            { img: "/images/home/dotazy_clean.png", title: "Časté dotazy", desc: "Vše, co potřebujete vědět", href: "/dotazy", accent: "bg-purple-50" },
          ].map((item, i) => (
            <Link 
              key={i} 
              href={item.href} 
              className="group bg-white p-10 rounded-[3rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] border border-gray-100/50 hover:border-green-500/30 transition-all duration-500 hover:-translate-y-4 flex flex-col items-center text-center"
            >
              <div className={`w-32 h-32 ${item.accent} rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 relative`}>
                 <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                 <img src={item.img} alt={item.title} className="w-24 h-24 object-contain relative z-10 drop-shadow-md" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-green-600 transition-colors">{item.title}</h3>
              <p className="text-sm font-medium text-gray-500">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Novinky a aktuality */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-px w-8 bg-green-500"></span>
                <span className="text-green-600 font-bold uppercase tracking-widest text-xs">Aktuální dění</span>
              </div>
              <h2 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">Novinky z <span className="text-green-600">naší organizace</span></h2>
            </div>
            <Link href="/aktuality" className="flex items-center gap-2 text-green-600 font-bold hover:text-green-700 transition-colors bg-green-50 px-6 py-3 rounded-full">
              Všechny zprávy <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {allNews.map((item) => (
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
                  
                  <div className="absolute top-6 left-6">
                    {item.type === 'guard' ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-4 py-1.5 text-xs font-black text-white shadow-lg">
                        <Shield className="w-3.5 h-3.5" /> Rybářská stráž
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-black text-gray-900 shadow-lg">
                        {item.category?.name || 'Aktualita'}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="max-w-xl flex flex-col flex-grow">
                  <div className="flex items-center gap-x-4 text-xs font-bold text-gray-400 mb-4">
                    <time dateTime={item.created_at}>
                      {new Date(item.created_at).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </time>
                    {item.type === 'guard' && item.is_important && (
                      <span className="text-red-600 flex items-center gap-1 uppercase tracking-widest text-[10px]">
                        <AlertTriangle className="w-3.5 h-3.5" /> Důležité
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-black leading-snug text-gray-900 group-hover:text-green-600 transition-colors mb-4">
                    <Link href={item.type === 'guard' ? '/pro-rybare/rybarska-straz' : `/aktuality/${item.id}`}>
                      {item.title}
                    </Link>
                  </h3>
                  <p className="line-clamp-3 text-base leading-relaxed text-gray-500 font-medium mb-6 flex-grow">
                    {item.type === 'guard' 
                      ? item.content 
                      : item.perex || (item.content?.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&[^;]+;/g, ' ').substring(0, 160) + '...')}
                  </p>
                  
                  <Link 
                    href={item.type === 'guard' ? '/pro-rybare/rybarska-straz' : `/aktuality/${item.id}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-green-600 hover:text-green-700 transition-colors group/link"
                  >
                    {item.type === 'guard' ? 'Více informací' : 'Číst celý článek'} 
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Sjednocená sekce Kalendář - Kompaktní verze */}
      <section className="py-12 bg-green-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,208C960,213,1056,171,1152,144C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-px w-6 bg-green-400"></span>
                <span className="text-green-400 font-black uppercase tracking-[0.2em] text-[10px]">Plánované události</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
                Nejbližší <span className="text-green-400">akce</span>
              </h2>
            </div>
            <Link href="/aktuality/kalendar" className="group flex items-center gap-2 text-xs text-white font-bold bg-white/5 hover:bg-white/10 px-5 py-2 rounded-full transition-all duration-300 border border-white/5">
              Celý kalendář <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {upcomingEvents && upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <Link 
                  key={event.id} 
                  href="/aktuality/kalendar"
                  className="group block relative"
                >
                  <div className="relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:px-6 md:py-4 flex flex-col md:flex-row md:items-center gap-4 transition-all duration-300 hover:bg-white/10">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500"></div>
                    
                    {/* Datum - Kompaktní */}
                    <div className="flex-shrink-0 flex items-center gap-3 border-r border-white/10 pr-4">
                      <span className="text-2xl font-black text-white">
                        {new Date(event.date).getDate()}
                      </span>
                      <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">
                        {new Date(event.date).toLocaleDateString('cs-CZ', { month: 'short' }).replace('.', '')}
                      </span>
                    </div>

                    {/* Informace o akci */}
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors">
                          {event.title}
                        </h3>
                        <div className="flex items-center gap-4 text-[11px] text-gray-400 font-bold uppercase tracking-wider">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-green-500" />
                            {new Date(event.date).toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                          {event.location && (
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-green-500" />
                              {event.location}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <ArrowRight className="hidden md:block w-4 h-4 text-white/20 group-hover:text-white transition-all group-hover:translate-x-1" />
                  </div>
                </Link>
              ))
            ) : (
              <div className="py-8 px-6 bg-white/5 rounded-2xl border border-white/10 text-center">
                <p className="text-green-100/40 text-sm italic">Momentálně nejsou naplánovány žádné akce.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Fotogalerie */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-px w-8 bg-green-500"></span>
                <span className="text-green-600 font-bold uppercase tracking-widest text-xs">Vzpomínky od vody</span>
              </div>
              <h2 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">Naše <span className="text-green-600">fotogalerie</span></h2>
            </div>
            <Link href="/aktuality/fotogalerie" className="flex items-center gap-2 text-green-600 font-bold hover:text-green-700 transition-colors bg-white px-6 py-3 rounded-full shadow-sm border border-gray-100">
              Všechna alba <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestAlbums && latestAlbums.length > 0 ? (
              latestAlbums.map((album) => (
                <Link key={album.id} href={`/aktuality/fotogalerie/${album.id}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] shadow-lg mb-4">
                    <img
                      src={album.photos?.[0]?.image_url || '/placeholder-gallery.jpg'}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                      <span className="text-white font-bold flex items-center gap-2">
                        Otevřít album <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                  <div className="px-4">
                    <h3 className="text-lg font-black text-gray-900 group-hover:text-green-600 transition-colors leading-tight mb-1">{album.title}</h3>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                       {new Date(album.event_date).toLocaleDateString('cs-CZ', { year: 'numeric', month: 'long' })}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500 italic col-span-full text-center py-12">Zatím jsme nepřidali žádné fotografie.</p>
            )}
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
