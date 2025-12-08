import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Timer, HardDrive, Database, Server, ExternalLink, ArrowUpRight } from 'lucide-react';

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
    <motion.a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -5 }}
      className="block bg-void-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative group cursor-pointer hover:border-emerald-500/30 transition-all duration-300"
    >
      {/* Hover Glow */}
      <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      {/* Header */}
      <div className="p-6 bg-white/[0.02] border-b border-white/5 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-white/5 text-white group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-colors">
            {logo}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-emerald-400/80 transition-colors">CASE STUDY</div>
                <ArrowUpRight size={12} className="text-slate-600 group-hover:text-emerald-400 transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-white group-hover:underline decoration-emerald-500/30 underline-offset-4 decoration-2">{title}</h3>
          </div>
        </div>
        
        {/* Status Indicator */}
        <div className="flex flex-col items-end gap-1">
            <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] animate-pulse"></div>
            <span className="text-[10px] text-emerald-500 font-mono opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0 duration-300">Verified</span>
        </div>
      </div>

      {/* Metrics Body */}
      <div className="p-6 relative z-10">
        {metrics.map((m, i) => (
          <MetricRow key={i} {...m} delay={delay + 0.2 + (i * 0.1)} />
        ))}
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
    </motion.a>
  );
};

export default function RealNumbers() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* CASE STUDY 1: NETLIFY */}
        <CaseStudyCard 
          title="Netlify Docs"
          link="https://astro.build/blog/netlifys-migration-story/"
          logo={<Server size={24} />}
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
          logo={<Database size={24} />}
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
