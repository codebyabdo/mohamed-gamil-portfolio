import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  if (
    !locale ||
    !routing.locales.includes(locale as (typeof routing.locales)[number])
  ) {
    notFound();
  }

  return {
    locale,
    messages: {
      home: (await import(`../../messages/${locale}/home.json`)).default,
      about: (await import(`../../messages/${locale}/about.json`)).default,
      approach: (await import(`../../messages/${locale}/approach.json`)).default,

      navigation: (await import(`../../messages/${locale}/navigation.json`))
        .default,

      common: (await import(`../../messages/${locale}/common.json`)).default,

      services: (await import(`../../messages/${locale}/services.json`))
        .default,

      cases: (await import(`../../messages/${locale}/cases.json`)).default,

      trajectory: (await import(`../../messages/${locale}/trajectory.json`))
        .default,

      testimonials: (await import(`../../messages/${locale}/testimonials.json`))
        .default,

      social: (await import(`../../messages/${locale}/social.json`)).default,
      footer: (await import(`../../messages/${locale}/footer.json`)).default,
    },
  };
});
