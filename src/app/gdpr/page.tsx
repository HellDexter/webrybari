export const metadata = {
  title: "Zásady ochrany osobních údajů (GDPR) | ČRS MO Týn nad Vltavou",
  description: "Informace o zpracování a ochraně osobních údajů Českého rybářského svazu, z. s., místní organizace Týn nad Vltavou.",
};

export default function GDPRPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="prose prose-slate lg:prose-lg mx-auto dark:prose-invert">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Zásady ochrany osobních údajů
        </h1>
        <p className="mt-4 text-slate-500 dark:text-slate-400">
          Poslední aktualizace: {new Date().toLocaleDateString("cs-CZ")}
        </p>

        <div className="mt-10 space-y-8 text-slate-700 dark:text-slate-300">
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">1. Úvodní ustanovení</h2>
            <p className="mt-4">
              Český rybářský svaz, z. s., místní organizace Týn nad Vltavou (dále jen „Správce“), dbá na ochranu osobních údajů v souladu s platnou legislativou, zejména nařízením Evropského parlamentu a Rady (EU) 2016/679 (GDPR). Tento dokument poskytuje informace o tom, jaké osobní údaje shromažďujeme, jak s nimi nakládáme a z jakých důvodů.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">2. Kontaktní údaje správce</h2>
            <p className="mt-4">
              <strong>Název:</strong> Český rybářský svaz, z. s., místní organizace Týn nad Vltavou<br />
              <strong>Sídlo:</strong> Zadní Podskalí 773, 375 01 Týn nad Vltavou<br />
              <strong>E-mail:</strong> info@rybarityn.cz<br />
              <em>(Případně doplňte skutečný kontakt)</em>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">3. Jaké osobní údaje zpracováváme</h2>
            <p className="mt-4">
              Zpracováváme pouze osobní údaje, které nám poskytnete v souvislosti s členstvím, žádostí o vydání povolenky, přihlášením na akce (závody) nebo při komunikaci s námi. Může se jednat zejména o:
            </p>
            <ul className="mt-2 list-disc pl-6">
              <li>Jméno a příjmení, datum narození, rodné číslo (pro účely evidence členů a povolenek dle zákona).</li>
              <li>Kontaktní údaje (adresa trvalého pobytu, doručovací adresa, telefonní číslo, e-mail).</li>
              <li>Číslo rybářského lístku a údaje o vydaných povolenkách.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">4. Účel zpracování osobních údajů</h2>
            <ul className="mt-4 list-disc pl-6">
              <li><strong>Plnění právní povinnosti a smlouvy:</strong> Evidence členů a vydávání povolenek k lovu ryb v souladu se zákonem o rybářství.</li>
              <li><strong>Oprávněný zájem:</strong> Zasílání důležitých informací členům (pozvánky na schůze, informace o brigádách).</li>
              <li><strong>Souhlas:</strong> Zveřejňování fotografií z akcí (závody, kroužky) na webových stránkách.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">5. Doba uchování údajů</h2>
            <p className="mt-4">
              Vaše údaje uchováváme pouze po dobu nezbytně nutnou. U členů je to po dobu trvání členství a následně po dobu stanovenou archivačními a zákonnými předpisy. Údaje zpracovávané na základě souhlasu uchováváme do jeho odvolání.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">6. Vaše práva</h2>
            <p className="mt-4">
              V souvislosti se zpracováním osobních údajů máte právo:
            </p>
            <ul className="mt-2 list-disc pl-6">
              <li>Na přístup k osobním údajům.</li>
              <li>Na opravu nepřesných nebo neaktuálních údajů.</li>
              <li>Na výmaz (právo „být zapomenut“), pokud již údaje nejsou potřeba pro účely, pro které byly shromážděny.</li>
              <li>Na omezení zpracování.</li>
              <li>Vznést námitku proti zpracování na základě oprávněného zájmu.</li>
              <li>Podat stížnost u Úřadu pro ochranu osobních údajů (ÚOOÚ).</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
