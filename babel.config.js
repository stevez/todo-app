const plugins = []

// Instrument for code coverage in development mode
if (process.env["INSTRUMENT_CODE"] === "true") {
  console.log(
    "Detected INSTRUMENT_CODE. Instrumenting code for coverage."
  );
  plugins.push("istanbul");
}

module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-env': {
          targets: {
            chrome: '117',
          },
        },
      },
    ],
  ],
  plugins,
  env: {
    test: {
      presets: [
        'next/babel',
        ['@babel/preset-react', { runtime: 'automatic' }]
      ]
    }
  }
};
