import ErrorMessage from '@/components/layout/ErrorMessage';

// Legacy /{lang}/status/404 (pages/status.js), kept so old links and redirects still work. Like
// legacy, it renders the message with a 200; real errors use not-found.tsx / error.tsx. Any other
// /status/<code> is a 404 (the [...rest] catch-all).
export default function Status404Page() {
  return <ErrorMessage code={404} />;
}
