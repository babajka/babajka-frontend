'use client';

import { useT } from '@/lib/i18n/client';

import { useSidebar } from './SidebarContext';

/** Legacy header burger (3 bars), hidden from 1360px where the sidebar is always visible. */
const Burger = ({ color }: { color?: string }) => {
  const { open, toggle, id } = useSidebar();
  const t = useT();

  return (
    <button
      type="button"
      aria-label={t('sidebar.open')}
      title={t('sidebar.open')}
      aria-expanded={open}
      aria-controls={id}
      onClick={toggle}
      className="ml-auto flex h-[30px] w-[35px] shrink-0 cursor-pointer flex-col items-center justify-between sidebar:hidden"
    >
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="h-[5px] w-full rounded-[2px] bg-primary"
          style={color ? { backgroundColor: color } : undefined}
        />
      ))}
    </button>
  );
};

export default Burger;
