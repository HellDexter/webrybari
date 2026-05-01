import { createClient } from "@/utils/supabase/server";
import { Calendar, MapPin, Clock, Info, ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Kalendář akcí | ČRS MO Týn nad Vltavou",
  description: "Přehled rybářských závodů, brigád a schůzí naší organizace.",
};

export default async function KalendarPage() {
  const supabase = await createClient();

  // Načtení budoucích akcí
  const { data: futureEvents } = await supabase
    .from('events')
    .select('*')
    .gte('date', new Date().toISOString())
    .order('date', { ascending: true });

  // Načtení minulých akcí (posledních 5)
  const { data: pastEvents } = await supabase
    .from('events')
    .select('*')
    .lt('date', new Date().toISOString())
    .order('date', { ascending: false })
    .limit(5);

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'zavody': return 'Rybářské závody'
      case 'brigada': return 'Brigáda'
      case 'schuze': return 'Schůze / Jednání'
      default: return 'Ostatní akce'
    }
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'zavody': return 'bg-blue-50 text-blue-700 border-blue-100'
      case 'brigada': return 'bg-orange-50 text-orange-700 border-orange-100'
      case 'schuze': return 'bg-purple-50 text-purple-700 border-purple-100'
      default: return 'bg-gray-50 text-gray-700 border-gray-100'
    }
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Hero Header */}
      <div className="bg-gray-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
          <Link href="/aktuality" className="inline-flex items-center gap-2 text-green-400 font-bold mb-8 hover:text-green-300 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Zpět na aktuality
          </Link>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            Kalendář <span className="text-green-500">akcí</span>
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl">
            Závody, brigády, schůze a další společné aktivity naší organizace na jednom místě.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Hlavní seznam nadcházejících akcí */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-green-600" /> Nadcházející akce
            </h2>

            {futureEvents && futureEvents.length > 0 ? (
              futureEvents.map((event) => (
                <div key={event.id} className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-8 items-start">
                  {/* Datum Box */}
                  <div className="bg-gray-50 rounded-2xl p-4 flex flex-col items-center justify-center min-w-[100px] text-center border border-gray-100 group-hover:bg-green-50 group-hover:border-green-100 transition-colors">
                    <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                      {new Date(event.date).toLocaleString('cs-CZ', { month: 'short' })}
                    </span>
                    <span className="text-4xl font-black text-gray-900 group-hover:text-green-700 transition-colors">
                      {new Date(event.date).getDate()}
                    </span>
                    <span className="text-xs font-bold text-gray-400">
                      {new Date(event.date).getFullYear()}
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getTypeStyles(event.type)}`}>
                        {getEventBadge(event.type)}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                      {event.title}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600 mb-6">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-green-500" />
                        <span className="font-medium">
                          {new Date(event.date).toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-green-500" />
                          <span className="font-medium">{event.location}</span>
                        </div>
                      )}
                    </div>
                    {event.description && (
                      <p className="text-gray-600 leading-relaxed border-l-4 border-gray-100 pl-6 italic">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-gray-50 rounded-[40px] p-20 text-center border-2 border-dashed border-gray-200">
                <Info className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Žádné plánované akce</h3>
                <p className="text-gray-500">Sledujte nás, brzy vypíšeme nové termíny závodů a brigád.</p>
              </div>
            )}
          </div>

          {/* Sidebar s historií a informacemi */}
          <div className="space-y-12">
            {/* Box pro brigády */}
            <div className="bg-green-600 rounded-3xl p-8 text-white shadow-xl shadow-green-100 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <h3 className="text-2xl font-bold mb-4 relative z-10">Máte splněné brigády?</h3>
              <p className="text-green-50 text-sm leading-relaxed mb-6 relative z-10">
                Nezapomeňte, že každý člen má povinnost odpracovat stanovený počet hodin nebo uhradit náhradu. Termíny brigád najdete v tomto kalendáři.
              </p>
              <Link href="/clenstvi/informace" className="inline-flex items-center gap-2 font-bold text-white hover:underline relative z-10">
                Podmínky členství <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Minulé akce */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-400" /> Proběhlé akce
              </h3>
              <div className="space-y-4">
                {pastEvents?.map(event => (
                  <div key={event.id} className="p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors opacity-70 hover:opacity-100">
                    <div className="text-xs font-bold text-gray-400 mb-1">
                      {new Date(event.date).toLocaleDateString('cs-CZ')}
                    </div>
                    <h4 className="font-bold text-gray-800">{event.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function getEventBadge(type: string) {
  switch (type) {
    case 'zavody': return 'Závody'
    case 'brigada': return 'Brigáda'
    case 'schuze': return 'Schůze'
    default: return 'Ostatní'
  }
}
