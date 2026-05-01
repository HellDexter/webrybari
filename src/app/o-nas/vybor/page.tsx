import { Phone, Mail, User } from "lucide-react";

export const metadata = {
  title: "Výbor a Kontakty | ČRS MO Týn nad Vltavou",
};

export default function VyborPage() {
  const vybor = [
    { role: "Předseda", name: "Jaroslav Švehla", phone: "603 155 393", email: "Stavoinstal.Svehla@seznam.cz" },
    { role: "Jednatel", name: "Ing. Eduard Frýba", phone: "725 182 712", email: "frybaeduard@seznam.cz" },
    { role: "Ekonom, pokladník", name: "Libor Bukovský" },
    { role: "Hospodář", name: "Jiří Nekola", phone: "606 134 007", email: "jiri.nekola@seznam.cz" },
    { role: "Zástupce hospodáře", name: "Josef Vlk" },
    { role: "Práce s mládeží", name: "Mgr. Miroslav Janál" },
    { role: "Rybniční referent", name: "Aleš Švehla" },
    { role: "Správce klubovny", name: "Josef Vančata" },
    { role: "Kulturní referent", name: "Ing. Václav Rejnart" },
  ];

  const dozorciKomise = [
    { role: "Předseda komise", name: "MVDr. Jiří Mikeš", phone: "606 460 671", email: "mikes@c-box.cz" },
    { role: "Člen komise", name: "MVDr. Josef Bednář" },
    { role: "Člen komise", name: "Ing. Josef Panoch" },
  ];

  return (
    <div className="bg-gray-50 py-24 sm:py-32 flex-grow">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Výbor ČRS, z.s., MO Týn nad Vltavou</h1>
          <p className="mt-4 text-lg text-gray-600">
            Představitelé naší místní organizace a kontaktní údaje pro případné dotazy.
          </p>
        </div>

        {/* Sekce Výbor */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b pb-4">Členové výboru</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vybor.map((member, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-md transition">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{member.name}</h3>
                    <p className="text-xs font-medium text-green-600 uppercase tracking-wide">{member.role}</p>
                  </div>
                </div>
                
                <div className="mt-auto space-y-2 text-sm text-gray-600">
                  {member.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <a href={`tel:${member.phone.replace(/\s+/g, '')}`} className="hover:text-green-600 transition">{member.phone}</a>
                    </div>
                  )}
                  {member.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <a href={`mailto:${member.email}`} className="hover:text-green-600 transition">{member.email}</a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sekce Dozorčí komise */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b pb-4">Dozorčí komise</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dozorciKomise.map((member, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-md transition">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{member.name}</h3>
                    <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">{member.role}</p>
                  </div>
                </div>
                
                <div className="mt-auto space-y-2 text-sm text-gray-600">
                  {member.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <a href={`tel:${member.phone.replace(/\s+/g, '')}`} className="hover:text-blue-600 transition">{member.phone}</a>
                    </div>
                  )}
                  {member.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <a href={`mailto:${member.email}`} className="hover:text-blue-600 transition">{member.email}</a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
