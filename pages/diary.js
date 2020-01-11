import 'styles/pages/diary.scss';

import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import Image from 'components/common/Image';
import DiaryLinkArrows from 'components/specials/diary/DiaryLinkArrows';

import { formatDate } from 'utils/formatters';

import { diaryActions, diarySelectors } from 'redux/ducks/diary';
import fiberyRenderer from 'utils/fibery/renderer';
import { populateRequest } from 'utils/request';

import { DATE_FORMAT } from 'constants';
import { DIARY_PICTURE_WIDTH } from 'constants/misc';

const mapStateToProps = (state, { lang }) => ({
  diary: diarySelectors.getCurrent(state, lang),
});

const DiaryPage = ({
  diary: { author: { name, diaryImage: image } = {}, date, text: { content } = {} },
}) => (
  <div className="wir-content-padding diary-page">
    <DiaryLinkArrows className="diary-page__arrows--top" size={36} />
    <div className={cn('diary-page__title', { 'diary-page__title--with-image': image })}>
      <div className="diary-page__date">{formatDate(date, DATE_FORMAT)}</div>
      <div className="diary-page__name">{name}</div>
    </div>
    <div
      className={cn('diary-page__image-container', {
        'diary-page__image-container--no-image': !image,
      })}
    >
      {image && (
        <Image
          className="diary-page__image"
          alt={name}
          sourceSizes={[DIARY_PICTURE_WIDTH]}
          baseUrl={image}
          mode="x"
        />
      )}
    </div>
    <div className="diary-page__text">{fiberyRenderer(content)}</div>
  </div>
);

DiaryPage.getInitialProps = ctx =>
  populateRequest(ctx, ({ query: { slug } }) => diaryActions.getBySlug(slug));

DiaryPage.getLayoutProps = () => ({
  hideFooter: true,
});

export default connect(mapStateToProps)(DiaryPage);
