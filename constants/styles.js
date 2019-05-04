export const SCREENS = {
  MOBILE: 'mobile',
  TOUCH: 'touch',
  TABLET: 'tablet',
  TABLET_LARGE: 'tablet-large',
  DESKTOP: 'desktop',
  // consider to remove
  DESKTOP_LARGE: 'desktop-large',
  DEKSTOP_WIDESCREEN: 'dekstop-widescreen',
};

export const SCREEN_VALUES = Object.entries(SCREENS).reduce((acc, [k, v], index) => {
  acc[k] = index;
  acc[v] = index;
  return acc;
}, {});
