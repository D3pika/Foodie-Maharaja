/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      missingSuspenseWithCSRBailout: false, // Disable CSR bailout warning
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'ap-south-1.graphassets.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'img.clerk.com',
          port: '',
          pathname: '/**',
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  