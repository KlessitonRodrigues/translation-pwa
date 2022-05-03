const PWA = require("next-pwa");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: { and: [/\.(js|ts)x?$/] },
      use: ["@svgr/webpack"],
    });

    return config;
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
};

module.exports = PWA(nextConfig);
