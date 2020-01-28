import './diaryArrows.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Clickable from 'components/common/Clickable';
import { diaryActions, diarySelectors } from 'redux/ducks/diary';

import ArrowIcon from './ArrowIcon';

const mapStateToProps = state => ({
  isNextAvailable: diarySelectors.isNextAvailable(state),
});

const mapDispatchToProps = {
  fetchData: diaryActions.getByDay,
  getNext: () => diaryActions.getClosest('next'),
  getPrev: () => diaryActions.getClosest('prev'),
};

const DiaryArrows = ({ className, size, getPrev, getNext, isNextAvailable }) => (
  <div className={`diary-arrows ${className}`}>
    <Clickable onClick={getPrev} linkStyle titleId="diary.previous">
      <ArrowIcon direction="left" size={size} />
    </Clickable>
    <Clickable disabled={!isNextAvailable} onClick={getNext} linkStyle titleId="diary.next">
      <ArrowIcon direction="right" size={size} />
    </Clickable>
  </div>
);

DiaryArrows.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number.isRequired,
  getNext: PropTypes.func.isRequired,
  getPrev: PropTypes.func.isRequired,
  isNextAvailable: PropTypes.bool.isRequired,
};

DiaryArrows.defaultProps = {
  className: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(DiaryArrows);
