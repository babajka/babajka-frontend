// `cn()` = clsx + tailwind-merge. Replaces `classnames` and `bem-css-modules` from legacy.
import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// Teach tailwind-merge about the custom utilities in app/globals.css, so e.g.
// `cn('text-body', 'text-title')` keeps only the last one, and `text-body` isn't treated as a color.
const twMerge = extendTailwindMerge<'content-padding' | 'card-size'>({
  override: {
    theme: {
      breakpoint: ['touch', 'tablet', 'tablet-lg', 'desktop', 'sidebar', 'wide'],
    },
  },
  extend: {
    classGroups: {
      'font-size': ['text-body', 'text-title'],
      'content-padding': ['content-padding'],
      z: ['z-sidebar-overlay', 'z-sidebar', 'z-modal-backdrop', 'z-modal', 'z-go-up'],
      'card-size': [
        'card-l',
        'card-ms',
        'card-square-m',
        'card-square-s',
        'card-s-wide',
        'card-s',
        'card-xs-wide',
        'card-xs',
      ],
    },
    conflictingClassGroups: {
      // the card size sets both width and height
      'card-size': ['w', 'h', 'size'],
      'content-padding': ['px', 'pl', 'pr', 'p'],
    },
  },
});

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
