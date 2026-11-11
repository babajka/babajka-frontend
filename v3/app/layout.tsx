import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Wir.by v3',
  robots: { index: false, follow: false },
};

// Placeholder root layout. Phase 2 replaces it with `app/[lang]/layout.tsx`.
export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="be" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
