import './diary.scss';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cn from 'classnames';

import Text from 'components/common/Text';
import Clickable from 'components/common/Clickable';
import Image from 'components/common/Image';

import DiaryModal from 'components/specials/diary/DiaryModal';
import DiaryArrows from 'components/specials/diary/DiaryArrows';

import { diaryActions, diarySelectors } from 'redux/ducks/diary';
import { DiaryShape } from 'utils/customPropTypes';
import { formatDate, getYear } from 'utils/formatters';
import fiberyToString from 'utils/fibery/toString';

import { SHORT_DATE_FORMAT } from 'constants';
import { DIARY_PICTURE_WIDTH } from 'constants/misc';

import BlockWrapper from './BlockWrapper';

const mapStateToProps = (state, { lang }) => ({
  diary: diarySelectors.getCurrent(state, lang),
});

const mapDispatchToProps = {
  fetchData: diaryActions.getByDay,
};

const DiaryBlock = ({ diary, fetchData }) => {
  const [isOpened, setState] = useState(false);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const { author: { name, diaryImage } = {}, date, text } = diary;
  const formatted = formatDate(date, SHORT_DATE_FORMAT);

  return (
    <>
      {isOpened && (
        <DiaryModal
          name={name}
          date={formatted}
          image={diaryImage}
          text={text}
          onClose={() => setState(false)}
        />
      )}
      <BlockWrapper className="diary" negativeTop>
        <div className="diary__content">
          <div className={cn('diary__picture', { 'diary__picture--no-image': !diaryImage })}>
            {diaryImage && (
              <Image alt={name} sourceSizes={[DIARY_PICTURE_WIDTH]} baseUrl={diaryImage} mode="x" />
            )}
          </div>
          <div className="diary__text-content">
            <div className="diary__title">
              <span className="diary__date">{formatted}</span>
              <span className="diary__year">{getYear(date)}</span>
              <span className="diary__name">{name}</span>
              <Text id="diary.wrote" />
            </div>
            {text && (
              <div className="diary__text-wrap">
                <div className="diary__text">{fiberyToString(text.content)}</div>
                <Clickable linkStyle onClick={() => setState(true)}>
                  <Text id="diary.more" />
                </Clickable>
              </div>
            )}
            <DiaryArrows />
          </div>
        </div>
      </BlockWrapper>
    </>
  );
};

DiaryBlock.propTypes = {
  diary: DiaryShape.isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DiaryBlock);
