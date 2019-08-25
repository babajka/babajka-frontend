import React, { useState } from 'react';
import { Form } from 'formik';

import Clickable from 'components/common/Clickable';
import Text from 'components/common/Text';
import LocaleContext from 'components/common/LocaleContext';
import FormWrapper from 'components/common/form/FormWrapper';
import InputField from 'components/common/form/InputField';

import { homeActions } from 'redux/ducks/home';
import { validEmail } from 'utils/validators';
import createConstants from 'lib/utils/createConstants';

const STATUS = createConstants('subscribed', 'unsubscribed');

const SubscribeForm = () => {
  const [email, setEmail] = useState(null);
  return (
    <div className="footer__mailing">
      <div className="footer__header">
        <Text id="footer.subscribe" />
      </div>
      {email && (
        <div className="footer__help-text">
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
                    name="emailAddress"
                    placeholder="email"
                    leftIcon={!isSubmitting && { name: 'envelope', pack: 'r' }}
                    rightIcon={isValid && { name: 'arrow-right', pack: 's' }}
                    onRightClick={handleSubmit}
                    pending={isSubmitting}
                    showError={errors.global}
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