'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Menu, X, ChevronDown, User, LogOut, MapPin, Phone, Mail,
  Info, History, Users, ExternalLink, Map, Shield, ScrollText, 
  GraduationCap, Receipt, UserCircle, Baby, Newspaper, Trophy, 
  Hammer, Fish, AlertCircle, Camera, MessageSquare, ArrowRight
} from 'lucide-react'
import { logout } from '@/app/admin/actions'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

const navigation = [
  {
    name: 'O nás',
    items: [
      { name: 'O organizaci', href: '/o-nas/organizace', desc: 'Kdo jsme a jaké je naše poslání', icon: Info },
      { name: 'Historie', href: '/o-nas/historie', desc: 'Dlouhá tradice rybářství v Týně', icon: History },
      { name: 'Výbor a kontakt', href: '/o-nas/vybor', desc: 'Lidé, kteří vedou naši organizaci', icon: Users },
      { name: 'Zajímavé odkazy', href: '/o-nas/odkazy', desc: 'Užitečné zdroje pro rybáře', icon: ExternalLink },
      { name: 'Napište nám', href: '/kontakt', desc: 'Kontaktní formulář a adresa', icon: Mail },
    ]
  },
  {
    name: 'Pro rybáře',
    items: [
      { name: 'Naše revíry', href: '/pro-rybare/reviry', desc: 'Detailní mapy a popisy vod', icon: Map },
      { name: 'Rybářská stráž', href: '/pro-rybare/rybarska-straz', desc: 'Informace o kontrole a hlášení', icon: Shield },
      { name: 'Rybářský řád', href: '/pro-rybare/rad', desc: 'Pravidla lovu pro aktuální rok', icon: ScrollText },
      { name: 'Získání RL', href: '/pro-rybare/skoleni', desc: 'Školení pro nové rybáře', icon: GraduationCap },
    ]
  },
  {
    name: 'Členství',
    items: [
      { name: 'Ceny povolenek', href: '/clenstvi/ceny', desc: 'Ceník a výdejní místa', icon: Receipt },
      { name: 'Info pro členy', href: '/clenstvi/informace', desc: 'Práva a povinnosti člena', icon: UserCircle },
      { name: 'Práce s mládeží', href: '/clenstvi/mladez', desc: 'Kroužky a akce pro děti', icon: Baby },
    ]
  },
  {
    name: 'Aktuality',
    items: [
      { name: 'Všechny novinky', href: '/aktuality', desc: 'Kompletní přehled dění', icon: Newspaper },
      { name: 'Závody', href: '/aktuality?kategorie=Závody', desc: 'Termíny a výsledky soutěží', icon: Trophy },
      { name: 'Brigády', href: '/aktuality?kategorie=Brigády', desc: 'Plánované pracovní akce', icon: Hammer },
      { name: 'Zarybňování', href: '/aktuality?kategorie=Zarybňování', desc: 'Zprávy o vysazování ryb', icon: Fish },
      { name: 'Hlášení stráže', href: '/aktuality?kategorie=straz', desc: 'Aktuální situace u vody', icon: AlertCircle },
    ]
  },
  {
    name: 'Média',
    items: [
      { name: 'Fotogalerie', href: '/fotogalerie', desc: 'Momentky z našich akcí', icon: Camera },
      { name: 'Dotazy', href: '/dotazy', desc: 'Časté otázky a odpovědi', icon: MessageSquare },
    ]
  }
]

type UserProfile = { first_name: string; last_name: string; role: string } | null

