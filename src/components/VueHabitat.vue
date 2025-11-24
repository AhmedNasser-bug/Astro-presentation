<template>
  <div class="h-full flex flex-col justify-between">
    <div class="flex justify-between items-start mb-4">
      <div>
        <h3 class="text-lg font-bold text-white flex items-center gap-2">
            <!-- Leaf/Bio Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-vue"><path d="M12 22v-5"/><path d="M9 12l2 5 2-5"/><path d="m5 12 7-7 7 7"/></svg>
            Bio-Dome
        </h3>
        <p class="text-[10px] text-slate-400 font-mono mt-1">MODULE: VUE_V3</p>
      </div>
      <div class="px-2 py-0.5 rounded-full bg-vue/10 border border-vue/20 text-[10px] text-vue font-mono">
        STABLE
      </div>
    </div>

    <!-- Interactive Disc -->
    <div class="relative flex-grow flex items-center justify-center py-4">
        <div 
            class="w-32 h-32 rounded-full border-2 border-dashed border-vue/30 flex items-center justify-center relative cursor-pointer transition-all duration-500 group"
            :class="{ 'rotate-180': isOpen }"
            @click="toggle"
        >
            <div class="absolute inset-0 bg-vue/5 rounded-full blur-xl group-hover:bg-vue/20 transition-all"></div>
            <span class="text-2xl font-bold text-vue font-mono">{{ temp }}°C</span>
            
            <!-- Orbiting Dot -->
            <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1.5 w-3 h-3 bg-vue rounded-full shadow-[0_0_10px_#42b883]"></div>
        </div>
    </div>

    <div class="mt-4 pt-3 border-t border-white/5 grid grid-cols-2 gap-2">
        <button @click="adjust(-1)" class="py-2 bg-slate-800 text-slate-300 hover:text-white rounded text-xs transition-colors">- TEMP</button>
        <button @click="adjust(1)" class="py-2 bg-slate-800 text-slate-300 hover:text-white rounded text-xs transition-colors">+ TEMP</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isOpen = ref(false);
const temp = ref(24);

const toggle = () => isOpen.value = !isOpen.value;
const adjust = (val) => temp.value += val;
</script>

<style scoped>
.rotate-180 { transform: rotate(180deg); }
</style>