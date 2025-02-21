/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080", // Porta do backend
        pathname: "/uploads/**", // Caminho dos arquivos de imagem
      },
    ],
  },
};

module.exports = nextConfig;
