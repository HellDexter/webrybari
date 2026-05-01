'use client'

import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollYProgress } = useScroll()
  
  // Plynulý progress pro kruh kolem tlačítka
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const toggleVisibility = () => {
      // Zobrazit po 400px scrollu
      if (window.scrollY > 400) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <div className="relative group">
            {/* SVG Kruhový progress bar */}
            <svg className="absolute -inset-2 w-[calc(100%+1rem)] h-[calc(100%+1rem)] -rotate-90 pointer-events-none" viewBox="0 0 100 100">
              {/* Podkladový kruh - teď tmavší pro lepší viditelnost na bílé */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-950/10"
              />
              {/* Aktivní progress kruh */}
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray="283"
                style={{ pathLength: scrollYProgress }}
                className="text-green-500"
                strokeLinecap="round"
              />
            </svg>

            {/* Hlavní tlačítko - nyní v syté zelené pro kontrast */}
            <button
              onClick={scrollToTop}
              className="relative flex items-center justify-center w-14 h-14 rounded-full bg-green-600 text-white shadow-[0_15px_30px_-5px_rgba(0,0,0,0.3)] hover:bg-green-500 hover:scale-110 transition-all duration-500 group border-2 border-white/10"
              aria-label="Zpět nahoru"
            >
              <ChevronUp className="w-6 h-6 relative z-10 transition-all duration-500 group-hover:-translate-y-1" />
              
              {/* Mikro-animace pulzování na pozadí */}
              <span className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-0 group-hover:opacity-100" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
