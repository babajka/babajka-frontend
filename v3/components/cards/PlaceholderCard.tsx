import { cn } from '@/lib/utils/cn';

/** Keeps the row aligned when there are fewer articles than cards (legacy placeholder.js). */
const PlaceholderCard = ({ className }: { className?: string }) => (
  <div className={cn('hidden', className)} />
);

export default PlaceholderCard;
