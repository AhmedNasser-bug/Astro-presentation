/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            colors: {
                void: {
                    950: '#020617', // Deepest space
                    900: '#0f172a',
                    800: '#1e293b',
                },
                starlight: '#f8fafc',
                react: '#61dafb',
                vue: '#42b883',
                svelte: '#ff3e00',
                astro: '#bc52ee'
            },
            backgroundImage: {
                'nebula-gradient': 'radial-gradient(circle at 50% 0%, rgba(120, 119, 198, 0.15), rgba(255, 255, 255, 0))',
                'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40' stroke='%23334155' stroke-opacity='0.1' fill='none'/%3E%3C/svg%3E\")",
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'scan': 'scan 3s linear infinite',
            },
            keyframes: {
                scan: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100%)' }
                }
            }
        },
	},
	plugins: [],
}