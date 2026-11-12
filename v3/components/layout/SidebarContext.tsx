'use client';

import { createContext, use } from 'react';

type SidebarContextValue = {
  open: boolean;
  toggle: () => void;
  close: () => void;
  /** DOM id of the sidebar, for the burger's `aria-controls`. */
  id?: string;
};

export const SidebarContext = createContext<SidebarContextValue>({
  open: false,
  toggle: () => {},
  close: () => {},
});

/** Off-canvas sidebar state (legacy `ToggleSidebarContext` + `useBoolean`). */
export const useSidebar = () => use(SidebarContext);
