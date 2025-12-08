import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Layers, Zap, Server, Search, ArrowRight, Star, Download, ExternalLink } from 'lucide-react';

const IntegrationCard = ({ name, category, downloads, official, color, icon: Icon, delay }) => (
  <motion.a
    href="https://astro.build/integrations/"
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="group relative flex flex-col p-5 bg-void-950 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all"
  >
    {/* Glow Effect */}
    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity rounded-bl-full pointer-events-none`}></div>

    <div className="flex justify-between items-start mb-4 relative z-10">
      <div className={`p-3 rounded-lg bg-void-900 border border-white/5 ${color.replace('from-', 'text-').split(' ')[0]}`}>
        <Icon size={24} />
      </div>
      {official && (
        <div className="px-2 py-1 rounded-full bg-astro/10 border border-astro/20 text-[10px] font-bold text-astro uppercase tracking-wide flex items-center gap-1">
          <Star size={8} fill="currentColor" /> Official
        </div>
      )}
    </div>

    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-astro transition-colors">{name}</h3>
    <p className="text-xs text-slate-500 font-mono uppercase tracking-widest mb-4">{category}</p>

    <div className="mt-auto flex items-center justify-between text-xs text-slate-400 border-t border-white/5 pt-4">
      <div className="flex items-center gap-1.5">
        <Download size={12} />
        <span>{downloads}</span>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white">
        <ExternalLink size={14} />
      </div>
    </div>
  </motion.a>
);

export default function IntegrationsStore() {
  const integrations = [
    { name: 'Tailwind CSS', category: 'Styling', downloads: '2.5M+', official: true, color: 'from-cyan-500 to-blue-500', icon: Box },
    { name: 'React', category: 'Framework', downloads: '1.8M+', official: true, color: 'from-blue-400 to-indigo-500', icon: Layers },
    { name: 'Vercel', category: 'Adapter', downloads: '900k+', official: true, color: 'from-white to-slate-400', icon: Server },
    { name: 'Partytown', category: 'Performance', downloads: '400k+', official: true, color: 'from-pink-500 to-rose-500', icon: Zap },
    { name: 'Sitemap', category: 'SEO', downloads: '1.2M+', official: true, color: 'from-amber-500 to-orange-500', icon: Search },
    { name: 'MDX', category: 'Content', downloads: '1.5M+', official: true, color: 'from-yellow-400 to-orange-500', icon: Layers },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      
      {/* Search Bar Simulation */}
      <div className="mb-12 relative max-w-2xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-astro to-purple-500 rounded-full blur opacity-20"></div>
        <div className="relative bg-void-950 border border-white/10 rounded-full p-2 flex items-center pl-6">
            <Search className="text-slate-500 mr-3" size={20} />
            <input 
                type="text" 
                placeholder="Search 300+ integrations..." 
                disabled
                className="bg-transparent border-none outline-none text-slate-300 placeholder:text-slate-600 flex-1 text-sm font-mono"
            />
            <a 
                href="https://astro.build/integrations/" 
                target="_blank"
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-xs font-bold transition-colors flex items-center gap-2"
            >
                Browse All <ArrowRight size={12} />
            </a>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((item, i) => (
            <IntegrationCard key={item.name} {...item} delay={i * 0.1} />
        ))}
      </div>

      {/* Community Banner */}
      <div className="mt-16 text-center">
        <p className="text-slate-400 text-sm">
            Can't find what you need? 
            <a href="https://astro.build/chat" className="text-white font-bold hover:text-astro ml-1 transition-colors underline decoration-astro/30 hover:decoration-astro">
                Join our Discord
            </a> 
            to ask the community or build your own.
        </p>
      </div>

    </div>
  );
}
