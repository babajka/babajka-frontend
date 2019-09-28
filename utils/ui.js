import 'components/common/ui/link.scss';

import cn from 'classnames';

export const linkCn = ({ className, disabled, dark, active } = {}) =>
  cn(
    'wir-link',
    { 'wir-link--disabled': disabled, 'wir-link--theme-dark': dark, 'wir-link--active': active },
    className
  );
