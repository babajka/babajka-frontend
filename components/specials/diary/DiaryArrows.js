import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cn from 'classnames';

import Clickable from 'components/common/Clickable';
import Icon from 'components/common/ui/Icon';

import { diaryActions, diarySelectors } from 'redux/ducks/diary';

const mapStateToProps = state => ({
  isNextAvailable: diarySelectors.isNextAvailable(state),
});

const mapDispatchToProps = {
  fetchData: diaryActions.getByDay,
  getNext: () => diaryActions.getClosest('next'),
  getPrev: () => diaryActions.getClosest('prev'),
};

const DiaryArrows = ({ getPrev, getNext, isNextAvailable, inModal }) => (
  <div
    className={cn({
      diary__arrows: !inModal,
      'diary-modal__arrows': inModal,
      [`diary-modal__arrows--${inModal}`]: inModal,
    })}
  >
    <Clickable onClick={getPrev} linkStyle titleId="diary.previous">
      <Icon
        className={cn({
          'diary-modal__arrows--left': inModal,
        })}
        name="long-arrow-alt-left"
      />
    </Clickable>
    <Clickable disabled={!isNextAvailable} onClick={getNext} linkStyle titleId="diary.next">
      <Icon name="long-arrow-alt-right" />
    </Clickable>
  </div>
);

DiaryArrows.propTypes = {
  getNext: PropTypes.func.isRequired,
  getPrev: PropTypes.func.isRequired,
  isNextAvailable: PropTypes.bool.isRequired,
  inModal: PropTypes.oneOf(['top', 'bottom']),
};

DiaryArrows.defaultProps = {
  inModal: null,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiaryArrows);
