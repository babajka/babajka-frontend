import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Router } from 'routes';

import LocaleContext from 'components/common/LocaleContext';
import { LangType } from 'utils/customPropTypes';

const Redirect = ({ to, params, method, lang }) => {
  useEffect(() => {
    Router[`${method}Route`](to, { lang, ...params });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};

Redirect.propTypes = {
  to: PropTypes.string.isRequired,
  params: PropTypes.shape({}),
  method: PropTypes.oneOf(['replace', 'push']),
  lang: LangType.isRequired,
};

Redirect.defaultProps = {
  params: {},
  method: 'replace',
};

export default props => (
  <LocaleContext.Consumer>{lang => <Redirect {...props} lang={lang} />}</LocaleContext.Consumer>
);
