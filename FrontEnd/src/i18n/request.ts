import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
    const locale = await requestLocale;

    if (!locale || !routing.locales.includes(locale as LocaleType)) {
        notFound();
    }

    return {
        locale,
        messages: (await import(`../language/${locale}.json`)).default,
    };
});