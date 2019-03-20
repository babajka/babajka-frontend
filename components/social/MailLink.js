import React from 'react';
import PropTypes from 'prop-types';

import LinkWrapper from 'components/common/ui/LinkWrapper';

const MailLink = ({ to, children = `${to}@wir.by` }) => (
  <LinkWrapper href={`mailto:wir.${to}@wir.by`} target="_top">
    {children}
  </LinkWrapper>
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
