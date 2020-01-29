import './social-buttons.scss';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import cn from 'classnames';

import Text, { localize, useLocaleContext } from 'components/common/Text';
import Icon from 'components/common/ui/Icon';
import Button from 'components/common/Button';
import ButtonGroup from 'components/common/ButtonGroup';

import { SHARE_NETWORKS } from 'constants/social';
import { DOMAIN_SECURE } from 'constants';

const POPUP_WINDOW_PARAMS = 'width=600,height=400';

const ShareButtons = ({ urlPath, text: { basic, extended } }) => {
  const lang = useLocaleContext();
  const [forceButtonGroup, setForceButtonGroup] = useState(false);

  return (
    <>
      <div
        className={cn('wir-social-buttons__native', {
          'wir-social-buttons__native--hidden': forceButtonGroup,
        })}
      >
        <Button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: basic,
                url: `${DOMAIN_SECURE}${urlPath}`,
              });
            } else {
              setForceButtonGroup(true);
            }
          }}
          icon={{
            pack: 's',
            name: 'external-link-alt',
          }}
        >
          <Text id="common.share-link" />
        </Button>
      </div>
      <div
        className={cn('wir-social-buttons__generic', {
          'wir-social-buttons__generic--shown': forceButtonGroup,
        })}
      >
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
                    POPUP_WINDOW_PARAMS
                  );
                }}
              >
                <Icon pack="b" name={icon} />
              </button>
            );
          })}
        </ButtonGroup>
      </div>
    </>
  );
};

ShareButtons.propTypes = {
  urlPath: PropTypes.string,
  text: PropTypes.shape({
    basic: PropTypes.string.isRequired,
    extended: PropTypes.string,
  }).isRequired,
};

ShareButtons.defaultProps = {
  urlPath: '',
};

export default ShareButtons;
