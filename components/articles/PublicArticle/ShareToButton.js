import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { withRouter } from 'next/router';

import Icon from 'components/common/Icon';
import Text from 'components/common/Text';

import { EXPORT_TO_NETWORKS, NETWORKS_URLS } from 'constants/social';

const ShareToButton = ({ name, title, side, router }) => (
  <Text
    id={`article.share-${name}`}
    render={t => (
      <a
        href={NETWORKS_URLS[name]({ url: router.asPath, title })}
        className={cn('icon-button button', { 'article-side__button': side })}
        title={t}
        target="_blank"
      >
        <span
          className={cn(`icon-button__${name}-icon icon`, {
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
  router: PropTypes.shape({
    asPath: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string,
};

ShareToButton.defaultProps = {
  side: false,
  title: 'Wir.by article',
};

export default withRouter(ShareToButton);
