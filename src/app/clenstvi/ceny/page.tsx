import { ExternalLink, FileText, Info } from "lucide-react";

export const metadata = {
  title: "Ceny povolenek | ČRS MO Týn nad Vltavou",
};

export default function CenyPovolenekPage() {
  return (
    <div className="bg-white py-24 sm:py-32 flex-grow">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Ceny povolenek a poplatky</h1>
          <p className="mt-4 text-lg text-gray-600">
            Přehled cen povolenek, členských příspěvků a dalších poplatků pro aktuální rok.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-8">
          {/* Odkaz na oficiální ceník JčÚS */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <ExternalLink className="w-8 h-8" />
            </div>
            <div className="flex-grow">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Oficiální ceník JčÚS</h2>
              <p className="text-gray-600 mb-4">
                Kompletní ceník krajských, celosvazových a místních povolenek naleznete na oficiálních stránkách Jihočeského územního svazu.
              </p>
              <a 
                href="https://www.jcus.cz/cenik-povolenek" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Přejít na ceník JčÚS <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Odkaz na PDF ceník MO Týn */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-8 h-8" />
            </div>
            <div className="flex-grow">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Ceník známek a povolenek (PDF)</h2>
              <p className="text-gray-600 mb-4">
                Můžete si také stáhnout přehledný dokument s aktuálními cenami platnými pro naši organizaci.
              </p>
              <a 
                href="https://rybarityn.estranky.cz/file/177/ceny-povolenek-a-znamek-2026.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Stáhnout PDF ceník <FileText className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-2xl mt-8">
            <div className="flex gap-4">
              <Info className="w-6 h-6 text-orange-600 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-orange-800 mb-2">Důležité upozornění pro členy</h3>
                <p className="text-orange-700">
                  Nezapomeňte včas odevzdat povolenky a zaplatit členské příspěvky na nový rok dle platných stanov Českého rybářského svazu.
                </p>
              </div>
            </div>
          </div>
          {/* Informace o výdeji povolenek */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Výdejna povolenek MO</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Způsoby úhrady a převzetí</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span><strong>Přijímáme platební karty!</strong> Úhrada možná bezkontaktně i hotově.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>Povolenku, známku a členské povinnosti lze objednat a zaplatit přes informační systém RIS.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>Objednanou povolenku si můžete vyzvednout osobně nebo si ji nechat zaslat poštou.</span>
                  </li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 pt-4">Hostovací a CS povolenky</h3>
                <p className="text-gray-600">
                  Nabízíme možnost prodeje Celosvazových (CS) povolenek pro členy Moravského rybářského svazu (MRS) a další hostovací povolenky. Pro online nákup můžete využít také e-shop: <a href="http://shop.top-carp.cz/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">shop.top-carp.cz</a>.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Předběžný harmonogram výdeje</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-semibold text-gray-700">Leden</span>
                    <span className="text-gray-600">Bude upřesněno (připravujeme)</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-semibold text-gray-700">Únor</span>
                    <span className="text-gray-600">Bude upřesněno (připravujeme)</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-semibold text-gray-700">Březen</span>
                    <span className="text-gray-600">Bude upřesněno (připravujeme)</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-semibold text-gray-700">Duben - Prosinec</span>
                    <span className="text-gray-600">Po předchozí tel. domluvě</span>
                  </div>
                </div>
                <p className="mt-4 text-xs text-gray-500 italic">
                  * Přesné termíny a hodiny výdeje pro nadcházející sezónu budou vždy zveřejněny s předstihem v sekci Aktuality.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
