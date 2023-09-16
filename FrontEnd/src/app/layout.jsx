'use client';

import classNames from 'classnames';
import { Inter, Montserrat } from 'next/font/google';

import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from '@/redux/store';

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
        <Provider store={store}>{children}</Provider>
        <ToastContainer autoClose={1000} />
      </body>
    </html>
  );
}
