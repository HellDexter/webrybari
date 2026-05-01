'use client'

import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // Sledování scrollování
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
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
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-green-600 text-white shadow-2xl hover:bg-green-500 transition-colors group"
          aria-label="Zpět nahoru"
        >
          <ChevronUp className="w-6 h-6 transition-transform group-hover:-translate-y-1" />
          
          {/* Animovaná vlna pod tlačítkem při hoveru */}
          <span className="absolute inset-0 rounded-full bg-green-400 opacity-0 group-hover:animate-ping scale-75"></span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
