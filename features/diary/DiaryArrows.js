import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Clickable from 'components/common/Clickable';
import ArrowIcon from './ArrowIcon';
import styles from './diaryArrows.module.scss';

const DiaryArrows = ({ className, size, onPrev, onNext, isNextAvailable }) => (
  <div className={cn(styles.arrows, className)}>
    <Clickable onClick={onPrev} linkStyle titleId="diary.previous">
      <ArrowIcon direction="left" size={size} />
    </Clickable>
    <Clickable disabled={!isNextAvailable} onClick={onNext} linkStyle titleId="diary.next">
      <ArrowIcon direction="right" size={size} />
    </Clickable>
  </div>
);

DiaryArrows.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  isNextAvailable: PropTypes.bool.isRequired,
};

DiaryArrows.defaultProps = {
  className: '',
};

export default DiaryArrows;
