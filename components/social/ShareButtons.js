import React from 'react';

import Icon from 'components/common/Icon';

import 'styles/src/kit/social-buttons/social-buttons.scss';

const SHARE_NETWORKS = [
  { id: 'facebook', icon: 'facebook-square' },
  { id: 'vk' },
  { id: 'twitter' },
  { id: 'odnoklassniki' },
];

const ShareButtons = () => {
  return (
    <div className="wir-social-buttons">
      <div className="wir-social-buttons__container">
        {SHARE_NETWORKS.map(({ id, icon = id }) => (
          <div
            key={id}
            className={`wir-social-buttons__item wir-social-buttons__button wir-social-buttons__button--${id}`}
          >
            <span>
              <Icon name={icon} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShareButtons;
