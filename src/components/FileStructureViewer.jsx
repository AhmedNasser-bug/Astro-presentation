import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, FileCode, FileJson, Settings, AlertTriangle, CheckCircle2, ChevronRight, FileType } from 'lucide-react';

const frameworks = {
  astro: {
    id: 'astro',
    name: 'Astro',
    badge: 'OPTIMAL',
    badgeColor: 'bg-astro text-white',
    description: 'Zero-JS by default. The component code runs on the server, and only HTML is sent to the client.',
    files: [
      { name: 'src', type: 'folder', children: [
        { name: 'pages', type: 'folder', children: [
            { name: 'index.astro', type: 'file', color: 'text-astro', note: 'Renders to pure HTML' }
        ]},
        { name: 'components', type: 'folder', children: [
            { name: 'Card.astro', type: 'file', color: 'text-astro' }
        ]}
      ]},
      { name: 'astro.config.mjs', type: 'config', color: 'text-yellow-400' },
      { name: 'package.json', type: 'json', color: 'text-green-400' }
    ]
  },
  next: {
    id: 'next',
    name: 'Next.js',
    badge: 'HEAVY',
    badgeColor: 'bg-blue-600 text-white',
    description: 'Includes Client-Side Router, Hydration logic, and React runtime even for static pages.',
    files: [
      { name: 'app', type: 'folder', children: [
        { name: 'layout.tsx', type: 'file', color: 'text-blue-400', note: 'Root Layout + Context' },
        { name: 'page.tsx', type: 'file', color: 'text-blue-400', note: 'React Component' },
        { name: 'globals.css', type: 'file', color: 'text-blue-300' }
      ]},
      { name: 'public', type: 'folder' },
      { name: 'next.config.js', type: 'config', color: 'text-yellow-400' },
      { name: 'package.json', type: 'json', color: 'text-green-400' },
      { name: '.next', type: 'folder', dim: true, note: 'Huge Build Artifacts' }
    ]
  },
  gatsby: {
    id: 'gatsby',
    name: 'Gatsby',
    badge: 'COMPLEX',
    badgeColor: 'bg-purple-600 text-white',
    description: 'Requires GraphQL data layer and heavy configuration just to render content.',
    files: [
      { name: 'src', type: 'folder', children: [
        { name: 'pages', type: 'folder', children: [
            { name: 'index.js', type: 'file', color: 'text-purple-400' }
        ]},
        { name: 'templates', type: 'folder' },
      ]},
      { name: 'gatsby-config.js', type: 'config', color: 'text-yellow-400', note: 'Plugin Config Hell' },
      { name: 'gatsby-node.js', type: 'config', color: 'text-yellow-400', note: 'Build logic' },
      { name: 'gatsby-browser.js', type: 'config', color: 'text-yellow-400' },
      { name: 'package.json', type: 'json', color: 'text-green-400' }
    ]
  },
  cra: {
    id: 'cra',
    name: 'CRA',
    badge: 'LEGACY',
    badgeColor: 'bg-red-600 text-white',
    description: 'Entire app is a black box JS bundle. SEO unfriendly. Deprecated.',
    files: [
      { name: 'public', type: 'folder', children: [
          { name: 'index.html', type: 'file', color: 'text-orange-400', note: 'Empty Div Root' }
      ]},
      { name: 'src', type: 'folder', children: [
        { name: 'App.js', type: 'file', color: 'text-blue-400' },
        { name: 'index.js', type: 'file', color: 'text-blue-400', note: 'Injects entire app' },
        { name: 'App.css', type: 'file', color: 'text-blue-300' }
      ]},
      { name: 'package.json', type: 'json', color: 'text-green-400' },
      { name: 'node_modules', type: 'folder', dim: true, note: 'The Black Hole' }
    ]
  }
};

const FileItem = ({ item, depth = 0 }) => (
  <div className="font-mono text-sm leading-7">
    <div className={`flex items-center gap-2 hover:bg-white/5 rounded px-2 ${item.dim ? 'opacity-40' : ''}`} style={{ paddingLeft: `${depth * 1.5}rem` }}>
        {item.type === 'folder' && <FolderOpen size={14} className="text-slate-400" />}
        {item.type === 'file' && <FileCode size={14} className={item.color || 'text-slate-300'} />}
        {item.type === 'config' && <Settings size={14} className={item.color || 'text-slate-300'} />}
        {item.type === 'json' && <FileJson size={14} className={item.color || 'text-slate-300'} />}
        
        <span className={item.dim ? 'text-slate-600' : 'text-slate-300'}>{item.name}</span>
        
        {item.note && (
            <span className="ml-auto text-[10px] uppercase tracking-wider text-slate-500 border border-white/5 px-1.5 rounded">
                {item.note}
            </span>
        )}
    </div>
    {item.children && (
        <div>
            {item.children.map((child, i) => (
                <FileItem key={i} item={child} depth={depth + 1} />
            ))}
        </div>
    )}
  </div>
);

export default function FileStructureViewer() {
  const [activeTab, setActiveTab] = useState('astro');
  const activeFramework = frameworks[activeTab];

  return (
    <div className="flex flex-col md:flex-row gap-8 h-[500px]">
        {/* Sidebar Controls */}
        <div className="w-full md:w-1/3 flex flex-col gap-2">
            {Object.values(frameworks).map((fw) => (
                <button
                    key={fw.id}
                    onClick={() => setActiveTab(fw.id)}
                    className={`text-left px-4 py-4 rounded-xl border transition-all duration-300 flex items-center justify-between group ${
                        activeTab === fw.id 
                        ? 'bg-white/10 border-white/20 shadow-lg' 
                        : 'bg-transparent border-transparent hover:bg-white/5 text-slate-400'
                    }`}
                >
                    <span className="font-bold tracking-tight">{fw.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                        activeTab === fw.id ? fw.badgeColor : 'bg-slate-800 text-slate-500 group-hover:text-slate-300'
                    }`}>
                        {fw.badge}
                    </span>
                </button>
            ))}
            
            <div className="mt-auto p-4 bg-slate-900/50 rounded-xl border border-white/5 text-sm text-slate-400">
                <div className="flex items-center gap-2 mb-2 text-white font-bold">
                    <AlertTriangle size={16} className="text-yellow-500" />
                    Analysis
                </div>
                {activeFramework.description}
            </div>
        </div>

        {/* File Viewer Window */}
        <div className="flex-1 bg-void-950 border border-white/10 rounded-2xl overflow-hidden relative shadow-2xl flex flex-col">
            {/* Window Header */}
            <div className="h-10 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="ml-4 text-xs font-mono text-slate-500 flex items-center gap-2">
                    <FolderOpen size={12} />
                    ~/projects/{activeFramework.id}-blog
                </div>
            </div>

            {/* Code Content */}
            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeFramework.files.map((file, i) => (
                            <FileItem key={i} item={file} />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Decorative Scan Line */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/5 to-transparent h-[10%] animate-scan opacity-20"></div>
        </div>
    </div>
  );
}