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
  Clock
} from "lucide-react";
import WeatherWidget from "@/components/WeatherWidget";
import Newsletter from "@/components/Newsletter";

export default async function Home() {
  const supabase = await createClient();

  // 1. Načtení 3 nejnovějších publikovaných článků
  const { data: latestArticles } = await supabase
    .from('articles')
    .select('*, category:categories(name)') // Opraveno na správnou tabulku categories
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(3);

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
          
          {/* Widget počasí vpravo nahoře v oblasi červeného obdélníku */}
          <div className="w-full lg:max-w-[320px] mt-12 lg:mt-0 lg:absolute lg:top-8 lg:-right-12 xl:-right-32 z-10">
            <WeatherWidget />
          </div>
        </div>
        
        {/* Dekorativní prvek - vlna */}
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
              <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
                {/* Dekorativní barevný kruh v pozadí obrázku */}
                <div className={`absolute inset-0 ${item.accent} rounded-full scale-90 group-hover:scale-110 transition-transform duration-700 opacity-60`}></div>
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="relative z-10 w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3" 
                />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-green-700 transition-colors tracking-tight">{item.title}</h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed opacity-80">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Aktuality Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900">Aktuality a novinky</h2>
              <p className="mt-4 text-lg text-gray-600">Sledujte, co se právě děje u vody i v naší organizaci.</p>
            </div>
            <Link href="/aktuality" className="hidden md:flex items-center gap-2 text-green-600 font-bold hover:text-green-700 transition-colors">
              Všechny zprávy <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {latestArticles && latestArticles.length > 0 ? (
              latestArticles.map((article) => (
                <article key={article.id} className="flex flex-col group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <Link href={`/aktuality/${article.slug}`} className="relative aspect-[16/10] overflow-hidden block">
                    {article.featured_image_url ? (
                      <img src={article.featured_image_url} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                      <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300">
                        <Fish className="w-12 h-12" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-green-700 shadow-sm">
                        {article.category?.name || 'Aktualita'}
                      </span>
                    </div>
                  </Link>
                  <div className="p-8 flex flex-col flex-grow">
                    <time className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                       <CalendarDays className="w-4 h-4 text-green-500" />
                       {new Date(article.created_at).toLocaleDateString('cs-CZ')}
                    </time>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors leading-snug mb-4">
                      <Link href={`/aktuality/${article.slug}`}>{article.title}</Link>
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-6 flex-grow">
                      {article.content?.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').substring(0, 150)}...
                    </p>
                    <Link href={`/aktuality/${article.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-green-600 hover:text-green-700 transition-colors group/link">
                      Číst celý článek 
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
                <div className="max-w-xs mx-auto">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">Zatím jsme nenapsali žádné aktuality. Brzy se tu objeví!</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-12 md:hidden">
            <Link href="/aktuality" className="flex items-center justify-center gap-2 text-green-600 font-bold py-4 border-2 border-green-100 rounded-xl">
              Všechny zprávy <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Sjednocená sekce Kalendář */}
      <section className="py-24 bg-green-900 relative overflow-hidden">
        {/* Dekorativní vlny na pozadí - stejné jako v Newsletteru */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,208C960,213,1056,171,1152,144C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-20">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-px w-8 bg-green-400"></span>
                <span className="text-green-400 font-black uppercase tracking-[0.2em] text-xs">Plánované události</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                Nejbližší <span className="text-green-400">akce</span>
              </h2>
              <p className="mt-4 text-lg text-green-100/80">Sledujte společné výpravy, závody a důležitá setkání u vody.</p>
            </div>
            <Link href="/aktuality/kalendar" className="group flex items-center gap-3 text-white font-bold bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full transition-all duration-300 border border-white/10">
              Celý kalendář <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="space-y-6">
            {upcomingEvents && upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <div key={event.id} className="group relative flex flex-col md:flex-row gap-6 md:items-center">
                  {/* Datum - Kalendářový lístek */}
                  <div className="flex-shrink-0 w-20 h-20 bg-white/10 rounded-2xl border border-white/10 flex flex-col items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
                    <span className="text-2xl font-black text-white group-hover:text-green-900 leading-none">
                      {new Date(event.date).getDate()}
                    </span>
                    <span className="text-[10px] font-black text-green-400 uppercase tracking-widest mt-1 group-hover:text-green-800 transition-colors">
                      {new Date(event.date).toLocaleDateString('cs-CZ', { month: 'short' }).replace('.', '')}
                    </span>
                  </div>

                  {/* Karta akce */}
                  <div className="flex-grow bg-white/5 backdrop-blur-sm border border-white/5 p-6 md:p-8 rounded-[2rem] hover:bg-white/10 hover:border-white/20 transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                      <h3 className="text-xl md:text-2xl font-bold text-white">
                        {event.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-green-100/60 font-medium">
                        <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg">
                          <Clock className="w-4 h-4 text-green-400" /> 
                          {new Date(event.date).toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg">
                            <MapPin className="w-4 h-4 text-green-400" /> 
                            {event.location}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="hidden md:block">
                      <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white transition-all duration-500">
                        <ArrowRight className="w-5 h-5 text-white group-hover:text-green-900" />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 px-8 bg-white/5 rounded-3xl border border-white/10 text-center">
                <p className="text-green-100/40 italic">Momentálně nejsou naplánovány žádné akce.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Fotogalerie Section */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">Nejnovější alba</h2>
            <p className="mt-4 text-lg text-gray-600">Nahlédněte do života naší organizace skrze objektiv.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {latestAlbums?.map((album) => (
              <Link 
                key={album.id} 
                href={`/fotogalerie/${album.id}`}
                className="group flex flex-col"
              >
                <div className="relative aspect-square overflow-hidden rounded-[2rem] shadow-md border border-gray-100 mb-6">
                  {album.photos?.[0] ? (
                    <img src={album.photos[0].image_url} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                      <ImageIcon className="w-3.5 h-3.5 text-green-400" />
                      {album.photos?.length || 0} fotek
                    </span>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors tracking-tight line-clamp-2">
                  {album.title}
                </h4>
                <p className="mt-2 text-xs font-black text-gray-400 uppercase tracking-widest">
                  {new Date(album.event_date).toLocaleDateString('cs-CZ', { year: 'numeric', month: 'long' })}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/fotogalerie" className="inline-flex items-center gap-3 px-8 py-4 bg-white border border-gray-200 rounded-full font-bold text-gray-900 hover:bg-gray-50 hover:shadow-md transition-all">
              Vstoupit do fotogalerie <ImageIcon className="w-5 h-5 text-green-600" />
            </Link>
          </div>
        </div>
      </section>

      {/* O nás / Mise Section */}
      <section className="py-24 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-100 rounded-full -z-10 animate-pulse"></div>
              <img 
                src="/hero-bg.png" 
                alt="Historie" 
                className="rounded-3xl shadow-2xl rotate-1 group-hover:rotate-0 transition-transform duration-500"
              />
              <div className="absolute -bottom-6 -right-6 bg-green-600 p-8 rounded-3xl text-white shadow-xl hidden md:block">
                <Users className="w-10 h-10 mb-4" />
                <div className="text-3xl font-black italic">600+</div>
                <div className="text-sm font-bold uppercase tracking-widest opacity-80">Aktivních členů</div>
              </div>
            </div>
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-gray-900">Naše poslání</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Nejsme jen spolkem rybářů, jsme komunitou lidí, kterým není lhostejné naše životní prostředí. Staráme se o desítky kilometrů toků Vltavy a Lužnice, pravidelně zarybňujeme a vedeme k lásce k přírodě i ty nejmenší.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-green-600 font-bold">
                    <Anchor className="w-5 h-5" /> Čisté vody
                  </div>
                  <p className="text-sm text-gray-500">Pravidelně uklízíme břehy a hlídáme čistotu toků.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-green-600 font-bold">
                    <Fish className="w-5 h-5" /> Zarybňování
                  </div>
                  <p className="text-sm text-gray-500">Ročně vypouštíme tisíce kusů původních druhů ryb.</p>
                </div>
              </div>
              <Link href="/o-nas/organizace" className="inline-block pt-4 text-green-600 font-bold hover:underline">
                Více o naší historii a struktuře &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
