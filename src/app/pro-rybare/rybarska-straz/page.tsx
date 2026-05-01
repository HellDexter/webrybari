import { Shield, AlertTriangle, Phone, Info, MessageSquare, CheckCircle } from "lucide-react";
import { createClient } from '@/utils/supabase/server';

export const metadata = {
  title: "Rybářská stráž | ČRS MO Týn nad Vltavou",
};

export default async function RybarskaStrazPage() {
  const supabase = await createClient();
  const { data: messages } = await supabase
    .from('guard_messages')
    .select('*')
    .order('created_at', { ascending: false });

  const clenoveRS = [
    { name: "Pavel Frýba", role: "Profesionální rybářská stráž", phone: "724 246 226", highlighted: true },
    { name: "Aleš Švehla" }, { name: "Josef Vančata" }, { name: "Jaroslav Švehla" },
    { name: "Josef Vlk" }, { name: "Jaroslav Kocián" }, { name: "Tomáš Kocián" },
    { name: "Eduard Frýba" }, { name: "Jaroslav Mašek" }, { name: "Václav Rejnart" },
    { name: "Mgr. Miroslav Janál" }, { name: "Pavel Valha" }, { name: "Libor Bukovský" },
    { name: "Zdeněk Říha" }, { name: "Tomáš Vácha" }
  ];

  return (
    <div className="bg-white py-24 sm:py-32 flex-grow">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl flex items-center justify-center gap-4">
            <Shield className="w-12 h-12 text-red-600" /> Rybářská stráž
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Ochrana revírů, čistota vod a kontrola dodržování rybářského řádu.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Levý sloupec - Informace a Návody */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Hlášení od RS */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-blue-600" /> Aktuální upozornění RS
              </h2>
              <div className="space-y-4">
                {messages && messages.length > 0 ? (
                  messages.map((msg) => (
                    <div key={msg.id} className={`p-6 rounded-2xl border ${msg.is_important ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className={`font-bold text-lg ${msg.is_important ? 'text-red-900' : 'text-gray-900'}`}>
                          {msg.is_important && '⚠️ '}{msg.title}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {new Date(msg.created_at).toLocaleDateString('cs-CZ')}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-4">{msg.content}</p>
                      
                      {msg.image_urls && msg.image_urls.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
                          {msg.image_urls.map((url: string, idx: number) => (
                            <a 
                              key={idx} 
                              href={url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="aspect-square rounded-xl overflow-hidden border border-gray-200 hover:opacity-90 transition shadow-sm"
                            >
                              <img src={url} alt={`Foto k hlášení ${idx + 1}`} className="w-full h-full object-cover" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">Momentálně nejsou žádná nová hlášení.</p>
                )}
              </div>
            </section>

            {/* Jak komunikovat */}
            <section className="bg-blue-900 text-white p-8 rounded-[2.5rem] shadow-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 -m-8 opacity-10">
                <Shield className="w-64 h-64" />
              </div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Info className="w-6 h-6" /> Jak komunikovat s RS?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-4">
                  <h3 className="font-bold text-blue-300 uppercase tracking-wider text-sm">Co hlásit?</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      <span>Podezření na pytláctví nebo nelegální lov.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      <span>Úhyn ryb nebo znečištění vodní hladiny.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      <span>Nalezené černé skládky u břehů revírů.</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold text-blue-300 uppercase tracking-wider text-sm">Při kontrole</h3>
                  <ul className="space-y-2 text-blue-50">
                    <li>• Zachovejte klid a slušné chování.</li>
                    <li>• Na požádání předložte platné doklady.</li>
                    <li>• RS se prokazuje odznakem a průkazem.</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Pravý sloupec - Seznam členů */}
          <div className="space-y-8">
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-gray-400" /> Členové stráže
              </h2>
              <div className="space-y-4">
                {clenoveRS.map((member, i) => (
                  <div key={i} className={`p-4 rounded-xl border ${member.highlighted ? 'bg-white border-red-200 shadow-sm ring-1 ring-red-100' : 'bg-transparent border-transparent'}`}>
                    <p className={`font-bold ${member.highlighted ? 'text-red-900' : 'text-gray-900'}`}>{member.name}</p>
                    <p className="text-xs text-gray-500 mb-2">{member.role || 'Člen RS'}</p>
                    {member.phone && (
                      <a href={`tel:${member.phone.replace(/\s+/g, '')}`} className="flex items-center gap-2 text-sm font-bold text-red-600 hover:underline">
                        <Phone className="w-4 h-4" /> {member.phone}
                      </a>
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-8 text-xs text-gray-400 leading-relaxed italic">
                Rybářská stráž je veřejným činitelem a požívá ochrany dle zvláštních právních předpisů.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Users({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}
