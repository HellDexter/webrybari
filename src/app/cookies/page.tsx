export const metadata = {
  title: "Zásady používání souborů cookies | ČRS MO Týn nad Vltavou",
  description: "Informace o tom, jaké cookies používáme a jak je můžete spravovat.",
};

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="prose prose-slate lg:prose-lg mx-auto dark:prose-invert">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Zásady používání souborů cookies
        </h1>
        <p className="mt-4 text-slate-500 dark:text-slate-400">
          Poslední aktualizace: {new Date().toLocaleDateString("cs-CZ")}
        </p>

        <div className="mt-10 space-y-8 text-slate-700 dark:text-slate-300">
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Co jsou to cookies?</h2>
            <p className="mt-4">
              Cookies jsou malé textové soubory, které se ukládají ve vašem prohlížeči při návštěvě našich webových stránek. Pomáhají nám zajistit základní fungování webu a analyzovat návštěvnost, abychom mohli naše služby neustále zlepšovat.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Jaké cookies používáme?</h2>
            
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6">Nezbytné (Technické) cookies</h3>
            <p className="mt-2">
              Tyto cookies jsou nutné pro správné fungování našeho webu (například pro uložení vašich preferencí ohledně samotných cookies nebo bezpečnostní funkce). K jejich použití nepotřebujeme váš souhlas a nelze je vypnout, aniž by to narušilo fungování stránky.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6">Analytické cookies</h3>
            <p className="mt-2">
              Pomáhají nám pochopit, jak návštěvníci náš web používají (např. Google Analytics). Zjišťujeme pomocí nich počty návštěv, nejoblíbenější stránky a zdroje návštěvnosti. Data jsou sbírána anonymně. Tyto cookies používáme <strong>pouze s vaším výslovným souhlasem</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Správa a nastavení cookies</h2>
            <p className="mt-4">
              Své preference ohledně ukládání cookies můžete kdykoliv změnit v nastavení vašeho internetového prohlížeče. Většina prohlížečů umožňuje cookies zcela odmítnout nebo smazat ty, které již byly uloženy.
            </p>
            <p className="mt-2">
              Pokud zakážete nezbytné cookies, může se stát, že některé části našeho webu nebudou fungovat správně.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Kontakt</h2>
            <p className="mt-4">
              Máte-li jakékoli dotazy k těmto zásadám, neváhejte nás kontaktovat prostřednictvím informací uvedených na stránce <a href="/kontakt" className="text-emerald-600 hover:text-emerald-500">Kontakt</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
