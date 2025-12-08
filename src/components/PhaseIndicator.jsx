import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const phaseMap = {
  'hero': 1,
  'overview': 1,
  'problem': 1,
  'solution': 2,
  'impact': 3,
  'agnostic': 4,
  'backend': 4,
  'ecosystem': 4,
  'conclusion': 4
};

const phaseTitles = {
  1: "The Problem",
  2: "The Solution",
  3: "Real World Impact",
  4: "Ecosystem & Scale"
};

export default function PhaseIndicator() {
  const [activePhase, setActivePhase] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
        // Show only after hero
        if (window.scrollY > window.innerHeight * 0.8) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }

        // Detect phase
        const phaseWrappers = document.querySelectorAll('[data-phase]');
        let current = 1;
        
        phaseWrappers.forEach((el) => {
            const rect = el.getBoundingClientRect();
            // If the section is substantially visible
            if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
                current = parseInt(el.getAttribute('data-phase'));
            }
        });
        
        setActivePhase(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
        {isVisible && (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed bottom-8 left-8 z-50 font-mono hidden md:block"
            >
                <div className="flex items-center gap-4 bg-void-950/80 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full shadow-2xl">
                    
                    <div className="flex items-baseline gap-1 text-slate-500 text-xs font-bold tracking-widest">
                        <span className="text-white text-base">0{activePhase}</span>
                        <span>/</span>
                        <span>04</span>
                    </div>

                    <div className="w-px h-4 bg-white/10"></div>

                    <div className="overflow-hidden h-5 w-32 relative">
                        <AnimatePresence mode="popLayout">
                            <motion.div
                                key={activePhase}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 100 }}
                                className="absolute inset-0 flex items-center text-xs text-slate-300 font-bold uppercase tracking-wider whitespace-nowrap"
                            >
                                {phaseTitles[activePhase]}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </motion.div>
        )}
    </AnimatePresence>
  );
}
