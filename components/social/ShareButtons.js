import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import qs from 'querystring';
import bem from 'bem-css-modules';
import cn from 'classnames';

import Text, { localize, useLocaleContext } from 'components/common/Text';
import Icon from 'components/common/ui/Icon';
import Button from 'components/common/Button';
import ButtonGroup from 'components/common/ButtonGroup';

import { SHARE_NETWORKS } from 'constants/social';
import { DOMAIN_SECURE } from 'constants';
import styles from './social-buttons.module.scss';

const b = bem(styles);
const POPUP_WINDOW_PARAMS = 'width=600,height=400';

const ShareButtons = ({ className, noAsPath, basicText, extendedText }) => {
  const router = useRouter();
  const lang = useLocaleContext();
  const [forceButtonGroup, setForceButtonGroup] = useState(false);
  const urlPath = noAsPath ? '' : router.asPath;
  const url = `${DOMAIN_SECURE}${urlPath}`;

  return (
    <>
      <div className={cn(b('native', { hidden: forceButtonGroup }), className)}>
        <Button
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: basicText, url });
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
      <div className={cn(b('generic', { shown: forceButtonGroup }), className)}>
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
                    `${baseUrl}?${qs.stringify(getParams(url, text))}`,
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
  className: PropTypes.string,
  noAsPath: PropTypes.bool,
  basicText: PropTypes.string.isRequired,
  extendedText: PropTypes.string,
};

ShareButtons.defaultProps = {
  className: '',
  noAsPath: false,
  extendedText: '',
};

export default ShareButtons;