export default function Navbar({ userProfile }: { userProfile: UserProfile }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  // Efekt pro změnu vzhledu při scrollu
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'}`}>
      {/* Horní informační lišta - nyní kompaktnější a v prémiovém stylu */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-green-950 text-white overflow-hidden hidden md:block border-b border-white/5"
          >
            <div className="mx-auto max-w-7xl px-8 py-2.5 flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
              <div className="flex gap-10">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-3.5 h-3.5 text-green-500" />
                  <span>Zadní Podskalí 773, Týn n. Vlt.</span>
                </div>
                <a href="tel:+420724034501" className="flex items-center gap-2.5 hover:text-white transition-colors">
                  <Phone className="w-3.5 h-3.5 text-green-500" />
                  <span>+420 724 034 501</span>
                </a>
              </div>
              <a href="mailto:info@rybarityn.cz" className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5 text-green-500" />
                <span>info@rybarityn.cz</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className={`mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 transition-all duration-500 ${isScrolled ? 'py-2' : 'py-4'}`} aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="flex items-center group">
            <div className="flex flex-col">
              <span className="text-xl font-black text-gray-900 leading-none tracking-tight group-hover:text-green-600 transition-colors">
                ČRS MO <span className="text-green-600 group-hover:text-green-700 transition-colors">Týn</span> nad Vltavou
              </span>
              <span className="mt-1.5 text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">Místní organizace</span>
            </div>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="p-2.5 text-gray-700 bg-gray-100 rounded-xl hover:bg-green-50 hover:text-green-600 transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden lg:flex lg:gap-x-2">
          <Link 
            href="/" 
            className={`px-4 py-2 text-sm font-bold tracking-wide transition-all rounded-xl ${pathname === '/' ? 'text-green-600 bg-green-50' : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'}`}
          >
            Úvod
          </Link>

          {navigation.map((navItem) => (
            <div 
              key={navItem.name} 
              className="relative"
              onMouseEnter={() => setActiveDropdown(navItem.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`flex items-center gap-x-1.5 px-4 py-2 text-sm font-bold tracking-wide transition-all rounded-xl outline-none ${activeDropdown === navItem.name ? 'text-green-600 bg-green-50' : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'}`}>
                {navItem.name}
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${activeDropdown === navItem.name ? 'rotate-180 text-green-500' : 'text-gray-300'}`} />
              </button>

              {/* Mega-menu Dropdown */}
              <AnimatePresence>
                {activeDropdown === navItem.name && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -left-10 top-full pt-4 w-[320px] z-[60]"
                  >
                    <div className="rounded-[2rem] bg-white/95 backdrop-blur-xl p-3 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] ring-1 ring-black/5 border border-white/50">
                      <div className="grid grid-cols-1 gap-1">
                        {navItem.items.map((item, idx) => (
                          <motion.div
                            key={item.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <Link
                              href={item.href}
                              className="group flex items-start gap-4 rounded-2xl p-3 transition-all hover:bg-green-50"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div className="flex-auto">
                                <p className="text-sm font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                                  {item.name}
                                </p>
                                <p className="mt-0.5 text-xs font-medium text-gray-400 leading-tight">
                                  {item.desc}
                                </p>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          {userProfile ? (
            <div className="flex items-center gap-3 bg-gray-50 p-1 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-2.5 pl-3 pr-2 text-sm font-bold text-gray-700">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <UserCircle className="w-5 h-5 text-green-600" />
                </div>
                <span>{userProfile.first_name}</span>
              </div>
              
              {['superuser', 'administrator'].includes(String(userProfile.role).toLowerCase()) && (
                <Link href="/admin" className="text-xs font-black tracking-widest leading-6 text-white bg-green-600 hover:bg-green-500 px-5 py-2 rounded-xl shadow-md hover:shadow-green-200 transition-all uppercase">
                  Admin
                </Link>
              )}

              <form action={logout}>
                <button type="submit" className="text-gray-400 hover:text-red-600 transition p-2 hover:bg-red-50 rounded-xl" title="Odhlásit se">
                  <LogOut className="w-5 h-5" />
                </button>
              </form>
            </div>
          ) : (
            <Link href="/login" className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-gray-700 hover:text-green-600 bg-gray-50 hover:bg-green-50 rounded-xl transition-all border border-gray-100">
              <User className="w-4 h-4" />
              Přihlásit se
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile menu - Fix visibility a výšky */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] lg:hidden"
          >
            {/* Tmavý podklad (Overlay) */}
            <div className="fixed inset-0 bg-gray-950/60 backdrop-blur-md" onClick={() => setMobileMenuOpen(false)}></div>
            
            {/* Bílý panel s menu */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-[320px] bg-white shadow-2xl flex flex-col h-screen overflow-hidden"
            >
              {/* Hlavička menu - pevná nahoře */}
              <div className="flex-none px-6 py-6 border-b border-gray-100 flex items-center justify-between bg-white">
                <div className="flex flex-col">
                  <span className="text-xl font-black text-gray-900 leading-none">
                    ČRS MO <span className="text-green-600">Týn</span>
                  </span>
                  <span className="mt-1 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Navigace webu</span>
                </div>
                <button
                  type="button"
                  className="p-2 rounded-xl bg-gray-50 text-gray-700 active:bg-red-50 active:text-red-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-7 w-7" />
                </button>
              </div>
              
              {/* Scrollovatelný obsah menu */}
              <div className="flex-1 overflow-y-auto px-6 py-8 space-y-10">
                <Link 
                  href="/" 
                  className="block text-lg font-black text-white bg-green-600 p-5 rounded-2xl shadow-lg shadow-green-100 text-center" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  HLAVNÍ STRANA
                </Link>
                
                <div className="space-y-8 pb-10">
                  {navigation.map((navItem) => (
                    <div key={navItem.name} className="space-y-3">
                      <div className="text-[10px] font-black text-gray-300 uppercase tracking-widest pl-4">{navItem.name}</div>
                      <div className="space-y-1">
                        {navItem.items.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex flex-col rounded-2xl p-4 transition-all active:bg-green-50 border border-transparent active:border-green-100"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <span className="text-base font-bold text-gray-900">{item.name}</span>
                            <span className="text-xs font-medium text-gray-400 line-clamp-1">{item.desc}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Uživatelská sekce v mobilu */}
                  <div className="pt-8 border-t border-gray-100">
                    {userProfile ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                          <UserCircle className="w-8 h-8 text-green-600" />
                          <div className="flex flex-col">
                             <span className="font-bold text-gray-900">{userProfile.first_name}</span>
                             <span className="text-[10px] font-bold text-gray-400 uppercase">{userProfile.role}</span>
                          </div>
                        </div>
                        
                        {['superuser', 'administrator'].includes(String(userProfile.role).toLowerCase()) && (
                          <Link 
                            href="/admin" 
                            className="block w-full py-4 text-center text-white bg-green-600 font-black rounded-2xl shadow-md"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            ADMINISTRACE
                          </Link>
                        )}
                        
                        <form action={logout}>
                          <button type="submit" className="w-full py-4 text-red-600 font-bold active:bg-red-50 rounded-2xl">
                            Odhlásit se
                          </button>
                        </form>
                      </div>
                    ) : (
                      <Link 
                        href="/login" 
                        className="block w-full py-4 text-center text-white bg-gray-900 font-black rounded-2xl shadow-lg"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        PŘIHLÁSIT SE
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
