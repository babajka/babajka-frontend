import styles from 'styles/pages/tag.module.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import bem from 'bem-css-modules';

import {
  MetaTitle,
  MetaImage,
  MetaDescription,
  MetaKeywords,
  DEFAULT_IMAGE,
} from 'components/social/Metatags';
import { localize } from 'components/common/Text';
import ArticlesComposition from 'components/articles/compositions/ArticlesComposition';

import { tagsActions, tagsSelectors } from 'redux/ducks/tags';
import { ArticlesArray, TagShape, LangType } from 'utils/customPropTypes';
import { populateRequest } from 'utils/request';
import { renderTag, getTopicLink, getTagImageUrl } from 'utils/tags';
import host from 'utils/host';

import { TOPICS } from 'constants';

const b = bem(styles);

const mapStateToProps = (state, { lang }) => tagsSelectors.getData(state, lang);

const TagPage = ({ lang, routerQuery: { topic }, tag, blocks, articlesCount }) => {
  const title = renderTag(tag);
  const imageUrl = getTagImageUrl(tag);
  const metaKeywords = [title, localize(`topic.meta_${topic}_keywords`, lang)].join(', ');
  return (
    <>
      <MetaTitle title={title} />
      <MetaImage url={imageUrl ? `${host}${imageUrl}` : DEFAULT_IMAGE} small />
      <MetaDescription description={localize(`topic.meta_other_${topic}_description`, lang)} />
      <MetaKeywords keywords={metaKeywords} />

      <div className={b()}>
        <div className="wir-content-padding">
          <div className={b('topic')}>{getTopicLink({ topic, postfix: 'one' })}</div>
          <div className={b('title')}>{title}</div>
        </div>
        <ArticlesComposition articlesCount={articlesCount} blocks={blocks} />
      </div>
    </>
  );
};

TagPage.propTypes = {
  lang: LangType.isRequired,
  routerQuery: PropTypes.shape({
    topic: PropTypes.oneOf(TOPICS).isRequired,
    tag: PropTypes.string.isRequired,
  }).isRequired,
  tag: TagShape.isRequired,
  blocks: PropTypes.arrayOf(ArticlesArray).isRequired,
  articlesCount: PropTypes.number.isRequired,
};

TagPage.getInitialProps = ctx =>
  populateRequest(ctx, ({ query: { tag } }) => tagsActions.fetchArticles(tag));

export default connect(mapStateToProps)(TagPage);
