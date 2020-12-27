import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import bem from 'bem-css-modules';

import { TopicSlug, ThemeType } from 'utils/customPropTypes';
import { ROUTES_NAMES } from 'routes';
import { TOPIC } from 'constants/misc';

import Image from 'components/common/Image';

import { colorLooksBlack, colorLooksWhite } from 'utils/ui';

import CardWrapper, { SIZES } from './CardWrapper';

import { buildBlockContextStyles } from './auto';

import styles from './tagCard.module.scss';

const b = bem(styles);

const TagCard = ({ slug, topicSlug, content, size, blockContext }) => {
  const { theme, color = '#ffffff' } = content;

  const wrapperProps = {
    size,
    linkProps: {
      route: ROUTES_NAMES.tag,
      params: {
        topic: topicSlug,
        tag: slug,
      },
    },
    theme,
    color,
    blockContextClass: buildBlockContextStyles(blockContext, styles),
  };

  if (topicSlug === TOPIC.locations) {
    const { title, image } = content;
    return (
      <CardWrapper {...wrapperProps} image={image} alt={title} className={cn(b(), b('location'))}>
        <div className={b('location-title')}>{title}</div>
      </CardWrapper>
    );
  }

  if (topicSlug === TOPIC.personalities) {
    const { name, description, subtitle, image } = content;
    return (
      <CardWrapper
        {...wrapperProps}
        className={cn(
          b(),
          b('person', {
            'theme-black': colorLooksBlack(color),
            'theme-white': colorLooksWhite(color),
          })
        )}
      >
        {' '}
        <div className={b('person-cover-container')}>
          {image && (
            <Image
              className={b('person-cover')}
              alt={name}
              title={name}
              sourceSizes={[390]}
              baseUrl={image}
              mode="x"
            />
          )}
        </div>
        <div className={b('person-content')}>
          <div className={b('person-subtitle')}>{subtitle}</div>
          <div className={b('person-title')}>{name}</div>
          <div className={b('person-description')}>{description}</div>
        </div>
      </CardWrapper>
    );
  }
  return null;
};

TagCard.propTypes = {
  slug: PropTypes.string.isRequired,
  size: PropTypes.oneOf(SIZES),
  blockContext: PropTypes.arrayOf(PropTypes.string),
  topicSlug: TopicSlug.isRequired,
  content: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string.isRequired,
    color: PropTypes.string,
    theme: ThemeType,
  }).isRequired,
};

TagCard.defaultProps = {
  size: 'auto',
  blockContext: [],
};

export default TagCard;
