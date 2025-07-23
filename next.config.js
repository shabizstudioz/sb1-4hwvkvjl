/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['localhost', 'supabase.co'],
  },
  // experimental: { serverActions: true }, // <-- isko hata dein
}

module.exports = nextConfig
