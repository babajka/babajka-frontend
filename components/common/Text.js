import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import LocaleContext from 'components/common/LocaleContext';
import { DEFAULT_LOCALE } from 'constants';
import dict from 'constants/i18n.json';

const defaultRender = text => <Fragment>{text}</Fragment>;

const Text = ({ id, children, render = children }) => (
  <LocaleContext.Consumer>
    {lang => render(get(dict, `${id}.${lang}`) || get(dict, `${id}.${DEFAULT_LOCALE}`) || '')}
  </LocaleContext.Consumer>
);

Text.propTypes = {
  id: PropTypes.string.isRequired,
  render: PropTypes.func,
  children: PropTypes.func,
};

Text.defaultProps = {
  render: defaultRender,
  children: defaultRender,
};

export default Text;