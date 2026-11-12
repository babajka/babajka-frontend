import Footer from '@/components/layout/Footer';
import Shell from '@/components/layout/Shell';
import Sidebar from '@/components/layout/Sidebar';

/**
 * Games (Phase 4: /game/ny2021, /game/tinder): no shared header, since each game renders its own
 * (with its colors and the burger), like legacy `getLayoutProps: { hideHeader: true }`.
 * Footer and sidebar stay.
 */
export default function GameLayout({ children }: LayoutProps<'/[lang]'>) {
  return (
    <Shell sidebar={<Sidebar />} footer={<Footer />}>
      {children}
    </Shell>
  );
}
