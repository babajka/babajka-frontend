import React from 'react';
import PropTypes from 'prop-types';

const ExternalLink = ({ href, children, ...otherProps }) => (
  <a href={href} rel="noopener noreferrer" target="_blank" {...otherProps}>
    {children}
  </a>
);

ExternalLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
};

export default ExternalLink;
