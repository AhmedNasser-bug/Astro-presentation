import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flag, Activity, Code2, Puzzle, Server, Database, Rocket } from 'lucide-react';

const phases = [
  { id: 'hero', label: 'Briefing', icon: Flag },
  { id: 'problem', label: 'Problem', icon: Activity },
  { id: 'solution', label: 'Solution', icon: Code2 },
  { id: 'agnostic', label: 'Agnosticism', icon: Puzzle },
  { id: 'backend', label: 'Backend', icon: Server },
  { id: 'ecosystem', label: 'Ecosystem', icon: Database },
  { id: 'conclusion', label: 'Liftoff', icon: Rocket },
];

export default function PhaseNavigator() {
  const [activeId, setActiveId] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: '-20% 0px -50% 0px' }
    );

    phases.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-4">
      {phases.map((phase) => {
        const isActive = activeId === phase.id;
        const Icon = phase.icon;
        
        return (
          <button
            key={phase.id}
            onClick={() => scrollTo(phase.id)}
            className="group relative flex items-center justify-end"
          >
            {/* Label Tooltip */}
            <span 
              className={`
                absolute right-12 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300
                ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0'}
                bg-void-950 border border-white/10 text-white shadow-xl
              `}
            >
              {phase.label}
            </span>

            {/* Icon Circle */}
            <div 
              className={`
                w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500 relative overflow-hidden
                ${isActive 
                  ? 'bg-white text-void-950 border-white shadow-[0_0_20px_rgba(255,255,255,0.5)] scale-110' 
                  : 'bg-void-950/50 text-slate-500 border-white/10 hover:border-white/30 hover:text-white backdrop-blur-md'
                }
              `}
            >
              <Icon size={isActive ? 18 : 16} strokeWidth={isActive ? 2.5 : 2} />
              
              {/* Active Pulse Ring */}
              {isActive && (
                <span className="absolute inset-0 rounded-full border-2 border-white animate-ping opacity-20"></span>
              )}
            </div>
          </button>
        );
      })}
      
      {/* Connecting Line */}
      <div className="absolute right-5 top-0 bottom-0 w-px bg-white/5 -z-10 rounded-full">
        <motion.div 
            className="w-full bg-gradient-to-b from-transparent via-white/20 to-transparent"
            style={{ height: '30%', top: '0%' }} // Could animate this to follow scroll if needed, but static gradient is fine for now
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}
