import { connection } from 'next/server';

import Link from '@/components/ui/Link';
import type { Lang } from '@/constants';
import { createT } from '@/lib/i18n/dict';
import { routes } from '@/lib/routes';
import type { DiaryDay } from '@/lib/types';
import { cn } from '@/lib/utils/cn';
import { isNextDiaryAvailable } from '@/utils/diary';

import { ArrowIcon } from './DiaryArrows';

type ArrowsProps = {
  className?: string;
  lang: Lang;
  prev?: DiaryDay;
  next?: DiaryDay;
  isNextAvailable: boolean;
};

/** Legacy features/diary/DiaryLinkArrows.js. */
export const DiaryLinkArrows = ({ className, lang, prev, next, isNextAvailable }: ArrowsProps) => {
  const t = createT(lang);
  return (
    <div className={cn('flex w-20 flex-row items-center justify-between leading-6', className)}>
      {prev && (
        <Link href={routes.diary(lang, prev.slug)} title={t('diary.previous')}>
          <ArrowIcon size={36} />
        </Link>
      )}
      {next && (
        <Link
          href={routes.diary(lang, next.slug)}
          title={t('diary.next')}
          disabled={!isNextAvailable}
        >
          <ArrowIcon size={36} right />
        </Link>
      )}
    </div>
  );
};

type LiveArrowsProps = Omit<ArrowsProps, 'isNextAvailable'> & {
  entry: Pick<DiaryDay, 'month' | 'day'>;
};

/** "Next" depends on today's date, so it's the only part of the page rendered per request. */
export const LiveDiaryLinkArrows = async ({ entry, ...props }: LiveArrowsProps) => {
  await connection();
  return (
    <DiaryLinkArrows
      {...props}
      isNextAvailable={isNextDiaryAvailable(entry, props.next, new Date())}
    />
  );
};
