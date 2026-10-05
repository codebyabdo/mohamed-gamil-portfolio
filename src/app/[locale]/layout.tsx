import type { Metadata } from "next";

import {
  DM_Sans,
  IBM_Plex_Sans_Arabic,
  Inter,
  Manrope,
} from "next/font/google";

import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

import { MotionProvider } from "@/components/motion";

import { SmoothScrollProvider } from "@/components/motion/smooth-scroll-provider";

import "../globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-arabic",
  subsets: ["arabic", "latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dr. Mohamed Gamil",
    template: "%s | Dr. Mohamed Gamil",
  },
  description:
    "Physiotherapy and rehabilitation focused on understanding movement, personalized care, and recovery.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={direction}
      data-scroll-behavior="smooth"
      className={[
        dmSans.variable,
        manrope.variable,
        inter.variable,
        ibmPlexSansArabic.variable,
      ].join(" ")}
    >
      <body>
        <SmoothScrollProvider>
          <MotionProvider>
            <NextIntlClientProvider messages={messages}>
              <SiteHeader />

              {children}

              <SiteFooter />
            </NextIntlClientProvider>
          </MotionProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
