import React from 'react';
import PropTypes from 'prop-types';
import { Text as TextField, TextArea } from 'react-form';
import get from 'lodash/get';
import set from 'lodash/set';
import cn from 'classnames';

import { required, hasErrors, isSlug } from 'utils/validators';
import { ROUTES_NAMES } from 'routes';

import Link from 'components/common/Link';
import Text from 'components/common/Text';
import Button from 'components/common/Button';
import Clickable from 'components/common/Clickable';
import Icon from 'components/common/Icon';
import Editor from 'components/common/Editor';

const localeFields = [
  {
    field: 'title',
    validator: required,
  },
  {
    field: 'subtitle',
    validator: required,
  },
  {
    field: 'slug',
    validator: field => required(field) || isSlug(field),
  },
];

// FIXME: it's very ugly & difficult method, has no ideas how to fix it
// mb use NestedForm, but there are another bugs with it
// TODO: migrate on react-form@3 & check NestedForms
export const localesFalidator = locales => {
  const localesErrors = {};
  const localesHasErrors = !!Object.keys(locales)
    .map(loc => {
      localeFields.forEach(({ field, validator }) => {
        const path = `${loc}.${field}`;
        set(localesErrors, path, validator(get(locales, path)));
      });
      return Object.values(localesErrors[loc]).some(Boolean);
    })
    .filter(Boolean).length;
  return localesHasErrors ? localesErrors : null;
};

// TODO: consider to extract to common component & merge with `auth/FormField`
const Field = ({ formApi, Component = TextField, withHelp, pending, ...props }) => {
  const { id, field, className = 'input' } = props;
  const error = get(formApi.errors, field);
  const touched = !!get(formApi.touched, field);
  const hasError = !pending && touched && !!error;
  const fieldName = field.split('.').pop();
  return (
    <div className="edit-info__item field">
      <label htmlFor={id} className="label">
        <Text id={`article.${fieldName}`} />
      </label>
      <div className="control">
        <Component {...props} className={cn(className, { 'is-danger': hasError })} />
      </div>
      {hasError && (
        <p className="help is-danger">
          <Text id={error} />
        </p>
      )}
      {withHelp && (
        <p className="help">
          <Text id={`article.${fieldName}-help`} />
        </p>
      )}
    </div>
  );
};

const EditLocaleForm = ({ article, prefix, formApi, onRemove, pending, error }) => {
  const slug = get(article, `${prefix}.slug`);
  return (
    <div className="inputs">
      <div className="edit-info">
        <Field
          formApi={formApi}
          id={`${prefix}.title`}
          field={`${prefix}.title`}
          pending={pending}
        />
        <Field
          formApi={formApi}
          id={`${prefix}.slug`}
          field={`${prefix}.slug`}
          withHelp
          placeholder="belaruskae-kino"
          pending={pending}
        />
        <Field
          Component={TextArea}
          formApi={formApi}
          id={`${prefix}.subtitle`}
          field={`${prefix}.subtitle`}
          pending={pending}
          className="textarea is-small"
          withHelp
          cols="50"
          rows="2"
          type="text"
        />
      </div>
      <div className="field editor">
        <Editor
          content={get(formApi.values, `${prefix}.content`)}
          onChange={content => formApi.setValue(`${prefix}.content`, content)}
        />
      </div>
      {!!error && (
        <p className="help is-danger">
          <Text id="common.ooooooops" />
        </p>
      )}
      <div className="action-buttons">
        <Clickable tag="div" className="remove-button button" onClick={onRemove}>
          <span className="icon is-small">
            <Icon name="remove" />
          </span>
          <span>
            <Text id="article.remove-locale" />
          </span>
        </Clickable>
        {slug && (
          <Link route={ROUTES_NAMES.article} params={{ slug }}>
            <Button className="save-button button">
              <Text id="article.preview" />
            </Button>
          </Link>
        )}
        <Button
          className="save-button button"
          type="submit"
          disabled={hasErrors(formApi.errors)}
          pending={pending}
        >
          <Text id="article.save" />
        </Button>
      </div>
    </div>
  );
};

EditLocaleForm.propTypes = {
  article: PropTypes.shape({
    slug: PropTypes.string,
  }),
  pending: PropTypes.bool.isRequired,
  error: PropTypes.any, // eslint-disable-line
  prefix: PropTypes.string.isRequired,
  formApi: PropTypes.shape({
    values: PropTypes.object.isRequired,
    setValue: PropTypes.func.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
};

EditLocaleForm.defaultProps = {
  article: null,
};

export default EditLocaleForm;
