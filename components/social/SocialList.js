import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Icon from 'components/common/ui/Icon';
import ExternalLink from 'components/common/ExternalLink';

import { NETWORKS } from 'constants/social';

const SocialList = ({ className, rounded }) => (
  <div className={className}>
    {NETWORKS.map(({ id, link }) => (
      <ExternalLink
        key={id}
        href={link}
        className={cn(id, rounded && 'button is-medium is-rounded')}
      >
        <span className={cn(rounded && 'icon is-medium')}>
          <Icon name={id} />
        </span>
      </ExternalLink>
    ))}
  </div>
);

SocialList.propTypes = {
  className: PropTypes.string.isRequired,
  rounded: PropTypes.bool,
};

SocialList.defaultProps = {
  rounded: false,
};

export default SocialList;
