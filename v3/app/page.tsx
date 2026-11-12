import { Suspense } from 'react';

import LatestArticles from '@/components/LatestArticles';

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center gap-8 p-8">
      <header className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold">Wir.by v3</h1>
        <p>Work in progress. The production site is at https://wir.by.</p>
      </header>
      <Suspense fallback={<p>Loading articles…</p>}>
        <LatestArticles />
      </Suspense>
    </main>
  );
}
