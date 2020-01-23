import React from 'react';
import PropTypes from 'prop-types';

import { linkCn } from 'utils/ui';

const MailLink = ({ to, children = `${to}@wir.by` }) => (
  <a href={`mailto:${to}@wir.by`} target="_top" className={linkCn()}>
    {children}
  </a>
);

MailLink.propTypes = {
  to: PropTypes.oneOf(['help']),
  children: PropTypes.node,
};

MailLink.defaultProps = {
  to: 'help',
  children: null,
};

export default MailLink;
