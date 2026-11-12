'use client';

import { TimesIcon } from '@/components/icons';
import { useT } from '@/lib/i18n/client';

import { useSidebar } from './SidebarContext';

/** Close (×) button of the off-canvas sidebar; hidden where the sidebar is a static column. */
const SidebarClose = () => {
  const { close } = useSidebar();
  const t = useT();

  return (
    <button
      type="button"
      onClick={close}
      title={t('sidebar.close')}
      aria-label={t('sidebar.close')}
      className="sticky top-[21px] float-right link cursor-pointer text-xl sidebar:hidden"
    >
      <TimesIcon />
    </button>
  );
};

export default SidebarClose;
