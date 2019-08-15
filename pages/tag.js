import 'styles/pages/tag.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FeaturedBlock from 'components/articles/blocks/FeaturedBlock';
import TagPageBlockB from 'components/articles/blocks/TagPageBlockB';
import TagPageBlockCD from 'components/articles/blocks/TagPageBlockCD';

import { tagsActions, tagsSelectors } from 'redux/ducks/tags';
import { ArticlesArray, TagShape } from 'utils/customPropTypes';
import { populateRequest } from 'utils/request';
import { renderTag, getTopicLink } from 'utils/tags';

import { TOPICS } from 'constants';

const BlockShape = PropTypes.arrayOf(ArticlesArray);

const PAGE_LEVEL_ORDER = ['B1', 'C', 'D', 'C', 'B2', 'C', 'D', 'C'];

const TagArticles = ({ blocks }) => {
  const data = blocks[0];

  // TODO: To verify this conditional statement is correct.
  if (data[1].length === 0) {
    const articleData = data[0][0];
    const { articleId } = articleData;
    return (
      <>
        <FeaturedBlock
          // This is a workaround in order to use FeaturedBlock as it is.
          block={{ frozen: true, articleId }}
          data={{ articles: { [articleId]: articleData } }}
        />
      </>
    );
  }

  return (
    <>
      {data.map((_, index) => {
        const levelName = PAGE_LEVEL_ORDER[index % PAGE_LEVEL_ORDER.length];
        return {
          B1: <TagPageBlockB articles={data[index]} layout="large-left" />,
          B2: <TagPageBlockB articles={data[index]} layout="large-right" />,
          C: <TagPageBlockCD articles={data[index]} layout="row-of-three" />,
          D: <TagPageBlockCD articles={data[index]} layout="row-of-two" />,
        }[levelName];
      })}
    </>
  );
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

  static getInitialProps = ctx =>
    populateRequest(ctx, ({ query: { tag } }) => tagsActions.fetchArticles(tag));

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

        <TagArticles blocks={blocks} />

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
