/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol:'https',
        hostname:'images.unsplash.com',
      }
      // Agrega más patrones si es necesario
    ],
  },
  reactStrictMode:false
  // Otras configuraciones de Next.js
}

export default nextConfig;




// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'fakestoreapi.com',
//         port: '',
//         pathname: '/img/**',
//       },
//     ],
//   },
// };

// export default nextConfig;
