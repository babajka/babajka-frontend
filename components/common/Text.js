import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import LocaleContext from 'components/common/LocaleContext';
import { DEFAULT_LOCALE } from 'constants';
import dict from 'data/i18n.json';

const SEPARATOR = '||';

const defaultRender = text => <>{text}</>;

export const localize = (id, lang) =>
  get(dict, `${id}.${lang}`) || get(dict, `${id}.${DEFAULT_LOCALE}`) || '';

const Text = ({ id, children, render = children }) => (
  <LocaleContext.Consumer>
    {lang => render(...localize(id, lang).split(SEPARATOR))}
  </LocaleContext.Consumer>
);

Text.propTypes = {
  /** translation key in our i18n dict */
  id: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  render: PropTypes.func,
  children: PropTypes.func,
};

Text.defaultProps = {
  children: defaultRender,
};

export default Text;
