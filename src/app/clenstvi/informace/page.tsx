import Link from "next/link";
import { Users, BookOpen, Calendar, MapPin, Fish } from "lucide-react";

export const metadata = {
  title: "Informace pro členy | ČRS MO Týn nad Vltavou",
};

export default function InformacePage() {
  const sekce = [
    {
      title: "Práce s mládeží",
      description: "Informace o rybářských kroužcích v Týně nad Vltavou a Neznašově. Vychováváme novou generaci rybářů.",
      icon: <Users className="w-8 h-8 text-green-600" />,
      link: "/clenstvi/mladez"
    },
    {
      title: "Výdejna povolenek",
      description: "Základní informace o výdejně povolenek, aktuálních cenách a členských příspěvcích pro tento rok.",
      icon: <MapPin className="w-8 h-8 text-blue-600" />,
      link: "/clenstvi/ceny"
    },
    {
      title: "Školení pro získání RL",
      description: "Termíny povinných školení pro zájemce o získání prvního rybářského lístku.",
      icon: <BookOpen className="w-8 h-8 text-orange-600" />,
      link: "/pro-rybare/skoleni"
    },
    {
      title: "Brigády a závody",
      description: "Sledujte aktuální dění v sekci Aktuality, kde zveřejňujeme termíny brigád a pozvánky na závody.",
      icon: <Calendar className="w-8 h-8 text-purple-600" />,
      link: "/aktuality"
    }
  ];

  return (
    <div className="bg-white py-24 sm:py-32 flex-grow">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Informace pro členy MO</h1>
          <p className="mt-4 text-lg text-gray-600">
            Rozcestník důležitých informací pro všechny členy naší organizace.
          </p>
        </div>

        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {sekce.map((polozka, idx) => (
            <Link 
              key={idx} 
              href={polozka.link}
              className="bg-gray-50 border border-gray-100 rounded-2xl p-8 hover:bg-white hover:border-green-300 hover:shadow-lg transition-all group flex flex-col items-start"
            >
              <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 mb-6 group-hover:scale-110 transition-transform">
                {polozka.icon}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">
                {polozka.title}
              </h2>
              <p className="text-gray-600 mb-6 flex-grow">
                {polozka.description}
              </p>
              <div className="text-sm font-bold text-green-600 flex items-center gap-2 group-hover:gap-3 transition-all">
                Přejít na stránku &rarr;
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mx-auto max-w-3xl mt-16 bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
          <Fish className="w-12 h-12 text-green-600 mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-bold text-green-900 mb-2">Hledáte něco konkrétního?</h3>
          <p className="text-green-800 mb-6">
            Pokud jste nenašli, co jste hledali, podívejte se do sekce často kladených dotazů, nebo nám napište zprávu.
          </p>
          <Link 
            href="/dotazy"
            className="inline-flex justify-center rounded-md bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-500 transition"
          >
            Přejít do sekce Dotazy
          </Link>
        </div>
      </div>
    </div>
  );
}
