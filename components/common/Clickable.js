import React from 'react';
import PropTypes from 'prop-types';

import { useLocalization } from 'components/common/Text';
import LibClickable from 'lib/components/Clickable';

import { linkCn } from 'utils/ui';

const Clickable = ({ linkStyle, className, titleId, title, ...props }) => {
  const cls = linkStyle ? linkCn({ ...props }) : className;
  return <LibClickable {...props} className={cls} title={useLocalization(titleId) || title} />;
};

Clickable.propTypes = {
  titleId: PropTypes.string,
  ...LibClickable.propTypes,
  linkStyle: PropTypes.bool,
};

Clickable.defaultProps = {
  ...LibClickable.defaultProps,
  linkStyle: false,
};

export default Clickable;
