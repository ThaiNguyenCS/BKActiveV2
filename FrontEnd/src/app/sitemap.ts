import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://localhost:3002',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
    ];
};