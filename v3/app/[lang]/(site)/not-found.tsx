import ErrorMessage from '@/components/layout/ErrorMessage';

/**
 * 404 for unknown URLs and `notFound()` (legacy pages/_error.js with statusCode 404).
 * The response status is 404. For the `[...rest]` catch-all the HTML is an empty prerendered shell
 * and the message renders on the client (Next's Partial Prerendering "resume"); fine for a noindex page.
 */
export default function NotFound() {
  return <ErrorMessage code={404} />;
}
