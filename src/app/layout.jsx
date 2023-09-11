import classNames from 'classnames';
import { Inter, Montserrat } from 'next/font/google';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata = {
  title: 'Wiicamp - Next.js Template',
  description: 'Created by Wiicamp',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={classNames(
          inter.variable,
          montserrat.variable,
          'flex flex-col min-h-screen'
        )}
      >
        {children}
      </body>
    </html>
  );
}
