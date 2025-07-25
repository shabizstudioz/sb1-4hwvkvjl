import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        surface: '#0A0A0A',
        border: 'rgba(255, 255, 255, 0.1)',
        accent: {
          DEFAULT: '#007AFF',
          hover: '#0051D5',
        },
      },
    },
  },
  plugins: [],
}
export default config