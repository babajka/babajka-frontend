import type { Metadata } from 'next';

import { getLang, getT, Text } from '@/lib/i18n/server';
import { pageMetadata } from '@/lib/metadata';
import { routes } from '@/lib/routes';

// The whole page is known at build time: fail the build if it ever starts rendering per request.
export const ensureStatic = 'navigation';

export const generateMetadata = async (): Promise<Metadata> => {
  const lang = await getLang();
  const t = await getT(lang);

  return pageMetadata({
    lang,
    url: routes.about(lang),
    title: t('about.meta-title'),
    description: t('about.meta-description'),
    keywords: t('about.meta-keywords'),
    smallImage: true,
  });
};

// Legacy pages/about.js + styles/pages/about.module.scss. The team and partners sections were
// commented out there, so they aren't ported.
export default function AboutPage() {
  return (
    <div className="mb-[50px] content-padding">
      <h1 className="mt-12 text-[30px] leading-9 font-bold tablet:text-5xl tablet:leading-[60px]">
        <Text id="about.section1-header" />
      </h1>
      <div className="mt-[30px] text-base leading-6 tablet:text-xl tablet:leading-9">
        <Text id="about.section1-text" />
      </div>
    </div>
  );
}
