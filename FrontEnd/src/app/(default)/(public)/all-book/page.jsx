'use client';

import { useEffect, useState } from 'react';
import BookCard from '@/components/BookCard';
import ReactPaginate from 'react-paginate';
import {
  getAllBookWithPagination,
  searchBook,
  searchPageBook,
} from '@/services/bookService';
import '../../../../styles/Pagination.scss';
import LoadingPage from '@/components/LoadingPage';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';
const LIMIT_BOOK_PER_PAGE = 15;

const AllBookPage = () => {
  const { t } = useTranslation('books');
  const [listBook, setListBook] = useState([]);
  const [pageCount, setPageCount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const handleGetAllBook = async (page) => {
    setIsLoading(true);
    const res = await getAllBookWithPagination(page, LIMIT_BOOK_PER_PAGE);
    if (res?.data) {
      setListBook(res?.data?.books);
      setPageCount(res?.data?.totalPages);
      setIsLoading(false);
    }
  };
  const handleSearch = debounce(async (term, page) => {
    if (term) {
      setIsLoading(true);
      const res = await searchPageBook(page, LIMIT_BOOK_PER_PAGE, {
        title: term,
      });
      let pageCount = Math.floor(listBook.length / 15);
      console.log(pageCount);

      setListBook(res?.result?.books);
      if (pageCount === 0) {
        pageCount = 1;
        setPageCount(pageCount);
      } else {
        setPageCount(pageCount);
      }
    } else {
      setIsLoading(true);
      const res = await getAllBookWithPagination(page, LIMIT_BOOK_PER_PAGE);
      console.log(res);
      if (res?.data) {
        setListBook(res?.data?.books);
        setPageCount(res?.data?.totalPages);
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  }, 1000);
  const handleChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    handleSearch(newSearchTerm);
  };
  const handlePageClick = (event) => {
    handleGetAllBook(Number(event.selected + 1));
    setCurrentPage(Number(event.selected + 1));
  };
  useEffect(() => {
    handleGetAllBook();
  }, []);
  return (
    <div className="mt-5 wrapper-content">
      <>
        <input
          type="text"
          placeholder={t('search')}
          className="w-full p-3 text-sm font-semibold rounded-md outline-none"
          value={searchTerm}
          onChange={handleChange}
        />
      </>
      {isLoading ? (
        <div className="mx-auto mt-5 w-max">
          <LoadingPage></LoadingPage>
        </div>
      ) : (
        <div className="flex flex-wrap gap-5 mt-5">
          {listBook?.length > 0 &&
            listBook.map((book) => (
              <BookCard key={book._id} data={book}></BookCard>
            ))}
        </div>
      )}
      <div className="mx-auto mt-5 w-max">
        {!isLoading && (
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            className="pagination"
            forcePage={currentPage - 1}
          />
        )}
      </div>
    </div>
  );
};

export default AllBookPage;
