import React, { useState } from 'react';
import { connect } from 'react-redux';

import Link from 'components/common/Link';
import Table from 'components/common/Table';
import Clickable from 'components/common/Clickable';
import ExternalLink from 'components/common/ExternalLink';
import withAdmin from 'components/hoc/withAdmin';
import Dispatcher from 'lib/components/Dispatcher';

import { ArticlesArray } from 'utils/customPropTypes';
import { adminArticlesActions, adminArticlesSelectors } from 'redux/ducks/admin/articles';
import { populateRequest } from 'utils/request';
import { formatDate, optional, renderNodeList } from 'utils/formatters';
import { getTagLink } from 'utils/tags';
import { getArticleBaseUrl } from 'utils/fibery';

import { ROUTES_NAMES } from 'routes';
import { DATETIME_FORMAT } from 'constants';

const mapStateToProps = (state, { lang }) => ({
  articles: adminArticlesSelectors.getAll(state, lang),
});

const ARTICLE_COLS = [
  {
    id: 'title',
    render: ({ value, row: { slug } }) => (
      <Link route={ROUTES_NAMES.article} params={{ slug }}>
        {value}
      </Link>
    ),
    nowrap: ({ title }) => title.length < 30,
  },
  {
    id: 'type',
  },
  {
    id: 'subtitle',
    formatter: text => `${text.slice(0, 100)}...`,
  },
  {
    id: 'tagsByTopic',
    title: 'Tags',
    formatter: tagsByTopic => {
      const tags = Object.values(tagsByTopic).reduce((acc, cur) => acc.concat(cur), []);
      return renderNodeList(tags.map(tag => getTagLink({ tag })), <br />);
    },
  },
  {
    id: 'status',
    prop: 'published',
    render: ({ value }) => (value ? 'Published' : 'Draft'),
  },
  {
    id: 'publishAt',
    title: 'Publication Date',
    formatter: optional(formatDate, 'Not Planned'),
  },
  {
    id: 'metadata.updatedAt',
    title: 'Updated At',
    formatter: v => formatDate(v, DATETIME_FORMAT),
  },
  {
    id: 'actions',
    render: ({ row: { fiberyPublicId }, index }) => {
      const url = getArticleBaseUrl(fiberyPublicId);
      return (
        <>
          <div>
            <ExternalLink href={url}>Edit</ExternalLink>
          </div>
          <div>
            <Dispatcher action={adminArticlesActions.updateArticle}>
              {({ onDispatch, pending }) => (
                <Clickable linkStyle onClick={() => onDispatch(url, index)} disabled={pending}>
                  {pending ? '...' : 'Update'}
                </Clickable>
              )}
            </Dispatcher>
          </div>
        </>
      );
    },
  },
];

const AdminArticlesPage = ({ articles }) => {
  const [previewUrl, setUrl] = useState('');
  return (
    <div>
      <div>
        <input
          placeholder="Paste Fibery Url"
          type="text"
          value={previewUrl}
          onChange={({ target }) => setUrl(target.value)}
        />{' '}
        {previewUrl && (
          <Link
            className="button"
            route={ROUTES_NAMES.admin.preview}
            params={{ url: encodeURIComponent(previewUrl) }}
            target="_blank"
          >
            Open Preview
          </Link>
        )}
      </div>
      <br />
      <Table rows={articles} cols={ARTICLE_COLS} />
    </div>
  );
};

AdminArticlesPage.propTypes = {
  articles: ArticlesArray.isRequired,
};

AdminArticlesPage.getInitialProps = ctx => populateRequest(ctx, adminArticlesActions.fetchAll);

export default withAdmin(connect(mapStateToProps)(AdminArticlesPage));
