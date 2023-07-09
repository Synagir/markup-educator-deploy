/** @type {import('next').NextConfig} */

const nextConfig = {
  sassOptions: {
    additionalData: `@use "src/styles/mixins.scss" as *;`,
  },
};

module.exports = nextConfig;
