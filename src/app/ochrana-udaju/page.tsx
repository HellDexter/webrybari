export default function GDPRPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">Ochrana osobních údajů (GDPR)</h1>
        
        <div className="prose prose-green text-gray-600">
          <p>
            Tato stránka obsahuje informace o tom, jak naše organizace (ČRS MO Týn nad Vltavou) nakládá s vašimi osobními údaji v souladu s nařízením GDPR.
          </p>
          
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Správce údajů</h2>
          <p>
            Správcem vašich osobních údajů je: <br />
            <strong>Český rybářský svaz, z. s., místní organizace Týn nad Vltavou</strong><br />
            Zadní Podskalí 773, 375 01 Týn nad Vltavou<br />
            IČO: 00476838
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Rozsah zpracování</h2>
          <p>
            Zpracováváme údaje nezbytné pro výkon členských práv a povinností, vydávání povolenek k lovu ryb a informování členů o dění v organizaci.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Vaše práva</h2>
          <p>
            Máte právo na přístup ke svým údajům, jejich opravu, výmaz nebo omezení zpracování. V případě dotazů nás kontaktujte na info@rybarityn.cz.
          </p>
          
          <p className="mt-12 text-sm italic">
            Tato stránka slouží jako základní informační přehled. Kompletní dokumentace je k nahlédnutí v sídle organizace.
          </p>
        </div>
      </div>
    </div>
  )
}
