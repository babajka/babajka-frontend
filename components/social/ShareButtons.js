import './social-buttons.scss';

import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';

import { localize, useLocaleContext } from 'components/common/Text';
import Icon from 'components/common/ui/Icon';
import ButtonGroup from 'components/common/ButtonGroup';

import { SHARE_NETWORKS } from 'constants/social';
import { DOMAIN_SECURE } from 'constants';

const ShareButtons = ({ urlPath, text: { basic, extended } }) => {
  const lang = useLocaleContext();
  return (
    <ButtonGroup className="wir-social-buttons" icon>
      {SHARE_NETWORKS.map(({ id, icon = id, baseUrl, getParams }) => {
        const text = id === 'twitter' ? extended || basic : basic;
        return (
          <button
            key={id}
            className={`wir-button wir-button__icon wir-social-buttons__button wir-social-buttons__button--${id}`}
            title={localize(`common.share-${id}`, lang)}
            type="button"
            onClick={() => {
              window.open(
                `${baseUrl}?${qs.stringify(getParams(`${DOMAIN_SECURE}${urlPath}`, text))}`,
                localize(`common.share-link`, lang),
                'width=600,height=400'
              );
            }}
          >
            <Icon pack="b" name={icon} />
          </button>
        );
      })}
    </ButtonGroup>
  );
};

ShareButtons.propTypes = {
  urlPath: PropTypes.string,
  text: {
    basic: PropTypes.string.isRequired,
    extended: PropTypes.string,
  },
};

ShareButtons.defaultProps = {
  urlPath: '',
  text: {
    extended: '',
  },
};

export default ShareButtons;
