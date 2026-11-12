'use client';

import { useId, useRef, useState, type FormEvent } from 'react';

import Clickable from '@/components/Clickable';
import { ArrowRightIcon, EnvelopeIcon } from '@/components/icons';
import Input from '@/components/ui/Input';
import { linkClass } from '@/components/ui/link-class';
import { api } from '@/lib/api';
import { ClientText, useLang, useT } from '@/lib/i18n/client';
import isEmail from '@/lib/utils/isEmail';

type State = { pending: boolean; failed: boolean };

/**
 * Footer newsletter form (legacy components/layout/footer/SubscribeForm.js). Posts from the
 * browser to /api/mail, which the /api rewrite proxies to the backend.
 */
const SubscribeForm = () => {
  const lang = useLang();
  const t = useT();
  const [email, setEmail] = useState<string | null>(null);
  const [value, setValue] = useState('');
  const [{ pending, failed }, setState] = useState<State>({ pending: false, failed: false });
  const inputRef = useRef<HTMLInputElement>(null);
  const headingId = useId();

  const isValid = isEmail(value);

  const submit = async (event?: FormEvent) => {
    event?.preventDefault();
    if (!isValid || pending) {
      return;
    }
    setState({ pending: true, failed: false });
    try {
      const response = await fetch(api.core.subscribe, {
        method: 'POST',
        headers: { accept: 'application/json', 'content-type': 'application/json' },
        body: JSON.stringify({ emailAddress: value, userStatus: 'subscribed', language: lang }),
      });
      if (!response.ok) {
        throw new Error(`Subscribe failed with ${response.status}`);
      }
      const { emailAddress } = (await response.json()) as { emailAddress: string };
      setEmail(emailAddress);
      setState({ pending: false, failed: false });
    } catch (error) {
      console.error(error);
      setState({ pending: false, failed: true });
      inputRef.current?.focus();
    }
  };

  return (
    <div className="min-h-[100px]">
      <div id={headingId} className="pt-2 pb-4 text-[1.1rem] font-bold text-black">
        {t('footer.subscribe')}
      </div>
      {email ? (
        <div className="pb-2 leading-[1.7em]" role="status">
          <ClientText
            id="footer.subscribed"
            render={(subscribed, on) => (
              <>
                {subscribed}
                <div>
                  <strong>
                    {on} {email}
                  </strong>
                </div>
              </>
            )}
          />
          <Clickable tag="div" className={linkClass()} onClick={() => setEmail(null)}>
            {t('footer.add-email')}
          </Clickable>
        </div>
      ) : (
        <form onSubmit={submit}>
          <Input
            ref={inputRef}
            type="email"
            aria-labelledby={headingId}
            name="emailAddress"
            autoComplete="email"
            value={value}
            onChange={event => setValue(event.target.value)}
            leftIcon={!pending && EnvelopeIcon}
            rightIcon={isValid && ArrowRightIcon}
            rightLabel={t('footer.subscribe')}
            onRightClick={submit}
            pending={pending}
            // Legacy rendered the error object here; no translated message exists for it.
            error={failed ? t('errors.500-title') : null}
          />
        </form>
      )}
    </div>
  );
};

export default SubscribeForm;
