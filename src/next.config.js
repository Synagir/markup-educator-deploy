/** @type {import('next').NextConfig} */

const nextConfig = {
  sassOptions: {
    additionalData: `@use "styles/mixins.scss" as *;`,
  },
};

module.exports = nextConfig;
