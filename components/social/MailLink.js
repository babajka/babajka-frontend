import React from 'react';
import PropTypes from 'prop-types';

import LinkWraper from 'components/common/LinkWraper';

const MailLink = ({ to, children = `${to}@wir.by` }) => (
  <LinkWraper href={`mailto:wir.${to}@wir.by`} target="_top">
    {children}
  </LinkWraper>
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
