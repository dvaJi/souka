module.exports = {
  theme: {
    extend: {
      minHeight: {
        50: '50px',
      },
    },
  },
  variants: {},
  plugins: [],
  purge: {
    // Filenames to scan for classes
    content: [
      './src/**/*.html',
      './src/**/*.js',
      './src/**/*.jsx',
      './src/**/*.ts',
      './src/**/*.tsx',
      './public/index.html',
    ],
    // Options passed to PurgeCSS
    options: {
      // Whitelist specific selectors by name
      // whitelist: [],
    },
  },
};
