import cn from 'classnames';

export const linkCn = ({ className, disabled, dark, active, noStyles } = {}) =>
  noStyles
    ? cn('wir-link--no-styles', className)
    : cn(
        'wir-link',
        {
          'wir-link--disabled': disabled,
          'wir-link--theme-dark': dark,
          'wir-link--active': active,
        },
        className
      );

// https://regex101.com/r/v1LxqC/1
const HEX_COLOR_REGEX = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;

const hexToRgb = hex =>
  hex
    .match(HEX_COLOR_REGEX)
    .slice(1)
    .map(c => parseInt(c, 16));

// Considering each color 'darker' than #222222 looking like black. #22 = 34
export const colorLooksBlack = color => hexToRgb(color).every(val => val < 34);

// Considering each color 'lighter' than #dddddd looking like white. #dd = 221
export const colorLooksWhite = color => hexToRgb(color).every(val => val > 221);
