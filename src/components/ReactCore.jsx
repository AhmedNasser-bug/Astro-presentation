import React, { useState, useEffect } from 'react';
import { Activity, Cpu, Database } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ReactCore() {
  const [load, setLoad] = useState(0);

  // Simulate "Working" data
  useEffect(() => {
    const interval = setInterval(() => {
        setLoad(prev => (prev + Math.random() * 10) % 100);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Cpu size={18} className="text-react" />
                Data Core
            </h3>
            <p className="text-[10px] text-slate-400 font-mono mt-1">MODULE: REACT_DOM</p>
        </div>
        <div className="px-2 py-0.5 rounded-full bg-react/10 border border-react/20 text-[10px] text-react font-mono animate-pulse">
            ACTIVE
        </div>
      </div>
      
      <div className="space-y-4 flex-grow flex flex-col justify-center">
        <div className="flex justify-between text-xs text-slate-400 font-mono">
            <span>THREAD_LOAD</span>
            <span className="text-white">{Math.round(load)}%</span>
        </div>
        
        {/* Visualization Bars */}
        <div className="flex gap-1 h-12 items-end">
            {[...Array(10)].map((_, i) => (
                <motion.div 
                    key={i}
                    animate={{ height: `${Math.max(10, Math.random() * load)}%` }}
                    transition={{ duration: 0.5 }}
                    className="flex-1 bg-react/80 rounded-t-sm"
                    style={{ opacity: 0.3 + (i / 10) * 0.7 }}
                />
            ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-white/5">
        <button 
            onClick={() => setLoad(Math.random() * 100)}
            className="w-full py-2 bg-react/10 hover:bg-react/20 text-react border border-react/30 rounded text-xs font-bold tracking-wider transition-colors"
        >
            RE-CALIBRATE
        </button>
      </div>
    </div>
  );
}