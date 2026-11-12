import { cacheLife } from 'next/cache';

/**
 * The current year for the copyright. With Cache Components, `new Date()` must live in a cached
 * scope to be part of the static shell; refreshed daily.
 */
const CurrentYear = async () => {
  'use cache';
  cacheLife('days');
  return <>{new Date().getFullYear()}</>;
};

export default CurrentYear;
