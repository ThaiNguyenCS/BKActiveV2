module.exports = {
    i18n: {
        locales: ['vi', 'en'],
        defaultLocale: 'vi',
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
}

const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
};

module.exports = withNextIntl(nextConfig);