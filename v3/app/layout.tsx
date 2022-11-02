import { Ubuntu } from '@next/font/google';
import 'styles/globals.css';

const ubuntu = Ubuntu({
  weight: ['300', '400', '700'],
  subsets: [
    'cyrillic',
    // 'cyrillic-ext',
    'latin',
    // 'latin-ext'
  ],
});

interface Props {
  children: React.ReactNode;
}

const CoreLayout = ({ children }: Props) => {
  return (
    <html lang="en" className={ubuntu.className}>
      <body>
        <nav>Header</nav>
        <main>{children}</main>
        <footer>Footer</footer>
      </body>
    </html>
  );
};

export default CoreLayout;
