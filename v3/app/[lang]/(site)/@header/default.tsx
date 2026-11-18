import { ToMainTitle } from '@/components/layout/Header';

/** Header title for pages without their own `@header` (on a full page load). */
export default function DefaultHeader() {
  return <ToMainTitle />;
}
