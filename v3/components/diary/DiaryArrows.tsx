'use client';

import Clickable from '@/components/Clickable';
import { linkClass } from '@/components/ui/link-class';
import { useT } from '@/lib/i18n/client';
import { cn } from '@/lib/utils/cn';

const ArrowIcon = ({ size, right }: { size: number; right?: boolean }) => (
  <svg
    className={cn('inline', right && 'rotate-180')}
    width={size}
    height={size}
    viewBox="0 0 35 16"
    fill="none"
  >
    <path
      d="M35 6.214v3.857c0 .188-.06.342-.18.463a.626.626 0 01-.463.18H9.286v4.5c0 .281-.128.476-.382.583a.645.645 0 01-.703-.1L.487 8.664a.658.658 0 010-.944L8.2.609c.214-.187.449-.227.703-.12.254.12.382.315.382.582v4.5h25.071c.188 0 .342.06.462.181.12.12.181.275.181.462z"
      fill="#1A9582"
    />
  </svg>
);

type DiaryArrowsProps = {
  className?: string;
  size: number;
  onPrev: () => void;
  onNext: () => void;
  isNextAvailable: boolean;
};

/** Legacy features/diary/DiaryArrows.js. */
const DiaryArrows = ({ className, size, onPrev, onNext, isNextAvailable }: DiaryArrowsProps) => {
  const t = useT();
  return (
    <div className={cn('flex flex-row items-center justify-between', className)}>
      <Clickable className={linkClass()} onClick={onPrev} title={t('diary.previous')}>
        <ArrowIcon size={size} />
      </Clickable>
      <Clickable
        className={linkClass({ disabled: !isNextAvailable })}
        onClick={onNext}
        disabled={!isNextAvailable}
        title={t('diary.next')}
      >
        <ArrowIcon size={size} right />
      </Clickable>
    </div>
  );
};

export default DiaryArrows;
