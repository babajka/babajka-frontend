import { isValid } from 'date-fns';
import Image from 'next/image';
import { connection } from 'next/server';

import type { Lang } from '@/constants';
import { getArticles } from '@/lib/loaders';
import { BACKEND_URL } from '@/lib/request';
import type { ArticlesChunk } from '@/lib/types';
import { formatLocalizedDate } from '@/utils/date';
import { localize } from '@/utils/localization';

type Props = { lang?: Lang; take?: number };

/**
 * Deployment check: renders the latest articles from the backend.
 * - server → API: the cached loader (lib/loaders.ts) fetches from the Next server (container).
 * - browser → `/api/*` rewrite → API: covers go through `next/image` from `/api/files/...`.
 */
const LatestArticles = async ({ lang = 'be', take = 6 }: Props) => {
  // Request time only, so `next build` (also in Docker) doesn't need the backend. The loader result
  // is still cached for a few minutes (`cacheLife('minutes')`).
  await connection();

  const backendHost = new URL(BACKEND_URL).host;
  let chunk: ArticlesChunk;
  try {
    chunk = await getArticles({ take });
  } catch (error) {
    console.error('LatestArticles: backend request failed', error);
    return (
      <p role="alert" className="text-error">
        Backend {backendHost} is unreachable: {error instanceof Error ? error.message : 'unknown'}
      </p>
    );
  }

  return (
    <section aria-labelledby="latest-articles" className="w-full max-w-5xl">
      <h2 id="latest-articles" className="mb-1 text-xl font-bold">
        Latest articles
      </h2>
      <p className="mb-6 text-sm text-grey">
        {chunk.total} articles on {backendHost}
      </p>
      <ul className="sm:grid-cols-2 lg:grid-cols-3 grid gap-6">
        {chunk.data.map(article => {
          const locale = localize(article.locales, lang);
          const cover = article.images?.horizontal;
          return (
            <li key={article._id}>
              <article className="flex flex-col gap-2">
                {cover && (
                  <Image
                    src={cover}
                    alt=""
                    width={640}
                    height={360}
                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                    className="aspect-video w-full rounded object-cover"
                  />
                )}
                <h3 className="font-bold">{locale?.title}</h3>
                {locale?.subtitle && <p className="text-sm">{locale.subtitle}</p>}
                {/* publishAt is optional (unpublished articles) */}
                {article.publishAt && isValid(new Date(article.publishAt)) && (
                  <time dateTime={article.publishAt} className="text-xs text-grey">
                    {formatLocalizedDate(new Date(article.publishAt), lang)}
                  </time>
                )}
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default LatestArticles;
