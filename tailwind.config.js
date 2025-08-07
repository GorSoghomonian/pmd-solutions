/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // For App Router
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // For Pages Router
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // TODO: Update paths to match actual src structure
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Add src directory
  ],
  theme: {
    extend: {
      // TODO: Define custom color palette for brand consistency
      // TODO: Add custom typography scale
      // TODO: Define consistent spacing scale
    },
  },
  plugins: [
    // TODO: Consider adding useful plugins:
    // @tailwindcss/typography for better text styling
    // @tailwindcss/forms for form styling
    // @tailwindcss/aspect-ratio for responsive images
  ],
};