import React from 'react';
import PropTypes from 'prop-types';

import { linkCn } from 'utils/ui';

const ExternalLink = ({ href, children, ...props }) => (
  <a href={href} rel="noopener noreferrer" target="_blank" {...props} className={linkCn(props)}>
    {children}
  </a>
);

ExternalLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
};

export default ExternalLink;
