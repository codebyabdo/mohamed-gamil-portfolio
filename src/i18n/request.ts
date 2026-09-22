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

      navigation: (await import(`../../messages/${locale}/navigation.json`))
        .default,
      common: (await import(`../../messages/${locale}/common.json`)).default,
    },
  };
});
