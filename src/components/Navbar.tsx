'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, User, LogOut, MapPin, Phone, Mail } from 'lucide-react'
import { logout } from '@/app/admin/actions'

// ... existing code navigation definition ...

const navigation = [
  {
    name: 'O nás',
    items: [
      { name: 'O organizaci', href: '/o-nas/organizace' },
      { name: 'Historie', href: '/o-nas/historie' },
      { name: 'Výbor MO a kontakt', href: '/o-nas/vybor' },
      { name: 'Zajímavé odkazy', href: '/o-nas/odkazy' },
      { name: 'Kontakt', href: '/kontakt' },
    ]
  },
  {
    name: 'Pro rybáře',
    items: [
      { name: 'Naše revíry', href: '/pro-rybare/reviry' },
      { name: 'Rybářský řád', href: '/pro-rybare/rad' },
      { name: 'Školení k získání RL', href: '/pro-rybare/skoleni' },
    ]
  },
  {
    name: 'Členství a povolenky',
    items: [
      { name: 'Ceny a výdej povolenek', href: '/clenstvi/ceny' },
      { name: 'Informace pro členy', href: '/clenstvi/informace' },
      { name: 'Práce s mládeží', href: '/clenstvi/mladez' },
    ]
  },
  {
    name: 'Dění v organizaci',
    items: [
      { name: 'Aktuality a zprávy', href: '/aktuality' },
      { name: 'Závody', href: '/aktuality?kategorie=Závody' },
      { name: 'Brigády', href: '/aktuality?kategorie=Brigády' },
      { name: 'Zarybňování', href: '/aktuality?kategorie=Zarybňování' },
    ]
  },
  {
    name: 'Média a dotazy',
    items: [
      { name: 'Fotogalerie', href: '/fotogalerie' },
      { name: 'Ptejte se (Dotazy)', href: '/dotazy' },
    ]
  }
]

type UserProfile = { first_name: string; last_name: string; role: string } | null

export default function Navbar({ userProfile }: { userProfile: UserProfile }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Horní informační lišta */}
      <div className="bg-green-900 text-white py-2 hidden md:block">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
          <div className="flex gap-8">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-green-400" />
              <span>Zadní Podskalí 773, 375 01 Týn nad Vltavou</span>
            </div>
            <a href="tel:+420724034501" className="flex items-center gap-2 hover:text-green-400 transition-colors">
              <Phone className="w-3.5 h-3.5 text-green-400" />
              <span>+420 724 034 501</span>
            </a>
          </div>
          <a href="mailto:info@rybarityn.cz" className="flex items-center gap-2 hover:text-green-400 transition-colors">
            <Mail className="w-3.5 h-3.5 text-green-400" />
            <span>info@rybarityn.cz</span>
          </a>
        </div>
      </div>

      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <span className="text-xl font-bold text-green-700 tracking-tight">ČRS Týn nad Vltavou</span>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Otevřít hlavní menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden lg:flex lg:gap-x-6">
          <Link href="/" className="text-sm font-semibold leading-6 text-gray-900 hover:text-green-600 transition whitespace-nowrap">
            Úvod
          </Link>

          {navigation.map((navItem) => (
            <div 
              key={navItem.name} 
              className="relative"
              onMouseEnter={() => setActiveDropdown(navItem.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 hover:text-green-600 transition outline-none whitespace-nowrap">
                {navItem.name}
                <ChevronDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
              </button>

              {/* Dropdown panel */}
              {activeDropdown === navItem.name && (
                <div className="absolute -left-4 top-full z-10 pt-2 w-56 transition-all duration-200 opacity-100 translate-y-0">
                  <div className="rounded-xl bg-white p-2 shadow-lg ring-1 ring-gray-900/5">
                    {navItem.items.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block rounded-lg px-4 py-2 text-sm font-semibold leading-6 text-gray-900 hover:bg-green-50 hover:text-green-600"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {userProfile ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-700 font-medium whitespace-nowrap bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                <User className="w-4 h-4 text-green-600" />
                <span>{userProfile.first_name}</span>
              </div>
              
              {(userProfile.role === 'superuser' || userProfile.role === 'administrator') && (
                <Link href="/admin" className="text-sm font-semibold leading-6 text-white bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-md transition whitespace-nowrap">
                  Administrace
                </Link>
              )}

              <form action={logout}>
                <button type="submit" className="text-gray-400 hover:text-red-600 transition p-1.5 bg-gray-50 hover:bg-red-50 rounded-md border border-gray-100" title="Odhlásit se">
                  <LogOut className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900 hover:text-green-600 transition whitespace-nowrap">
              Přihlásit se <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-50 bg-black/20" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-4 py-4 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xl font-bold text-green-700">ČRS Menu</span>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Zavřít menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            
            <div className="flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link href="/" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>
                    Úvod
                  </Link>
                  
                  {navigation.map((navItem) => (
                    <div key={navItem.name} className="space-y-1 pt-2">
                      <div className="px-3 text-sm font-bold text-gray-500 uppercase tracking-wider">{navItem.name}</div>
                      {navItem.items.map((item) => (
                         <Link
                          key={item.name}
                          href={item.href}
                          className="-mx-3 block rounded-lg px-6 py-2 text-base font-medium leading-7 text-gray-900 hover:bg-green-50 hover:text-green-600"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
                
                <div className="py-6">
                  {userProfile ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 px-3 text-sm font-medium text-gray-700 bg-gray-50 py-2 rounded-md">
                        <User className="w-4 h-4" />
                        <span>Přihlášen jako: {userProfile.first_name} {userProfile.last_name}</span>
                      </div>
                      
                      {(userProfile.role === 'superuser' || userProfile.role === 'administrator') && (
                        <Link href="/admin" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white bg-green-600 hover:bg-green-700 text-center" onClick={() => setMobileMenuOpen(false)}>
                          Přejít do Administrace
                        </Link>
                      )}
                      
                      <form action={logout}>
                        <button type="submit" className="-mx-3 flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-red-600 hover:bg-red-50">
                          <LogOut className="w-5 h-5" /> Odhlásit se
                        </button>
                      </form>
                    </div>
                  ) : (
                    <Link href="/login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>
                      Přihlásit se
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
