import React from 'react';
import PropTypes from 'prop-types';

import LinkWraper from 'components/common/LinkWraper';

const ExternalLink = ({ href, children, ...props }) => (
  <LinkWraper href={href} rel="noopener noreferrer" target="_blank" {...props}>
    {children}
  </LinkWraper>
);

ExternalLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
};

export default ExternalLink;
