import { store } from "@/store";
import ProviderWrapper from "@/hooks";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const messages = await getMessages();
  const locale = store.getState().language.locale;

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ProviderWrapper>
        {children}
      </ProviderWrapper>
    </NextIntlClientProvider>
  );
};