import { connection } from 'next/server';

import ShareButtons from '@/components/social/ShareButtons';
import type { Lang } from '@/constants';
import type { DiaryDay } from '@/lib/types';
import { getDiaryShareText, isTodayDiary } from '@/utils/diary';

type DiaryShareProps = {
  date: number;
  name?: string;
  lang: Lang;
  wrote: string;
  content: string;
  isToday?: boolean;
};

export const DiaryShare = ({ isToday = false, ...options }: DiaryShareProps) => {
  const { basicText, extendedText } = getDiaryShareText({ ...options, isToday });
  return (
    <ShareButtons className="tablet:my-10" basicText={basicText} extendedText={extendedText} />
  );
};

/** The text says "today" on today's entry, so it's rendered per request. */
export const LiveDiaryShare = async ({
  entry,
  ...props
}: DiaryShareProps & { entry: Pick<DiaryDay, 'month' | 'day'> }) => {
  await connection();
  return <DiaryShare {...props} isToday={isTodayDiary(entry, new Date())} />;
};
