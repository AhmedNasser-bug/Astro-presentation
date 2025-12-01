import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function BundleComparison() {
  const [isVisible, setIsVisible] = useState(false);

  const frameworks = [
    { name: 'Astro (Islands)', size: 10, color: 'bg-astro', text: 'text-astro', icon: CheckCircle2, status: 'OPTIMAL' },
    { name: 'Next.js', size: 247, color: 'bg-blue-500', text: 'text-blue-400', icon: Database, status: 'HEAVY' },
    { name: 'Gatsby', size: 312, color: 'bg-purple-500', text: 'text-purple-400', icon: Database, status: 'BLOATED' },
    { name: 'Create React App', size: 389, color: 'bg-red-500', text: 'text-red-400', icon: AlertCircle, status: 'CRITICAL' },
  ];

  const maxSize = 389;

  // Simple intersection observer simulation or just animate on mount since parent controls hydration
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 font-mono">
      {frameworks.map((fw, index) => (
        <div key={fw.name} className="relative">
          
          {/* Label Row */}
          <div className="flex justify-between text-xs mb-2 items-center">
            <span className={`font-bold flex items-center gap-2 ${fw.text}`}>
              <fw.icon size={14} />
              {fw.name}
            </span>
            <span className={fw.text}>{fw.size} KB</span>
          </div>

          {/* Bar Container */}
          <div className="h-12 bg-slate-900/50 rounded-lg border border-white/5 relative overflow-hidden flex items-center px-3">
            
            {/* Background Grid Lines for Scale */}
            <div className="absolute inset-0 flex justify-between px-2 opacity-10 pointer-events-none">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="w-px h-full bg-white"></div>
              ))}
            </div>

            {/* The Bar */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: isVisible ? `${(fw.size / maxSize) * 100}%` : 0 }}
              transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
              className={`absolute top-1 bottom-1 left-1 rounded-md ${fw.color} opacity-80 shadow-[0_0_15px_rgba(255,255,255,0.1)]`}
            >
                {/* Striped pattern overlay */}
                <div className="absolute inset-0 opacity-30 bg-[length:10px_10px] bg-[linear-gradient(45deg,rgba(0,0,0,0.2)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.2)_50%,rgba(0,0,0,0.2)_75%,transparent_75%,transparent)]"></div>
            </motion.div>

            {/* Status Label (floats right if bar is small, inside if bar is big) */}
            <div className="relative z-10 flex justify-between w-full text-[10px] tracking-wider font-bold">
               <span className="opacity-0">.</span> {/* Spacer */}
               <span className={`${fw.size < 50 ? 'text-slate-500' : 'text-white drop-shadow-md'}`}>
                 {fw.status}
               </span>
            </div>
          </div>
        </div>
      ))}

      <div className="text-center pt-8 border-t border-white/5 mt-8">
        <p className="text-slate-500 text-xs uppercase tracking-widest">
            Context: Simple Blog Post (Hello World)
        </p>
      </div>
    </div>
  );
}