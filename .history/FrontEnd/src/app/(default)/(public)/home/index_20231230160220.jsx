'use client';

import routes from '@/constant/routes';
import Link from 'next/link';
import Heading from '@/components/Heading';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CategoryColumnHorror from './components/CategoryColumn/CategoryColumnHorror';
import Category from './components/Category';
import Banner from './components/Banner';
import { BsFillBookmarkFill, BsFillBookFill } from 'react-icons/bs';
import BookList from '@/components/BookList';
import CategoryColumnAction from './components/CategoryColumn/CategoryColumnAction';
import CategoryColumnRomance from './components/CategoryColumn/CategoryColumnRomance';
import CategoryComedy from './components/CategoryColumn/CategoryComedy';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  return (
    <main>
      <Header />
      <div className="banner">
        <Banner />
      </div>
      <div className="mt-10 wrapper-content">
        <div className="w-full p-4 bg-white rounded-lg">
          <div className="flex items-center pb-2 border-b border-b-gray-500 gap-x-2">
            <BsFillBookmarkFill size="15px" color="#6d4eec" />
            <Heading>{t('Category')}</Heading>
          </div>
          <Category />
        </div>
        <div className="w-full p-4 mt-10 bg-white rounded-lg">
          <div className="flex items-center pb-2 border-b border-b-gray-500 gap-x-2">
            <BsFillBookFill size="15px" color="#6d4eec" />
            <Heading>{t('AllBooks')}</Heading>
          </div>
          <BookList />
        </div>
        <div className="flex mt-10 gap-x-5">
          <div className="w-1/4">
            <CategoryColumnAction />
          </div>
          <div className="w-1/4">
            <CategoryColumnHorror />
          </div>
          <div className="w-1/4">
            <CategoryComedy />
          </div>
          <div className="w-1/4">
            <CategoryColumnRomance />
          </div>
        </div>
        <span className="flex justify-end mt-3">
          <Link
            href={routes.ALLBOOK}
            className="inline-block py-1 text-xs px-4 bg-[#6d4eec] text-white rounded-3xl hover:bg-opacity-70 transition-all"
          >
            {t('DisscoverAll')}
          </Link>
        </span>
      </div>
      <Footer />
    </main>
  );
}
