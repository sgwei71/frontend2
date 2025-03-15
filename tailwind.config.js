/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'ultra-light': ['UltraLight', 'sans-serif'],
        'light': ['Light', 'sans-serif'],
        'regular': ['Regular', 'sans-serif'],
        'bold': ['Bold', 'sans-serif'],
        'gothic-light': ['GothicLight', 'sans-serif'],
        'gothic': ['Gothic', 'sans-serif'],
        'gothic-bold': ['GothicBold', 'sans-serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "blue-400": '#2db0de',
        "blue-common": '#2855bc',
      },
      boxShadow: {
        'top-down': '0 -4px 10px rgba(0, 0, 0, 0.2), 0 4px 10px rgba(0, 0, 0, 0.2)', // 위아래 그림자
        'inner-all': 'inset 0 0 24px rgba(0, 0, 0, 0.15)', // 모든 방향의 안쪽 그림자
        'inner-all-sm': 'inset 0 0 4px rgba(0, 0, 0, 0.6)', // 모든 방향의 안쪽 그림자
        'inner-all-md': 'inset 0 0 4px rgba(0, 0, 0, 0.2)', // 모든 방향의 안쪽 그림자
        'all': '0 0 16px rgba(0, 0, 0, 0.15)', // 모든 방향의 그림자
      },
      textShadow: {
        'md': '1px 1px 1px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-textshadow'),
  ],
};
