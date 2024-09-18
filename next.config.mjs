/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      // Agrega más patrones si es necesario
    ],
  },
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
