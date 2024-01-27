const nextConfig = {
  experimental: {
    appDir: true,
    i18n: {
      locales: ['pt-BR'],
      defaultLocale: 'pt-BR',
    },
  },
  images: {
    domains: [
      'res.cloudinary.com',
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
    ],
  },
};

module.exports = nextConfig;
