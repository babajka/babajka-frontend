import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Text from 'components/common/Text';
import { DATE_FORMAT } from 'constants';
import InfoIcon from './InfoIcon';

const PublishInfo = ({ publishAt }) => {
  if (!publishAt) {
    return (
      <span className="article__info-item tag is-warning is-uppercase">
        <Text id="article.publication-not-scheduled" />
      </span>
    );
  }

  const publishAtMoment = moment(publishAt);
  const formattedPublishAt = publishAtMoment.format(DATE_FORMAT);

  if (publishAtMoment.isBefore(moment())) {
    return (
      <span className="article__info-item">
        <InfoIcon name="clock-o" />
        {formattedPublishAt}
      </span>
    );
  }

  return (
    <span className="article__info-item article__info-planned tag is-uppercase">
      <Text id="article.will-be-published" /> {formattedPublishAt}
    </span>
  );
};

PublishInfo.propTypes = {
  publishAt: PropTypes.string,
};

PublishInfo.defaultProps = {
  publishAt: null,
};

export default PublishInfo;
