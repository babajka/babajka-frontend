import React from 'react';

import { SCREENS, SCREEN_VALUES } from 'constants/styles';

const { DESKTOP, TABLET_LARGE, TABLET, TOUCH, MOBILE } = SCREENS;

export const getScreen = (width, isMobile) => {
  if (!width) {
    return isMobile ? TOUCH : DESKTOP;
  }
  if (width < 500) {
    return MOBILE;
  }
  if (width < 650) {
    return TOUCH;
  }
  if (width < 800) {
    return TABLET;
  }
  if (width < 1100) {
    return TABLET_LARGE;
  }
  return DESKTOP;
  // if (width < 1360) {
  //   return DESKTOP;
  // }
  // if (width < 1600) {
  //   return DESKTOP_LARGE;
  // }
  // return DEKSTOP_WIDESCREEN;
};

export const getInitialContext = screen => ({
  screen,
  value: SCREEN_VALUES[screen],
});

export default React.createContext(getInitialContext());
