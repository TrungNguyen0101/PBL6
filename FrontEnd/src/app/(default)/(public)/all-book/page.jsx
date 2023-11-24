'use client';

import { useEffect, useState } from 'react';
import BookCard from '@/components/BookCard';
import ReactPaginate from 'react-paginate';
import { getAllBookWithPagination } from '@/services/bookService';

const AllBookPage = () => {
  const [listBook, setListBook] = useState([]);
  const handleGetAllBook = async () => {
    const res = await getAllBookWithPagination(1, 100000);
    console.log(res);
    if (res?.data) {
      setListBook(res?.data?.books);
    }
  };
  useEffect(() => {
    handleGetAllBook();
  }, []);
  return (
    <div className="mt-5 wrapper-content">
      <>
        <input
          type="text"
          placeholder="Search book..."
          className="w-full p-3 text-sm font-semibold rounded-md outline-none"
        />
      </>
      <div className="flex flex-wrap gap-5 mt-5">
        {listBook?.length > 0 &&
          listBook.map((book) => (
            <BookCard key={book._id} data={book}></BookCard>
          ))}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        // onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={20}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default AllBookPage;
