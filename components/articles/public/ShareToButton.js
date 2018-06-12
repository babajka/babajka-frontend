import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from 'components/common/Icon';
import Text from 'components/common/Text';

import { EXPORT_TO_NETWORKS } from 'constants/social';

const ShareToButton = ({ name, side }) => (
  <Text
    id={`article.share-${name}`}
    render={t => (
      <a className={classNames('icon-button button', { 'article-side__button': side })} title={t}>
        <span
          className={classNames(`icon-button__${name}-icon icon`, {
            [`article__${name}-icon`]: !side,
          })}
        >
          <Icon name={name} size="lg" />
        </span>
      </a>
    )}
  />
);

ShareToButton.propTypes = {
  name: PropTypes.oneOf(EXPORT_TO_NETWORKS).isRequired,
  side: PropTypes.bool,
};

ShareToButton.defaultProps = {
  side: false,
};

export default ShareToButton;
