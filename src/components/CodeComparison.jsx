import React from 'react';
import { motion } from 'framer-motion';
import { Code2, FileCode, Zap, Eye, MonitorPlay } from 'lucide-react';

const CodeLine = ({ num, children, highlight = false }) => (
  <div className={`flex items-start gap-4 px-4 py-0.5 font-mono text-sm leading-6 ${highlight ? 'bg-white/5' : ''}`}>
    <span className="text-slate-700 select-none w-6 text-right">{num}</span>
    <span className="text-slate-300">{children}</span>
  </div>
);

const Directive = ({ type, description, icon: Icon }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-astro/30 transition-colors"
  >
    <div className="p-2 rounded bg-astro/10 text-astro">
      <Icon size={16} />
    </div>
    <div>
      <div className="font-mono text-xs font-bold text-astro mb-0.5">{type}</div>
      <div className="text-xs text-slate-400">{description}</div>
    </div>
  </motion.div>
);

export default function CodeComparison() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Code Editor Window */}
        <div className="lg:col-span-3 bg-void-950 rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col h-full">
          {/* Editor Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
            </div>
            <div className="ml-4 flex items-center gap-2 text-xs text-slate-400 font-mono bg-black/20 px-3 py-1 rounded">
              <FileCode size={12} className="text-astro" />
              index.astro
            </div>
          </div>

          {/* Editor Body */}
          <div className="flex-1 py-4 overflow-x-auto">
            <CodeLine num={1}><span className="text-purple-400">---</span></CodeLine>
            <CodeLine num={2}><span className="text-slate-500">// Static components - NO JavaScript shipped</span></CodeLine>
            <CodeLine num={3}>
              <span className="text-purple-400">import</span> Header <span className="text-purple-400">from</span> <span className="text-green-400">'./Header.astro'</span>;
            </CodeLine>
            <CodeLine num={4}>
              <span className="text-purple-400">import</span> Article <span className="text-purple-400">from</span> <span className="text-green-400">'./Article.astro'</span>;
            </CodeLine>
            <CodeLine num={5}></CodeLine>
            <CodeLine num={6}><span className="text-slate-500">// Interactive components - JavaScript ONLY here</span></CodeLine>
            <CodeLine num={7}>
              <span className="text-purple-400">import</span> ShareButton <span className="text-purple-400">from</span> <span className="text-green-400">'./ShareButton.jsx'</span>;
            </CodeLine>
            <CodeLine num={8}>
              <span className="text-purple-400">import</span> Comments <span className="text-purple-400">from</span> <span className="text-green-400">'./Comments.jsx'</span>;
            </CodeLine>
            <CodeLine num={9}><span className="text-purple-400">---</span></CodeLine>
            <CodeLine num={10}></CodeLine>
            <CodeLine num={11}>
              <span className="text-blue-400">&lt;Header /&gt;</span> 
              <span className="text-slate-600 ml-8 text-xs">{`<!-- 0 KB JS -->`}</span>
            </CodeLine>
            <CodeLine num={12}>
              <span className="text-blue-400">&lt;Article /&gt;</span>
              <span className="text-slate-600 ml-6 text-xs">{`<!-- 0 KB JS -->`}</span>
            </CodeLine>
            <CodeLine num={13} highlight={true}>
              <span className="text-blue-400">&lt;ShareButton</span> <span className="text-yellow-400">client:load</span> <span className="text-blue-400">/&gt;</span>
              <span className="text-slate-500 ml-4 text-xs font-bold tracking-wider">✨ 5 KB</span>
            </CodeLine>
            <CodeLine num={14} highlight={true}>
              <span className="text-blue-400">&lt;Comments</span> <span className="text-yellow-400">client:visible</span> <span className="text-blue-400">/&gt;</span>
              <span className="text-slate-500 ml-4 text-xs font-bold tracking-wider">✨ 12 KB</span>
            </CodeLine>
          </div>
        </div>

        {/* Legend / Directives Panel */}
        <div className="lg:col-span-2 flex flex-col justify-center space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Code2 className="text-astro" />
              The Syntax
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Astro components render as static HTML by default. To "hydrate" them into interactive apps, add a <code className="bg-white/10 px-1 rounded text-yellow-400">client:*</code> directive.
            </p>
          </div>

          <div className="space-y-3">
            <Directive 
              type="client:load" 
              description="Hydrates immediately on page load. Use for critical UI like navigation." 
              icon={Zap}
            />
            <Directive 
              type="client:visible" 
              description="Hydrates only when the user scrolls the component into view." 
              icon={Eye}
            />
            <Directive 
              type="client:idle" 
              description="Hydrates when the main thread is free. Great for background tasks." 
              icon={MonitorPlay}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
