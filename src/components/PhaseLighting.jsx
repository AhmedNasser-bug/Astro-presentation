import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const phases = {
  1: "from-red-600/5 via-transparent to-transparent",        // Problem: Very Subtle Red
  2: "from-purple-600/5 via-transparent to-transparent",     // Solution: Very Subtle Purple
  3: "from-emerald-600/5 via-transparent to-transparent",    // Impact: Very Subtle Green
  4: "from-blue-600/5 via-transparent to-transparent"        // Ecosystem: Very Subtle Blue
};

// Bottom glow also reduced
const bottomPhases = {
  1: "from-transparent via-transparent to-orange-900/10",
  2: "from-transparent via-transparent to-pink-900/10",
  3: "from-transparent via-transparent to-teal-900/10",
  4: "from-transparent via-transparent to-indigo-900/10"
};

export default function PhaseLighting() {
  const [activePhase, setActivePhase] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const phaseEls = document.querySelectorAll('[data-phase]');
      let current = 1;

      phaseEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Trigger when the section takes up the majority of the viewport
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
          current = parseInt(el.getAttribute('data-phase'));
        }
      });

      setActivePhase(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger once on load
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
        {/* Top Vignette (Overlay) - Reduced Intensity */}
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={`top-${activePhase}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className={`absolute inset-0 bg-gradient-to-b ${phases[activePhase] || phases[1]}`}
                />
            </AnimatePresence>
        </div>

        {/* Bottom Vignette (Overlay) - Reduced Intensity */}
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
             <AnimatePresence mode="popLayout">
                <motion.div
                    key={`btm-${activePhase}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className={`absolute inset-0 bg-gradient-to-b ${bottomPhases[activePhase] || bottomPhases[1]}`}
                />
            </AnimatePresence>
        </div>
        
        {/* Global Noise Texture - Reduced Opacity */}
        <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.02] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </>
  );
}
