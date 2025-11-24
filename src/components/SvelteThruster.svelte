<script>
    import { spring } from 'svelte/motion';
    
    let isHovering = false;
    
    // Using Svelte's famous physics-based motion
    const scale = spring(1, {
        stiffness: 0.1,
        damping: 0.25
    });

    const rotate = spring(0, {
        stiffness: 0.1,
        damping: 0.6
    });

    function handleEnter() {
        isHovering = true;
        scale.set(1.1);
    }

    function handleLeave() {
        isHovering = false;
        scale.set(1);
        rotate.set(0);
    }

    function handleMove(e) {
        if(!isHovering) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width/2;
        // Calculate rotation based on mouse position
        rotate.set(x / 5);
    }
</script>

<div 
    class="h-full flex flex-col justify-between"
    on:mouseenter={handleEnter}
    on:mouseleave={handleLeave}
    on:mousemove={handleMove}
>
    <div class="flex justify-between items-start mb-4">
        <div>
            <h3 class="text-lg font-bold text-white flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-svelte"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                Thruster
            </h3>
            <p class="text-[10px] text-slate-400 font-mono mt-1">MODULE: SVELTE_ENGINE</p>
        </div>
        <div class="px-2 py-0.5 rounded-full bg-svelte/10 border border-svelte/20 text-[10px] text-svelte font-mono">
            IDLE
        </div>
    </div>

    <div class="flex-grow flex items-center justify-center overflow-hidden relative rounded-lg bg-black/20">
        <!-- Grid lines moving -->
        <div class="absolute inset-0 opacity-20" style="background-image: linear-gradient(0deg, transparent 24%, rgba(255, 62, 0, .3) 25%, rgba(255, 62, 0, .3) 26%, transparent 27%, transparent 74%, rgba(255, 62, 0, .3) 75%, rgba(255, 62, 0, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 62, 0, .3) 25%, rgba(255, 62, 0, .3) 26%, transparent 27%, transparent 74%, rgba(255, 62, 0, .3) 75%, rgba(255, 62, 0, .3) 76%, transparent 77%, transparent); background-size: 30px 30px;"></div>

        <!-- The Physics Object -->
        <div 
            class="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded shadow-lg shadow-orange-500/40 relative z-10 flex items-center justify-center font-bold text-white"
            style="transform: scale({$scale}) rotate({$rotate}deg);"
        >
            🚀
        </div>
    </div>

    <div class="mt-4 pt-3 border-t border-white/5">
        <div class="w-full h-1 bg-slate-800 rounded overflow-hidden">
            <div class="h-full bg-svelte transition-all duration-75" style="width: {isHovering ? '100%' : '0%'}"></div>
        </div>
        <div class="flex justify-between mt-1 text-[10px] text-slate-500 font-mono uppercase">
            <span>Input</span>
            <span>{isHovering ? 'Detected' : 'Waiting'}</span>
        </div>
    </div>
</div>