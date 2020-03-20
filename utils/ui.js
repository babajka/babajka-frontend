import cn from 'classnames';
import bem from 'bem-css-modules';

import linkStyles from 'components/common/ui/link.module.scss';

const b = bem(linkStyles);

export const linkCn = ({ className, disabled, dark, active, noStyles } = {}) =>
  noStyles
    ? cn(linkStyles['wir-link--no-styles'], className)
    : cn(b({ disabled, 'theme-dark': !!dark, active }), className);

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
