import { HeaderTitle, ToMainTitle } from '@/components/layout/Header';
import Link from '@/components/ui/Link';
import { createT } from '@/lib/i18n/dict';
import { getLang } from '@/lib/i18n/server';
import { getLocalizedArticlePage } from '@/lib/loaders';
import { routes } from '@/lib/routes';

// Waits for the article, like legacy SSR: without it the page has no useful content to show.
export const instant = false;

/** "To main" and links to the article in its other languages (legacy HeaderLinks). */
export default async function ArticleHeader({ params }: PageProps<'/[lang]/article/[slug]'>) {
  const { slug } = await params;
  const lang = await getLang();
  const page = await getLocalizedArticlePage(decodeURIComponent(slug), lang);

  return (
    <>
      <ToMainTitle />
      {page?.otherLocales.map(({ locale, slug: otherSlug }) => (
        <HeaderTitle key={locale}>
          <Link href={routes.article(lang, otherSlug)}>{createT(locale)('article.read-in')}</Link>
        </HeaderTitle>
      ))}
    </>
  );
}
