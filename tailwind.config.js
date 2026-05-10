/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base:    '#0e0e10',
          surface: '#16161a',
          panel:   '#1c1c22',
          border:  '#2a2a35',
        },
        accent: {
          amber:   '#f5a623',
          amber2:  '#e8902a',
          red:     '#e8474a',
          green:   '#3ecf8e',
          blue:    '#5b8dee',
          muted:   '#6b6b80',
        },
      },
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body:    ['"DM Sans"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-amber': '0 0 20px rgba(245,166,35,0.25)',
        'glow-green': '0 0 20px rgba(62,207,142,0.25)',
        'card':       '0 2px 12px rgba(0,0,0,0.5)',
        'card-active':'0 0 0 2px #f5a623, 0 0 24px rgba(245,166,35,0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 2.5s ease-in-out infinite',
        'spin-slow':  'spin 3s linear infinite',
        'fade-in':    'fadeIn 0.3s ease',
        'slide-up':   'slideUp 0.3s ease',
      },
      keyframes: {
        fadeIn:  { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(8px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
