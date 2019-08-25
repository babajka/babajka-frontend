// https://github.com/ProseMirror/prosemirror-schema-basic/blob/7d8502f2cb89659c543c7b554d67d7db8c7c63c4/src/schema-basic.js

import React, { Fragment } from 'react';
import identity from 'lodash/identity';

import ExternalLink from 'components/common/ExternalLink';
import { FIBERY_HOST } from 'constants';

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
  link: (node, { attrs: { href, title } }) => (
    <ExternalLink href={href} title={title}>
      {node}
    </ExternalLink>
  ),
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
  hard_break: ({ key }) => <br key={key} />,
  heading: ({ key, attrs: { level }, content }) =>
    React.createElement(`h${level}`, { key }, renderContent(content)),
  image: ({ key, attrs: { alt, src, title } }) => (
    <img key={key} alt={alt} title={title} src={`${FIBERY_HOST}${src}`} />
  ),
  paragraph: ({ key, attrs = {}, content }) => (
    <p key={attrs.guid || key}>{renderContent(content)}</p>
  ),
  text: ({ key, text, marks }) => <Fragment key={key}>{addMarks(text, marks)}</Fragment>,

  table: ({ key, content }) => (
    <table key={key}>
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
};

export default renderContent;
