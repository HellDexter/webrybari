import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { logout } from './actions'
import { Home, FileText, Image as ImageIcon, Users, LogOut, MessageSquare, Globe } from 'lucide-react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, first_name, last_name')
    .eq('id', user.id)
    .single()

  if (!profile || (profile.role !== 'admin' && profile.role !== 'superuser')) {
    redirect('/')
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-green-400">Administrace</h2>
          <p className="text-sm text-gray-400 mt-1">ČRS MO Týn nad Vltavou</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition">
            <Home className="w-5 h-5" /> Přehled
          </Link>
          <Link href="/admin/clanky" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition">
            <FileText className="w-5 h-5" /> Články a Novinky
          </Link>
          <Link href="/admin/fotogalerie" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition">
            <ImageIcon className="w-5 h-5" /> Fotogalerie
          </Link>
          <Link href="/admin/dotazy" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition">
            <MessageSquare className="w-5 h-5" /> Dotazy a odpovědi
          </Link>
          <Link href="/admin/komunikace" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition text-green-400">
            <MessageSquare className="w-5 h-5" /> Týmový Chat
          </Link>
          {profile?.role === 'superuser' && (
            <Link href="/admin/uzivatele" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition">
              <Users className="w-5 h-5" /> Správa uživatelů
            </Link>
          )}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <Link href="/" className="flex w-full items-center gap-3 px-3 py-2 mb-6 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition">
            <Globe className="w-5 h-5" /> Zpět na web
          </Link>

          <div className="mb-4 px-2">
            <p className="text-sm font-medium">{profile?.first_name || 'Uživatel'} {profile?.last_name || ''}</p>
            <p className="text-xs text-gray-400">Role: {profile?.role}</p>
          </div>
          <form action={logout}>
            <button className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-red-400 hover:bg-gray-800 rounded-md transition">
              <LogOut className="w-5 h-5" /> Odhlásit se
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
