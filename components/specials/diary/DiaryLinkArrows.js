import './diaryArrows.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Link from 'components/common/Link';
import { diarySelectors } from 'redux/ducks/diary';
import { ROUTES_NAMES } from 'routes';

import ArrowIcon from './ArrowIcon';

const mapStateToProps = state => ({
  prev: diarySelectors.getPrev(state),
  next: diarySelectors.getNext(state),
  isNextAvailable: diarySelectors.isNextAvailable(state),
});

const DiaryLinkArrows = ({ className, prev, next, size, isNextAvailable }) => (
  <div className={`diary-arrows ${className}`}>
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

export default connect(mapStateToProps)(DiaryLinkArrows);
