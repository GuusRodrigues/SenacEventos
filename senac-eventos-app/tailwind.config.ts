// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#e6edf9',
          300: '#054fc7',
          500: '#033079',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;