import { createClient } from '@/utils/supabase/server'
import QuestionItem from './QuestionItem'

export default async function QuestionsAdminPage() {
  const supabase = await createClient()

  // Načtení všech dotazů od nejnovějšího
  const { data: questions } = await supabase
    .from('questions')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dotazy a komentáře</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <p className="text-gray-600 mb-8">
          Zde uvidíte všechny dotazy zanechané návštěvníky webu. Můžete k nim připsat odpověď a rozhodnout se, zda je chcete rovnou zveřejnit na veřejném webu.
        </p>

        <div className="space-y-6 divide-y divide-gray-100">
          {questions && questions.length > 0 ? (
            questions.map((q) => (
              <QuestionItem key={q.id} question={q} />
            ))
          ) : (
            <div className="py-12 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              Zatím nemáte žádné dotazy od návštěvníků.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
