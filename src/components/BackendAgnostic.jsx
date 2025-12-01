import React from 'react';
import { motion } from 'framer-motion';
import { Database, Server, FileJson, Globe, ArrowRight, Layers } from 'lucide-react';

const DataSource = ({ name, type, color, icon: Icon, delay }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="group relative flex items-center justify-between p-4 bg-void-950 border border-white/10 rounded-xl hover:border-white/20 transition-all duration-300"
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl`} />
      
      <div className="flex items-center gap-4 relative z-10">
        <div className={`p-2 rounded-lg bg-void-900 border border-white/5 ${color.replace('from-', 'text-').split(' ')[0]}`}>
          <Icon size={20} />
        </div>
        <div>
          <h4 className="text-white font-bold text-sm">{name}</h4>
          <span className="text-xs text-slate-500 font-mono uppercase tracking-wider">{type}</span>
        </div>
      </div>

      {/* Data Flow Animation */}
      <div className="relative flex items-center">
        <div className="h-px w-16 bg-white/10"></div>
        <motion.div 
          className={`absolute h-1.5 w-1.5 rounded-full ${color.replace('from-', 'bg-').split(' ')[0]} shadow-[0_0_10px_currentColor]`}
          animate={{ x: [0, 64], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: delay * 2 }}
        />
      </div>
    </motion.div>
  );
};

export default function BackendAgnostic() {
  const sources = [
    { name: 'Contentful', type: 'Headless CMS', color: 'from-blue-500 to-cyan-500', icon: Database },
    { name: 'WordPress', type: 'REST API', color: 'from-blue-600 to-blue-400', icon: Globe },
    { name: 'Markdown / MDX', type: 'Local Files', color: 'from-yellow-500 to-orange-500', icon: FileJson },
    { name: 'Supabase', type: 'Database', color: 'from-emerald-500 to-green-500', icon: Server },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        
        {/* Left Column: Data Sources */}
        <div className="space-y-4">
          <div className="mb-6 px-2">
            <h3 className="text-sm font-mono font-bold text-slate-500 uppercase tracking-widest mb-2">Data Sources (Any)</h3>
          </div>
          {sources.map((source, i) => (
            <DataSource key={source.name} {...source} delay={i * 0.15} />
          ))}
        </div>

        {/* Middle Column: The Astro Core */}
        <div className="flex flex-col items-center justify-center relative py-12">
            
            {/* Connecting Lines */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            </div>

            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-48 h-48 rounded-full bg-void-950 border border-white/10 shadow-2xl flex flex-col items-center justify-center group"
            >
                {/* Orbital Rings */}
                <div className="absolute inset-0 rounded-full border border-astro/20 animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute inset-2 rounded-full border border-purple-500/20 animate-[spin_15s_linear_infinite_reverse]"></div>
                
                {/* Core Glow */}
                <div className="absolute inset-0 bg-astro/10 blur-3xl group-hover:bg-astro/20 transition-colors duration-500"></div>

                <Layers size={48} className="text-white mb-2" />
                <span className="text-2xl font-black text-white tracking-tight">ASTRO</span>
                <span className="text-[10px] font-mono text-astro uppercase tracking-widest mt-1">Content Layer</span>
            </motion.div>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-0 hidden lg:block">
                <ArrowRight size={32} className="text-slate-600" />
            </div>
        </div>

        {/* Right Column: Output */}
        <div className="h-full flex flex-col justify-center space-y-6">
            <div className="mb-2 px-2">
                <h3 className="text-sm font-mono font-bold text-slate-500 uppercase tracking-widest mb-2">Unified Output</h3>
            </div>
            
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-astro to-purple-500"></div>
                <h4 className="text-xl font-bold text-white mb-2">Universal Content API</h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    Astro normalizes all your data into a single, type-safe collection API. 
                    Fetch from anywhere, render everywhere.
                </p>
                <div className="p-3 bg-black/30 rounded-lg font-mono text-xs text-slate-300 border border-white/5">
                    <span className="text-purple-400">const</span> posts = <span className="text-blue-400">await</span> getCollection(<span className="text-green-400">'blog'</span>);
                </div>
            </motion.div>
        </div>

      </div>
    </div>
  );
}
