import type { Metadata } from "next";
import "./[locale]/globals.css";

export const metadata: Metadata = {
  title: 'Employees Expense Management',
  description: 'BachKho Active',
  applicationName: 'Employees Expense Management',
  keywords: ["react", "server components", 'nextjs', 'tailwind'],
  icons: [{ rel: "favicon", type: 'image/ico', url: "/favicon.ico" }],
  generator: 'nhatdev',
  authors: [{ name: 'nhatdev' }],
  creator: 'nhatdev',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en" className="h-dvh w-dvw" suppressHydrationWarning={true}>
      <body>
        {children}
      </body>
    </html>
  );
};