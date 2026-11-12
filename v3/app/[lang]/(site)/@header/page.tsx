import { HeaderTitle } from '@/components/layout/Header';
import Motto from '@/components/layout/Motto';

/** Header title on the main page: the motto. */
export default function MainHeader() {
  return (
    <HeaderTitle>
      <Motto />
    </HeaderTitle>
  );
}
