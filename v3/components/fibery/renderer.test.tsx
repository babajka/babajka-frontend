import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import type { FiberyNode } from '@/utils/fibery/toString';

import FiberyContent from './renderer';

vi.mock('next/dynamic', () => ({ default: () => () => <div>slider</div> }));

const text = (value: string, marks?: FiberyNode['marks']): FiberyNode => ({
  type: 'text',
  text: value,
  marks,
});
const paragraph = (...content: FiberyNode[]): FiberyNode => ({ type: 'paragraph', content });
const cell = (...content: FiberyNode[]): FiberyNode => ({
  type: 'table_cell',
  attrs: {},
  content: [paragraph(...content)],
});
const table = (...rows: FiberyNode[][]): FiberyNode => ({
  type: 'table',
  content: rows.map(content => ({ type: 'table_row', content })),
});

describe('FiberyContent', () => {
  it('renders marks and external links', () => {
    render(
      <FiberyContent
        content={[
          paragraph(
            text('bold', [{ type: 'strong' }]),
            text('site', [{ type: 'link', attrs: { href: 'https://example.com' } }])
          ),
        ]}
      />
    );
    expect(screen.getByText('bold').tagName).toBe('STRONG');
    expect(screen.getByRole('link', { name: 'site' })).toHaveAttribute(
      'href',
      'https://example.com'
    );
  });

  it('turns a bare youtube link into a player inside the paragraph', () => {
    const href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    const { container } = render(
      <FiberyContent content={[paragraph(text(href, [{ type: 'link', attrs: { href } }]))]} />
    );
    expect(screen.getByTitle('VideoPlayer')).toHaveAttribute(
      'src',
      'https://www.youtube.com/embed/dQw4w9WgXcQ'
    );
    expect(container.querySelector('p div')).toBeNull();
  });

  it('maps heading levels to h3 and h4', () => {
    render(
      <FiberyContent
        content={[
          { type: 'heading', attrs: { level: 1 }, content: [text('one')] },
          { type: 'heading', attrs: { level: 3 }, content: [text('three')] },
        ]}
      />
    );
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('one');
    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('three');
  });

  it('splits a quote and its author', () => {
    render(
      <FiberyContent
        content={[{ type: 'blockquote', content: [paragraph(text('Words{Author}'))] }]}
      />
    );
    expect(screen.getByText('Words')).toBeInTheDocument();
    expect(screen.getByText('Author')).toBeInTheDocument();
  });

  it('renders special tables by their first cell', () => {
    const { container } = render(
      <FiberyContent content={[table([cell(text('POEM'))], [cell(text('line'))])]} />
    );
    expect(container.querySelector('.article-poem')).toHaveTextContent('line');
    expect(container.querySelector('table')).toBeNull();
  });

  it('ignores unknown nodes', () => {
    const { container } = render(<FiberyContent content={[{ type: 'unknown' }]} />);
    expect(container.querySelector('.rendered')).toBeEmptyDOMElement();
  });
});
