/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          200: "#f9f8f3",
          300: "#f0eee4",
          400: "#dbd5bc",
          500: "#cec5a3",
          600: "#b9a97e",
        },
        coal: {
          200: "#555555",
          300: "#333333",
          400: "#111111",
        }
      },
      fontFamily: {
        plexMono: ['IBM Plex Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
