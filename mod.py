import os
import re
import sys

# STRICT DEPENDENCY: Relying on the existing file_ops module.
try:
    from file_ops import FileOps
except ImportError:
    print("[CRITICAL]: 'file_ops.py' not found. This script relies on the FileOps utility.")
    sys.exit(1)

def add_navigation_module():
    """
    Creates a Phase Navigation sidebar and injects it into the Layout.
    """
    ops = FileOps()
    
    # Paths
    components_dir = os.path.join("src", "components")
    layout_path = os.path.join("src", "layouts", "Layout.astro")
    
    # ---------------------------------------------------------
    # ARTIFACT 1: The Navigator Component (React)
    # ---------------------------------------------------------
    navigator_jsx = r"""import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flag, Activity, Code2, Puzzle, Server, Database, Rocket } from 'lucide-react';

const phases = [
  { id: 'hero', label: 'Briefing', icon: Flag },
  { id: 'problem', label: 'Problem', icon: Activity },
  { id: 'solution', label: 'Solution', icon: Code2 },
  { id: 'agnostic', label: 'Agnosticism', icon: Puzzle },
  { id: 'backend', label: 'Backend', icon: Server },
  { id: 'ecosystem', label: 'Ecosystem', icon: Database },
  { id: 'conclusion', label: 'Liftoff', icon: Rocket },
];

export default function PhaseNavigator() {
  const [activeId, setActiveId] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: '-20% 0px -50% 0px' }
    );

    phases.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-4">
      {phases.map((phase) => {
        const isActive = activeId === phase.id;
        const Icon = phase.icon;
        
        return (
          <button
            key={phase.id}
            onClick={() => scrollTo(phase.id)}
            className="group relative flex items-center justify-end"
          >
            {/* Label Tooltip */}
            <span 
              className={`
                absolute right-12 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300
                ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0'}
                bg-void-950 border border-white/10 text-white shadow-xl
              `}
            >
              {phase.label}
            </span>

            {/* Icon Circle */}
            <div 
              className={`
                w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500 relative overflow-hidden
                ${isActive 
                  ? 'bg-white text-void-950 border-white shadow-[0_0_20px_rgba(255,255,255,0.5)] scale-110' 
                  : 'bg-void-950/50 text-slate-500 border-white/10 hover:border-white/30 hover:text-white backdrop-blur-md'
                }
              `}
            >
              <Icon size={isActive ? 18 : 16} strokeWidth={isActive ? 2.5 : 2} />
              
              {/* Active Pulse Ring */}
              {isActive && (
                <span className="absolute inset-0 rounded-full border-2 border-white animate-ping opacity-20"></span>
              )}
            </div>
          </button>
        );
      })}
      
      {/* Connecting Line */}
      <div className="absolute right-5 top-0 bottom-0 w-px bg-white/5 -z-10 rounded-full">
        <motion.div 
            className="w-full bg-gradient-to-b from-transparent via-white/20 to-transparent"
            style={{ height: '30%', top: '0%' }} // Could animate this to follow scroll if needed, but static gradient is fine for now
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}
"""
    ops.create_file(os.path.join(components_dir, "PhaseNavigator.jsx"), navigator_jsx)

    # ---------------------------------------------------------
    # OPERATION 2: Inject into Layout (Global Persistence)
    # ---------------------------------------------------------
    layout_content = ops.read_file(layout_path)
    if layout_content:
        # Add ID to body for potential scroll spy context, though we target sections
        
        # Inject the component usage
        # We assume there's a <body> tag. We want to put it right after opening body or before slot.
        # But wait, this is a React component, so we need to use client:load or client:idle.
        # However, Layout.astro might not import React.
        
        # 1. Add Import
        if "import PhaseNavigator" not in layout_content:
            layout_content = layout_content.replace("---", "---\nimport PhaseNavigator from '../components/PhaseNavigator.jsx';", 1)

        # 2. Add Component to Body
        if "<PhaseNavigator" not in layout_content:
            layout_content = layout_content.replace("<body class=\"", "<body class=\"") # anchor
            # Insert right after opening body tag for fixed positioning
            layout_content = re.sub(r'(<body.*?>)', r'\1\n        <PhaseNavigator client:idle />', layout_content)

        ops.update_file(layout_path, layout_content)
        print("[SUCCESS]: Injected PhaseNavigator into Layout.astro")

    # ---------------------------------------------------------
    # OPERATION 3: Add IDs to Sections in Index (For ScrollSpy)
    # ---------------------------------------------------------
    # We need to ensure the sections in index.astro have the IDs expected by the navigator:
    # hero, problem, solution, agnostic, backend, ecosystem, conclusion
    # Since the sections are components, we need to wrap them in divs with IDs or modify the components.
    # Wrapping in divs in index.astro is safer/easier than modifying every section file.

    index_path = os.path.join("src", "pages", "index.astro")
    index_content = ops.read_file(index_path)
    
    if index_content:
        # Mapping components to IDs
        replacements = [
            ("<Hero/>", "<div id='hero'><Hero/></div>"),
            ("<Hero />", "<div id='hero'><Hero /></div>"),
            
            ("<TheProblem/>", "<div id='problem'><TheProblem/></div>"),
            ("<TheProblem />", "<div id='problem'><TheProblem /></div>"),
            
            ("<TheSolution/>", "<div id='solution'><TheSolution/></div>"),
            ("<TheSolution />", "<div id='solution'><TheSolution /></div>"),
            
            ("<PlotTwistSection/>", "<div id='agnostic'><PlotTwistSection/></div>"),
            ("<PlotTwistSection />", "<div id='agnostic'><PlotTwistSection /></div>"),
            
            ("<BackendRealSection/>", "<div id='backend'><BackendRealSection/></div>"),
            ("<BackendRealSection />", "<div id='backend'><BackendRealSection /></div>"),
            
            ("<IntegrationsSection/>", "<div id='ecosystem'><IntegrationsSection/></div>"),
            ("<IntegrationsSection />", "<div id='ecosystem'><IntegrationsSection /></div>"),
            
            ("<ConclusionSection/>", "<div id='conclusion'><ConclusionSection/></div>"),
            ("<ConclusionSection />", "<div id='conclusion'><ConclusionSection /></div>"),
        ]

        for old, new in replacements:
            # Simple check if already wrapped
            if f"id='{new.split('=')[1].split('>')[0].strip('\'')}'" not in index_content:
                index_content = index_content.replace(old, new)

        ops.update_file(index_path, index_content)
        print("[SUCCESS]: Added ScrollSpy IDs to index.astro")

if __name__ == "__main__":
    add_navigation_module()