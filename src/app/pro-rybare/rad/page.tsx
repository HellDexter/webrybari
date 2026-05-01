import { ExternalLink, BookOpen, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Rybářský řád | ČRS MO Týn nad Vltavou",
};

export default function RybarskyRadPage() {
  return (
    <div className="bg-white py-24 sm:py-32 flex-grow">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Rybářský řád a pravidla</h1>
          <p className="mt-4 text-lg text-gray-600">
            Aktuální znění rybářského řádu a pravidel pro sportovní rybolov na revírech ČRS.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-8">
          
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-8 h-8" />
            </div>
            <div className="flex-grow">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Oficiální rybářský řád JčÚS</h2>
              <p className="text-gray-600 mb-4">
                Rybářský řád obsahuje bližší podmínky výkonu rybářského práva, povolené způsoby lovu, doby hájení jednotlivých druhů ryb a zákonné míry.
              </p>
              <a 
                href="https://www.jcus.cz/pravidla-rybolovu/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Přejít na Rybářský řád <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-2xl mt-8">
            <div className="flex gap-4">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-red-800 mb-2">Neznalost pravidel neomlouvá</h3>
                <p className="text-red-700">
                  Každý rybář je povinen se před započetím lovu seznámit s aktuálními pravidly a popisem konkrétního revíru. Porušení pravidel může vést k zadržení povolenky rybářskou stráží.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
