'use client';

import Link from '@/components/ui/Link';
import ExternalLink from '@/components/ui/ExternalLink';
import { NETWORKS } from '@/constants/social';
import { useLang, useT } from '@/lib/i18n/client';
import { routes } from '@/lib/routes';
import { DEV_EMAIL } from '@/lib/site';

export type ErrorCode = 404 | 500;

/**
 * Legacy components/layout/error/ErrorMessage.js (404/500 pages). A Client Component, because
 * error.tsx (a Client Component) renders it too; its strings come from the `errors` client scope.
 * `data-hide-footer` hides the footer, like legacy `getLayoutProps: { hideFooter: true }`.
 */
const ErrorMessage = ({ code }: { code: ErrorCode }) => {
  const t = useT();
  const lang = useLang();

  return (
    <div data-hide-footer className="px-8 pt-6 pb-12 desktop:p-12">
      {/* React hoists it into <head>. Works for not-found.tsx, error.tsx and the status pages alike,
          including when the 404 renders on the client. */}
      <title>{`${t(`errors.${code}-title`)} | Wir.by`}</title>
      <h1 className="my-4 text-[2.5rem] tablet:text-[3.5rem]">
        <span className="font-bold text-primary-dark">{code}</span> {t(`errors.${code}-title`)}
      </h1>
      <p className="mt-8 mb-4 text-xl">{t(`errors.${code}-subtitle`)}</p>
      <p className="my-8 text-[1.2rem]">
        <Link href={routes.main(lang)}>{t('errors.go-to-main')}</Link>
      </p>
      <div className="my-8 flex flex-row justify-start text-[1.75rem] text-black">
        {NETWORKS.map(({ id, label, link, color, Icon }) => (
          <ExternalLink key={id} href={link} className="mr-3" aria-label={label} title={label}>
            <Icon style={{ color }} />
          </ExternalLink>
        ))}
      </div>
      <p className="mt-4">
        {t('errors.contact-us')}
        {': '}
        <ExternalLink href={`mailto:${DEV_EMAIL}`}>{DEV_EMAIL}</ExternalLink>
      </p>
    </div>
  );
};

export default ErrorMessage;
