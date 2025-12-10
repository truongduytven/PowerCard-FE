"use client";

import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import { NextIntlClientProvider } from "next-intl";

export default function Providers({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: any;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Navbar />
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
