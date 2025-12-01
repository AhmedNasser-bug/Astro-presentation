<template>
  <div class="w-full max-w-6xl mx-auto">
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <!-- THE TERMINAL / PREVIEW -->
        <div class="relative bg-[#0d1117] rounded-xl border border-white/10 shadow-2xl overflow-hidden min-h-[400px] flex flex-col font-mono text-sm group">
            <!-- Terminal Header -->
            <div class="bg-white/5 px-4 py-3 flex items-center gap-2 border-b border-white/5">
                <div class="flex gap-1.5">
                    <div class="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div class="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div class="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div class="ml-4 text-slate-500">term — npx astro add</div>
            </div>

            <!-- Terminal Body -->
            <div class="p-6 flex-1 text-slate-300 space-y-4">
                <div class="flex gap-2">
                    <span class="text-green-400">➜</span>
                    <span class="text-blue-400">~</span>
                    <span class="typing-cursor">{{ currentCommand }}</span>
                </div>

                <!-- Simulation Output -->
                <div v-if="installing || installed" class="space-y-2 fade-in">
                    <div class="text-slate-400">Resolving packages...</div>
                    <div class="flex gap-2">
                        <span class="text-green-400">✔</span>
                        <span>Added <span class="text-white font-bold">{{ activeIntegration.name }}</span> integration</span>
                    </div>
                    <div class="flex gap-2">
                        <span class="text-green-400">✔</span>
                        <span>Updated <span class="text-blue-400">astro.config.mjs</span></span>
                    </div>
                    <div class="flex gap-2">
                        <span class="text-green-400">✔</span>
                        <span>Updated <span class="text-blue-400">tsconfig.json</span></span>
                    </div>
                    
                    <div class="mt-4 p-3 bg-green-900/10 border border-green-500/20 rounded text-green-400">
                        Success! You can now use {{ activeIntegration.label }} in your project.
                    </div>
                </div>
            </div>

            <!-- Background Effect -->
            <div class="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        </div>

        <!-- THE DOCK -->
        <div class="space-y-8">
            <div>
                <h3 class="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-purple-400"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                    The Ecosystem
                </h3>
                <p class="text-slate-400 leading-relaxed">
                    Don't waste days configuring webpack. Astro has a massive ecosystem of 
                    <span class="text-white font-bold">first-party integrations</span>. 
                    One command to install, configure, and deploy.
                </p>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <button 
                    v-for="item in integrations" 
                    :key="item.id"
                    @click="selectIntegration(item)"
                    :class="[
                        'p-4 rounded-xl border text-left transition-all duration-300 relative overflow-hidden group',
                        activeIntegration.id === item.id 
                            ? 'bg-white/10 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.2)]' 
                            : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                    ]"
                >
                    <div class="relative z-10 flex items-center gap-3">
                        <div class="p-2 rounded-lg bg-[#0d1117] text-white border border-white/10" v-html="item.icon"></div>
                        <div>
                            <div class="font-bold text-white text-sm">{{ item.label }}</div>
                            <div class="text-[10px] text-slate-400 uppercase tracking-wider">{{ item.type }}</div>
                        </div>
                    </div>
                    <!-- Selection Indicator -->
                    <div 
                        class="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-colors duration-300"
                        :class="activeIntegration.id === item.id ? 'bg-green-400 shadow-[0_0_10px_#4ade80]' : 'bg-slate-700'"
                    ></div>
                </button>
            </div>
        </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const currentCommand = ref('npx astro add ...');
const installing = ref(false);
const installed = ref(false);

const integrations = [
    { 
        id: 'tailwind', 
        name: 'tailwind', 
        label: 'Tailwind CSS', 
        type: 'Styling',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19c0-1.7-1.3-3-3-4.5-1.7-1.5-2.5-3-2.5-4.5 0-1.7 1.3-3 3-4.5 1.7-1.5 2.5-3 2.5-4.5"/><path d="M6.5 19c0-1.7-1.3-3-3-4.5-1.7-1.5-2.5-3-2.5-4.5 0-1.7 1.3-3 3-4.5 1.7-1.5 2.5-3 2.5-4.5"/></svg>'
    },
    { 
        id: 'react', 
        name: 'react', 
        label: 'React', 
        type: 'Framework',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#61dafb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>'
    },
    { 
        id: 'partytown', 
        name: 'partytown', 
        label: 'Partytown', 
        type: 'Performance',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f472b6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12h12"/><path d="m3 9 3 3-3 3"/><path d="m21 9-3 3 3 3"/></svg>'
    },
    { 
        id: 'vercel', 
        name: 'vercel', 
        label: 'Vercel', 
        type: 'Deployment',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-10 18h20z"/></svg>'
    }
];

const activeIntegration = ref(integrations[0]);

const selectIntegration = (item) => {
    if (activeIntegration.value.id === item.id && installed.value) return;
    
    activeIntegration.value = item;
    installed.value = false;
    installing.value = true;
    currentCommand.value = `npx astro add ${item.name}`;
    
    // Simulate typing delay and install time
    setTimeout(() => {
        installing.value = false;
        installed.value = true;
    }, 800);
};
</script>

<style scoped>
.typing-cursor::after {
    content: '|';
    animation: blink 1s step-end infinite;
}

@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}

.fade-in {
    animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>
