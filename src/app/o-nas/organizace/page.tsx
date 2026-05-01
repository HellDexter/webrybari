import Link from "next/link";
import { Info, Users, Clock, Fish } from "lucide-react";

export const metadata = {
  title: "O organizaci | ČRS MO Týn nad Vltavou",
};

export default function OrganizacePage() {
  return (
    <div className="bg-white py-24 sm:py-32 flex-grow">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">ČRS z.s. MO Týn nad Vltavou</h1>
          <p className="mt-4 text-lg text-gray-600">
            Místní organizace Českého rybářského svazu sdružující milovníky rybolovu na Vltavotýnsku.
          </p>
        </div>

        <div className="mx-auto max-w-4xl space-y-12">
          
          <div className="prose prose-green prose-lg max-w-none text-gray-600 text-center">
            <p>
              Vítáme Vás na oficiálních stránkách naší místní organizace. Naším cílem je nejen sportovní rybolov, ale především ochrana přírody, péče o svěřené revíry a práce s mládeží. Jsme hrdí na více než stoletou tradici rybářství v našem regionu a snažíme se ji předávat dalším generacím.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href="/o-nas/historie" className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-green-300 transition group text-center flex flex-col items-center">
              <Clock className="w-10 h-10 text-green-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-gray-900 text-lg mb-2">Historie</h3>
              <p className="text-sm text-gray-500">Přečtěte si o stoleté historii naší organizace od roku 1919.</p>
            </Link>
            
            <Link href="/pro-rybare/reviry" className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-green-300 transition group text-center flex flex-col items-center">
              <Fish className="w-10 h-10 text-green-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-gray-900 text-lg mb-2">Naše revíry</h3>
              <p className="text-sm text-gray-500">Prozkoumejte revíry Vltava 20, Lužnice 1 a Židova strouha.</p>
            </Link>

            <Link href="/o-nas/vybor" className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-green-300 transition group text-center flex flex-col items-center">
              <Users className="w-10 h-10 text-green-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-gray-900 text-lg mb-2">Vedení</h3>
              <p className="text-sm text-gray-500">Poznejte zástupce výboru a dozorčí komise naší organizace.</p>
            </Link>
          </div>

          <div className="bg-green-600 text-white rounded-3xl p-10 mt-12 text-center shadow-lg relative overflow-hidden isolate">
            <div className="absolute inset-0 -z-10 bg-[url('/hero-bg.png')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
            <h2 className="text-2xl font-bold mb-4">Chcete se stát členem?</h2>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              Zajímá vás rybolov a chcete se zapojit do činnosti naší organizace? Rádi mezi sebou přivítáme nové členy.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/pro-rybare/skoleni" className="bg-white text-green-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
                Informace o školení
              </Link>
              <Link href="/kontakt" className="bg-transparent border border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white/10 transition">
                Kontaktujte nás
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
