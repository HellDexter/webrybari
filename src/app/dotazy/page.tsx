import { createClient } from "@/utils/supabase/server";
import { MessageSquare, Calendar, User } from "lucide-react";
import QuestionForm from "./QuestionForm";

export const metadata = {
  title: "Dotazy a komentáře | ČRS MO Týn nad Vltavou",
};

export const revalidate = 60; // Revalidate every minute

export default async function DotazyPage() {
  const supabase = await createClient();

  // Získání pouze zodpovězených dotazů, seřazených od nejnovějších
  const { data: questions } = await supabase
    .from("questions")
    .select("id, author_name, content, answer, created_at, answered_at")
    .eq("status", "answered")
    .order("answered_at", { ascending: false });

  // Formátování data
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("cs-CZ", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-gray-50 py-16 sm:py-24 flex-grow">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Hlavička */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <MessageSquare className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            Dotazy a komentáře
          </h1>
          <p className="text-lg text-gray-600">
            Zde můžete položit dotaz výboru. Odpovědi na zajímavé a časté otázky zveřejňujeme pro všechny členy.
          </p>
        </div>

        <div className="mx-auto max-w-4xl grid grid-cols-1 lg:grid-cols-1 gap-12">
          
          {/* Formulář */}
          <div>
            <QuestionForm />
          </div>

          {/* Seznam zodpovězených dotazů */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b pb-4">
              Zodpovězené dotazy
            </h2>

            {(!questions || questions.length === 0) ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">Zatím zde nejsou žádné zodpovězené dotazy.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {questions.map((q) => (
                  <div key={q.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Sekce dotazu */}
                    <div className="p-6 sm:p-8 bg-white border-b border-gray-100">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4" />
                          </div>
                          <span className="font-bold text-gray-900">{q.author_name}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(q.created_at)}
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{q.content}</p>
                    </div>

                    {/* Sekce odpovědi */}
                    {q.answer && (
                      <div className="p-6 sm:p-8 bg-green-50 border-l-4 border-green-500">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-bold text-green-900">Odpověď výboru MO:</span>
                          {q.answered_at && (
                            <span className="text-xs text-green-700">{formatDate(q.answered_at)}</span>
                          )}
                        </div>
                        <p className="text-green-800 leading-relaxed whitespace-pre-wrap">{q.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
