/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true, 
    images: {
      formats: ['image/webp'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 's2.webstatic.net',
          pathname: '/**',
        },
        {
          protocol: 'http',
          hostname: 'example.com',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'example.com',
          pathname: '/**',
        }, {
          protocol: 'https',
          hostname: 'lh5.googleusercontent.com',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'streetviewpixels-pa.googleapis.com',
          pathname: '/**',
        },
      ],
    }
};

export default nextConfig;
