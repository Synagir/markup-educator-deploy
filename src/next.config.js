/** @type {import('next').NextConfig} */

const nextConfig = {
  sassOptions: {
    additionalData: `@use "styles/mixins.scss" as *;`,
  },
  // [D] fs 사용하기 위한 설정
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
};

module.exports = nextConfig;
