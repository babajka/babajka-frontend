import type { SVGProps } from 'react';

// Ported from the legacy `assets` submodule (`assets/logo/Logo.js`, `logo.svg`).

type LogoProps = Omit<SVGProps<SVGSVGElement>, 'viewBox' | 'width' | 'height' | 'color'> & {
  size: number;
  /** Solid color instead of the brand gradient (e.g. on dark backgrounds). */
  color?: string;
  /** Accessible name. Without it the logo is decorative. */
  title?: string;
};

// The gradient id must be unique per page only if the stops differ, so it's keyed by color.
const gradientId = (color?: string) =>
  `logo-gradient${color ? `-${color.replace(/[^a-z0-9]/gi, '')}` : ''}`;

const Logo = ({ size, color, title, ...props }: LogoProps) => {
  const id = gradientId(color);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 400"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title && <title>{title}</title>}
      <defs>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id={id}>
          <stop stopColor={color || '#13937E'} offset="0%" />
          <stop stopColor={color || '#2B8D7C'} offset="49.177%" />
          <stop stopColor={color || '#182B1C'} offset="100%" />
        </linearGradient>
      </defs>
      <path
        d="M269.995 50C159.545 50 70 139.587 70 250.096c0 13.313 1.24 26.394 3.61 39.078 1.91 8.21 24.377 96.379 104.265 85.638 26.76-3.599 42.74-29.213 42.74-29.213s-21.65 16.843-43.31 17.099c-49.007.57-86.617-45.04-82.163-114.632 6.227-97.29 92.266-156.178 171.402-156.178 89.467 0 154.654 74.687 154.654 156.178 0 75.298-32.833 112.183-32.833 112.183s56.11-220.639-157.762-226.28c92.744 23.598 121.077 110.713 82.605 172.186 4.55-54.764-30.288-128.178-104.073-117.76-63.445 8.962-88.815 87.644-68.3 117.86 19.284 28.402 55.271 35.348 84.908-11.968-22.63 25.51-64.393 23.946-63.824-4.565 1.46-72.958 111.692-72.972 111.692 0 0 56.67-45.406 135.074-108.733 118.996 54.861 19.663 138.228 14.96 187.276-96.191 1.423 72.98-30.484 113.263-73.83 137.455C384.92 445.612 470 357.808 470 250.096 470 139.587 380.456 50 269.995 50z"
        transform="translate(-70 -50)"
        fill={`url(#${id})`}
        fillRule="evenodd"
      />
    </svg>
  );
};

export default Logo;
