import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileWarning, 
  Layers, 
  Lock, 
  Workflow, 
  ZapOff, 
  Zap, 
  Anchor, 
  ArrowUpRight,
  AlertOctagon,
  ShieldCheck
} from 'lucide-react';

const principles = [
  {
    id: 1,
    violation: "Shipping JS for Static Content",
    principle: "Separation of Concerns",
    violationIcon: FileWarning,
    principleIcon: Layers,
    description: "HTML should be HTML. JavaScript should be an enhancement, not a requirement for text.",
    color: "from-orange-500 to-red-500"
  },
  {
    id: 2,
    violation: "Forcing a Single Framework",
    principle: "Dependency Inversion",
    violationIcon: Lock,
    principleIcon: Workflow,
    description: "Your architecture shouldn't be coupled to a specific UI library's release cycle.",
    color: "from-pink-500 to-rose-500"
  },
  {
    id: 3,
    violation: "Hydrating Everything",
    principle: "Performance by Default",
    violationIcon: ZapOff,
    principleIcon: Zap,
    description: "Maximum interactivity shouldn't mean maximum Time-To-Interactive (TTI).",
    color: "from-yellow-500 to-amber-500"
  },
  {
    id: 4,
    violation: "All-or-Nothing Adoption",
    principle: "Progressive Enhancement",
    violationIcon: Anchor,
    principleIcon: ArrowUpRight,
    description: "You shouldn't have to rewrite your entire legacy site just to use modern components.",
    color: "from-cyan-500 to-blue-500"
  }
];

export default function PrinciplesGrid() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto font-sans">
      {principles.map((item, idx) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative group h-48 cursor-default"
        >
          {/* Card Container */}
          <div className="absolute inset-0 bg-void-900 border border-white/10 rounded-2xl overflow-hidden transition-colors duration-500 group-hover:border-white/20">
            
            {/* Background Gradient Effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
            
            <div className="relative h-full p-6 flex flex-col justify-between z-10">
              
              {/* Header Row */}
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase opacity-60">
                    <span className={hoveredIndex === idx ? "text-astro" : "text-red-400"}>
                      {hoveredIndex === idx ? "CORE_PRINCIPLE" : "VIOLATION_DETECTED"}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white transition-all duration-300">
                    {hoveredIndex === idx ? item.principle : item.violation}
                  </h3>
                </div>

                <div className={`p-3 rounded-lg bg-white/5 border border-white/10 transition-all duration-300 ${hoveredIndex === idx ? 'bg-astro/20 text-astro border-astro/30' : 'text-red-400'}`}>
                  {hoveredIndex === idx 
                    ? <item.principleIcon size={24} /> 
                    : <item.violationIcon size={24} />
                  }
                </div>
              </div>

              {/* Footer / Description */}
              <div className="relative overflow-hidden h-12">
                {/* Violation Subtext */}
                <div className={`absolute inset-0 transition-transform duration-300 ${hoveredIndex === idx ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
                  <div className="flex items-center gap-2 text-red-400/80 text-sm font-mono">
                    <AlertOctagon size={14} />
                    <span>Critical Architectural Flaw</span>
                  </div>
                </div>

                {/* Principle Description */}
                <div className={`absolute inset-0 transition-transform duration-300 ${hoveredIndex === idx ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                  <p className="text-sm text-slate-300 leading-snug">
                    {item.description}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}