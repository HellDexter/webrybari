import { createClient } from '@/utils/supabase/server'
import ChatClient from './ChatClient'

export default async function ChatPage() {
  const supabase = await createClient()

  // Získání aktuálně přihlášeného uživatele a jeho profilu
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id)
    .single()

  // Načtení historických zpráv (posledních 50 zpráv, seřazeno od nejstarší po nejnovější v klientské části)
  const { data: initialMessages, error } = await supabase
    .from('admin_messages')
    .select(`
      *,
      author:profiles (
        id,
        first_name,
        last_name,
        role
      )
    `)
    .order('created_at', { ascending: false })
    .limit(50)

  // Obrátíme pole, aby nejnovější byly dole
  const sortedMessages = (initialMessages || []).reverse()

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Týmový Chat</h1>
          <p className="text-gray-500 text-sm mt-1">
            Interní komunikace pro administrátory. Zprávy vidí pouze přihlášení členové výboru.
          </p>
        </div>
      </div>

      {error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl shadow-sm border border-red-200">
          <p className="font-bold">Chyba načítání zpráv:</p>
          <p className="text-sm font-mono mt-1">{error.message}</p>
          <p className="text-sm mt-4">Ujistěte se, že jste v Supabase vytvořili tabulku <code>admin_messages</code> podle přiloženého SQL skriptu.</p>
        </div>
      ) : (
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <ChatClient 
            initialMessages={sortedMessages} 
            currentUser={profile} 
          />
        </div>
      )}
    </div>
  )
}
