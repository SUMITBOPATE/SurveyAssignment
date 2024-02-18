   // tailwind.config.js
   module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      // Some useful comment
      fontFamily: {
        'sans': ['verdana', 'Arial', 'sans-serif'],
        // Ensure fonts with spaces have " " surrounding it.
      },
    
      extend: {},
    },
    plugins: [],
  };
