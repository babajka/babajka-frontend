import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Link from 'components/common/Link';
import { ROUTES_NAMES } from 'routes';
import styles from './diaryArrows.module.scss';

import ArrowIcon from './ArrowIcon';

const DiaryLinkArrows = ({ className, prev, next, size, isNextAvailable }) => (
  <div className={cn(styles.arrows, className)}>
    <Link route={ROUTES_NAMES.diary} params={{ slug: prev.slug }} titleId="diary.previous">
      <ArrowIcon direction="left" size={size} />
    </Link>
    <Link
      disabled={!isNextAvailable}
      route={ROUTES_NAMES.diary}
      params={{ slug: next.slug }}
      titleId="diary.next"
    >
      <ArrowIcon direction="right" size={size} />
    </Link>
  </div>
);

const DiaryLinkShape = PropTypes.shape({
  slug: PropTypes.string.isRequired,
});

DiaryLinkArrows.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number.isRequired,
  isNextAvailable: PropTypes.bool.isRequired,
  prev: DiaryLinkShape.isRequired,
  next: DiaryLinkShape.isRequired,
};

DiaryLinkArrows.defaultProps = {
  className: '',
};

export default DiaryLinkArrows;
