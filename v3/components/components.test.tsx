import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Clickable from '@/components/Clickable';
import { HeartIcon, RssIcon } from '@/components/icons';
import Logo from '@/components/Logo';
import TextWithSeparator from '@/components/TextWithSeparator';

describe('components/icons', () => {
  it('should be decorative without a title, like the legacy <Icon>', () => {
    const { container } = render(<HeartIcon className="text-error" />);
    const svg = container.querySelector('svg');

    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('fill', 'currentColor');
    expect(svg).toHaveAttribute('height', '1em');
    expect(svg).toHaveClass('text-error');
  });

  it('should be an accessible image with a title', () => {
    render(<RssIcon title="RSS" />);
    expect(screen.getByRole('img', { name: 'RSS' })).toBeInTheDocument();
  });

  it('should keep the Font Awesome aspect ratio', () => {
    // fa-rss is 448×512
    const { container } = render(<RssIcon />);
    expect(container.querySelector('svg')).toHaveAttribute('width', `${448 / 512}em`);
  });
});

describe('components/Logo', () => {
  it('should render the brand gradient by default', () => {
    const { container } = render(<Logo size={48} />);

    expect(container.querySelector('svg')).toHaveAttribute('width', '48');
    expect(container.querySelector('stop')).toHaveAttribute('stop-color', '#13937E');
    expect(container.querySelector('path')).toHaveAttribute('fill', 'url(#logo-gradient)');
  });

  it('should use a solid color and a separate gradient id when color is set', () => {
    const { container } = render(<Logo size={48} color="#ffffff" title="Wir.by" />);

    expect(screen.getByRole('img', { name: 'Wir.by' })).toBeInTheDocument();
    expect(container.querySelector('stop')).toHaveAttribute('stop-color', '#ffffff');
    expect(container.querySelector('path')).toHaveAttribute('fill', 'url(#logo-gradient-ffffff)');
  });
});

describe('components/Clickable', () => {
  it('should render a plain span without onClick', () => {
    render(<Clickable>text</Clickable>);
    const element = screen.getByText('text');

    expect(element.tagName).toBe('SPAN');
    expect(element).not.toHaveAttribute('role');
  });

  it('should act as a button and react to Enter with onClick', () => {
    const onClick = vi.fn();
    render(
      <Clickable tag="div" onClick={onClick}>
        go
      </Clickable>
    );
    const button = screen.getByRole('button', { name: 'go' });

    expect(button.tagName).toBe('DIV');
    expect(button).toHaveAttribute('tabindex', '0');
    fireEvent.click(button);
    fireEvent.keyDown(button, { key: 'Enter' });
    fireEvent.keyDown(button, { key: 'a' });
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('should not be a button when disabled', () => {
    render(
      <Clickable onClick={vi.fn()} disabled>
        off
      </Clickable>
    );
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});

describe('components/TextWithSeparator', () => {
  it('should replace <br/> with line breaks by default', () => {
    const { container } = render(
      <p>
        <TextWithSeparator text="one<br/>two<br/>three" />
      </p>
    );
    expect(container.querySelectorAll('br')).toHaveLength(2);
    expect(container.textContent).toBe('onetwothree');
  });

  it('should support a custom symbol and separator', () => {
    const { container } = render(
      <p>
        <TextWithSeparator text={'a\nb'} symbol={'\n'} separator=" | " />
      </p>
    );
    expect(container.textContent).toBe('a | b');
  });
});
