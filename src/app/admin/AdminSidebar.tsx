'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, FileText, Image as ImageIcon, Users, LogOut, MessageSquare, Globe, Menu, X, Calendar } from 'lucide-react'
import { logout } from './actions'

interface Profile {
  role: string
  first_name: string | null
  last_name: string | null
}

export default function AdminSidebar({ profile }: { profile: Profile }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Zavřít menu při změně stránky na mobilu
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const toggleMenu = () => setIsOpen(!isOpen)

  const navItems = [
    { href: '/admin', label: 'Přehled', icon: Home },
    { href: '/admin/clanky', label: 'Články a Novinky', icon: FileText },
    { href: '/admin/vydej', label: 'Výdej povolenek', icon: Calendar },
    { href: '/admin/kalendar', label: 'Kalendář akcí', icon: Calendar },
    { href: '/admin/fotogalerie', label: 'Fotogalerie', icon: ImageIcon },
    { href: '/admin/dotazy', label: 'Dotazy a odpovědi', icon: MessageSquare },
    { href: '/admin/komunikace', label: 'Týmový Chat', icon: MessageSquare, color: 'text-green-400' },
  ]

  return (
    <>
      {/* Mobile Header - viditelný jen na malých displejích */}
      <div className="lg:hidden bg-gray-900 text-white p-4 flex items-center justify-between sticky top-0 z-50">
        <div>
          <h2 className="text-lg font-bold text-green-400">Administrace</h2>
          <p className="text-xs text-gray-400">ČRS MO Týn n. Vlt.</p>
        </div>
        <button 
          onClick={toggleMenu}
          className="p-2 text-gray-300 hover:text-white transition"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Overlay pro mobil (ztmavení pozadí při otevřeném menu) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar samotný */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white flex flex-col transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 hidden lg:block">
          <h2 className="text-2xl font-bold text-green-400">Administrace</h2>
          <p className="text-sm text-gray-400 mt-1">ČRS MO Týn nad Vltavou</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link 
                key={item.href}
                href={item.href} 
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
                  isActive ? 'bg-gray-800 text-green-400' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                } ${item.color || ''}`}
              >
                <Icon className="w-5 h-5" /> {item.label}
              </Link>
            )
          })}
          
          {profile?.role === 'superuser' && (
            <Link 
              href="/admin/uzivatele" 
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
                pathname === '/admin/uzivatele' ? 'bg-gray-800 text-green-400' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
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
    </>
  )
}
