import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Box, Activity, Zap, CheckCircle2 } from 'lucide-react';

const IslandCard = ({ name, color, shadow, icon: Icon, children }) => {
  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.02 }}
      className={`
        relative group overflow-hidden rounded-2xl bg-void-950 border border-white/5 
        hover:border-white/20 transition-all duration-500
        flex flex-col h-64
      `}
    >
      {/* Ambient Glow Gradient */}
      <div className={`absolute -inset-2 bg-gradient-to-b ${color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-700`} />
      
      {/* Card Header */}
      <div className="relative z-10 flex items-center justify-between p-5 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-void-900 border border-white/10 ${color.replace('from-', 'text-').split(' ')[0]}`}>
            <Icon size={18} />
          </div>
          <span className="font-bold text-white tracking-wide">{name}</span>
        </div>
        <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
        </div>
      </div>

      {/* Interactive Content Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 bg-void-950/50 backdrop-blur-sm">
        {children}
      </div>

      {/* Framework Label Footer */}
      <div className="relative z-10 py-2 text-center text-[10px] font-mono text-slate-500 uppercase tracking-widest bg-black/20 border-t border-white/5 group-hover:text-white transition-colors">
        Interactive Island
      </div>
    </motion.div>
  );
};

export default function FrameworkIslands() {
  const [reactCount, setReactCount] = useState(0);
  const [vueToggle, setVueToggle] = useState(false);
  const [svelteVolume, setSvelteVolume] = useState(60);
  const [solidSignal, setSolidSignal] = useState(0);

  return (
    <div className="w-full max-w-6xl mx-auto">
      
      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* REACT (Blue) */}
        <IslandCard name="React" color="from-blue-500 to-cyan-500" icon={Cpu}>
          <div className="w-full text-center space-y-4">
            <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500">
              {reactCount}
            </div>
            <button 
              onClick={() => setReactCount(c => c + 1)}
              className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
            >
              useState(count)
            </button>
          </div>
        </IslandCard>

        {/* VUE (Green) */}
        <IslandCard name="Vue" color="from-emerald-500 to-green-500" icon={Box}>
          <div 
            onClick={() => setVueToggle(!vueToggle)}
            className="cursor-pointer group/vue w-full flex flex-col items-center gap-4"
          >
            <div className={`
              w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500
              ${vueToggle ? 'bg-emerald-500 rotate-12 shadow-[0_0_30px_rgba(16,185,129,0.4)]' : 'bg-void-800 border border-white/10 rotate-0'}
            `}>
              <CheckCircle2 size={32} className={vueToggle ? 'text-white' : 'text-slate-700'} />
            </div>
            <span className="text-xs font-mono text-emerald-400">
              v-if="{vueToggle ? 'true' : 'false'}"
            </span>
          </div>
        </IslandCard>

        {/* SVELTE (Orange) */}
        <IslandCard name="Svelte" color="from-orange-500 to-red-500" icon={Activity}>
          <div className="w-full space-y-6">
            <div className="flex justify-between text-xs font-bold text-orange-400">
                <span>VOLUME</span>
                <span>{svelteVolume}%</span>
            </div>
            <div className="relative w-full h-12 bg-void-900 rounded-lg border border-white/5 overflow-hidden flex items-center px-1">
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={svelteVolume}
                  onChange={(e) => setSvelteVolume(e.target.value)}
                  className="relative z-10 w-full h-full opacity-0 cursor-pointer"
                />
                <div 
                    className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-orange-600 to-red-600 transition-all duration-75"
                    style={{ width: `${svelteVolume}%` }}
                />
                {/* Tick marks */}
                <div className="absolute inset-0 flex justify-between px-2 pointer-events-none">
                    {[...Array(10)].map((_, i) => <div key={i} className="w-px h-full bg-black/20"></div>)}
                </div>
            </div>
          </div>
        </IslandCard>

        {/* SOLID (Indigo) */}
        <IslandCard name="Solid" color="from-indigo-500 to-violet-500" icon={Zap}>
          <div 
            className="w-full h-full flex items-center justify-center"
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setSolidSignal(Math.abs(e.clientX - rect.left));
            }}
          >
            <div className="relative w-24 h-24 flex items-center justify-center">
                <motion.div 
                    animate={{ rotate: solidSignal * 2 }}
                    className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-500/30"
                />
                <motion.div 
                    animate={{ scale: 1 + (solidSignal / 300) }}
                    className="w-12 h-12 rounded-full bg-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.5)] flex items-center justify-center text-white"
                >
                    <Zap size={20} fill="currentColor" />
                </motion.div>
            </div>
          </div>
        </IslandCard>

      </div>

      {/* COMPILER OUTPUT BAR */}
      <div className="mt-12 p-4 rounded-xl bg-void-950 border border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-slate-700 animate-pulse"></span>
                <span className="w-2 h-2 rounded-full bg-slate-700 animate-pulse delay-75"></span>
                <span className="w-2 h-2 rounded-full bg-slate-700 animate-pulse delay-150"></span>
            </div>
            <span className="text-xs font-mono text-slate-500">Astro Compiler Status: <span className="text-green-400">ONLINE</span></span>
        </div>
        <div className="text-xs font-mono text-slate-600 hidden md:block">
            Rendering to Static HTML...
        </div>
      </div>

    </div>
  );
}
