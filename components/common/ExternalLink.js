import React from 'react';
import PropTypes from 'prop-types';

import LinkWrapper from 'components/common/ui/LinkWrapper';

const ExternalLink = ({ href, children, ...props }) => (
  <LinkWrapper href={href} rel="noopener noreferrer" target="_blank" {...props}>
    {children}
  </LinkWrapper>
);

ExternalLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
};

export default ExternalLink;
