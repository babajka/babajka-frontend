import './social-buttons.scss';

import React from 'react';

import Icon from 'components/common/ui/Icon';
import ButtonGroup from 'components/common/ButtonGroup';
import Button from 'components/common/Button';

const SHARE_NETWORKS = [
  { id: 'facebook', icon: 'facebook-square' },
  { id: 'vk' },
  { id: 'twitter' },
  { id: 'odnoklassniki' },
];

const ShareButtons = () => {
  return (
    <ButtonGroup className="wir-social-buttons" icon>
      {SHARE_NETWORKS.map(({ id, icon = id }) => (
        <Button
          key={id}
          className={`wir-social-buttons__button wir-social-buttons__button--${id}`}
          icon
        >
          <Icon pack="b" name={icon} />
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default ShareButtons;
