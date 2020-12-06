import styles from 'styles/pages/admin/articles.module.scss';

import React, { useState } from 'react';
import { connect } from 'react-redux';
import bem from 'bem-css-modules';
import parseISO from 'date-fns/parseISO';

import Button from 'components/common/Button';
import Link from 'components/common/Link';
import Table, { styles as tableStyles } from 'components/common/Table';
import Image from 'components/common/Image';
import Clickable from 'components/common/Clickable';
import ExternalLink from 'components/common/ExternalLink';
import withAdmin from 'components/hoc/withAdmin';
import Dispatcher from 'lib/components/Dispatcher';

import { ArticlesArray } from 'utils/customPropTypes';
import { adminArticlesActions, adminArticlesSelectors } from 'redux/ducks/admin/articles';
import { populateRequest } from 'utils/request';
import { renderNodeList, formatDate } from 'utils/formatters';
import { getTagLink } from 'utils/tags';
import { getArticleBaseUrl } from 'utils/fibery';
import { ArticleTypeIcon } from 'utils/ui';

import { ROUTES_NAMES } from 'routes';
import { DATETIME_FORMAT } from 'constants';

const b = bem(styles);
const bTable = bem(tableStyles);

const mapStateToProps = (state, { lang }) => ({
  articles: adminArticlesSelectors.getAll(state, lang),
});

const ARTICLE_COLS = [
  {
    id: 'images',
    title: 'Вокладка',
    render: ({ value: { horizontal: image } }) => {
      return (
        image && (
          <Image
            className={bTable('cover-thumbnail')}
            alt="вокладка матэрыяла"
            sourceSizes={[200]}
            sizes="200"
            baseUrl={image}
          />
        )
      );
    },
  },
  {
    id: 'title',
    title: 'Назва',
    className: bTable('font', { size: 'large' }),
    render: ({ value, row: { slug, type } }) => (
      <Link route={ROUTES_NAMES.article} params={{ slug }}>
        <ArticleTypeIcon className={bTable('interactive-icon')} type={type} />
        {value}
      </Link>
    ),
    nowrap: ({ title }) => title.length < 20,
  },
  {
    id: 'actions',
    title: 'Дзеянні',
    className: bTable('column-actions'),
    render: ({ row: { fiberyPublicId }, index }) => {
      const url = getArticleBaseUrl(fiberyPublicId);
      return (
        <>
          <div>
            <ExternalLink href={url}>Рэдагаваць</ExternalLink>
          </div>
          <div>
            <Dispatcher action={adminArticlesActions.updateArticle}>
              {({ onDispatch, pending }) => (
                <Clickable linkStyle onClick={() => onDispatch(url, index)} disabled={pending}>
                  {pending ? '...' : 'Абнавіць'}
                </Clickable>
              )}
            </Dispatcher>
          </div>
        </>
      );
    },
  },
  {
    id: 'subtitle',
    title: 'Апісанне',
    className: bTable('font', { size: 'small' }),
    formatter: text => `${text.slice(0, 100)}...`,
  },
  {
    id: 'tagsByTopic',
    title: 'Тэгі',
    className: bTable('font', { size: 'small' }),
    formatter: tagsByTopic => {
      const tags = Object.values(tagsByTopic).reduce((acc, cur) => acc.concat(cur), []);
      return renderNodeList(
        tags.map(tag => getTagLink({ tag })),
        <br />
      );
    },
  },
  {
    id: 'publishAt',
    title: 'Час публікацыі',
    formatter: v => v && formatDate(parseISO(v), DATETIME_FORMAT),
    render: ({ value }) => value || 'Не запланавана (чарнавік)',
  },
  {
    id: 'metadata.updatedAt',
    title: 'Апошняе абнаўленне',
    formatter: v => formatDate(v, DATETIME_FORMAT),
  },
  {
    id: 'metrics',
    title: 'Прагляды (Яндэкс)',
  },
];

const AdminArticlesPage = ({ articles }) => {
  const [previewUrl, setUrl] = useState('');
  return (
    <div>
      <div>
        <input
          className={b('fibery-preview-input')}
          placeholder="Fibery-спасылка на матэрыял для папярэдняга прагляду"
          type="text"
          value={previewUrl}
          onChange={({ target }) => setUrl(target.value)}
        />{' '}
        {previewUrl && (
          <Link
            route={ROUTES_NAMES.admin.preview}
            params={{ url: encodeURIComponent(previewUrl) }}
            target="_blank"
          >
            <Button className={b('fibery-preview-button')} highlighted>
              Адкрыць перадпрагляд
            </Button>
          </Link>
        )}
      </div>
      <br />
      <div>
        Усяго матэрыялаў на сайце: <b>{articles.length}</b>
      </div>
      <br />
      <Table className={bTable()} rows={articles} cols={ARTICLE_COLS} />
    </div>
  );
};

AdminArticlesPage.propTypes = {
  articles: ArticlesArray.isRequired,
};

AdminArticlesPage.getInitialProps = ctx => populateRequest(ctx, adminArticlesActions.fetchAll);

export default withAdmin(connect(mapStateToProps)(AdminArticlesPage));
