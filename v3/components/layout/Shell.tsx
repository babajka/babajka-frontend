'use client';

import { useId, useState, type MouseEvent, type ReactNode } from 'react';

import { useT } from '@/lib/i18n/client';
import { cn } from '@/lib/utils/cn';

import GoUp from './GoUp';
import { SidebarContext } from './SidebarContext';

type ShellProps = {
  children: ReactNode;
  /** Server-rendered parts (legacy CoreLayout props `hideHeader`/`hideFooter` = pass nothing). */
  header?: ReactNode;
  sidebar: ReactNode;
  footer?: ReactNode;
};

/**
 * Legacy components/layout/CoreLayout.js + layout.scss: page chrome and the off-canvas sidebar.
 *
 * Below 1360px (`sidebar` breakpoint) the sidebar is off-canvas: the burger slides it in over a dark
 * overlay, and the page is fixed under it. From 1360px it's a static column on the right.
 * Only this state is client-side; header, sidebar and footer are Server Components passed in.
 */
const Shell = ({ children, header, sidebar, footer }: ShellProps) => {
  const t = useT();
  const [open, setOpen] = useState(false);
  // Not a fixed id: Next 16 keeps the previous page mounted (hidden) after navigation, so fixed ids
  // would be duplicated in the DOM.
  const id = useId();
  const context = {
    open,
    id,
    toggle: () => setOpen(value => !value),
    close: () => setOpen(false),
  };

  // Following a link in the sidebar closes it (legacy: onMouseUp={close} on every sidebar link).
  // Delegated here, so the Server Component links in the sidebar need no client code, and the shell
  // doesn't read the pathname (that would make every page dynamic).
  const closeOnLink = (event: MouseEvent) => {
    if ((event.target as HTMLElement).closest('a')) {
      setOpen(false);
    }
  };

  return (
    <SidebarContext value={context}>
      <div
        className={cn(
          'wir-root relative mx-auto min-h-screen max-w-[1600px] min-w-(--min-website-width) overflow-x-hidden bg-white sidebar:flex sidebar:flex-row',
          open && 'fixed inset-x-0 overflow-x-visible overflow-y-scroll'
        )}
      >
        <div className="flex min-h-screen max-w-screen min-w-(--min-website-width) flex-col sidebar:grow">
          {header}

          <main className="flex-[1_0_auto]">{children}</main>

          {footer && <div className="wir-footer shrink-0">{footer}</div>}

          {/* Clicking the dark overlay closes the sidebar. Not focusable: the close button is. */}
          <div
            aria-hidden
            className={cn(
              'z-sidebar-overlay hidden bg-black opacity-50',
              open && 'fixed inset-0 block overflow-y-scroll'
            )}
            onClick={context.close}
          />
        </div>

        <nav
          id={id}
          aria-label={t('sidebar.open')}
          onClick={closeOnLink}
          className={cn(
            'fixed top-0 bottom-0 z-sidebar min-h-screen shrink-0 overflow-x-hidden overflow-y-scroll bg-concrete transition-[right,visibility] duration-500',
            // Off-canvas only: don't let scrolling the open sidebar scroll the page behind it. Not
            // on the static column (≥1360px): overflow-x-hidden makes it a scroll container even
            // with overflow-y visible, and `contain` would then swallow the wheel, so the page
            // wouldn't scroll with the cursor over the sidebar.
            'max-sidebar:overscroll-contain',
            // legacy: -100vw on mobile (< 650px), -255px above
            '-right-[100vw] tablet:-right-[255px]',
            open && 'right-0 h-full tablet:right-0',
            'sidebar:static sidebar:right-auto sidebar:h-auto sidebar:overflow-y-visible',
            // Off-canvas and closed: out of the tab order and the accessibility tree.
            !open && 'max-sidebar:invisible'
          )}
        >
          {sidebar}
        </nav>

        <GoUp />
      </div>
    </SidebarContext>
  );
};

export default Shell;
