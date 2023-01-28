import { Ubuntu } from '@next/font/google';
import Link from 'next/link';
import 'styles/globals.css';

const ubuntu = Ubuntu({
  weight: ['400', '700'],
  subsets: [
    'cyrillic',
    // 'cyrillic-ext',
    'latin',
    'latin-ext',
  ],
});

interface Props {
  children: React.ReactNode;
}

const CoreLayout = ({ children }: Props) => {
  return (
    <html lang="en" className={ubuntu.className}>
      <body>
        <nav className="p-3">
          <ul className="flex justify-center space-x-4">
            <li>
              <Link href="/">Home Page</Link>
            </li>
            <li>
              <Link href="/fonts">Fonts</Link>
            </li>
          </ul>
        </nav>
        <main>{children}</main>
        <footer>Footer</footer>
      </body>
    </html>
  );
};

export default CoreLayout;
