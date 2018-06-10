import React from 'react';
import classNames from 'classnames';

import { defaultWrappers } from 'components/common/Editor/config';

const imageRenderer = (children, { data, keys }) =>
  children.map((child, index) => (
    <figure
      className={classNames('graf graf--figure', {
        'graf--layoutOutsetLeft': data[index].direction === 'left',
        'sectionLayout--fullWidth': data[index].direction === 'wide',
        'graf--layoutFillWidth': data[index].direction === 'fill',
      })}
    >
      <div key={keys[index]}>
        <div className="aspectRatioPlaceholder is-locked">
          <div
            style={{ paddingBottom: `${data[index].aspect_ratio.ratio}%` }}
            className="aspect-ratio-fill"
          />
          <img
            alt={children}
            src={data[index].url}
            height={data[index].aspect_ratio.height}
            width={data[index].aspect_ratio.width}
            className="graf-image"
          />
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
