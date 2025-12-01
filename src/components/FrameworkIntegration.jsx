import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Box, Activity, Zap, Plus, X } from 'lucide-react';

const ConnectionCard = ({ framework, color, icon: Icon, delay }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="relative group h-40"
    >
      {/* Framework Glow Behind */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-700`} />
      
      <div className="relative h-full bg-void-950 border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-center items-center">
        
        {/* The Circuit Trace (Background Line) */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/5 -translate-y-1/2"></div>

        <div className="relative z-10 w-full px-8 flex items-center justify-between">
            
            {/* ASTRO NODE */}
            <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-void-900 border border-white/10 flex items-center justify-center shadow-lg relative z-20">
                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 22h20L12 2z" /> {/* Simple triangle for Astro */}
                    </svg>
                </div>
                <span className="text-[10px] font-mono text-slate-500 font-bold tracking-widest">ASTRO</span>
            </div>

            {/* THE CONNECTION ANIMATION */}
            <div className="flex-1 mx-4 h-12 flex items-center justify-center relative">
                
                {/* STATE 1: VS (Broken) */}
                <motion.div 
                    initial={{ opacity: 1 }}
                    whileInView={{ opacity: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: delay + 1, duration: 0.3 }}
                    className="absolute flex flex-col items-center"
                >
                    <span className="text-red-500 font-black text-xl italic tracking-tighter">VS</span>
                    <div className="w-16 h-0.5 bg-red-500/50 mt-1 relative overflow-hidden">
                        <div className="absolute inset-0 bg-red-500 w-1/2 animate-pulse"></div>
                    </div>
                </motion.div>

                {/* STATE 2: WITH (Healed) */}
                <motion.div 
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: delay + 1.2, duration: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <div className={`w-full h-1 bg-gradient-to-r from-white via-${color.split('-')[1]}-400 to-${color.split('-')[1]}-500 shadow-[0_0_15px_currentColor] opacity-50`}></div>
                    <div className="absolute bg-void-950 border border-white/10 p-1.5 rounded-full z-10">
                        <Plus size={14} className="text-white" strokeWidth={4} />
                    </div>
                </motion.div>

            </div>

            {/* FRAMEWORK NODE */}
            <div className="flex flex-col items-center gap-2">
                <div className={`w-12 h-12 rounded-xl bg-void-900 border border-white/10 flex items-center justify-center shadow-lg relative z-20 group-hover:border-${color.split('-')[1]}-500/50 transition-colors`}>
                    <Icon size={24} className={`${color.replace('from-', 'text-').split(' ')[0]}`} />
                </div>
                {/* FIX: Ensure visible text color and remove opacity constraints */}
                <span className="text-[10px] font-mono text-white font-bold tracking-widest uppercase opacity-100">{framework}</span>
            </div>

        </div>
      </div>
    </motion.div>
  );
};

export default function FrameworkIntegration() {
  const frameworks = [
    { name: 'React', color: 'from-blue-500 to-cyan-500', icon: Cpu },
    { name: 'Vue', color: 'from-emerald-500 to-green-500', icon: Box },
    { name: 'Svelte', color: 'from-orange-500 to-red-500', icon: Activity },
    { name: 'Solid', color: 'from-indigo-500 to-violet-500', icon: Zap },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* 2x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {frameworks.map((fw, i) => (
          <ConnectionCard key={fw.name} {...fw} delay={i * 0.2} />
        ))}
      </div>

      {/* Footer Statement */}
      <div className="text-center">
        <p className="text-slate-400 text-lg">
            Use the tools you love. <span className="text-white font-bold">Zero migration required.</span>
        </p>
      </div>
    </div>
  );
}
