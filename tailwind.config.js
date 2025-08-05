/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // For App Router
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // For Pages Router
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // Add other paths if you have components or files in other directories
  ],
  theme: {
    extend: {
      // Customize or extend Tailwind's default theme here
      // Example:
      // colors: {
      //   primary: '#ff0000',
      // },
    },
  },
  plugins: [
    // Add Tailwind plugins here (e.g., @tailwindcss/typography)
  ],
};