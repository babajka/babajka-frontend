import { cn } from '@/lib/utils/cn';

type ImageProps = {
  /** Backend image without a query: the size goes into `?w=` or `?h=`. */
  baseUrl: string;
  /** Size in CSS pixels. The 2x source is added for high-density screens. */
  size: number;
  alt: string;
  title?: string;
  className?: string;
  dimension?: 'w' | 'h';
  /** Above the fold: load right away. */
  inViewport?: boolean;
};

/**
 * Backend image with 1x and 2x sources (legacy components/common/Image.js). Inline and without
 * Tailwind's `max-width`, like legacy, because the layout relies on it.
 */
const Image = ({
  baseUrl,
  size,
  alt,
  title,
  className,
  dimension = 'w',
  inViewport = false,
}: ImageProps) => (
  // eslint-disable-next-line @next/next/no-img-element -- Phase 5 moves to next/image with a loader
  <img
    className={cn('inline max-w-none align-baseline', className)}
    srcSet={`${baseUrl}?${dimension}=${size} 1x,${baseUrl}?${dimension}=${size * 2} 2x`}
    alt={alt}
    title={title}
    loading={inViewport ? 'eager' : 'lazy'}
  />
);

export default Image;
