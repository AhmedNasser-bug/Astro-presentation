import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Check, X, ArrowRight, Package, Box, Layers } from 'lucide-react';

const ImpactCard = ({ type, title, items, delay }) => {
  const isSuccess = type === 'success';
  const color = isSuccess ? 'emerald' : 'red';
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: isSuccess ? 20 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className={`relative flex-1 p-8 rounded-3xl border backdrop-blur-xl overflow-hidden group
        ${isSuccess 
          ? 'bg-emerald-950/10 border-emerald-500/20 hover:border-emerald-500/40' 
          : 'bg-red-950/10 border-red-500/20 hover:border-red-500/40'}
      `}
    >
      {/* Dynamic Background Glow */}
      <div className={`absolute -inset-full bg-gradient-to-b ${isSuccess ? 'from-emerald-500/5' : 'from-red-500/5'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h3 className={`text-2xl font-bold ${isSuccess ? 'text-emerald-100' : 'text-red-100'}`}>
            {title}
          </h3>
          <div className={`p-2 rounded-full ${isSuccess ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
            {isSuccess ? <Check size={20} /> : <X size={20} />}
          </div>
        </div>

        <ul className="space-y-6">
          {items.map((item, i) => (
            <motion.li 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: delay + 0.3 + (i * 0.1) }}
              className="flex items-start gap-4"
            >
              <div className={`mt-1 min-w-[6px] h-1.5 rounded-full ${isSuccess ? 'bg-emerald-500' : 'bg-red-500'}`} />
              <span className={`text-sm md:text-base ${isSuccess ? 'text-emerald-100/80' : 'text-red-100/80'}`}>
                {item}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default function RealWorldImpact() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      
      {/* Scenario Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-16">
        <div className="flex-1 p-6 rounded-2xl bg-void-950 border border-white/10 flex items-center gap-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none"></div>
            <div className="p-4 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Package size={32} />
            </div>
            <div>
                <div className="text-xs font-mono text-blue-400 font-bold tracking-widest uppercase mb-1">Mission Critical</div>
                <h4 className="text-xl font-bold text-white">Marketing Site + Configurator</h4>
                <div className="flex items-center gap-2 mt-2 text-sm text-slate-400">
                    <Layers size={14} /> React Site
                    <span className="text-slate-600">+</span>
                    <Box size={14} /> Vue Widget
                </div>
            </div>
        </div>

        <div className="flex-none p-6 rounded-2xl bg-void-950 border border-white/10 flex flex-col justify-center items-center gap-2 shadow-2xl min-w-[200px]">
            <span className="text-xs font-mono text-red-400 font-bold tracking-widest uppercase flex items-center gap-2">
                <Clock size={14} /> Deadline
            </span>
            <span className="text-3xl font-black text-white">This Week</span>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="flex flex-col md:flex-row gap-8">
        
        <ImpactCard 
          type="failure"
          title="Without Astro"
          delay={0.2}
          items={[
            "Rewrite the entire Vue configurator in React (3-5 days lost)",
            "Or migrate the whole React site to Vue (Weeks of work)",
            "Maintain two separate apps on different subdomains (DevOps nightmare)"
          ]}
        />

        <div className="hidden md:flex flex-col justify-center text-slate-600">
            <ArrowRight size={32} />
        </div>

        <ImpactCard 
          type="success"
          title="With Astro"
          delay={0.4}
          items={[
            "Drop in the Vue configurator component directly (30 minutes)",
            "Keep all existing React marketing components",
            "Ship today. Go home early.",
          ]}
        />

      </div>

      {/* The Conclusion */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-16 text-center"
      >
        <h3 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 tracking-tight">
            Flexibility = Freedom
        </h3>
      </motion.div>

    </div>
  );
}
