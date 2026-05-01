import { MapPin, Navigation, MessageSquare } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Kontakt | ČRS MO Týn nad Vltavou",
};

export default function KontaktPage() {
  return (
    <div className="bg-white py-24 sm:py-32 flex-grow">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Kontakt</h1>
          <p className="mt-4 text-lg text-gray-600">
            Kde nás najdete a jak nás můžete kontaktovat.
          </p>
        </div>

        <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Adresa organizace</h2>
              
              <div className="space-y-6">
                <div>
                  <div className="font-bold text-gray-900 text-lg mb-1">Místní organizace Českého rybářského svazu</div>
                  <div className="text-gray-600 mb-2">IČ: 60073292</div>
                  <div className="flex items-start gap-3 text-gray-600 mt-4">
                    <MapPin className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span>
                      Zadní Podskalí 773<br />
                      375 01 Týn nad Vltavou
                    </span>
                  </div>
                </div>
                
                <div className="pt-4">
                  <a 
                    href="https://mapy.cz/zakladni?route=1&to=Zadní+Podskalí+773,Týn+nad+Vltavou" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-green-700 transition"
                  >
                    Navigovat <Navigation className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
              <h2 className="text-xl font-bold text-green-900 mb-4">Kontakty na výbor</h2>
              <p className="text-green-800 mb-4">
                Pro řešení konkrétních dotazů ohledně povolenek, školení nebo brigád prosím kontaktujte přímo konkrétního člena výboru.
              </p>
              <Link href="/o-nas/vybor" className="font-bold text-green-700 hover:text-green-800 underline">
                Zobrazit seznam členů výboru &rarr;
              </Link>
            </div>

            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
              <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-blue-600" />
                Dotazy a komentáře
              </h2>
              <p className="text-blue-800 mb-4">
                Máte obecný dotaz k fungování svazu, revírům nebo pravidlům? Podívejte se do naší poradny, kde najdete odpovědi na nejčastější otázky.
              </p>
              <Link href="/dotazy" className="inline-flex items-center gap-2 font-bold text-blue-700 hover:text-blue-800 underline">
                Přejít do poradny &rarr;
              </Link>
            </div>
          </div>

          <div className="bg-gray-100 rounded-2xl h-[400px] lg:h-full min-h-[400px] overflow-hidden relative shadow-inner border border-gray-200">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2594.13615456381!2d14.41627667690186!3d49.22324137932483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470ca446f2545d31%3A0x67399a5e8c3e8a94!2zWmFkbsOtIFBvZHNrYWzDrSA3NzMsIDM3NSAwMSBUw71uIG5hZCBWbHRhdm91!5e0!3m2!1scs!2scz!4v1714582800000!5m2!1scs!2scz" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy"
              title="Mapa MO"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
