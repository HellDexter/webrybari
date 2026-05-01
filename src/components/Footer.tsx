import Link from 'next/link'
import { MapPin, Phone, Mail, ExternalLink, ShieldCheck } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Logo a info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold tracking-tight text-green-500">ČRS Týn nad Vltavou</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Místní organizace Českého rybářského svazu pečující o revíry na Vltavě a Lužnici. Sdružujeme rybáře a milovníky přírody již po generace.
            </p>
            <div className="flex gap-4">
              <a href="https://rybarstvi.cz" className="text-gray-400 hover:text-green-500 transition-colors" title="Rada ČRS">
                <ExternalLink className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Rychlé odkazy */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-100 mb-6">Důležité stránky</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/aktuality" className="hover:text-green-400 transition-colors">Aktuality a novinky</Link></li>
              <li><Link href="/pro-rybare/reviry" className="hover:text-green-400 transition-colors">Naše revíry</Link></li>
              <li><Link href="/clenstvi/ceny" className="hover:text-green-400 transition-colors">Ceny povolenek</Link></li>
              <li><Link href="/fotogalerie" className="hover:text-green-400 transition-colors">Fotogalerie</Link></li>
              <li><Link href="/dotazy" className="hover:text-green-400 transition-colors">Dotazy a odpovědi</Link></li>
              <li><Link href="/kontakt" className="hover:text-green-400 transition-colors">Kontakt</Link></li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-100 mb-6">Kontaktní údaje</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-500 shrink-0" />
                <span>
                  Zadní Podskalí 773<br />
                  375 01 Týn nad Vltavou
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-500 shrink-0" />
                <a href="tel:+420724034501" className="hover:text-white transition-colors">+420 724 034 501</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-500 shrink-0" />
                <a href="mailto:info@rybarityn.cz" className="hover:text-white transition-colors">info@rybarityn.cz</a>
              </li>
              <li className="flex items-center gap-3 pt-2">
                <ShieldCheck className="w-5 h-5 text-green-500 shrink-0" />
                <span className="text-xs italic">IČO: 00476838</span>
              </li>
            </ul>
          </div>

          {/* Mapa */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-100 mb-6">Kde nás najdete</h4>
            <div className="rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 border border-white/5 h-40">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2610.0232234567!2d14.4178!3d49.2234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDnCsDEzJzI0LjIiTiAxNMKwMjUnMDQuMSJF!5e0!3m2!1scs!2scz!4v1620000000000!5m2!1scs!2scz" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy"
                title="Mapa MO"
              ></iframe>
            </div>
            <a 
              href="https://mapy.cz/zakladni?route=1&to=Zadní+Podskalí+773,Týn+nad+Vltavou" 
              target="_blank" 
              className="mt-3 inline-flex items-center gap-1 text-xs text-green-500 hover:text-green-400 font-bold"
            >
              Navigovat do sídla MO <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} ČRS MO Týn nad Vltavou. Všechna práva vyhrazena. 
            <span className="ml-4 border-l border-white/10 pl-4">
              Webdesign a vývoj: <a href="mailto:pbertelmann@gmail.com" className="text-gray-400 hover:text-green-500 transition-colors">Pavel Bertelmann</a>
            </span>
          </p>
          <div className="flex gap-6 text-[10px] uppercase tracking-widest text-gray-600 font-bold">
            <Link href="/ochrana-udaju" className="hover:text-gray-400 transition-colors">Ochrana údajů</Link>
            <Link href="/admin" className="hover:text-gray-400 transition-colors">Administrace</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
