import type { Metadata } from 'next';

import CardBlocksLayout from '@/components/blocks/CardBlocksLayout';
import { getLang, getT } from '@/lib/i18n/server';
import { getDiary, getLocalizedMainPage } from '@/lib/loaders';
import { pageMetadata } from '@/lib/metadata';
import { routes } from '@/lib/routes';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const t = await getT(lang);
  return pageMetadata({
    lang,
    title: t('header.main'),
    description: t('common.project-description'),
    url: routes.main(lang),
  });
}

export default async function MainPage() {
  const lang = await getLang();
  const { blocks, data } = await getLocalizedMainPage(lang);
  const diary = blocks.some(({ type }) => type === 'diary') ? await getDiary('today') : undefined;

  return <CardBlocksLayout blocks={blocks} data={data} diary={diary} lang={lang} inViewport />;
}
