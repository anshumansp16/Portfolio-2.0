/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Space-dark palette
        noir: {
          void: '#020204',
          primary: '#05050A',
          elevated: '#090912',
          subtle: '#0E0E1A',
          border: '#16162A',
          card: '#0C0C18',
        },
        // Text hierarchy (cool white)
        platinum: '#EEEDF5',
        silver: 'rgba(238, 237, 245, 0.55)',
        graphite: 'rgba(238, 237, 245, 0.28)',
        ink: '#04040A',
        // Electric blue/cyan developer accent
        accent: {
          blue: '#3B82F6',
          electric: '#60A5FA',
          cyan: '#22D3EE',
          glow: 'rgba(59, 130, 246, 0.20)',
          soft: 'rgba(59, 130, 246, 0.06)',
          bright: '#93C5FD',
          teal: '#2DD4BF',
        },
        // Status colors
        green: {
          pulse: '#10B981',
          soft: 'rgba(16, 185, 129, 0.12)',
        },
        // Legacy compat
        gold: {
          DEFAULT: '#D4C5A9',
        },
      },
      fontFamily: {
        display: ['var(--font-instrument-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-geist-sans)', '-apple-system', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'SF Mono', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(60px, 8vw, 112px)', { lineHeight: '1.03', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(44px, 6vw, 80px)', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(32px, 5vw, 60px)', { lineHeight: '1.12', letterSpacing: '-0.025em' }],
        'display-sm': ['clamp(26px, 4vw, 44px)', { lineHeight: '1.18', letterSpacing: '-0.02em' }],
        'headline-lg': ['clamp(28px, 3.5vw, 42px)', { lineHeight: '1.22', letterSpacing: '-0.022em' }],
        'headline-md': ['clamp(22px, 3vw, 32px)', { lineHeight: '1.3', letterSpacing: '-0.018em' }],
        'headline-sm': ['clamp(18px, 2.2vw, 26px)', { lineHeight: '1.4', letterSpacing: '-0.014em' }],
        'body-lg': ['18px', { lineHeight: '1.8', letterSpacing: '-0.01em' }],
        'body': ['16px', { lineHeight: '1.75', letterSpacing: '-0.01em' }],
        'body-sm': ['14px', { lineHeight: '1.65', letterSpacing: '-0.008em' }],
        'label-lg': ['13px', { lineHeight: '1.4', letterSpacing: '0.06em' }],
        'label': ['11px', { lineHeight: '1.4', letterSpacing: '0.08em' }],
        'label-sm': ['10px', { lineHeight: '1.3', letterSpacing: '0.1em' }],
      },
      spacing: {
        '18': '4.5rem', '22': '5.5rem', '26': '6.5rem', '30': '7.5rem',
        '34': '8.5rem', '38': '9.5rem', '42': '10.5rem', '46': '11.5rem',
        '50': '12.5rem', '54': '13.5rem', '58': '14.5rem', '62': '15.5rem',
      },
      maxWidth: {
        'text': '660px', 'content': '1080px', 'wide': '1400px', 'ultra': '1920px',
      },
      borderRadius: {
        'xl': '14px', '2xl': '20px', '3xl': '28px',
      },
      boxShadow: {
        'dev-sm': '0 2px 8px rgba(0, 0, 0, 0.4)',
        'dev': '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(59, 130, 246, 0.08)',
        'dev-lg': '0 8px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(59, 130, 246, 0.12)',
        'blue-glow': '0 0 40px rgba(59, 130, 246, 0.3), 0 0 80px rgba(34, 211, 238, 0.1)',
        'blue-sm': '0 0 16px rgba(59, 130, 246, 0.2)',
        'card': '0 1px 0 0 rgba(255,255,255,0.04), inset 0 0 0 1px rgba(255,255,255,0.04)',
        'card-hover': '0 0 0 1px rgba(59, 130, 246, 0.2), 0 8px 24px rgba(0,0,0,0.3)',
      },
      backdropBlur: { 'dev': '16px' },
      animation: {
        'orb-breathe': 'orb-breathe 10s ease-in-out infinite',
        'orb-drift': 'orb-drift 16s ease-in-out infinite',
        'float': 'float 7s ease-in-out infinite',
        'marquee': 'marquee 28s linear infinite',
        'marquee-slow': 'marquee 50s linear infinite',
        'star-twinkle': 'star-twinkle 4s ease-in-out infinite',
        'typing-cursor': 'typing-cursor 1s step-end infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s cubic-bezier(0.22,1,0.36,1) forwards',
        'fade-in': 'fade-in 0.8s ease forwards',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards',
      },
      keyframes: {
        'orb-breathe': {
          '0%,100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.06)' },
        },
        'orb-drift': {
          '0%,100%': { transform: 'translate(0px,0px) scale(1)' },
          '33%': { transform: 'translate(24px,-32px) scale(1.04)' },
          '66%': { transform: 'translate(-18px,18px) scale(0.97)' },
        },
        'float': {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'star-twinkle': {
          '0%,100%': { opacity: '0.15' },
          '50%': { opacity: '0.7' },
        },
        'typing-cursor': {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-400% 0' },
          '100%': { backgroundPosition: '400% 0' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionTimingFunction: {
        'dev': 'cubic-bezier(0.4,0,0.2,1)',
        'smooth': 'cubic-bezier(0.22,1,0.36,1)',
        'spring': 'cubic-bezier(0.34,1.56,0.64,1)',
        'enter': 'cubic-bezier(0,0,0.2,1)',
      },
    },
  },
  plugins: [],
}
