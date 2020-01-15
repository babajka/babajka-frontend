import 'styles/pages/diary.scss';

import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { useRouter } from 'next/router';

import Image from 'components/common/Image';
import { useLocalization } from 'components/common/Text';
import DiaryLinkArrows from 'components/specials/diary/DiaryLinkArrows';
import ShareButtons from 'components/social/ShareButtons';
import { MetaTitle, MetaDescription, MetaKeywords, MetaImage } from 'components/social/Metatags';

import { formatDate } from 'utils/formatters';

import { diaryActions, diarySelectors } from 'redux/ducks/diary';
import fiberyRenderer from 'utils/fibery/renderer';
import fiberyToString from 'utils/fibery/toString';
import { populateRequest } from 'utils/request';

import { DATE_FORMAT, SHORT_DATE_FORMAT } from 'constants';
import { DIARY_PICTURE_WIDTH } from 'constants/misc';

const mapStateToProps = (state, { lang }) => ({
  diary: diarySelectors.getCurrent(state, lang),
});

const DiaryPage = ({
  diary: { author: { name, diaryImage: image } = {}, date, text: { content } = {} },
}) => {
  const router = useRouter();
  return (
    <>
      <MetaTitle title={`${formatDate(date, DATE_FORMAT)}, ${name}`} type="article" />
      <MetaDescription description={`${fiberyToString(content).substring(0, 100)}...`} />
      <MetaKeywords keywords={`${formatDate(date, SHORT_DATE_FORMAT)}, ${name}`} />
      <MetaImage url="" />

      <div className="wir-content-padding diary-page">
        <DiaryLinkArrows className="diary-page__arrows diary-page__arrows--top" size={36} />
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
        <div className="diary-page__share">
          <ShareButtons
            urlPath={router.asPath}
            title={`${name} ${useLocalization('diary.wrote')} ${formatDate(date, DATE_FORMAT)}  `}
          />
        </div>
        <DiaryLinkArrows className="diary-page__arrows diary-page__arrows--bottom" size={36} />
      </div>
    </>
  );
};

DiaryPage.getInitialProps = ctx =>
  populateRequest(ctx, ({ query: { slug } }) => diaryActions.getBySlug(slug));

DiaryPage.getLayoutProps = () => ({
  hideFooter: true,
});

export default connect(mapStateToProps)(DiaryPage);
