const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase, { defaultConfig }) => {
  const nextConfig = {
    ...defaultConfig,
    experimental: {
      // enable babel only for test https://nextjs.org/docs/messages/swc-disabled
      forceSwcTransforms: !process.env.INSTRUMENT_CODE,
    },
    webpack: (config) => {
      return config;
    }
  };

  if (phase !== PHASE_DEVELOPMENT_SERVER) {
    return { ...nextConfig, distDir: 'dist' };
  }
  return nextConfig;
};