'use client'

import { motion } from 'framer-motion'

export default function ScrollDownButton({ targetId }: { targetId: string }) {
  return (
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 hidden sm:block">
      <button 
        onClick={() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })}
        className="flex flex-col items-center gap-2 group cursor-pointer outline-none"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 group-hover:text-green-400 transition-colors">
          Objevte více
        </span>
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1 group-hover:border-green-500/50 transition-colors">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-1 h-2 bg-green-500 rounded-full"
          />
        </div>
      </button>
    </div>
  )
}
