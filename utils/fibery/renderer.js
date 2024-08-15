// https://github.com/ProseMirror/prosemirror-schema-basic/blob/7d8502f2cb89659c543c7b554d67d7db8c7c63c4/src/schema-basic.js

import React, { Fragment, createElement } from 'react';
import dynamic from 'next/dynamic';
import cn from 'classnames';
import identity from 'lodash/identity';

import Image from 'components/common/Image';
import ExternalLink from 'components/common/ExternalLink';

import VideoPlayer from 'components/common/VideoPlayer';
import parseYoutubeUrl from 'lib/utils/parseYoutubeUrl';

import CoubPlayer from 'components/common/CoubPlayer';
import parseCoubUrl from 'lib/utils/parseCoubUrl';

import AudioPlayer from 'components/common/AudioPlayer';
import parseYMPlaylistUrl from 'lib/utils/parseYMPlaylistUrl';

import toString from './toString';
import { getTableMeta, traverseTable, traverseTableRowByRow, TYPES } from './parseTable';
import { parseQuote, parseImage } from './utils';

import styles from './renderer.module.scss';

const { TABLE, TABLE_RIGHT, NOTE, POEM, SPLIT, TIMELINE, CAROUSEL } = TYPES;

const returnNull = () => null;

const renderContent = (content, overrides = {}) => {
  if (!Array.isArray(content)) {
    return null;
  }
  // TEMP:
  // eslint-disable-next-line no-use-before-define
  const renderers = { ...RENDERERS, ...overrides };
  return content.map(({ type, ...params }, key) => {
    if (!process.env.isProd && !renderers[type]) {
      // eslint-disable-next-line no-console
      console.log('Missing renderer: ', type);
    }

    const render = renderers[type] || returnNull;
    return render({ key, ...params }, overrides);
  });
};

const MARKS = {
  link: (node, { attrs: { href, title } }) => {
    const videoId = parseYoutubeUrl(href);
    if (videoId && href === node) {
      return <VideoPlayer videoId={videoId} />;
    }

    const coubId = parseCoubUrl(href);
    if (coubId && href === node) {
      return <CoubPlayer coubId={coubId} />;
    }

    const ymPlaylist = parseYMPlaylistUrl(href);
    if (ymPlaylist?.playlistUsername && ymPlaylist?.playlistId) {
      return (
        <AudioPlayer
          playlistUsername={ymPlaylist.playlistUsername}
          playlistId={ymPlaylist.playlistId}
        />
      );
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
    if (!process.env.isProd && !MARKS[type]) {
      // eslint-disable-next-line no-console
      console.log('Missing mark: ', type);
    }
    const renderMark = MARKS[type] || identity;
    return renderMark(acc, params);
  }, text);
};

const TABLE_CLASS_BY_TYPE = {
  [TABLE]: styles['article-table'],
  [TABLE_RIGHT]: cn(styles['article-table'], styles['right-element']),
  [NOTE]: cn(styles['article-note'], styles['right-element']),
  [SPLIT]: styles['article-split'],
};

const CUSTOM_RENDERER = {
  [CAROUSEL]: content => {
    const ImageSlider = dynamic(() => import('components/common/ui/ImageSlider'));
    const data = traverseTable(content, true);
    const { images, description } = data.reduce(
      (acc, cur) => {
        if (cur?.type === 'image') {
          acc.images.push(cur.attrs);
        }
        if (typeof cur === 'string') {
          acc.description = cur;
        }
        return acc;
      },
      { images: [] }
    );
    return <ImageSlider images={images} description={description} />;
  },
  [POEM]: poemContent => {
    const tableCell = {
      table_cell: ({ content }) => renderContent(content),
    };
    return (
      <div className={styles['article-poem']}>
        {renderContent(poemContent, {
          table_row: ({ key, content }) => <div key={key}>{renderContent(content, tableCell)}</div>,
        })}
      </div>
    );
  },
  [TIMELINE]: timelineContent => {
    const data = traverseTableRowByRow(timelineContent, true);
    const timelineEvents = data.map(([date, image, text, annotation]) => {
      const timelineEvent = {
        date: date.reduce((acc, cur) => {
          if (typeof cur !== 'string') {
            return acc;
          }
          return acc.concat(cur);
        }, ''),
        text: text.map(p => {
          if (typeof p !== 'string') {
            return '';
          }
          return <div>{p}</div>;
        }),
        annotation: annotation.map(p => {
          if (typeof p !== 'string') {
            return '';
          }
          return <div>{p}</div>;
        }),
      };
      if (image && image.length > 0 && image[0].type === 'image') {
        const { url } = parseImage(image[0].attrs.src);
        timelineEvent.imageUrl = url;
      }
      return timelineEvent;
    });
    return (
      <div className={styles['rendered__article-timeline']}>
        {timelineEvents.map(({ date, imageUrl, text, annotation }) => (
          <div className={styles['rendered__article-timeline-entry']}>
            <div className={styles['rendered__article-timeline-date-image']}>
              <div className={styles['rendered__article-timeline-date']}>{date}</div>
              {imageUrl && (
                <Image
                  className={styles['rendered__article-timeline-image']}
                  alt={date} // Replace with the beginning of 'text'.
                  sourceSizes={[190]}
                  baseUrl={imageUrl}
                  mode="x" // TODO: Clarify mode.
                />
              )}
            </div>
            <div className={styles['rendered__article-timeline-text-annotation']}>
              {/* TODO: Render content ? */}
              <div className={styles['rendered__article-timeline-text']}>{text}</div>
              <div className={styles['rendered__article-timeline-annotation']}>{annotation}</div>
            </div>
          </div>
        ))}
      </div>
    );
  },
};

