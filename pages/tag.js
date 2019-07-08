import 'styles/pages/tag.scss';

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import chunk from 'lodash/chunk';

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

// const BUTTONS = [
//   { id: 'load15More' },
//   { id: 'load30More' },
//   { id: 'load60More' },
//   { id: 'loadAll' },
// ];

const LEVEL_SIZES = {
  c: 3,
  d: 2,
};

const LEVEL_DESKTOP_CARD_SIZES = {
  c: 'square-s',
  d: 'm',
};

const TagLevel = ({ articles, screen, type }) => {
  const size = { ...CARD_SIZE, [DESKTOP]: LEVEL_DESKTOP_CARD_SIZES[type] }[screen];
  const incomplete = articles.length < LEVEL_SIZES[type];
  return (
    <div className={`tag-page__level-${type}`}>
      {articles.map(article => (
        <div key={article.id} className="tag-page__card">
          <ArticleCard {...article} size={size} />
        </div>
      ))}
      {incomplete && (
        <div className="tag-page__card">
          <div className={`size-${size}`} />
        </div>
      )}
    </div>
  );
};

const TagArticlesBlock = ({ block, invert, screen }) => {
  const [levelB, levelC1, levelD, levelC2] = block;

  if (levelB.length < 2) {
    const [levelA] = levelB;
    return (
      <div className="tag-page__level-a">
        <div className="tag-page__card">
          <ArticleCard {...levelA} size={{ ...CARD_SIZE, [DESKTOP]: 'xxl' }[screen]} />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="tag-page__level-b">
        <div className="tag-page__card tag-page__card--first">
          <ArticleCard
            {...levelB[0]}
            size={{ ...CARD_SIZE, [DESKTOP]: invert ? 'square-m' : 'l' }[screen]}
          />
        </div>
        <div className="tag-page__card tag-page__card--second">
          <ArticleCard
            {...levelB[1]}
            size={{ ...CARD_SIZE, [DESKTOP]: invert ? 'l' : 'square-m' }[screen]}
          />
        </div>
      </div>
      <TagLevel type="c" articles={levelC1} screen={screen} />
      <TagLevel type="d" articles={levelD} screen={screen} />
      <TagLevel type="c" articles={levelC2} screen={screen} />
    </>
  );
};

const BlockShape = PropTypes.arrayOf(ArticlesArray);

TagArticlesBlock.propTypes = {
  block: BlockShape.isRequired,
  screen: PropTypes.oneOf(Object.values(SCREENS)).isRequired,
  invert: PropTypes.bool,
};

TagArticlesBlock.defaultProps = {
  invert: false,
};

const mapStateToProps = (state, { lang }) => tagsSelectors.getData(state, lang);

class TagPage extends Component {
  static propTypes = {
    routerQuery: PropTypes.shape({
      topic: PropTypes.oneOf(TOPICS).isRequired,
      tag: PropTypes.string.isRequired,
    }).isRequired,
    tag: TagShape.isRequired,
    blocks: PropTypes.arrayOf(BlockShape).isRequired,
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
        <ScreenContext.Consumer>
          {({ screen }) =>
            chunk(blocks, 2).map(([first, second], index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Fragment key={index}>
                <TagArticlesBlock block={first} screen={screen} />
                {second && <TagArticlesBlock block={second} screen={screen} invert />}
              </Fragment>
            ))
          }
        </ScreenContext.Consumer>
        {/* FIXME */}
        {/* <ButtonGroup>
          {BUTTONS.map(({ id }) => (
            <Button key={id}>
              <Text id={`common.${id}`} />
            </Button>
          ))}
        </ButtonGroup> */}
      </div>
    );
  }
}

export default connect(mapStateToProps)(TagPage);
