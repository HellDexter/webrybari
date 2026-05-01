'use client'

import { useState } from 'react'
import { Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/utils/supabase/client'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')
    
    const supabase = createClient()

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }])

      if (error) {
        if (error.code === '23505') {
          throw new Error('Tento e-mail už u nás máme přihlášený.')
        }
        throw error
      }

      setStatus('success')
      setEmail('')
    } catch (err: any) {
      console.error('Newsletter error:', err)
      setStatus('error')
      setErrorMessage(err.message || 'Něco se nepovedlo. Zkuste to prosím později.')
    }
  }

  return (
    <section className="py-20 bg-green-900 relative overflow-hidden">
      {/* Dekorativní vlny na pozadí */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-auto">
          <path fill="#ffffff" fillOpacity="1" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,208C960,213,1056,171,1152,144C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Buďte u vody jako první
            </h2>
            <p className="mt-4 text-lg text-green-100/80 leading-relaxed max-w-xl">
              Odebírejte naše novinky a získejte info o zarybňování, závodech a brigádách přímo do e-mailu. Neuteče vám žádná důležitá zpráva.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-2 rounded-2xl border border-white/10">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-xl p-8 text-center"
                >
                  <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900">Vítejte na palubě!</h3>
                  <p className="text-gray-600 mt-2">Děkujeme za přihlášení k novinkám. Brzy se ozveme.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-sm font-bold text-green-600 hover:text-green-700"
                  >
                    Přihlásit jiný e-mail
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 p-2"
                >
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-green-400/60" />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="Váš e-mailový kontakt"
                      className="block w-full pl-11 pr-4 py-4 bg-white/10 border border-white/10 rounded-xl text-white placeholder-green-100/40 focus:ring-2 focus:ring-green-500 focus:bg-white/20 transition-all outline-none"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-400 text-green-950 font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                      <div className="w-5 h-5 border-2 border-green-950/30 border-t-green-950 rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Odebírat <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
            
            {status === 'error' && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 px-4 py-2 flex items-center gap-2 text-red-200 text-xs font-medium"
              >
                <AlertCircle className="w-4 h-4" />
                {errorMessage}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
