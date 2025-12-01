import os
import re
import sys
import json
import subprocess

# STRICT DEPENDENCY: Relying on the existing file_ops module.
try:
    from file_ops import FileOps
except ImportError:
    print("[CRITICAL]: 'file_ops.py' not found. This script relies on the FileOps utility.")
    sys.exit(1)

def configure_deployment_branch():
    """
    Configures the project for Vercel/Netlify deployment on a new branch.
    Switches to @astrojs/vercel and ensures Hono is configured correctly.
    """
    ops = FileOps()
    
    # ---------------------------------------------------------
    # STEP 0: Git Branch Management
    # ---------------------------------------------------------
    try:
        # Check if git is initialized
        subprocess.check_call(["git", "rev-parse", "--is-inside-work-tree"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        
        branch_name = "deploy-ssr"
        print(f"[GIT]: Creating/Switching to branch '{branch_name}'...")
        
        # Try to checkout existing branch, or create new one
        try:
            subprocess.check_call(["git", "checkout", branch_name], stderr=subprocess.DEVNULL)
        except subprocess.CalledProcessError:
            subprocess.check_call(["git", "checkout", "-b", branch_name])
            
        print(f"[GIT]: Successfully switched to '{branch_name}'")
        
    except FileNotFoundError:
        print("[WARNING]: Git not found. Skipping branch creation. Applying changes to current files.")
    except subprocess.CalledProcessError:
        print("[WARNING]: Not a git repository. Skipping branch creation. Applying changes to current files.")

    # ---------------------------------------------------------
    # STEP 1: Update package.json (Vercel Adapter + Hono)
    # ---------------------------------------------------------
    pkg_path = "package.json"
    pkg_content = ops.read_file(pkg_path)
    if pkg_content:
        pkg_json = json.loads(pkg_content)
        deps = pkg_json.get("dependencies", {})
        
        # Remove Node adapter if present (conflicts with Vercel)
        if "@astrojs/node" in deps:
            del deps["@astrojs/node"]
            
        # Ensure Vercel adapter and Hono are present
        deps["@astrojs/vercel"] = "^7.0.0"
        deps["hono"] = "^4.0.0"
        
        pkg_json["dependencies"] = deps
        ops.update_file(pkg_path, json.dumps(pkg_json, indent=2))
        print("[SUCCESS]: Updated package.json (Added @astrojs/vercel, ensured hono)")

    # ---------------------------------------------------------
    # STEP 2: Update astro.config.mjs
    # ---------------------------------------------------------
    config_path = "astro.config.mjs"
    config_content = ops.read_file(config_path)
    if config_content:
        # Replace Node import with Vercel import
        if "import node" in config_content:
            config_content = re.sub(r"import\s+node\s+from\s+['\"]@astrojs/node['\"];", "import vercel from '@astrojs/vercel';", config_content)
        elif "import vercel" not in config_content:
            config_content = "import vercel from '@astrojs/vercel';\n" + config_content

        # Replace adapter configuration
        # Matches adapter: node(...) OR adapter: node()
        if "adapter: node" in config_content:
            config_content = re.sub(r"adapter:\s*node\(\{.*?\}\)", "adapter: vercel()", config_content, flags=re.DOTALL)
            config_content = re.sub(r"adapter:\s*node\(\)", "adapter: vercel()", config_content)
        # If no adapter is set but output is server, just insert it
        elif "adapter:" not in config_content and "defineConfig({" in config_content:
             config_content = config_content.replace("defineConfig({", "defineConfig({\n  adapter: vercel(),")

        # Ensure output is server (required for SSR)
        if "output: 'server'" not in config_content:
             config_content = config_content.replace("defineConfig({", "defineConfig({\n  output: 'server',")

        ops.update_file(config_path, config_content)
        print("[SUCCESS]: Configured astro.config.mjs for Vercel SSR")

    # ---------------------------------------------------------
    # STEP 3: Verify Hono Endpoint Logic (SSR Mode)
    # ---------------------------------------------------------
    # We need to make sure the Hono endpoint is the REAL one, not the static stub
    hono_endpoint_path = os.path.join("src", "pages", "api", "hono", "[...route].js")
    
    real_hono_code = r"""
import { Hono } from 'hono';

// Initialize Hono with the correct base path relative to where this file lives in 'src/pages'
const app = new Hono().basePath('/api/hono');

app.get('/data', async (c) => {
  // Simulate database processing latency
  await new Promise(resolve => setTimeout(resolve, 800));

  return c.json({
    message: "Data fetched from Hono Router (Vercel Edge/Serverless)",
    timestamp: new Date().toISOString(),
    framework: "Hono",
    status: 200
  });
});

// Catch-all route to handle 404s within the Hono app context gracefully
app.all('*', (c) => {
    return c.json({ error: "Route not found in Hono app", path: c.req.path }, 404);
});

export const ALL = ({ request }) => app.fetch(request);
"""
    # Ensure directory exists just in case
    os.makedirs(os.path.dirname(hono_endpoint_path), exist_ok=True)
    ops.update_file(hono_endpoint_path, real_hono_code) # Use update to force overwrite if stub exists
    print("[SUCCESS]: Ensured Hono endpoint contains production SSR logic")

    # ---------------------------------------------------------
    # STEP 4: Verify UI Component (Real Fetch)
    # ---------------------------------------------------------
    # Ensure the frontend component is trying to fetch for real, not simulating
    backend_real_jsx_path = os.path.join("src", "components", "BackendReal.jsx")
    
    # We'll re-write the component to the version that attempts a real fetch
    # This is identical to the 'clean_backend_real_jsx' from the previous revert script
    clean_backend_real_jsx = r"""import React, { useState } from 'react';
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
        
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        
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
"""
    ops.update_file(backend_real_jsx_path, clean_backend_real_jsx)
    print("[SUCCESS]: Updated BackendReal.jsx to use real fetch (no simulation)")

if __name__ == "__main__":
    configure_deployment_branch()