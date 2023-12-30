'use client';

import classNames from 'classnames';
import { Inter, Montserrat } from 'next/font/google';
import Script from 'next/script';

import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/scss/scrollbar';
import 'swiper/scss/pagination';
import 'swiper/css/navigation';
import 'swiper/scss';
import '../../node_modules/nprogress/nprogress.css';
import 'sweetalert2/src/sweetalert2.scss';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import Backtop from '@/components/Backtop';
import '@/components/i18n/i18n';

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
      <head>
        {/* <Script>
          {typeof window !== 'undefined' &&
            (function (w, d, s, l, i) {
              w[l] = w[l] || [];
              w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
              var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
              j.async = true;
              j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
              f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', 'GTM-WV3P6XBH')}
        </Script> */}

        <Script
          id="tag_manager_script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WV3P6XBH');
              `,
          }}
        />

        {/* <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-Y35FP8XXTL"
        ></Script>
        <Script
          id="clarity_script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Y35FP8XXTL');
            `,
          }}
        /> */}
      </head>
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
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WV3P6XBH"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
      </body>
    </html>
  );
}
