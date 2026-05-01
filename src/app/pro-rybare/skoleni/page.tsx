import { Calendar, Mail, Phone, Info } from "lucide-react";

export const metadata = {
  title: "Školení k získání RL | ČRS MO Týn nad Vltavou",
};

export default function SkoleniPage() {
  const terminy = [
    { mesic: "Leden", datum: "29. 1. 2026", cas: "16:30" },
    { mesic: "Únor", datum: "26. 2. 2026", cas: "16:30" },
    { mesic: "Březen", datum: "18. 3. 2026", cas: "16:30" },
  ];

  return (
    <div className="bg-white py-24 sm:py-32 flex-grow">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Školení k získání rybářského lístku</h1>
          <p className="mt-4 text-lg text-gray-600">
            Termíny povinných školení pro nové zájemce o získání prvního rybářského lístku.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-green-600" />
              Vypsané termíny pro rok 2026
            </h2>
            
            <div className="space-y-4">
              {terminy.map((termin, idx) => (
                <div key={idx} className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div className="font-bold text-gray-900">{termin.mesic}</div>
                  <div className="flex items-center gap-4 text-gray-600 font-medium">
                    <span>{termin.datum}</span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">od {termin.cas} hod</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex gap-3 text-sm text-gray-500 items-start">
              <Info className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <p>Školení se uskuteční pouze na základě předchozích obdržených přihlášek.</p>
            </div>
          </div>

          <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
            <h2 className="text-xl font-bold text-green-900 mb-4">Jak se přihlásit?</h2>
            <p className="text-green-800 mb-6">
              Přihlášky zasílejte na níže uvedený e-mail (uveďte Jméno a vybraný termín, kterého se chcete zúčastnit), nebo zavolejte.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-green-100 flex-1">
                <div className="w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase font-semibold tracking-wide">E-mail pro přihlášky</div>
                  <a href="mailto:jiri.nekola@seznam.cz" className="font-bold text-green-700 hover:text-green-800">jiri.nekola@seznam.cz</a>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-green-100 flex-1">
                <div className="w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase font-semibold tracking-wide">Telefon</div>
                  <a href="tel:+420606134007" className="font-bold text-green-700 hover:text-green-800">606 134 007</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
