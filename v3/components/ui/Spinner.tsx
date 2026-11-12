import { CircleNotchIcon } from '@/components/icons';
import type { IconProps } from '@/components/icons/createIcon';
import { cn } from '@/lib/utils/cn';

/** Legacy components/common/ui/Spinner.js: a spinning fa-circle-notch. */
const Spinner = ({ className, ...props }: IconProps) => (
  <CircleNotchIcon className={cn('animate-spin', className)} {...props} />
);

export default Spinner;
