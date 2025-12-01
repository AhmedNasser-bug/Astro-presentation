import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Zap, Database, Terminal, RefreshCw, Check, Clock } from 'lucide-react';

export default function BackendReal() {
  const [activeTab, setActiveTab] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [logs, setLogs] = useState([]);

  const endpoints = [
    { 
        id: 'native', 
        name: 'Astro Native', 
        url: '/api/native', 
        color: 'text-orange-400', 
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/20',
        desc: 'Uses standard Request/Response objects directly.'
    },
    { 
        id: 'hono', 
        name: 'Hono Framework', 
        url: '/api/hono/data', 
        color: 'text-yellow-400', 
        bg: 'bg-yellow-500/10', 
        border: 'border-yellow-500/20',
        desc: 'Mounts a full Hono application inside an Astro route.'
    }
  ];

  const fetchData = async (endpoint) => {
    if (loading) return;
    setLoading(true);
    setActiveTab(endpoint.id);
    setData(null);
    setLogs(prev => [`[${endpoint.name}] Request sent to ${endpoint.url}...`, ...prev]);

    try {
        const start = performance.now();
        const res = await fetch(endpoint.url);
        const json = await res.json();
        const end = performance.now();
        
        setData({ ...json, latency: Math.round(end - start) });
        setLogs(prev => [`[${endpoint.name}] Response received in ${Math.round(end - start)}ms`, ...prev]);
    } catch (e) {
        setLogs(prev => [`[ERROR] Failed to fetch: ${e.message}`, ...prev]);
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 font-mono">
      
      {/* Controls */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
            {endpoints.map((ep) => (
                <button
                    key={ep.id}
                    onClick={() => fetchData(ep)}
                    className={`
                        relative p-6 rounded-xl border text-left transition-all duration-300 group
                        ${activeTab === ep.id ? `${ep.bg} ${ep.border}` : 'bg-void-950 border-white/10 hover:border-white/20'}
                    `}
                >
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            {ep.id === 'native' ? <Zap className={ep.color} /> : <Server className={ep.color} />}
                            <span className="font-bold text-white text-lg">{ep.name}</span>
                        </div>
                        {activeTab === ep.id && loading && <RefreshCw className={`animate-spin ${ep.color}`} />}
                    </div>
                    <p className="text-slate-400 text-xs">{ep.desc}</p>
                    <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-widest">
                        <span className="bg-white/5 px-2 py-1 rounded">GET</span>
                        <span className="font-mono">{ep.url}</span>
                    </div>
                </button>
            ))}
        </div>

        {/* Console Log */}
        <div className="h-48 bg-[#0d1117] rounded-xl border border-white/10 overflow-hidden flex flex-col shadow-inner">
            <div className="px-4 py-2 bg-white/5 border-b border-white/5 flex items-center gap-2">
                <Terminal size={14} className="text-slate-500" />
                <span className="text-xs text-slate-500">Real-time Logs</span>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-2 text-xs font-mono">
                {logs.length === 0 && <span className="text-slate-600 italic">// Waiting for request...</span>}
                {logs.map((log, i) => (
                    <div key={i} className="text-slate-300 border-l-2 border-slate-700 pl-2">
                        {log}
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Live Response Viewer */}
      <div className="bg-void-950 rounded-xl border border-white/10 p-1 overflow-hidden relative min-h-[400px] flex flex-col">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        
        {/* Header */}
        <div className="bg-white/5 px-4 py-3 flex items-center justify-between border-b border-white/5 rounded-t-lg">
            <div className="flex items-center gap-2 text-xs text-slate-400">
                <Database size={14} />
                <span>Server Response</span>
            </div>
            {data && (
                <div className="flex items-center gap-2 px-2 py-1 rounded bg-green-500/10 text-green-400 text-[10px] border border-green-500/20">
                    <Check size={10} /> 200 OK
                </div>
            )}
        </div>

        {/* JSON Body */}
        <div className="flex-1 p-6 relative">
            <AnimatePresence mode="wait">
                {data ? (
                    <motion.div 
                        key="data"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                                <span className="text-[10px] text-slate-500 uppercase block mb-1">Source</span>
                                <span className={`font-bold ${activeTab === 'native' ? 'text-orange-400' : 'text-yellow-400'}`}>
                                    {data.framework}
                                </span>
                            </div>
                            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                                <span className="text-[10px] text-slate-500 uppercase block mb-1 flex items-center gap-1">
                                    <Clock size={10} /> Latency
                                </span>
                                <span className="font-bold text-white">{data.latency}ms</span>
                            </div>
                        </div>

                        <div className="relative">
                            <pre className="font-mono text-sm text-blue-300 leading-relaxed overflow-x-auto p-4 rounded-lg bg-[#0d1117] border border-white/5 shadow-inner">
{JSON.stringify(data, null, 2)}
                            </pre>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-full flex flex-col items-center justify-center text-slate-600 gap-4"
                    >
                        <Server size={48} className="opacity-20" />
                        <p className="text-sm">Initiate a request to see real server data.</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
