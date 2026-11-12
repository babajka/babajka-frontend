import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Shell from '@/components/layout/Shell';
import Sidebar from '@/components/layout/Sidebar';

/**
 * The normal page chrome: header, footer and the sidebar (legacy CoreLayout with no `hide*` flags).
 * `header` is a parallel-route slot (`@header`) with the header title: the motto on the main page,
 * "to main" elsewhere, plus page-specific links in Phase 4 (legacy HeaderLinks, which portalled
 * into `#header-links`).
 */
export default function SiteLayout({ children, header }: LayoutProps<'/[lang]'>) {
  return (
    <Shell header={<Header title={header} />} sidebar={<Sidebar />} footer={<Footer />}>
      {children}
    </Shell>
  );
}
