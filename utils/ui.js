import 'components/common/ui/link.scss';

import cn from 'classnames';

export const linkCn = ({ className, disabled, dark } = {}) =>
  cn('wir-link', { 'wir-link--disabled': disabled, 'wir-link--theme-dark': dark }, className);

export const stub = 1;
