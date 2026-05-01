import { MapPin, Clock, Users } from "lucide-react";

export const metadata = {
  title: "Práce s mládeží | ČRS MO Týn nad Vltavou",
};

export default function MladezPage() {
  return (
    <div className="bg-white py-24 sm:py-32 flex-grow">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Práce s mládeží</h1>
          <p className="mt-4 text-lg text-gray-600">
            Výchova nové generace rybářů je pro naši organizaci prioritou.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="bg-green-600 text-white rounded-2xl p-8 mb-8 text-center shadow-lg">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl font-bold mb-4">Rybářské kroužky</h2>
            <p className="text-green-100 text-lg">
              Naše MO vede v současnosti rybářské kroužky ve dvou lokalitách pro děti od školního věku. 
              V kroužku se děti naučí základy rybaření, poznávání ryb a správnému chování v přírodě.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-600" /> Týn nad Vltavou
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <span className="text-gray-500">Místo konání</span>
                  <span className="font-semibold text-gray-900">ZŠ Malá Strana</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <span className="text-gray-500">Vedoucí</span>
                  <span className="font-semibold text-gray-900">Mgr. Janál</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Čas</span>
                  <span className="font-semibold text-gray-900 flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-400" /> Středa od 15:00
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-600" /> Neznašov
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <span className="text-gray-500">Místo konání</span>
                  <span className="font-semibold text-gray-900">ZŠ Neznašov</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Vedoucí</span>
                  <span className="font-semibold text-gray-900">p. Venuš</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
