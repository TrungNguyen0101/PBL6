/** @type {import('next').NextConfig} */
const nextConfig = {
  resolve: {
    caseSensitive: false,
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

module.exports = nextConfig;
