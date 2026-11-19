// Fibery rich text as Server Components. Legacy utils/fibery/renderer.js.
// https://github.com/ProseMirror/prosemirror-schema-basic/blob/7d8502f2cb89659c543c7b554d67d7db8c7c63c4/src/schema-basic.js
import dynamic from 'next/dynamic';
import { createElement, Fragment, type ReactNode } from 'react';

import ExternalLink from '@/components/ui/ExternalLink';
import Image from '@/components/ui/Image';
import parseCoubUrl from '@/lib/utils/parseCoubUrl';
import parseYMPlaylistUrl from '@/lib/utils/parseYMPlaylistUrl';
import parseYoutubeUrl from '@/lib/utils/parseYoutubeUrl';
import { cn } from '@/lib/utils/cn';
import {
  getTableMeta,
  traverseTable,
  traverseTableRowByRow,
  type TableItem,
  type TableType,
} from '@/utils/fibery/parseTable';
import { fiberyToString, type FiberyMark, type FiberyNode } from '@/utils/fibery/toString';
import { parseImage, parseQuote } from '@/utils/fibery/utils';

import { CoubPlayer, PlaylistPlayer, VideoPlayer } from './players';
import { FilloutQuiz } from './quizzes';
import type { SliderImage } from './ImageSlider';

// Only articles with a carousel load the slider.
const ImageSlider = dynamic(() => import('./ImageSlider'));

type RenderNode = (node: FiberyNode, key: number) => ReactNode;
type Overrides = Record<string, RenderNode>;

const renderContent = (content: FiberyNode[] | undefined, overrides: Overrides = {}): ReactNode => {
  if (!Array.isArray(content)) {
    return null;
  }
  return content.map((node, key) => (overrides[node.type] ?? RENDERERS[node.type])?.(node, key));
};

const renderLink = (node: ReactNode, { href = '', title }: NonNullable<FiberyMark['attrs']>) => {
  const videoId = parseYoutubeUrl(href);
  if (videoId && href === node) {
    return <VideoPlayer videoId={videoId} />;
  }
  const coubId = parseCoubUrl(href);
  if (coubId && href === node) {
    return <CoubPlayer coubId={coubId} />;
  }
  const playlist = parseYMPlaylistUrl(href);
  if (playlist) {
    return <PlaylistPlayer {...playlist} />;
  }
  return (
    <ExternalLink href={href} title={title}>
      {node}
    </ExternalLink>
  );
};

const addMark = (node: ReactNode, { type, attrs }: FiberyMark) => {
  switch (type) {
    case 'link':
      return renderLink(node, attrs ?? {});
    case 'strong':
      return <strong>{node}</strong>;
    case 'em':
      return <i>{node}</i>;
    default:
      return node;
  }
};

const isImage = (item: TableItem | undefined): item is FiberyNode =>
  typeof item === 'object' && (item.type === 'image' || item.type === 'imageBlock');

const onlyText = (items: TableItem[] = []) =>
  items.filter((item): item is string => typeof item === 'string');

const Carousel = ({ content }: { content: FiberyNode[] }) => {
  const items = traverseTable(content, true);
  const images = items.filter(isImage).map(({ attrs }) => attrs as SliderImage);
  return <ImageSlider images={images} description={onlyText(items).at(-1)} />;
};

const Poem = ({ content }: { content: FiberyNode[] }) => (
  <div className="article-poem">
    {renderContent(content, {
      table_row: (row, key) => (
        <div key={key}>
          {renderContent(row.content, {
            table_cell: (cell, cellKey) => (
              <Fragment key={cellKey}>{renderContent(cell.content)}</Fragment>
            ),
          })}
        </div>
      ),
    })}
  </div>
);

