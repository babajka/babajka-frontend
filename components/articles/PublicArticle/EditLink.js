import React from 'react';
import cn from 'classnames';

import Link from 'components/common/Link';
import Text from 'components/common/Text';
import { ROUTES_NAMES } from 'routes';

const EditLink = ({ className, children, slug, articleLocale }) => (
  <Text
    id="article.edit-article"
    render={t => (
      <Link route={ROUTES_NAMES.editArticle} params={{ slug, mode: 'edit', articleLocale }}>
        <a className={cn('icon-button button', className)} title={t}>
          {children}
        </a>
      </Link>
    )}
  />
);

export default EditLink;
