import './social-buttons.scss';

import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';

import { localize, useLocaleContext } from 'components/common/Text';
import Icon from 'components/common/ui/Icon';
import ButtonGroup from 'components/common/ButtonGroup';
import ExternalLink from 'components/common/ExternalLink';

import { SHARE_NETWORKS } from 'constants/social';
import { DOMAIN_SECURE } from 'constants';

const ShareButtons = ({ urlPath, title }) => {
  const lang = useLocaleContext();
  return (
    <ButtonGroup className="wir-social-buttons" icon>
      {SHARE_NETWORKS.map(({ id, icon = id, baseUrl, getParams }) => (
        <ExternalLink
          key={id}
          className={`wir-button wir-button__icon wir-social-buttons__button wir-social-buttons__button--${id}`}
          href={`${baseUrl}?${qs.stringify(getParams(`${DOMAIN_SECURE}${urlPath}`, title))}`}
          title={localize(`common.share-${id}`, lang)}
          custom
        >
          <Icon pack="b" name={icon} />
        </ExternalLink>
      ))}
    </ButtonGroup>
  );
};

ShareButtons.propTypes = {
  urlPath: PropTypes.string,
  title: PropTypes.string.isRequired,
};

ShareButtons.defaultProps = {
  urlPath: '',
};

export default ShareButtons;
