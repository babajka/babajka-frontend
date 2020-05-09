import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import bem from 'bem-css-modules';

import Link from 'components/common/Link';
import Text from 'components/common/Text';
import Image from 'components/common/Image';

import DiaryArrows from 'components/specials/diary/DiaryArrows';

import { diaryActions, diarySelectors } from 'redux/ducks/diary';
import { DiaryShape } from 'utils/customPropTypes';
import { getYear } from 'utils/formatters';
import fiberyToString from 'utils/fibery/toString';
import useLocalizedDate from 'hooks/useLocalizedDate';

import { SHORT_DATE_FORMAT } from 'constants';
import { DIARY_PICTURE_WIDTH } from 'constants/misc';
import { ROUTES_NAMES } from 'routes';
import styles from './diary.module.scss';

import BlockWrapper from './BlockWrapper';

const b = bem(styles);

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
      <BlockWrapper negativeTop>
        <div className={b('content')}>
          {diaryImage && (
            <Link
              className={b('picture', { 'no-image': !diaryImage })}
              route={ROUTES_NAMES.diary}
              params={{ slug }}
              noStyles
            >
              <Image alt={name} sourceSizes={[DIARY_PICTURE_WIDTH]} baseUrl={diaryImage} mode="x" />
            </Link>
          )}
          <div className={b('text-content')}>
            <div className={b('title')}>
              <span className={b('date')}>{useLocalizedDate(date, SHORT_DATE_FORMAT)}</span>
              <span>{getYear(date)}</span>
              <span>{name}</span>
              <Text id="diary.wrote" />:
            </div>
            {text && (
              <div className={b('text-wrap')}>
                <Link className={b('text')} route={ROUTES_NAMES.diary} params={{ slug }} noStyles>
                  {fiberyToString(text.content)}
                </Link>
                <Link route={ROUTES_NAMES.diary} params={{ slug }}>
                  <Text id="diary.more" />
                </Link>
              </div>
            )}
            <DiaryArrows className={b('arrows')} size={24} />
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
