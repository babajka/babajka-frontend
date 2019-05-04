import 'styles/src/blocks/articlesByTag2.scss';

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Text from 'components/common/Text';
import ScreenContext from 'components/common/layout/ScreenContext';
import LinkWrapper from 'components/common/ui/LinkWrapper';
import ArticleCard from 'components/articles/cards/ArticleCard';

import { renderTag } from 'utils/tags';

import { SCREENS } from 'constants/styles';
import { TOPIC } from 'constants/home';

const { DESKTOP, MOBILE, TABLET, TABLET_LARGE, TOUCH } = SCREENS;

const CARD_SIZE = {
  [DESKTOP]: 'square-m',
  [TABLET_LARGE]: 'l',
  [TABLET]: 'square-m',
  [TOUCH]: 'm',
  [MOBILE]: 'square-s',
};

const ArticlesByTag2 = ({ block, data }) => {
  const { tagId, articlesIds } = block;
  const { tags, articles } = data;
  const [first, second] = articlesIds.map(id => articles[id]);
  const { topic, content } = tags[tagId];
  const isBrand = topic.slug === TOPIC.brand;

  return (
    <div className="block block__with-background articles-by-tag-2">
      <div
        className={cn('articles-by-tag-2__labels', {
          'articles-by-tag-2__labels--right': isBrand,
        })}
      >
        <div className="articles-by-tag-2__top-mobile-labels">
          {isBrand && <img src={content.image} alt={content.title} width="120" />}
          <div className="articles-by-tag-2__label">
            Папулярная штука:
            <LinkWrapper dark>{renderTag(tags[tagId])}</LinkWrapper>
          </div>
        </div>
        <div className="articles-by-tag-2__label articles-by-tag-2__bottom-desktop-label">
          <LinkWrapper dark>
            <Text id={`topic.${topic.slug}_all_mainPage`} />
          </LinkWrapper>
        </div>
      </div>

      <div className="articles-by-tag-2__cards">
        <ScreenContext.Consumer>
          {({ screen }) => (
            <div className="articles-by-tag-2__card-1">
              <ArticleCard {...first} size={CARD_SIZE[screen]} />
            </div>
          )}
        </ScreenContext.Consumer>

        <div className="articles-by-tag-2__card-2">
          <ArticleCard {...second} size="square-m" />
        </div>
      </div>

      <div className="articles-by-tag-2__bottom-labels">
        <div className="articles-by-tag-2__label articles-by-tag-2__bottom-mobile-label">
          <LinkWrapper dark>LINK3</LinkWrapper>
        </div>
      </div>
    </div>
  );
};

ArticlesByTag2.propTypes = {
  block: PropTypes.shape({
    tagId: PropTypes.string.isRequired,
    articlesIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  data: PropTypes.shape({}).isRequired,
};

export default ArticlesByTag2;
