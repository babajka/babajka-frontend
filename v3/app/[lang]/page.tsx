import { Suspense } from 'react';

import LatestArticles from '@/components/LatestArticles';
import { getLang, Text } from '@/lib/i18n/server';

// Placeholder home page. Phase 4 ports the real main page.
export default async function Home() {
  const lang = await getLang();

  return (
    <main className="flex flex-1 flex-col items-center gap-8 p-8">
      <header className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-title">Wir.by v3</h1>
        <p className="text-body">
          <Text id="common.motto" render={(...parts) => parts.join('')} />
        </p>
        <p className="text-grey">Work in progress. The production site is at https://wir.by.</p>
      </header>
      <Suspense fallback={<p>Loading articles…</p>}>
        <LatestArticles lang={lang} />
      </Suspense>
    </main>
  );
}