const IMAGE_RENDERER = ({ key, attrs: { alt, src, title } }) => {
  const { url, align } = parseImage(src);
  const right = align === 'right';
  if (right) {
    return (
      <span key={key} className={cn(styles['article-image'], styles['right-element'])}>
        {right && (
          <ExternalLink href={url}>
            <Image
              className={styles['article-image__image']}
              alt={alt}
              sourceSizes={[240]}
              baseUrl={url}
              mode="x"
            />
          </ExternalLink>
        )}
        <span className={styles['article-image__caption']}>{title}</span>
      </span>
    );
  }
  return (
    <span key={key} className={styles['article-image']}>
      <img className={styles['article-image__image']} src={url} alt={alt} loading="lazy" />
      <span className={styles['article-image__caption']}>{title}</span>
    </span>
  );
};

const RENDERERS = {
  // debug: (...params) => {
  //   console.log(params)
  //   return null;
  // },
  entity: ({ attrs: { id, typeId } }) => (
    <span key={id} className={styles['right-element']}>
      <span>TODO: Entity Element</span>
      {id}, {typeId}
    </span>
  ),
  blockquote: ({ key, content }) => {
    const { quote, author } = parseQuote(toString(content));
    return (
      <blockquote key={key} className={styles['article-quote']}>
        <div className={styles['article-quote__text']}>{quote}</div>
        {author && <span className={styles['article-quote__caption']}>{author}</span>}
      </blockquote>
    );
  },
  hard_break: ({ key }) => <span key={key} className={styles.rendered__hard} />,
  heading: ({ key, attrs: { level }, content }) => {
    // As clarified by @butuk, <h1 /> is only used for Article title, while content itself only may contain
    // two levels for headings which are <h3 /> and <h4 />.
    // At this moment Fibery produces headings of levels 1-4 (level 4 is "Caption Header"), therefore mapping is as following.
    const FIBERY_HEADING_LEVEL_TO_ELEMENT_TAG = {
      1: 'h3',
      2: 'h4',
      3: 'h4',
      4: 'h4',
    };
    return createElement(
      FIBERY_HEADING_LEVEL_TO_ELEMENT_TAG[level],
      { key },
      renderContent(content)
    );
  },
  image: IMAGE_RENDERER,
  imageBlock: IMAGE_RENDERER,
  paragraph: ({ key, attrs = {}, content }) => {
    return <p key={attrs.guid || key}>{renderContent(content)}</p>;
  },
  text: ({ key, text, marks }) => <Fragment key={key}>{addMarks(text, marks)}</Fragment>,

  table: ({ key, content }) => {
    const [type, parsed] = getTableMeta(content);
    if (CUSTOM_RENDERER[type]) {
      return CUSTOM_RENDERER[type](parsed);
    }

    return (
      <table className={TABLE_CLASS_BY_TYPE[type]} key={key}>
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
      <ul key={key} className={styles['article-unordered']}>
        {renderContent(content)}
      </ul>
    );
  },
  ordered_list: ({ key, content }) => {
    return (
      <ol key={key} className={styles['article-ordered']}>
        {renderContent(content)}
      </ol>
    );
  },
  list_item: ({ key, content }) => <li key={key}>{renderContent(content)}</li>,
};

const renderContentStyled = content => (
  <div className={styles.rendered}>{renderContent(content)}</div>
);

export default renderContentStyled;
