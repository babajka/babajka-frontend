// https://github.com/ProseMirror/prosemirror-schema-basic/blob/7d8502f2cb89659c543c7b554d67d7db8c7c63c4/src/schema-basic.js

import React, { Fragment, createElement } from 'react';
import identity from 'lodash/identity';

import ExternalLink from 'components/common/ExternalLink';
import VideoPlayer from 'components/common/VideoPlayer';
import parseYoutubeUrl from 'lib/utils/parseYoutubeUrl';

import { getUrl } from './utils';

const returnNull = () => null;

const renderContent = content => {
  if (!Array.isArray(content)) {
    return null;
  }
  return content.map(({ type, ...params }, key) => {
    // TEMP:
    // eslint-disable-next-line no-use-before-define
    if (!__PROD__ && !RENDERERS[type]) {
      // eslint-disable-next-line no-console
      console.log('Missed renderer: ', type);
    }
    // eslint-disable-next-line no-use-before-define
    const render = RENDERERS[type] || returnNull;
    return render({ key, ...params });
  });
};

const MARKS = {
  link: (node, { attrs: { href, title } }) => {
    const videoId = parseYoutubeUrl(href);
    if (videoId) {
      return <VideoPlayer videoId={videoId} />;
    }

    return (
      <ExternalLink href={href} title={title}>
        {node}
      </ExternalLink>
    );
  },
  strong: node => <strong>{node}</strong>,
  em: node => <i>{node}</i>,
};

const addMarks = (text, marks) => {
  if (!Array.isArray(marks)) {
    return text;
  }
  return marks.reduce((acc, { type, ...params }) => {
    // TEMP:
    if (!__PROD__ && !MARKS[type]) {
      // eslint-disable-next-line no-console
      console.log('Missed mark: ', type);
    }
    const renderMark = MARKS[type] || identity;
    return renderMark(acc, params);
  }, text);
};

const RENDERERS = {
  // debug: (...params) => {
  //   console.log(params)
  //   return null;
  // },
  blockquote: ({ key, content }) => <blockquote key={key}>{renderContent(content)}</blockquote>,
  hard_break: ({ key }) => <span key={key} className="article-page-content__hard" />,
  heading: ({ key, attrs: { level }, content }) =>
    createElement(`h${level}`, { key }, renderContent(content)),
  image: ({ key, attrs: { alt, src, title } }) => (
    <span key={key} className="article-image article-page-content__right-element">
      <img className="article-image__image" alt={alt} src={getUrl(src)} />
      <span className="article-image__caption">{title}</span>
    </span>
  ),
  paragraph: ({ key, attrs = {}, content }) => {
    return <p key={attrs.guid || key}>{renderContent(content)}</p>;
  },
  text: ({ key, text, marks }) => <Fragment key={key}>{addMarks(text, marks)}</Fragment>,

  table: ({ key, content }) => (
    <table className="article-table" key={key}>
      <tbody>{renderContent(content)}</tbody>
    </table>
  ),
  table_row: ({ key, content }) => <tr key={key}>{renderContent(content)}</tr>,
  table_cell: ({ key, content, attrs: { colspan, rowspan, colwidth /* background */ } }) => {
    return (
      <td key={key} colSpan={colspan} rowSpan={rowspan} colwidth={colwidth}>
        {renderContent(content)}
      </td>
    );
  },

  bullet_list: ({ key, content }) => {
    return (
      <ul key={key} className="article-unordered">
        {renderContent(content)}
      </ul>
    );
  },
  list_item: ({ key, content }) => (
    <li key={key} className="article-unordered__item">
      {renderContent(content)}
    </li>
  ),
};

export default renderContent;
