const { withContentlayer } = require('next-contentlayer2')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    minimumCacheTTL: 2678400,
    qualities: [50, 75, 100],
  },
}

module.exports = withContentlayer(nextConfig)
