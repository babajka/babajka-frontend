import type { Route } from 'next';

import ExternalLink from '@/components/ui/ExternalLink';
import Link from '@/components/ui/Link';
import Picture, { SCREENS, type Screen } from '@/components/ui/Picture';
import type { Lang } from '@/constants';
import { createT } from '@/lib/i18n/dict';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils/cn';

import BlockWrapper from './BlockWrapper';

const CDN_HOST = 'https://res.cloudinary.com/wir-by/image/upload';

const BANNER_WIDTH: Record<Screen, number> = {
  desktop: 1020,
  'tablet-large': 816,
  tablet: 624,
  touch: 480,
  mobile: 300,
};

const SUBTITLE = 'absolute h-6 w-[177px] text-base leading-6 font-normal text-white';

const BANNERS = {
  mapa: {
    image: 'v1568474405/production/banners/mapa-all-sizes',
    title:
      'top-[50px] left-[35px] h-[54px] w-[220px] text-xl leading-[27px] font-bold text-black touch:top-10 touch:left-[290px] touch:h-[81px] touch:w-[138px] tablet:top-[38px] tablet:left-[300px] tablet:h-[108px] tablet:w-[213px] tablet:text-4xl tablet:leading-9 tablet-lg:left-[325px] desktop:left-[330px]',
    subtitle: null,
  },
  ny2021: {
    image: 'v1607868560/production/banners/newyear2021-all-sizes',
    title:
      'top-[222px] left-[30px] h-[72px] w-[171px] text-[30px] leading-9 font-bold text-white touch:top-[60px] touch:h-24 touch:w-[253px] touch:text-5xl touch:leading-[48px] tablet-lg:top-[78px] tablet-lg:h-[60px] tablet-lg:w-[512px] tablet-lg:leading-[60px] desktop:left-[60px] desktop:h-[66px] desktop:text-[60px] desktop:leading-[66px]',
    subtitle: 'top-[198px] left-[30px] touch:top-9 tablet-lg:top-[54px] desktop:left-[60px]',
  },
  tinder: {
    image: 'v1613151926/production/banners/tinder-all-sizes',
    title:
      'top-[222px] left-[108px] h-[72px] w-[171px] text-[30px] leading-9 font-bold text-white touch:top-[60px] touch:left-[204px] touch:h-24 touch:w-[253px] touch:text-5xl touch:leading-[48px] tablet:left-[330px] tablet-lg:top-[78px] tablet-lg:h-[60px] tablet-lg:w-[512px] tablet-lg:leading-[60px] desktop:left-[388px] desktop:h-[66px] desktop:w-[532px] desktop:text-[60px] desktop:leading-[66px]',
    subtitle:
      'top-[198px] left-[108px] touch:top-9 touch:left-[204px] tablet:left-[330px] tablet-lg:top-[54px] desktop:left-[388px]',
  },
} as const;

type BannerName = keyof typeof BANNERS;

const isBanner = (banner: string): banner is BannerName => banner in BANNERS;

const getSources = (image: string) =>
  Object.fromEntries(
    SCREENS.map(screen => [
      screen,
      `${CDN_HOST}/c_scale,w_${BANNER_WIDTH[screen]},f_auto,q_auto/${image}/${screen}.png`,
    ])
  ) as Record<Screen, string>;

type BannerBlockProps = { banner: string; lang: Lang; inViewport?: boolean };

/** Legacy blocks/banner/BannerBlock.js. The backend can list banners that are no longer available. */
const BannerBlock = ({ banner, lang, inViewport }: BannerBlockProps) => {
  if (!isBanner(banner)) {
    return null;
  }
  const t = createT(lang);
  const { image, title: titleClass, subtitle: subtitleClass } = BANNERS[banner];
  const title = t(`banners.${banner}-title`);

  const content = (
    <>
      <div className={cn('absolute', titleClass)}>{title}</div>
      {subtitleClass && (
        <div className={cn(SUBTITLE, subtitleClass)}>{t(`banners.${banner}-subtitle`)}</div>
      )}
      <Picture
        className="[&_img]:cursor-pointer"
        sources={getSources(image)}
        alt={title}
        inViewport={inViewport}
      />
    </>
  );

  const href: Route | null = banner === 'mapa' ? null : routes.game(lang, banner);

  return (
    <BlockWrapper>
      <div className="relative">
        {href ? (
          <Link href={href}>{content}</Link>
        ) : (
          <ExternalLink href="https://map.wir.by?utm_source=wirby-main-page">
            {content}
          </ExternalLink>
        )}
      </div>
    </BlockWrapper>
  );
};

export default BannerBlock;
