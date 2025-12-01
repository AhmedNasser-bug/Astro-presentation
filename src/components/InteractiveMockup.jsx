import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Zap, FileCode, MessageSquare, Share2, LayoutTemplate } from 'lucide-react';

export default function InteractiveMockup() {
  const [mode, setMode] = useState('astro'); // 'monolith' | 'astro'

  const components = [
    { id: 1, name: 'Header', type: 'static', icon: LayoutTemplate, height: 'h-16' },
    { id: 2, name: 'Article Content', type: 'static', icon: FileCode, height: 'h-48' },
    { id: 3, name: 'Share Button', type: 'interactive', icon: Share2, height: 'h-12', width: 'w-1/3' },
    { id: 4, name: 'Comments', type: 'interactive', icon: MessageSquare, height: 'h-32' },
    { id: 5, name: 'Footer', type: 'static', icon: Layers, height: 'h-16' },
  ];

  const isJsActive = (type) => {
    if (mode === 'monolith') return true; // Everything is JS
    return type === 'interactive'; // Only islands are JS
  };

  const getJsLoad = () => mode === 'monolith' ? 100 : 15;

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Control Panel */}
      <div className="flex justify-between items-center mb-6 bg-slate-900/50 p-2 rounded-full border border-white/10 backdrop-blur-md">
        <button
          onClick={() => setMode('monolith')}
          className={`flex-1 py-2 px-4 rounded-full text-xs font-mono font-bold transition-all duration-300 ${
            mode === 'monolith' ? 'bg-red-500/20 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'text-slate-500 hover:text-white'
          }`}
        >
          SPA (100% JS)
        </button>
        <button
          onClick={() => setMode('astro')}
          className={`flex-1 py-2 px-4 rounded-full text-xs font-mono font-bold transition-all duration-300 ${
            mode === 'astro' ? 'bg-astro/20 text-astro shadow-[0_0_15px_rgba(188,82,238,0.3)]' : 'text-slate-500 hover:text-white'
          }`}
        >
          ASTRO (15% JS)
        </button>
      </div>

      {/* The Mockup */}
      <div className="relative bg-slate-950 rounded-2xl p-6 border border-white/5 shadow-2xl overflow-hidden group">
        
        {/* Background Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        
        {/* JS Bundle Overlay (Monolith visualization) */}
        <AnimatePresence>
          {mode === 'monolith' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 border-2 border-red-500/30 bg-red-500/5 z-0 pointer-events-none rounded-2xl"
            >
              <div className="absolute top-2 right-4 text-[10px] font-mono text-red-400 flex items-center gap-1">
                <Zap size={10} /> HEAVY_BUNDLE.JS
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Website Blocks */}
        <div className="relative z-10 space-y-4 font-mono">
          {components.map((comp) => {
            const active = isJsActive(comp.type);
            const isIsland = mode === 'astro' && comp.type === 'interactive';
            
            return (
              <div 
                key={comp.id} 
                className={`
                  relative rounded-lg border transition-all duration-500 flex items-center justify-center gap-3
                  ${comp.height} ${comp.width || 'w-full'} 
                  ${comp.id === 3 ? 'ml-auto' : ''} /* Align share button right */
                  ${active 
                    ? isIsland 
                        ? 'border-astro bg-astro/10 shadow-[0_0_20px_rgba(188,82,238,0.15)]' // Island Look
                        : 'border-red-500/40 bg-red-500/10 text-red-200' // Monolith Look
                    : 'border-white/10 bg-white/5 text-slate-500' // Static Look
                  }
                `}
              >
                <comp.icon size={16} className={`${active && isIsland ? 'animate-pulse text-astro' : ''}`} />
                <span className="text-xs uppercase tracking-widest font-bold">
                  {comp.name}
                </span>
                
                {/* Status Badge */}
                <div className={`absolute top-2 right-2 text-[8px] px-1.5 py-0.5 rounded border ${
                  active 
                    ? isIsland ? 'border-astro/30 bg-astro/20 text-astro' : 'border-red-500/30 bg-red-500/20 text-red-300'
                    : 'border-white/10 bg-slate-800 text-slate-500'
                }`}>
                  {active ? 'JS HYDRATED' : 'STATIC HTML'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Footer */}
        <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-xs font-mono">
            <span className="text-slate-500">EST. BUNDLE SIZE:</span>
            <div className="h-2 w-32 bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                    className={`h-full ${mode === 'monolith' ? 'bg-red-500' : 'bg-astro'}`}
                    animate={{ width: `${getJsLoad()}%` }}
                    transition={{ type: "spring", stiffness: 100 }}
                />
            </div>
            <span className={mode === 'monolith' ? 'text-red-400' : 'text-astro'}>{getJsLoad()} KB</span>
        </div>
      </div>
    </div>
  );
}