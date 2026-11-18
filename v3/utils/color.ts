// Ported from legacy `utils/ui.js`.
const HEX_COLOR_REGEX = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;

// Legacy crashed the page on a color in another format; here such a color just looks like neither.
const toRgb = (color: string) =>
  color
    .match(HEX_COLOR_REGEX)
    ?.slice(1)
    .map(c => parseInt(c, 16));

/** Every channel is darker than #22. */
export const colorLooksBlack = (color: string) => !!toRgb(color)?.every(value => value < 34);

/** Every channel is lighter than #dd. */
export const colorLooksWhite = (color: string) => !!toRgb(color)?.every(value => value > 221);
