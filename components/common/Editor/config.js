import React from 'react';

const addBreaklines = children => children.map(child => [child, <br key="item-br" />]);

export const defaultWrappers = [
  {
    className: 'graf--p',
    block: 'unstyled',
    element: 'p',
    render: ({ children, className, params: { keys } }) =>
      children.map((child, index) => (
        <p key={keys[index]} className={className}>
          {child}
        </p>
      )),
  },
  { className: 'graf--h2', block: 'header-one', element: 'h1' },
  { className: 'graf--h3', block: 'header-two', element: 'h2' },
  { className: 'graf--h4', block: 'header-three', element: 'h3' },
  {
    className: 'graf--blockquote',
    block: 'blockquote',
    element: 'blockquote',
    render: ({ className, children }) => (
      <blockquote className={className}>{addBreaklines(children)}</blockquote>
    ),
  },
  {
    className: 'graf--insertunorderedlist',
    block: 'unordered-list-item',
    render: ({ className, children, params: { depth, keys } }) => (
      <ul key={keys[keys.length - 1]} className={`public-DraftStyleDefault-ul ul-level-${depth}`}>
        {children.map((child, index) => (
          <li
            className={`
              graf ${className}
              public-DraftStyleDefault-unorderedListItem
              public-DraftStyleDefault-reset
              public-DraftStyleDefault-depth0
              public-DraftStyleDefault-listLTR
            `}
            key={keys[index]}
          >
            {child}
          </li>
        ))}
      </ul>
    ),
  },
  {
    className: 'graf--insertorderedlist',
    block: 'ordered-list-item',
    render: ({ className, children, params: { depth, keys } }) => (
      <ol key={keys.join('|')} className={`public-DraftStyleDefault-ol ol-level-${depth}`}>
        {children.map((child, index) => (
          <li
            className={`
              graf ${className}
              public-DraftStyleDefault-depth0
              public-DraftStyleDefault-listLTR
            `}
            key={keys[index]}
          >
            {child}
          </li>
        ))}
      </ol>
    ),
  },
  { className: 'graf--code', block: 'code-block', element: 'code' },
  { className: 'graf--bold', block: 'BOLD', element: 'strong' },
  { className: 'graf--italic', block: 'ITALIC', element: 'em' },
];

export const continuousBlocks = [
  'unstyled',
  'blockquote',
  'ordered-list',
  'unordered-list',
  'unordered-list-item',
  'ordered-list-item',
  'code-block',
];

const CHAR_CODES = {
  1: 49,
  2: 50,
  3: 51,
  5: 53,
  a: 65,
  b: 66,
  i: 72,
  k: 75,
};

export const keyCommands = {
  'alt-shift': [{ key: CHAR_CODES.a, cmd: 'add-new-block' }], // not works
  'alt-cmd': [
    { key: CHAR_CODES[1], cmd: 'toggle_block:header-one' },
    { key: CHAR_CODES[2], cmd: 'toggle_block:header-two' },
    { key: CHAR_CODES[3], cmd: 'toggle_block:header-three' },
    { key: CHAR_CODES[5], cmd: 'toggle_block:blockquote' },
  ],
  cmd: [
    { key: CHAR_CODES.b, cmd: 'toggle_inline:BOLD' },
    { key: CHAR_CODES.i, cmd: 'toggle_inline:ITALIC' },
    { key: CHAR_CODES.k, cmd: 'insert:link' }, // not works
  ],
};

export const characterConvertMapping = {
  '> ': 'blockquote',
  '*.': 'unordered-list-item',
  '* ': 'unordered-list-item',
  '- ': 'unordered-list-item',
  '1.': 'ordered-list-item',
  '# ': 'header-one',
  '##': 'header-two',
  '==': 'unstyled',
  '` ': 'code-block',
};
