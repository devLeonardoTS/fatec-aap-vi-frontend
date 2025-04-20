import { AppProviders } from "@/components/app-providers";
import { AppConfigs } from "@/lib/app-configs";

import type { Metadata } from "next";

import "./globals.css";

import "@mantine/core/styles.css";

export const metadata: Metadata = {
  title: AppConfigs.name,
  description: AppConfigs.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={AppConfigs.locale}>
      <body id="app" className={`antialiased`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
