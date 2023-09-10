module.exports = {
  singleQuote: true,
  printWidth: 100,
  trailingComma: 'all',
  endOfLine: 'auto',
  overrides: [
    {
      files: "{*.json,.prettierrc}",
      options: {
        tabWidth: 2,
        printWidth: 0
      }
    }
  ]
};
