/** @type {import('next').NextConfig} */

const nextConfig = {
  sassOptions: {
    basePath: '/markup-educator-deploy',
    additionalData: `@use "src/styles/mixins.scss" as *;`,
  },
};

module.exports = nextConfig;
