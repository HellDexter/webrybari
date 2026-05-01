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

                <h3 className="text-lg font-semibold text-gray-900 pt-4">Individuální výdej</h3>
                <p className="text-gray-600 mb-4">
                  Mimo níže uvedené termíny je možný individuální výdej po předchozí tel. domluvě:
                </p>
                <div className="bg-white p-4 border border-gray-200 rounded-xl space-y-2">
                  <p className="text-gray-800 font-bold">Libor Bukovský</p>
                  <p className="text-gray-600">Tel: <a href="tel:+420604873470" className="text-green-600 hover:underline">604 873 470</a></p>
                  <p className="text-gray-600">E-mail: <a href="mailto:LiborBukovsky@seznam.cz" className="text-green-600 hover:underline">LiborBukovsky@seznam.cz</a></p>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 pt-6">Hostovací a CS povolenky</h3>
                <p className="text-gray-600">
                  Nabízíme možnost prodeje Celosvazových (CS) povolenek pro členy MRS a další hostovací povolenky. 
                  Pro on-line nákup <strong>pouze hostovacích povolenek</strong> můžete využít e-shop: <a href="http://shop.top-carp.cz/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">shop.top-carp.cz</a>.
                </p>

                <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                  <h3 className="text-lg font-bold text-blue-900 mb-3">Máte účet v RIS?</h3>
                  <p className="text-sm text-blue-800 mb-4">Využijte možnosti Rybářského Informačního Systému:</p>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                      On-line platba členských poplatků
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                      On-line platba a následné vyzvednutí povolenky
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                      Nákup elektronické povolenky
                    </li>
                  </ul>
                  <a href="https://www.rybsvaz.cz" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-blue-600 font-bold hover:underline">www.rybsvaz.cz</a>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-600" /> Harmonogram výdeje 2026
                </h3>
                
                <div className="space-y-6">
                  {/* Leden */}
                  <div>
                    <h4 className="font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-md mb-2">Leden 2026</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600 px-2">
                      <span>2. 1. (Pá)</span> <span className="text-right">10:00 - 14:00</span>
                      <span>3. 1. (So)</span> <span className="text-right">11:00 - 15:00</span>
                      <span>4. 1. (Ne)</span> <span className="text-right">11:00 - 15:00</span>
                      <span>8. 1. (Čt)</span> <span className="text-right">16:30 - 20:00</span>
                      <span>10. 1. (So)</span> <span className="text-right">11:00 - 15:00</span>
                      <span>11. 1. (Ne)</span> <span className="text-right">11:00 - 15:00</span>
                      <span>15. 1. (Čt)</span> <span className="text-right">16:30 - 20:00</span>
                      <span>17. 1. (So)</span> <span className="text-right">11:00 - 14:00</span>
                      <span>30. 1. (Pá)</span> <span className="text-right">16:30 - 20:00</span>
                      <span>31. 1. (So)</span> <span className="text-right">11:00 - 14:00</span>
                    </div>
                  </div>

                  {/* Únor */}
                  <div>
                    <h4 className="font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-md mb-2">Únor 2026</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600 px-2">
                      <span>7. 2. (So)</span> <span className="text-right">11:00 - 14:00</span>
                      <span>14. 2. (So)</span> <span className="text-right">11:00 - 14:00</span>
                      <span>21. 2. (So)</span> <span className="text-right">11:00 - 14:00</span>
                      <span>28. 2. (So)</span> <span className="text-right">11:00 - 14:00</span>
                    </div>
                  </div>

                  {/* Březen */}
                  <div>
                    <h4 className="font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-md mb-2">Březen 2026</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600 px-2">
                      <span>14. 3. (So)</span> <span className="text-right">11:00 - 14:00</span>
                      <span>28. 3. (So)</span> <span className="text-right">11:00 - 14:00</span>
                    </div>
                  </div>

                  {/* Duben */}
                  <div>
                    <h4 className="font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-md mb-2">Duben 2026</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600 px-2 border-b border-gray-100 pb-2">
                      <span>11. 4. (So)</span> <span className="text-right">11:00 - 13:00</span>
                      <span>25. 4. (So)</span> <span className="text-right">11:00 - 13:00</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 italic mt-4">
                    Výdej probíhá v rybářské klubovně v Týně nad Vltavou. Ostatní měsíce individuálně po dohodě.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
