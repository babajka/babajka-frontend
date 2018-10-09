import React from 'react';
import PropTypes from 'prop-types';

const MailLink = ({ to }) => (
  <a href={`mailto:wir.${to}@gmail.com`} target="_top">
    <u>{`wir.${to}@gmail.com`}</u>
  </a>
);

MailLink.propTypes = {
  to: PropTypes.oneOf(['development', 'help']),
};

MailLink.defaultProps = {
  to: 'development',
};

export default MailLink;
