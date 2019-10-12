// https://github.com/ProseMirror/prosemirror-schema-basic/blob/7d8502f2cb89659c543c7b554d67d7db8c7c63c4/src/schema-basic.js

import React, { Fragment, createElement } from 'react';
import identity from 'lodash/identity';
import cn from 'classnames';

import Image from 'components/common/Image';
import ExternalLink from 'components/common/ExternalLink';
import VideoPlayer from 'components/common/VideoPlayer';
import parseYoutubeUrl from 'lib/utils/parseYoutubeUrl';

import toString from './toString';
import getMeta, { TYPES } from './parseTableMeta';
import { parseQuote, parseImage } from './utils';

const { TABLE, TABLE_RIGHT, NOTE } = TYPES;

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
    if (videoId && href === node) {
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

const CUSTOM_BLOCKS = {
  [NOTE]: c => <span className="article-note right-element">{renderContent(c)}</span>,
};

const RENDERERS = {
  // debug: (...params) => {
  //   console.log(params)
  //   return null;
  // },
  entity: ({ attrs: { id, typeId } }) => (
    <span key={id} className="right-element">
      <span>TODO: Entiny Element</span>
      {id}, {typeId}
    </span>
  ),
  blockquote: ({ key, content }) => {
    const { quote, author } = parseQuote(toString(content));
    return (
      <blockquote key={key} className="article-quote">
        <div className="article-quote__text">{quote}</div>
        {author && <span className="article-quote__caption">{author}</span>}
      </blockquote>
    );
  },
  hard_break: ({ key }) => <span key={key} className="article-page-content__hard" />,
  heading: ({ key, attrs: { level }, content }) =>
    createElement(`h${level}`, { key }, renderContent(content)),
  image: ({ key, attrs: { alt, src, title } }) => {
    const { url, align } = parseImage(src);
    const right = align === 'right';
    if (right) {
      return (
        <span key={key} className="article-image right-element">
          {right && (
            <ExternalLink href={url}>
              <Image
                className="article-image__image"
                alt={alt}
                sourceSizes={[240]}
                baseUrl={url}
                mode="x"
              />
            </ExternalLink>
          )}
          <span className="article-image__caption">{title}</span>
        </span>
      );
    }
    return (
      <span key={key} className="article-image">
        <img className="article-image__image" src={url} alt={alt} />
        <span className="article-image__caption">{title}</span>
      </span>
    );
  },
  paragraph: ({ key, attrs = {}, content }) => {
    return <p key={attrs.guid || key}>{renderContent(content)}</p>;
  },
  text: ({ key, text, marks }) => <Fragment key={key}>{addMarks(text, marks)}</Fragment>,

  table: ({ key, content }) => {
    const [type, parsed] = getMeta(content);
    if (!type.startsWith(TABLE)) {
      const render = CUSTOM_BLOCKS[type];
      if (!__PROD__ && !render) {
        // eslint-disable-next-line no-console
        console.log('Missed custom renderer: ', type);
        return null;
      }
      return render(parsed);
    }
    return (
      <table
        className={cn('article-table', {
          'right-element': type === TABLE_RIGHT,
        })}
        key={key}
      >
        <tbody>{renderContent(parsed)}</tbody>
      </table>
    );
  },
  table_row: ({ key, content }) => <tr key={key}>{renderContent(content)}</tr>,
  table_cell: ({ key, content, attrs: { colspan, rowspan, /* colwidth, */ background } }) => {
    const el = background ? 'th' : 'td';
    return React.createElement(
      el,
      { key, colSpan: colspan, rowSpan: rowspan },
      renderContent(content)
    );
  },

  bullet_list: ({ key, content }) => {
    return (
      <ul key={key} className="article-unordered">
        {renderContent(content)}
      </ul>
    );
  },
  ordered_list: ({ key, content }) => {
    return (
      <ol key={key} className="article-ordered">
        {renderContent(content)}
      </ol>
    );
  },
  list_item: ({ key, content }) => <li key={key}>{renderContent(content)}</li>,
};

export default renderContent;
