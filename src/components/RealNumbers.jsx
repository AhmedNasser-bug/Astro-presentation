import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Timer, HardDrive, Database, Server, ExternalLink } from 'lucide-react';

const MetricRow = ({ label, before, after, unit, improvement, delay }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="grid grid-cols-12 gap-4 items-center py-4 border-b border-white/5 last:border-0"
    >
      <div className="col-span-4 text-sm text-slate-400 font-mono">{label}</div>
      
      {/* Before Value */}
      <div className="col-span-3 text-right font-mono text-slate-500 line-through decoration-red-500/50 decoration-2">
        {before}
      </div>

      {/* Arrow */}
      <div className="col-span-1 text-center text-slate-600">→</div>

      {/* After Value */}
      <div className="col-span-4 flex items-center justify-end gap-3">
        <span className="font-bold text-emerald-400 font-mono text-lg">{after}</span>
        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
          {improvement}
        </span>
      </div>
    </motion.div>
  );
};

const CaseStudyCard = ({ title, logo, metrics, delay, link }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className="bg-void-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative group"
    >
      {/* Header */}
      <div className="p-6 bg-white/[0.02] border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white/5 text-white">
            {logo}
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">CASE STUDY</div>
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-lg font-bold text-white hover:text-emerald-400 transition-colors flex items-center gap-2 group/link"
            >
              {title}
              <ExternalLink size={14} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
        <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
      </div>

      {/* Metrics Body */}
      <div className="p-6 relative z-10">
        {metrics.map((m, i) => (
          <MetricRow key={i} {...m} delay={delay + 0.2 + (i * 0.1)} />
        ))}
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
    </motion.div>
  );
};

export default function RealNumbers() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* CASE STUDY 1: NETLIFY */}
        <CaseStudyCard 
          title="Netlify Docs"
          link="https://www.netlify.com/blog/why-netlify-selected-astro-for-its-developer-hub-and-marketing-site/"
          logo={<Server size={20} />}
          delay={0.2}
          metrics={[
            { label: "Build Time", before: "14 min", after: "2 min", improvement: "-86%" },
            { label: "Bundle Size", before: "380 KB", after: "40 KB", improvement: "-89%" },
            { label: "Lighthouse", before: "76", after: "100", improvement: "PERFECT" }
          ]}
        />

        {/* CASE STUDY 2: FIREBASE */}
        <CaseStudyCard 
          title="Firebase Blog"
          link="https://astro.build/case-studies/firebase/"
          logo={<Database size={20} />}
          delay={0.4}
          metrics={[
            { label: "JS Payload", before: "370 KB", after: "22 KB", improvement: "-94%" },
            { label: "Load Time", before: "4.2s", after: "0.8s", improvement: "5x FASTER" },
            { label: "Interaction", before: "Laggy", after: "Instant", improvement: "SMOOTH" }
          ]}
        />

      </div>

      {/* Conclusion Banner */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 p-1 rounded-xl bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20"
      >
        <div className="bg-void-900 rounded-lg p-6 text-center border border-white/5">
            <p className="text-xl font-medium text-slate-300">
                Principle-driven design = <span className="text-white font-bold">Measurable Results</span>
            </p>
        </div>
      </motion.div>

    </div>
  );
}
