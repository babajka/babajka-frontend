import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ExternalLink from '@/components/ui/ExternalLink';
import { linkClass } from '@/components/ui/link-class';
import Input from '@/components/ui/Input';
import { EnvelopeIcon } from '@/components/icons';

describe('components/ui', () => {
  describe('linkClass (legacy linkCn)', () => {
    it('should map the legacy modifiers', () => {
      expect(linkClass()).toBe('link');
      expect(linkClass({ dark: true, active: true, disabled: true })).toBe(
        'link link-dark link-active link-disabled'
      );
      expect(linkClass({ noStyles: true }, 'x')).toBe('text-inherit no-underline x');
    });
  });

  describe('ExternalLink', () => {
    it('should open in a new tab safely, with link styles unless custom', () => {
      render(
        <>
          <ExternalLink href="https://wir.by">styled</ExternalLink>
          <ExternalLink href="https://wir.by" custom className="mine">
            custom
          </ExternalLink>
        </>
      );
      const styled = screen.getByRole('link', { name: 'styled' });
      expect(styled).toHaveAttribute('target', '_blank');
      expect(styled).toHaveAttribute('rel', 'noopener noreferrer');
      expect(styled).toHaveClass('link');
      expect(screen.getByRole('link', { name: 'custom' })).toHaveAttribute('class', 'mine');
    });
  });

  describe('Input', () => {
    it('should show the error and mark the input invalid', () => {
      render(<Input aria-label="email" leftIcon={EnvelopeIcon} error="oops" />);
      expect(screen.getByRole('textbox', { name: 'email' })).toHaveAttribute(
        'aria-invalid',
        'true'
      );
      expect(screen.getByText('oops')).toBeInTheDocument();
    });

    it('should show a spinner while pending', () => {
      const { container } = render(<Input aria-label="email" pending />);
      expect(container.querySelector('.animate-spin')).toBeInTheDocument();
    });
  });
});
