import React, { useState, useCallback, useRef, useMemo } from 'react';
import bem from 'bem-css-modules';

import Clickable from 'components/common/Clickable';
import Text, { useLocaleContext } from 'components/common/Text';
import Input from 'components/common/ui/Input';

import { makeRequest } from 'utils/request';
import api from 'constants/api';

import styles from './index.module.scss';

const b = bem(styles);

const emailRegexp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;
const isEmail = email => !!email?.match(emailRegexp);

// TODO: use swr
const SubscribeForm = () => {
  const lang = useLocaleContext();
  const [email, setEmail] = useState(null);
  const [formValue, setValue] = useState('');
  const [{ pending, apiError }, setState] = useState({ pending: false });
  const inputRef = useRef();

  const isValid = useMemo(() => isEmail(formValue), [formValue]);

  const onChange = useCallback(({ target: { value } }) => {
    setValue(value);
  }, []);
  const onSubmit = useCallback(
    async event => {
      event.preventDefault();
      if (!isValid) {
        return;
      }

      setState({ pending: true });
      const body = {
        emailAddress: formValue,
        userStatus: 'subscribed',
        language: lang,
      };

      try {
        const { emailAddress } = await makeRequest(api.core.subscribe, 'POST', body);
        setEmail(emailAddress);
        setState({ pending: false });
      } catch (error) {
        setState({ pending: false, apiError: error });
        inputRef.current.focus();
      }
    },
    [formValue, isValid, lang]
  );

  return (
    <div className={b('mailing')}>
      <div id="footer-subscribe" className={b('header')}>
        <Text id="footer.subscribe" />
      </div>
      {email && (
        <div className={b('help-text')}>
          <Text
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
          <Clickable linkStyle tag="div" onClick={() => setEmail(null)}>
            <Text id="footer.add-email" />
          </Clickable>
        </div>
      )}
      {!email && (
        <form onSubmit={onSubmit}>
          <Input
            ref={inputRef}
            aria-labelledby="footer-subscribe"
            name="emailAddress"
            value={formValue}
            onChange={onChange}
            leftIcon={!pending && { name: 'envelope', pack: 'r' }}
            rightIcon={isValid && { name: 'arrow-right', pack: 's' }}
            onRightClick={onSubmit}
            pending={pending}
            error={apiError}
          />
        </form>
      )}
    </div>
  );
};

export default SubscribeForm;
