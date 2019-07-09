import 'styles/pages/article.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { MetaTitle, MetaDescription, MetaImage } from 'components/social/Metatags';
import Link from 'components/common/Link';
import ShareButtons from 'components/social/ShareButtons';

import { publicArticleActions, publicArticleSelectors } from 'redux/ducks/publicArticle';
import { populateRequest } from 'utils/request';
import { ArticleShape } from 'utils/customPropTypes';
import { getTagLink } from 'utils/tags';
import { renderNodeList } from 'utils/formatters';

import { ROUTES_NAMES } from 'routes';

const mapStateToProps = (state, { routerQuery: { slug } }) => ({
  article: publicArticleSelectors.getCurrent(state, slug),
});

class ArticlePage extends Component {
  static propTypes = {
    article: ArticleShape,
    routerQuery: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    article: null,
  };

  static layoutProps = () => ({
    title: 'header.articles',
  });

  static getInitialProps = ctx =>
    populateRequest(ctx, ({ query: { slug } }) => publicArticleActions.fetchBySlug(slug));

  render() {
    const { article } = this.props;
    const { description, covers, tags, title, subtitle, imagePreviewUrl } = article;

    // TODO: think about implementing this logic at backend
    const tagsByTopic = tags.reduce((acc, tag) => {
      const {
        topic: { slug },
      } = tag;
      acc[slug] = acc[slug] || [];
      acc[slug].push(tag);
      return acc;
    }, {});
    const { brands = [], authors = [], ...tagLists } = tagsByTopic;

    return (
      <div>
        <MetaTitle title={title} type="article" />
        <MetaDescription description={subtitle} />
        <MetaImage url={imagePreviewUrl} />
        <div className="article-page">
          <div className="article-page-margins">{description}</div>
          <img className="article-page__cover" src={covers.page} alt={title} />
        </div>
        <div className="article-page-margins article-page__header">
          {/* TODO: hover corresponding image and title simulteneously */}
          {(!!brands.length || !!authors.length) && (
            <div className="article-page__tags">
              {brands.concat(authors).map(({ topic, slug, content }) => (
                <Link
                  key={slug}
                  className="article-page__tag-image-link"
                  route={ROUTES_NAMES.tag}
                  params={{ topic: topic.slug, tag: slug }}
                >
                  <img className="article-page__tag-image" src={content.image} alt={slug} />
                </Link>
              ))}
              <div className="article-page__tag-titles">
                <span>{renderNodeList(brands.map(tag => getTagLink({ tag })))}</span>
                <span>{renderNodeList(authors.map(tag => getTagLink({ tag })))}</span>
              </div>
            </div>
          )}
          <div className="article-page__title">{title}</div>
        </div>
        <div className="article-page-margins">
          <div>There should be content from editor</div>
          <div className="article-page__share">
            <ShareButtons />
          </div>
          <div className="article-page__other-tags">
            {Object.values(tagLists).map(tagList =>
              tagList.map(tag => (
                <div key={tag.slug} className="article-page__other-tag">
                  {getTagLink({ tag })}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ArticlePage);
