import 'styles/pages/tag.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ScreenContext from 'components/common/layout/ScreenContext';
import ArticleCard from 'components/articles/cards/ArticleCard';

import { tagsActions, tagsSelectors } from 'redux/ducks/tags';
import { ArticlesArray, TagShape } from 'utils/customPropTypes';
import { populateRequest } from 'utils/request';
import { renderTag, getTopicLink } from 'utils/tags';
import { TOPICS } from 'constants';
import { SCREENS } from 'constants/styles';

const { DESKTOP, MOBILE, TABLET, TABLET_LARGE, TOUCH } = SCREENS;

const CARD_SIZE = {
  [TABLET_LARGE]: 'l',
  [TABLET]: 'l',
  [TOUCH]: 'm',
  [MOBILE]: 'square-s',
};

const mapStateToProps = (state, { lang }) => tagsSelectors.getData(state, lang);

class TagPage extends Component {
  static propTypes = {
    routerQuery: PropTypes.shape({
      topic: PropTypes.oneOf(TOPICS).isRequired,
      tag: PropTypes.string.isRequired,
    }).isRequired,
    tag: TagShape.isRequired,
    articles: ArticlesArray.isRequired,
  };

  static getLayoutProps = ({ routerQuery: { topic } }) => ({
    title: `topic.${topic}`,
  });

  static getInitialProps(ctx) {
    const {
      query: { tag },
    } = ctx;
    return populateRequest(ctx, tagsActions.fetchArticles.bind(null, tag));
  }

  render() {
    const {
      routerQuery: { topic },
      tag,
      articles,
    } = this.props;
    const [first, second, ...rest] = articles;
    return (
      <div className="tag-page">
        <div className="tag-page__header">
          <div className="tag-page__topic">{getTopicLink({ topic, postfix: 'one' })}</div>
          <div>
            <div className="tag-page__title">{renderTag(tag)}</div>
          </div>
        </div>
        <ScreenContext.Consumer>
          {({ screen }) => (
            <>
              <div className="tag-page__headline">
                <div className="tag-page__card tag-page__card--first">
                  <ArticleCard {...first} size={{ ...CARD_SIZE, [DESKTOP]: 'l' }[screen]} />
                </div>
                <div className="tag-page__card tag-page__card--second">
                  <ArticleCard {...second} size={{ ...CARD_SIZE, [DESKTOP]: 'square-m' }[screen]} />
                </div>
              </div>
              <div className="tag-page__other">
                {rest.map(article => (
                  <div key={article.id} className="tag-page__card">
                    <ArticleCard
                      {...article}
                      size={{ ...CARD_SIZE, [DESKTOP]: 'square-s' }[screen]}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </ScreenContext.Consumer>
      </div>
    );
  }
}

export default connect(mapStateToProps)(TagPage);
