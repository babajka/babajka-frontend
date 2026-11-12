import type { SVGProps } from 'react';

export type IconProps = Omit<SVGProps<SVGSVGElement>, 'viewBox' | 'children'> & {
  /** Accessible name. Without it the icon is decorative (`aria-hidden`), like legacy `<Icon>`. */
  title?: string;
};

/**
 * Builds an icon component from one Font Awesome path. Like the FA webfont, the icon is 1em high
 * and uses `currentColor`, so `text-*` classes size and color it.
 */
export const createIcon = (viewBox: string, path: string) => {
  const [, , width, height] = viewBox.split(' ').map(Number);

  const Icon = ({ title, className, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      fill="currentColor"
      height="1em"
      width={`${width / height}em`}
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
      {...props}
    >
      {title && <title>{title}</title>}
      <path d={path} />
    </svg>
  );

  return Icon;
};
