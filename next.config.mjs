import path from 'path'

const threadStreamStub = path.resolve('./lib/thread-stream-stub.js')
const emptyModule = path.resolve('./lib/empty-module.js')

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    // Avoid bundling server-only logging transports and their test fixtures
    resolveAlias: {
      pino: 'pino/browser',
      'thread-stream': threadStreamStub,
      '@base-org/account': emptyModule,
      '@coinbase/wallet-sdk': emptyModule,
      '@gemini-wallet/core': emptyModule,
      porto: emptyModule,
      'porto/internal': emptyModule,
      '@safe-global/safe-apps-sdk': emptyModule,
      '@safe-global/safe-apps-provider': emptyModule,
    },
  },
  webpack: (config) => {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      pino: 'pino/browser',
      'thread-stream': threadStreamStub,
      '@base-org/account': emptyModule,
      '@coinbase/wallet-sdk': emptyModule,
      '@gemini-wallet/core': emptyModule,
      porto: emptyModule,
      'porto/internal': emptyModule,
      '@safe-global/safe-apps-sdk': emptyModule,
      '@safe-global/safe-apps-provider': emptyModule,
    }

    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      '@base-org/account': false,
      '@coinbase/wallet-sdk': false,
      '@gemini-wallet/core': false,
      porto: false,
      'porto/internal': false,
      '@safe-global/safe-apps-sdk': false,
      '@safe-global/safe-apps-provider': false,
    }

    return config
  },
}

export default nextConfig
