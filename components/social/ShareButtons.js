import React, { useState } from 'react';
import PropTypes from 'prop-types';
import qs from 'querystring';
import bem from 'bem-css-modules';

import Text, { localize, useLocaleContext } from 'components/common/Text';
import Icon from 'components/common/ui/Icon';
import Button from 'components/common/Button';
import ButtonGroup from 'components/common/ButtonGroup';

import { SHARE_NETWORKS } from 'constants/social';
import { DOMAIN_SECURE } from 'constants';
import styles from './social-buttons.module.scss';

const b = bem(styles);
const POPUP_WINDOW_PARAMS = 'width=600,height=400';

const ShareButtons = ({ urlPath, basicText, extendedText }) => {
  const lang = useLocaleContext();
  const [forceButtonGroup, setForceButtonGroup] = useState(false);

  return (
    <>
      <div className={b('native', { hidden: forceButtonGroup })}>
        <Button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: basicText,
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
      <div className={b('generic', { shown: forceButtonGroup })}>
        <ButtonGroup icon>
          {SHARE_NETWORKS.map(({ id, icon = id, baseUrl, getParams }) => {
            const text = id === 'twitter' ? extendedText || basicText : basicText;
            return (
              <button
                key={id}
                className={b('button', { [id]: true })}
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
  basicText: PropTypes.string.isRequired,
  extendedText: PropTypes.string,
};

ShareButtons.defaultProps = {
  urlPath: '',
  extendedText: '',
};

export default ShareButtons;
