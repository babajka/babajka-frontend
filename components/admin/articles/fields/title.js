import React from 'react';
import PropTypes from 'prop-types';

import Link from 'components/common/Link';
import Image from 'components/common/Image';
import { ArticleTypeIcon } from 'utils/ui';

import { ROUTES_NAMES } from 'routes';

import styles from './title.module.scss';

const ArticleTitle = ({ record: { slug, type, title, images: { horizontal } } = {} }) => {
  return (
    <Link route={ROUTES_NAMES.article} params={{ slug }} target="_blank">
      <div className={styles.container}>
        {horizontal && (
          <div>
            <Image
              className={styles.cover}
              alt="вокладка матэрыяла"
              sourceSizes={[90]}
              baseUrl={horizontal}
            />
          </div>
        )}
        <div className={styles.title}>
          <span>
            <ArticleTypeIcon type={type} className={styles.interactiveIcon} />
            {title}
          </span>
        </div>
      </div>
    </Link>
  );
};

ArticleTitle.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  label: PropTypes.string,
  record: PropTypes.object,
};

export default ArticleTitle;