const Timeline = ({ content }: { content: FiberyNode[] }) => (
  <div>
    {traverseTableRowByRow(content, true).map(
      ([dateCell, imageCell, textCell, noteCell], index) => {
        const date = onlyText(dateCell).join('');
        const image = imageCell?.[0];
        return (
          <div key={index} className="timeline-entry">
            <div className="timeline-date-image">
              <div className="timeline-date">{date}</div>
              {isImage(image) && image.attrs?.src && (
                <Image
                  className="timeline-image"
                  alt={date}
                  size={190}
                  baseUrl={parseImage(image.attrs.src).url}
                />
              )}
            </div>
            <div className="timeline-text-annotation">
              <div className="timeline-text">
                {onlyText(textCell).map((text, i) => (
                  <div key={i}>{text}</div>
                ))}
              </div>
              <div className="timeline-annotation">
                {onlyText(noteCell).map((text, i) => (
                  <div key={i}>{text}</div>
                ))}
              </div>
            </div>
          </div>
        );
      }
    )}
  </div>
);

const TABLE_CLASS: Partial<Record<TableType, string>> = {
  TABLE: 'article-table',
  TABLE_RIGHT: 'article-table right-element',
  NOTE: 'article-note right-element',
  SPLIT: 'article-split',
};

const renderTable: RenderNode = ({ content }, key) => {
  const [type, parsed] = getTableMeta(content);
  switch (type) {
    case 'CAROUSEL':
      return <Carousel key={key} content={parsed} />;
    case 'POEM':
      return <Poem key={key} content={parsed} />;
    case 'TIMELINE':
      return <Timeline key={key} content={parsed} />;
    case 'FILLOUT_QUIZ': {
      const quizId = String(traverseTable(parsed)[0]);
      return <FilloutQuiz key={quizId} id={quizId} />;
    }
    default:
      return (
        <table key={key} className={TABLE_CLASS[type]}>
          <tbody>{renderContent(parsed)}</tbody>
        </table>
      );
  }
};

const renderImage: RenderNode = ({ attrs = {} }, key) => {
  const { alt = '', src = '', title } = attrs;
  const { url, isRight } = parseImage(src);
  return (
    <span key={key} className={cn('article-image', isRight && 'right-element')}>
      {isRight ? (
        <ExternalLink href={url}>
          <Image className="article-image__image" alt={alt} size={240} baseUrl={url} />
        </ExternalLink>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- Phase 5 moves to next/image
        <img className="article-image__image" src={url} alt={alt} loading="lazy" />
      )}
      <span className="article-image__caption">{title}</span>
    </span>
  );
};

// As agreed with the designers, <h1> is the article's title, and the content has two levels.
const HEADING_TAG: Record<number, 'h3' | 'h4'> = { 1: 'h3', 2: 'h4', 3: 'h4', 4: 'h4' };

const RENDERERS: Overrides = {
  blockquote: ({ content }, key) => {
    const { quote, author } = parseQuote(fiberyToString(content));
    return (
      <blockquote key={key} className="article-quote">
        <div className="article-quote__text">{quote}</div>
        {author && <span className="article-quote__caption">{author}</span>}
      </blockquote>
    );
  },
  hard_break: (_, key) => <span key={key} />,
  heading: ({ attrs, content }, key) =>
    createElement(HEADING_TAG[attrs?.level ?? 4] ?? 'h4', { key }, renderContent(content)),
  image: renderImage,
  imageBlock: renderImage,
  paragraph: ({ attrs, content }, key) => <p key={attrs?.guid ?? key}>{renderContent(content)}</p>,
  text: ({ text, marks = [] }, key) => (
    <Fragment key={key}>{marks.reduce<ReactNode>(addMark, text)}</Fragment>
  ),
  table: renderTable,
  table_row: ({ content }, key) => <tr key={key}>{renderContent(content)}</tr>,
  table_cell: ({ attrs, content }, key) =>
    createElement(
      attrs?.background ? 'th' : 'td',
      { key, colSpan: attrs?.colspan, rowSpan: attrs?.rowspan },
      renderContent(content)
    ),
  bullet_list: ({ content }, key) => (
    <ul key={key} className="article-unordered">
      {renderContent(content)}
    </ul>
  ),
  ordered_list: ({ content }, key) => (
    <ol key={key} className="article-ordered">
      {renderContent(content)}
    </ol>
  ),
  list_item: ({ content }, key) => <li key={key}>{renderContent(content)}</li>,
};

/** The article's body. */
const FiberyContent = ({ content }: { content?: FiberyNode[] }) => (
  <div className="rendered">{renderContent(content)}</div>
);

export default FiberyContent;
