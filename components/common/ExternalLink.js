import React from 'react';
import PropTypes from 'prop-types';

import { linkCn } from 'utils/ui';

const ExternalLink = ({ href, children, className, custom, ...props }) => (
  <a
    href={href}
    rel="noopener noreferrer"
    target="_blank"
    className={custom ? className : linkCn({ className, ...props })}
    {...props}
  >
    {children}
  </a>
);

ExternalLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  custom: PropTypes.bool,
};

ExternalLink.defaultProps = {
  className: '',
  custom: false,
};

export default ExternalLink;
