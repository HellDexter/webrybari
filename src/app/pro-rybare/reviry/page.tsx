import { MapPin, AlertCircle, Info } from "lucide-react";
import DynamicMap from "@/components/Map/DynamicMap";

export const metadata = {
  title: "Revíry v péči MO | ČRS MO Týn nad Vltavou",
};

export default function ReviryPage() {
  const reviry = [
    {
      id: "421 090",
      name: "VLTAVA 20 - KOŘENSKO",
      specs: "10 km • 130 ha",
      gps: "Z: 49°14‘26.804“N, 14°22‘45.168“E | K: 49°10‘54.067“N, 14°26‘44.971“E",
      mapCoords: {
        start: [49.2407788, 14.3792133] as [number, number],
        end: [49.1816852, 14.4458252] as [number, number],
      },
      description: "Od hráze ponořeného stupně Kořensko až k tělesu hráze Hněvkovické nádrže a na Lužnickém rameni až po silniční most v Kolodějích nad Lužnicí (GPS 49°15‘9.541“N, 14°25‘13.191“E). K revíru patří pískovna Nový Dvůr (4 ha) v k. ú. Hosty.",
      rules: [
        "Zákaz lovu ryb ve vyznačeném úseku 100 m pod hrází Hněvkovické přehrady.",
        "Zákaz rybolovu v podjezí jezu v Hněvkovicích.",
        "Zákaz rybolovu v rozsahu plavební komory na jezu v Hněvkovicích a v čekacím stání v Neznašově.",
        "Zákaz používání klepadel a šplouchadel a označování krmných míst plovoucími předměty.",
        "Lov z plavidel a zavážení nástrah a návnad povoleno."
      ],
      warning: "Na pozemcích vodní nádrže je zakázáno terénní úpravy, stanování, kempování, rozdělávání ohňů a znečišťování přírody."
    },
    {
      id: "421 012",
      name: "LUŽNICE 1",
      specs: "5 km • 15 ha",
      gps: "Z: 49°15‘10.125“N, 14°25‘13.431“E | K: 49°16‘31.059“N, 14°26‘7.519“E",
      mapCoords: {
        start: [49.2528125, 14.4203975] as [number, number],
        end: [49.2752941, 14.4354219] as [number, number],
      },
      description: "Přítok Vltavy. Od silničního mostu v Kolodějích nad Lužnicí až k jezu Červeného mlýna v k. ú. Nuzice.",
      rules: [
        "Borovanský potok je CHRO – lov ryb zakázán.",
        "Lov z plavidel na řece povolen."
      ],
      warning: "Na pozemcích vodní nádrže je zakázáno terénní úpravy, stanování, kempování, rozdělávání ohňů a znečišťování přírody."
    },
    {
      id: "421 095",
      name: "ŽIDOVA STROUHA 1",
      specs: "17 km • 3 ha • CHRÁNĚNÁ RYBÍ OBLAST",
      gps: "Z: 49°16‘43.559“N, 14°27‘35.529“E | K: 49°10‘37.668“N, 14°32‘25.138“E",
      mapCoords: {
        start: [49.2787663, 14.4598691] as [number, number],
        end: [49.17713, 14.5403161] as [number, number],
      },
      description: "Levostranný přítok Lužnice. Od ústí do Lužnice pod Bechyní až k pramenům.",
      rules: [
        "Celý revír je vyhlášen jako Chráněná rybí oblast (CHRO).",
        "Rybníky ležící na toku do rybářského revíru nepatří."
      ]
    }
  ];

  return (
    <div className="bg-gray-50 py-24 sm:py-32 flex-grow">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Revíry v péči MO</h1>
          <p className="mt-4 text-lg text-gray-600">
            Přehled rybářských revírů, které obhospodařuje naše místní organizace.
          </p>
        </div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {reviry.map((revir) => (
            <div key={revir.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-900 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {revir.id}
                    </span>
                    <h2 className="text-xl font-bold text-white">{revir.name}</h2>
                  </div>
                  <div className="text-gray-400 text-sm flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {revir.specs}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">Popis revíru</h3>
                  <p className="text-gray-600 leading-relaxed">{revir.description}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Základní pravidla a omezení</h3>
                  <ul className="space-y-2">
                    {revir.rules.map((rule, idx) => (
                      <li key={idx} className="flex gap-3 text-gray-600">
                        <Info className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {revir.warning && (
                  <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-md flex gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-orange-800">{revir.warning}</p>
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400 font-mono mb-4">
                    <span className="font-semibold text-gray-500">GPS:</span> {revir.gps}
                  </p>
                  
                  {revir.mapCoords && (
                    <div className="h-[350px] w-full rounded-b-xl overflow-hidden border border-gray-200 shadow-inner relative z-0">
                      <DynamicMap 
                        startPos={revir.mapCoords.start} 
                        endPos={revir.mapCoords.end} 
                        revirName={revir.name}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
