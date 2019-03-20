import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Icon from 'components/common/ui/Icon';
import ExternalLink from 'components/common/ExternalLink';

import { NETWORKS } from 'constants/social';

const SocialList = ({ className, rounded }) => (
  <div className={className}>
    {NETWORKS.map(({ name, link }) => (
      <ExternalLink
        key={name}
        href={link}
        className={cn(name, rounded && 'button is-medium is-rounded')}
      >
        <span className={cn(rounded && 'icon is-medium')}>
          <Icon name={name} />
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
