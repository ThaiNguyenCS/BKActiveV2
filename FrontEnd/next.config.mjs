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

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withNextIntl(nextConfig);