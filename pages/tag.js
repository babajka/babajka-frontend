import 'styles/pages/tag.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import chunk from 'lodash/chunk';

import ScreenContext from 'components/common/layout/ScreenContext';
import ArticleCard from 'components/articles/cards/ArticleCard';
import Button from 'components/common/Button';
import Text from 'components/common/Text';
import ButtonGroup from 'components/common/ButtonGroup';

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

const BUTTONS = [
  { id: 'load15More' },
  { id: 'load30More' },
  { id: 'load60More' },
  { id: 'loadAll' },
];

const TagArticlesBlock = ({ articles, invert = false }) => {
  const { asymmetricalBlock, threeBlock1, symmetricalBlock, threeBlock2 } = articles;

  return (
    <ScreenContext.Consumer>
      {({ screen }) => (
        <>
          <div className="tag-page__two-asymmetrical">
            <div className="tag-page__card tag-page__card--first">
              <ArticleCard
                {...asymmetricalBlock[0]}
                size={{ ...CARD_SIZE, [DESKTOP]: invert ? 'square-m' : 'l' }[screen]}
              />
            </div>
            <div className="tag-page__card tag-page__card--second">
              <ArticleCard
                {...asymmetricalBlock[1]}
                size={{ ...CARD_SIZE, [DESKTOP]: invert ? 'l' : 'square-m' }[screen]}
              />
            </div>
          </div>
          <div className="tag-page__three">
            {threeBlock1.map(article => (
              <div key={article.id} className="tag-page__card">
                <ArticleCard {...article} size={{ ...CARD_SIZE, [DESKTOP]: 'square-s' }[screen]} />
              </div>
            ))}
          </div>
          <div className="tag-page__two-symmetrical">
            {symmetricalBlock.map(article => (
              <div key={article.id} className="tag-page__card">
                <ArticleCard {...article} size={{ ...CARD_SIZE, [DESKTOP]: 'm' }[screen]} />
              </div>
            ))}
          </div>
          <div className="tag-page__three">
            {threeBlock2.map(article => (
              <div key={article.id} className="tag-page__card">
                <ArticleCard {...article} size={{ ...CARD_SIZE, [DESKTOP]: 'square-s' }[screen]} />
              </div>
            ))}
          </div>
        </>
      )}
    </ScreenContext.Consumer>
  );
};

const mapStateToProps = (state, { lang }) => tagsSelectors.getByBlocks(state, lang);

class TagPage extends Component {
  static propTypes = {
    routerQuery: PropTypes.shape({
      topic: PropTypes.oneOf(TOPICS).isRequired,
      tag: PropTypes.string.isRequired,
    }).isRequired,
    tag: TagShape.isRequired,
    blocks: PropTypes.arrayOf(ArticlesArray).isRequired,
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
      blocks,
    } = this.props;

    return (
      <div className="tag-page">
        <div className="tag-page__header">
          <div className="tag-page__topic">{getTopicLink({ topic, postfix: 'one' })}</div>
          <div>
            <div className="tag-page__title">{renderTag(tag)}</div>
          </div>
        </div>
        {chunk(blocks, 2).map(([first, second]) => (
          <>
            <TagArticlesBlock articles={first} />
            {second && <TagArticlesBlock articles={second} invert />}
          </>
        ))}
        <ButtonGroup>
          {BUTTONS.map(({ id }) => (
            <Button key={id}>
              <Text id={`common.${id}`} />
            </Button>
          ))}
        </ButtonGroup>
      </div>
    );
  }
}

export default connect(mapStateToProps)(TagPage);
