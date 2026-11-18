export const SCREENS = ['mobile', 'touch', 'tablet', 'tablet-large', 'desktop'] as const;

export type Screen = (typeof SCREENS)[number];

const MEDIA: Record<Screen, string> = {
  mobile: '(max-width: 499px)',
  touch: '(min-width: 500px) and (max-width: 649px)',
  tablet: '(min-width: 650px) and (max-width: 799px)',
  'tablet-large': '(min-width: 800px) and (max-width: 1099px)',
  desktop: '(min-width: 1100px)',
};

type PictureProps = {
  sources: Record<Screen, string>;
  alt: string;
  className?: string;
  inViewport?: boolean;
};

/** One image per screen range (legacy components/common/ui/Picture.js). */
const Picture = ({ sources, alt, className, inViewport = false }: PictureProps) => (
  <picture className={className}>
    {SCREENS.map(screen => (
      <source key={screen} media={MEDIA[screen]} srcSet={sources[screen]} />
    ))}
    {}
    <img
      className="inline size-full max-w-none align-baseline select-none"
      src={sources.mobile}
      alt={alt}
      loading={inViewport ? 'eager' : 'lazy'}
    />
  </picture>
);

export default Picture;
