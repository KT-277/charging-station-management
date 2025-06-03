/** @type {import('tailwindcss').Config} */
   module.exports = {
     content: [
       "./index.html",
       "./src/**/*.{vue,js,ts,jsx,tsx}",
     ],
     theme: {
       extend: {
         colors: {
           primary: '#065F46', // Dark green for buttons and headers
           secondary: '#10B981', // Medium green for accents
           accent: '#6EE7B7', // Light green for backgrounds
           background: '#F0FDF4', // Very light green for page background
         },
         fontFamily: {
           poppins: ['Poppins', 'sans-serif'],
         },
       },
     },
     plugins: [],
   }