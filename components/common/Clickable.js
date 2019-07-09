import React from 'react';
import PropTypes from 'prop-types';

import LibClickable from 'lib/components/Clickable';

import { linkCn } from 'utils/ui';

const Clickable = ({ linkStyle, ...props }) => {
  if (linkStyle) {
    // eslint-disable-next-line no-param-reassign
    props.className = linkCn({ ...props });
  }

  return <LibClickable {...props} />;
};

Clickable.propTypes = {
  ...LibClickable.propTypes,
  linkStyle: PropTypes.bool,
};

Clickable.defaultProps = {
  ...LibClickable.defaultProps,
  linkStyle: false,
};

export default Clickable;
