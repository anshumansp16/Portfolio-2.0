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
        // Museum palette - Near-black, not pure black
        noir: {
          void: '#070708',
          primary: '#090A0C',
          elevated: '#0B0C10',
          subtle: '#0D0E12',
        },
        // Warm off-white text
        platinum: '#E9E6DF',
        silver: 'rgba(233, 230, 223, 0.55)',
        graphite: 'rgba(233, 230, 223, 0.35)',
        gold: {
          DEFAULT: '#D4C5A9',
          muted: 'rgba(212, 197, 169, 0.6)',
        },
        accent: {
          gold: '#D4C5A9',
          glow: 'rgba(212, 197, 169, 0.15)',
          bright: '#E5D9C0',
        },
      },
      fontFamily: {
        display: ['var(--font-instrument-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-geist-sans)', '-apple-system', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'SF Mono', 'monospace'],
      },
      fontSize: {
        // Display sizes
        'display-xl': ['clamp(64px, 8vw, 120px)', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(48px, 6vw, 84px)', { lineHeight: '1.15', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(36px, 5vw, 64px)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        // Headline sizes
        'headline-lg': ['clamp(32px, 4vw, 48px)', { lineHeight: '1.2', letterSpacing: '-0.025em' }],
        'headline-md': ['clamp(24px, 3vw, 36px)', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        'headline-sm': ['clamp(20px, 2.5vw, 28px)', { lineHeight: '1.4', letterSpacing: '-0.015em' }],
        // Body sizes
        'body-lg': ['19px', { lineHeight: '1.8', letterSpacing: '-0.011em' }],
        'body': ['17px', { lineHeight: '1.8', letterSpacing: '-0.011em' }],
        'body-sm': ['15px', { lineHeight: '1.7', letterSpacing: '-0.01em' }],
        // Label sizes
        'label-lg': ['13px', { lineHeight: '1.4', letterSpacing: '0.08em', textTransform: 'uppercase' }],
        'label': ['11px', { lineHeight: '1.4', letterSpacing: '0.08em', textTransform: 'uppercase' }],
        'label-sm': ['10px', { lineHeight: '1.3', letterSpacing: '0.1em', textTransform: 'uppercase' }],
      },
      spacing: {
        // 8px grid system
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '26': '6.5rem',   // 104px
        '30': '7.5rem',   // 120px
        '34': '8.5rem',   // 136px
        '38': '9.5rem',   // 152px
        '42': '10.5rem',  // 168px
        '46': '11.5rem',  // 184px
        '50': '12.5rem',  // 200px
        '54': '13.5rem',  // 216px
        '58': '14.5rem',  // 232px
        '62': '15.5rem',  // 248px
      },
      maxWidth: {
        'text': '680px',
        'content': '1080px',
        'wide': '1440px',
        'ultra': '1920px',
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
        '3xl': '32px',
      },
      boxShadow: {
        // Luxury elevation shadows
        'luxury-sm': '0 2px 8px rgba(0, 0, 0, 0.2)',
        'luxury': '0 4px 12px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(212, 197, 169, 0.1)',
        'luxury-lg': '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(212, 197, 169, 0.1), 0 0 32px rgba(212, 197, 169, 0.08)',
        'luxury-xl': '0 24px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(212, 197, 169, 0.15), 0 0 64px rgba(212, 197, 169, 0.12)',
      },
      backdropBlur: {
        'luxury': '12px',
      },
      animation: {
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 15s ease infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        'smooth': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
