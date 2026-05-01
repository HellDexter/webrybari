import { ExternalLink, BookOpen, AlertTriangle, FileText, Download } from "lucide-react";

export const metadata = {
  title: "Rybářský řád | ČRS MO Týn nad Vltavou",
};

export default function RybarskyRadPage() {
  const documents = [
    {
      title: "Rybářský řád a soupis revírů 2024–2027",
      description: "Kompletní soupis revírů a bližší podmínky výkonu rybářského práva pro aktuální období.",
      fileName: "rybarsky_rad_2024-2027.pdf",
      fileSize: "3.2 MB"
    },
    {
      title: "Dodatky k rybářskému řádu 2026",
      description: "Aktuální změny a doplňky platné pro rok 2026.",
      fileName: "dodatek_2026.pdf",
      fileSize: "0.9 MB"
    }
  ];

  return (
    <div className="bg-white py-24 sm:py-32 flex-grow">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Rybářský řád a pravidla</h1>
          <p className="mt-4 text-lg text-gray-600">
            Zde naleznete aktuální dokumenty ke stažení a prohlédnutí.
          </p>
        </div>

        <div className="mx-auto max-w-4xl space-y-8">
          
          {/* Sekce s PDF dokumenty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {documents.map((doc) => (
              <div key={doc.fileName} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col h-full shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 leading-tight">{doc.title}</h2>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{doc.fileSize}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-6 flex-grow">
                  {doc.description}
                </p>
                <div className="flex gap-3 mt-auto">
                  <a 
                    href={`/documents/${doc.fileName}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-grow flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 transition shadow-sm"
                  >
                    <BookOpen className="w-4 h-4" /> Prohlédnout
                  </a>
                  <a 
                    href={`/documents/${doc.fileName}`} 
                    download
                    className="flex items-center justify-center bg-green-600 text-white p-2.5 rounded-lg hover:bg-green-700 transition shadow-sm"
                    title="Stáhnout do počítače"
                  >
                    <Download className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100 flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <ExternalLink className="w-8 h-8" />
            </div>
            <div className="flex-grow text-center md:text-left">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Web Jihočeského územního svazu</h2>
              <p className="text-gray-600 mb-4">
                Vždy aktuální pravidla a bližší podmínky najdete také přímo na oficiálních stránkách JčÚS České Budějovice.
              </p>
              <a 
                href="https://www.jcus.cz/pravidla-rybolovu/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-700 font-bold hover:text-blue-900 transition underline decoration-2 underline-offset-4"
              >
                Přejít na jcus.cz
              </a>
            </div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-2xl">
            <div className="flex gap-4">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-red-800 mb-2">Neznalost pravidel neomlouvá</h3>
                <p className="text-red-700 text-sm">
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
