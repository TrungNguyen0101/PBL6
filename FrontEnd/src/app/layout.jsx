'use client';

import classNames from 'classnames';
import { Inter, Montserrat } from 'next/font/google';

import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/scss/scrollbar';
import 'swiper/scss/pagination';
import 'swiper/css/navigation';
import 'swiper/scss';
import '../../node_modules/nprogress/nprogress.css';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import Backtop from '@/components/Backtop';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

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
        <Backtop />
      </body>
    </html>
  );
}
