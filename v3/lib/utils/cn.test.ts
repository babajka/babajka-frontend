import { describe, expect, it } from 'vitest';

import { cn } from '@/lib/utils/cn';

describe('lib/utils/cn', () => {
  it('should join classes and skip falsy ones', () => {
    expect(cn('a', false, null, undefined, 'b', { c: true, d: false })).toBe('a b c');
  });

  it('should resolve Tailwind conflicts, last wins', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
    expect(cn('text-primary', 'text-error')).toBe('text-error');
  });

  it('should treat the custom typography utilities as font sizes, not colors', () => {
    expect(cn('text-body', 'text-title')).toBe('text-title');
    expect(cn('text-body', 'text-primary')).toBe('text-body text-primary');
  });

  it('should resolve conflicts of the custom z-index and card utilities', () => {
    expect(cn('z-sidebar', 'z-modal')).toBe('z-modal');
    expect(cn('w-10', 'card-l')).toBe('card-l');
  });

  it('should keep responsive variants of the legacy breakpoints separate', () => {
    expect(cn('p-2', 'desktop:p-4', 'p-3')).toBe('desktop:p-4 p-3');
  });
});
