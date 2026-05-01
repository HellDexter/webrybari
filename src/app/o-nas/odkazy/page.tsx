import { Link2, PlaySquare } from "lucide-react";

export const metadata = {
  title: "Zajímavé odkazy | ČRS MO Týn nad Vltavou",
};

export default function OdkazyPage() {
  const odkazy = [
    {
      title: "Týn nad Vltavou z letadla",
      url: "https://www.youtube.com/watch?v=fU4EA7BGbVU",
      icon: <PlaySquare className="w-6 h-6" />
    },
    {
      title: "Stará Vltava - fotogalerie",
      url: "http://www.stara-vltava.cz/galerie.html",
      icon: <Link2 className="w-6 h-6" />
    },
    {
      title: "Něco o zimním lovu od kolegů ze Slovenska",
      url: "https://youtu.be/x7KiEbLf-7g",
      icon: <PlaySquare className="w-6 h-6" />
    },
    {
      title: "Stavba šífů v Týně",
      url: "https://m.youtube.com/watch?v=UE8wsgvq28A",
      icon: <PlaySquare className="w-6 h-6" />
    },
    {
      title: "Dokument o historii města Týn nad Vltavou",
      url: "https://m.youtube.com/watch?v=m-hrcgbOrTU",
      icon: <PlaySquare className="w-6 h-6" />
    },
    {
      title: "O vrcholových predátorech v přírodě",
      url: "https://ekolist.cz/cz/zpravodajstvi/zpravy/navrat-vrcholovych-predatoru-je-fajn-vec",
      icon: <Link2 className="w-6 h-6" />
    }
  ];

  return (
    <div className="bg-white py-24 sm:py-32 flex-grow">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Zajímavé odkazy</h1>
          <p className="mt-4 text-lg text-gray-600">
            Výběr zajímavých videí, článků a odkazů spojených s naším městem a rybářskou tématikou.
          </p>
        </div>

        <div className="mx-auto max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-6">
          {odkazy.map((odkaz, idx) => (
            <a 
              key={idx} 
              href={odkaz.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-50 border border-gray-100 rounded-2xl p-6 flex gap-4 items-center hover:bg-green-50 hover:border-green-200 transition group"
            >
              <div className="text-green-600 group-hover:scale-110 transition-transform">
                {odkaz.icon}
              </div>
              <div className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                {odkaz.title}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
