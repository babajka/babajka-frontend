import React from 'react';
import classNames from 'classnames';

import { IMAGE_CLASS_BY_DIR, defaultWrappers } from 'components/common/Editor/config';

const imageRenderer = (children, { data, keys }) =>
  children.map((child, index) => (
    <figure className={classNames('graf graf--figure', IMAGE_CLASS_BY_DIR[data[index].direction])}>
      <div key={keys[index]}>
        <div className="aspectRatioPlaceholder is-locked">
          <div style={{ paddingBottom: '100%' }} className="aspect-ratio-fill" />
          <img alt={children} src={data[index].url} className="graf-image" />
        </div>
        <figcaption className="imageCaption">
          <span>{child}</span>
        </figcaption>
      </div>
    </figure>
  ));

const linkRenderer = (children, data, { key }) => (
  <a key={key} href={data.url}>
    {children}
  </a>
);

const renderers = {
  inline: {
    // The key passed here is just an index based on rendering order inside a block
    BOLD: (children, { key }) => (
      <strong className="graf--bold" key={key}>
        {children}
      </strong>
    ),
    ITALIC: (children, { key }) => (
      <em className="graf--italic" key={key}>
        {children}
      </em>
    ),
    UNDERLINE: (children, { key }) => <u key={key}>{children}</u>,
    CODE: (children, { key }) => (
      <span className="graf--code" key={key}>
        {children}
      </span>
    ),
  },
  blocks: {
    image: imageRenderer,
  },
  entities: {
    LINK: linkRenderer,
  },
};

defaultWrappers.forEach(({ className, block, element, render }) => {
  renderers.blocks[block] = (children, params) => {
    if (render) {
      return render({ className, children, params });
    }
    return React.createElement(element, { className }, children);
  };
});

export default renderers;
