import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Text from 'components/common/Text';

import { formatDate } from 'utils/formatters';

import InfoIcon from './InfoIcon';

const PublishInfo = ({ published, publishAt }) => {
  if (!publishAt) {
    return (
      <span className="article__info-item tag is-warning is-uppercase">
        <Text id="article.publication-not-scheduled" />
      </span>
    );
  }

  if (published) {
    return (
      <span className="article__info-item">
        <InfoIcon name="clock-o" />
        {formatDate(publishAt)}
      </span>
    );
  }

  return (
    <span className="article__info-item article__info-planned tag is-uppercase">
      <Text id="article.will-be-published" /> {moment(publishAt).fromNow()}
    </span>
  );
};

PublishInfo.propTypes = {
  published: PropTypes.bool.isRequired,
  publishAt: PropTypes.string,
};

PublishInfo.defaultProps = {
  publishAt: null,
};

export default PublishInfo;
