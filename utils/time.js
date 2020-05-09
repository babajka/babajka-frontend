import { MINSK_TZ_OFFSET } from 'constants/server';

export const getNowHash = () => {
  const now = new Date();
  // HACK: during ssr we have different timezone
  now.setDate(now.getUTCDate());
  now.setHours(now.getUTCHours() + MINSK_TZ_OFFSET);
  return (now.getMonth() + 1) * 100 + now.getDate();
};
