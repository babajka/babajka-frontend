import React, { useState } from 'react';
import bem from 'bem-css-modules';
import { Form } from 'formik';

import Clickable from 'components/common/Clickable';
import Text from 'components/common/Text';
import LocaleContext from 'components/common/LocaleContext';
import FormWrapper from 'components/common/form/FormWrapper';
import InputField from 'components/common/form/InputField';

import { homeActions } from 'redux/ducks/home';
import { validEmail } from 'utils/validators';
import createConstants from 'lib/utils/createConstants';
import styles from './index.module.scss';

const b = bem(styles);
const STATUS = createConstants('subscribed', 'unsubscribed');

const SubscribeForm = () => {
  const [email, setEmail] = useState(null);
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
          <Clickable tag="div" onClick={() => setEmail(null)} className="wir-link">
            <Text id="footer.add-email" />
          </Clickable>
        </div>
      )}
      {!email && (
        <LocaleContext.Consumer>
          {lang => (
            <FormWrapper
              action={homeActions.subscribe}
              initialValues={{
                emailAddress: '',
                userStatus: STATUS.subscribed,
                language: lang,
              }}
              validators={{ emailAddress: validEmail }}
              onSuccess={({ action: { payload, meta } }) => {
                meta.formikActions.resetForm();
                setEmail(payload.emailAddress);
              }}
            >
              {({ isSubmitting, isValid, handleSubmit, errors }) => (
                <Form>
                  <InputField
                    aria-labelledby="footer-subscribe"
                    name="emailAddress"
                    leftIcon={!isSubmitting && { name: 'envelope', pack: 'r' }}
                    rightIcon={isValid && { name: 'arrow-right', pack: 's' }}
                    onRightClick={handleSubmit}
                    pending={isSubmitting}
                    showError={!!errors.global}
                  />
                </Form>
              )}
            </FormWrapper>
          )}
        </LocaleContext.Consumer>
      )}
    </div>
  );
};

export default SubscribeForm;
