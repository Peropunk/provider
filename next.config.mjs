/** @type {import('next').NextConfig} */
const nextConfig = {
     images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'strapi-s3torage.s3.ap-south-1.amazonaws.com',
        port: '',
        pathname: '/**', // This allows any image path from this hostname
      },
    ],
  },
};

export default nextConfig;
