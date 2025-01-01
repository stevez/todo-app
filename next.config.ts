import type { NextConfig } from 'next';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';

export default (phase: string, { defaultConfig }: { defaultConfig: NextConfig }) => {
  const nextConfig: NextConfig = {
    ...defaultConfig,
    experimental: {
      // enable babel only for test https://nextjs.org/docs/messages/swc-disabled
      forceSwcTransforms: !process.env.INSTRUMENT_CODE
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
