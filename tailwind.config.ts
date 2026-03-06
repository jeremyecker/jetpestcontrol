import type { Config } from 'tailwindcss';

// ============================================================
// Brand colors — update these to match your hub.config.ts BRAND colors.
// These are placeholder defaults; replace with your actual brand palette.
// ============================================================
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#4A7C59',     // ← Replace with BRAND.primaryColor
          secondary: '#6B9F7D',   // ← Replace with BRAND.secondaryColor
          accent: '#E8863A',      // ← Replace with BRAND.accentColor
          dark: '#1A1A2E',
          light: '#F0F5F2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
