import './diary.scss';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cn from 'classnames';

import Link from 'components/common/Link';
import Text from 'components/common/Text';
import Image from 'components/common/Image';

import DiaryArrows from 'components/specials/diary/DiaryArrows';

import { diaryActions, diarySelectors } from 'redux/ducks/diary';
import { DiaryShape } from 'utils/customPropTypes';
import { formatDate, getYear } from 'utils/formatters';
import fiberyToString from 'utils/fibery/toString';

import { SHORT_DATE_FORMAT } from 'constants';
import { DIARY_PICTURE_WIDTH } from 'constants/misc';
import { ROUTES_NAMES } from 'routes';

import BlockWrapper from './BlockWrapper';

const mapStateToProps = (state, { lang }) => ({
  diary: diarySelectors.getCurrent(state, lang),
});

const mapDispatchToProps = {
  fetchData: diaryActions.getByDay,
};

const DiaryBlock = ({ diary, fetchData }) => {
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const { slug, author: { name, diaryImage } = {}, date, text } = diary;

  return (
    <>
      <BlockWrapper className="diary" negativeTop>
        <div className="diary__content">
          <div className={cn('diary__picture', { 'diary__picture--no-image': !diaryImage })}>
            {diaryImage && (
              <Image alt={name} sourceSizes={[DIARY_PICTURE_WIDTH]} baseUrl={diaryImage} mode="x" />
            )}
          </div>
          <div className="diary__text-content">
            <div className="diary__title">
              <span className="diary__date">{formatDate(date, SHORT_DATE_FORMAT)}</span>
              <span className="diary__year">{getYear(date)}</span>
              <span className="diary__name">{name}</span>
              <Text id="diary.wrote" />
            </div>
            {text && (
              <div className="diary__text-wrap">
                <div className="diary__text">{fiberyToString(text.content)}</div>
                <Link route={ROUTES_NAMES.diary} params={{ slug }}>
                  <Text id="diary.more" />
                </Link>
              </div>
            )}
            <DiaryArrows className="diary__arrows" size={24} />
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
