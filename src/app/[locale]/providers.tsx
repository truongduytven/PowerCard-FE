"use client";

import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import { NextIntlClientProvider } from "next-intl";
import { LocaleSync } from "@/components/LocaleSync";

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
        <LocaleSync />
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
