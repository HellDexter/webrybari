import { createClient } from '@/utils/supabase/server'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user?.id)
    .single()

  // Statistiky článků
  const { count: publishedArticlesCount } = await supabase
    .from('articles')
    .select('*', { count: 'exact', head: true })
    .eq('published', true)

  const { count: draftArticlesCount } = await supabase
    .from('articles')
    .select('*', { count: 'exact', head: true })
    .eq('published', false)

  // Statistiky dotazů
  const { count: pendingQuestionsCount } = await supabase
    .from('questions')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending')

  const { count: photosCount } = await supabase
    .from('photos')
    .select('*', { count: 'exact', head: true })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Přehled</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        
        {/* Role uživatele */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Vaše role</h3>
          <p className="text-2xl font-bold text-green-700 capitalize">{profile?.role || 'Uživatel'}</p>
        </div>

        {/* Upozornění na dotazy */}
        <div className={`p-6 rounded-xl shadow-sm border flex flex-col justify-between ${
          (pendingQuestionsCount || 0) > 0 
            ? 'bg-red-50 border-red-200' 
            : 'bg-white border-gray-100'
        }`}>
          <h3 className={`text-xs font-bold uppercase tracking-widest mb-2 ${
            (pendingQuestionsCount || 0) > 0 ? 'text-red-700' : 'text-gray-500'
          }`}>Nové dotazy k vyřízení</h3>
          <p className={`text-4xl font-black ${
            (pendingQuestionsCount || 0) > 0 ? 'text-red-600' : 'text-gray-900'
          }`}>
            {pendingQuestionsCount || 0}
          </p>
        </div>

        {/* Články - Koncepty */}
        <div className={`p-6 rounded-xl shadow-sm border flex flex-col justify-between ${
          (draftArticlesCount || 0) > 0 
            ? 'bg-orange-50 border-orange-200' 
            : 'bg-white border-gray-100'
        }`}>
          <h3 className={`text-xs font-bold uppercase tracking-widest mb-2 ${
            (draftArticlesCount || 0) > 0 ? 'text-orange-700' : 'text-gray-500'
          }`}>Články v editaci (Koncepty)</h3>
          <p className={`text-4xl font-black ${
            (draftArticlesCount || 0) > 0 ? 'text-orange-600' : 'text-gray-900'
          }`}>
            {draftArticlesCount || 0}
          </p>
        </div>

        {/* Články - Publikované */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Publikované články</h3>
          <p className="text-4xl font-black text-blue-600">{publishedArticlesCount || 0}</p>
        </div>

        {/* Fotografie */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Fotografií v galerii</h3>
          <p className="text-4xl font-black text-gray-900">{photosCount || 0}</p>
        </div>

      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Vítejte v nové administraci</h2>
        <p className="text-gray-600 mb-4">
          Odsud můžete spravovat veškerý obsah na webu ČRS MO Týn nad Vltavou. V levém menu najdete jednotlivé sekce.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li><strong>Články a Novinky:</strong> Místo pro psaní aktualit, pozvánek na závody nebo reportů.</li>
          <li><strong>Fotogalerie:</strong> Sem můžete nahrávat fotky z akcí nebo úlovky.</li>
          {profile?.role === 'superuser' && (
            <li><strong>Správa uživatelů:</strong> Jakožto hlavní administrátor zde můžete spravovat přístupy pro zástupce ostatních lodí.</li>
          )}
        </ul>
      </div>
    </div>
  )
}
