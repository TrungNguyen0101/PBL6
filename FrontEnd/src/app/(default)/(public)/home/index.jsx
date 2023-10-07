import routes from '@/constant/routes';
import Link from 'next/link';
import Heading from '@/components/Heading';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CategoryHumorous from './components/CategoryColumn/CategoryHumorous';
import CategoryColumnLove from './components/CategoryColumn/CategoryColumnLove';
import CategoryColumnLiterature from './components/CategoryColumn/CategoryColumnLiterature';
import CategoryColumnHorror from './components/CategoryColumn/CategoryColumnHorror';
import Category from './components/Category';
import Banner from './components/Banner';
import { BsFillBookmarkFill, BsFillBookFill } from 'react-icons/bs';
import BookList from '@/components/BookList';

export default function Home() {
  return (
    <main>
      <Header />
      <div>
        <Banner />
      </div>
      <div className="mt-10 wrapper-content">
        <div className="w-full p-4 bg-white rounded-lg">
          <div className="flex items-center pb-2 border-b border-b-gray-500 gap-x-2">
            <BsFillBookmarkFill size="15px" color="#6d4eec" />
            <Heading>Thể loại</Heading>
          </div>
          <Category />
        </div>
        <div className="w-full p-4 mt-10 bg-white rounded-lg">
          <div className="flex items-center pb-2 border-b border-b-gray-500 gap-x-2">
            <BsFillBookFill size="15px" color="#6d4eec" />
            <Heading>Phổ biến</Heading>
          </div>
          <BookList />
        </div>
        <div className="flex mt-10 gap-x-5">
          <div className="w-1/4">
            <CategoryColumnLove />
          </div>
          <div className="w-1/4">
            <CategoryColumnHorror />
          </div>
          <div className="w-1/4">
            <CategoryHumorous />
          </div>
          <div className="w-1/4">
            <CategoryColumnLiterature />
          </div>
        </div>
        <span className="flex justify-end mt-3">
          <Link
            href={routes.HOME}
            className="inline-block py-1 text-xs px-4 bg-[#6d4eec] text-white rounded-3xl hover:bg-opacity-70 transition-all"
          >
            Discover all
          </Link>
        </span>
      </div>
      <Footer />
    </main>
  );
}
