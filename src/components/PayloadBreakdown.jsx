import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutTemplate, FileText, Share2, MessageSquare, GripHorizontal, Zap, ArrowRight, ScanLine } from 'lucide-react';

export default function PayloadBreakdown() {
  const [isHovering, setIsHovering] = useState(false);

  // The Anatomy of a Blog Post
  const blocks = [
    { id: 'header', name: 'Blog Header', size: 0, type: 'static', icon: LayoutTemplate, h: 'h-16' },
    { id: 'article', name: 'Article Content', size: 0, type: 'static', icon: FileText, h: 'h-48' },
    { id: 'share', name: 'Share Button', size: 5, type: 'interactive', icon: Share2, h: 'h-12', w: 'w-1/3', ml: 'ml-auto' },
    { id: 'comments', name: 'Comments Section', size: 12, type: 'interactive', icon: MessageSquare, h: 'h-32' },
    { id: 'footer', name: 'Footer', size: 0, type: 'static', icon: GripHorizontal, h: 'h-16' }
  ];

  const totalSize = 17;
  const monolithSize = 247;

  return (
    <div 
      className="w-full max-w-5xl mx-auto font-mono text-sm"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* THE VISUALIZATION: Blog Mockup */}
        <div className="relative bg-slate-950 rounded-xl border border-white/10 p-6 shadow-2xl overflow-hidden group">
          
          {/* Scanning Laser Effect */}
          <motion.div 
            className="absolute left-0 right-0 h-0.5 bg-astro shadow-[0_0_15px_rgba(188,82,238,0.8)] z-30 pointer-events-none"
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 bg-astro/5 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="space-y-4 relative z-10">
            {blocks.map((block) => (
              <div
                key={block.id}
                className={`
                  relative border rounded-lg p-4 flex items-center gap-4 transition-all duration-300
                  ${block.h} ${block.w || 'w-full'} ${block.ml || ''}
                  ${block.type === 'interactive' 
                    ? 'bg-astro/10 border-astro/50 shadow-[0_0_15px_rgba(188,82,238,0.1)]' 
                    : 'bg-white/5 border-white/5 opacity-60'}
                `}
              >
                <block.icon size={18} className={block.type === 'interactive' ? 'text-astro' : 'text-slate-500'} />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-300">{block.name}</span>
                
                {/* Size Badge */}
                <div className={`
                  absolute -right-3 top-1/2 -translate-y-1/2 px-3 py-1 rounded text-[10px] font-bold border flex items-center gap-2
                  ${block.type === 'interactive' 
                    ? 'bg-astro text-void-950 border-astro shadow-lg scale-110' 
                    : 'bg-slate-900 text-slate-500 border-slate-800'}
                `}>
                  {block.type === 'interactive' && <Zap size={10} fill="currentColor" />}
                  {block.size} KB
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* THE DATA: Comparison */}
        <div className="space-y-10">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <ScanLine className="text-astro" />
              Selective Hydration
            </h3>
            <p className="text-slate-400 leading-relaxed text-lg">
              Why pay for the whole page when you only need the buttons?
              Astro treats the page as <span className="text-white font-bold">Static HTML</span> by default. 
              JavaScript is sprinkled in strictly where interactivity lives.
            </p>
          </div>

          {/* Bar Charts */}
          <div className="space-y-6">
            
            {/* Monolith Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-500 tracking-wider">
                <span>TRADITIONAL SPA (NEXT.JS / CRA)</span>
                <span>{monolithSize} KB</span>
              </div>
              <div className="h-6 bg-slate-800 rounded-sm overflow-hidden relative">
                <div className="absolute inset-0 bg-red-500/20 w-full"></div>
                <div className="absolute inset-y-0 left-0 w-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.2)_10px,rgba(0,0,0,0.2)_20px)] opacity-50"></div>
              </div>
            </div>

            {/* Astro Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-astro tracking-wider">
                <span>ASTRO ISLANDS</span>
                <span>{totalSize} KB</span>
              </div>
              <div className="h-6 bg-slate-800 rounded-sm overflow-hidden flex relative">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(totalSize / monolithSize) * 100}%` }}
                  transition={{ duration: 1.2, ease: "circOut" }}
                  className="h-full bg-astro shadow-[0_0_20px_rgba(188,82,238,0.6)]"
                />
              </div>
            </div>
          </div>

          <div className="p-5 rounded-lg bg-green-900/20 border border-green-500/30 flex items-center gap-4">
            <div className="p-2 bg-green-500/20 rounded-full text-green-400">
                <Zap size={20} />
            </div>
            <div>
                <h4 className="text-green-400 font-bold text-sm uppercase tracking-wider mb-1">Efficiency Gain</h4>
                <p className="text-slate-300 text-sm">
                    <span className="text-white font-bold">93% Payload Reduction</span>. 
                    Zero runtime overhead for header, footer, and content.
                </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
