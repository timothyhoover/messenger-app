/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'links.papareact.com',
      'platform-lookaside.fbsbx.com',
      'scontent-dfw5-1.xx.fbcdn.net',
    ],
  },
  experimental: {
    appDir: true,
  },
}
