'use client';

import { useEffect, useState } from 'react';
import BookCard from '@/components/BookCard';
import { getAllBook } from '@/services/bookService';

const AllBookPage = () => {
  const [listBook, setListBook] = useState([]);
  const handleGetAllBook = async () => {
    const res = await getAllBook();
    if (res?.data?.errCode === 0) {
      setListBook(res?.data?.books);
    }
  };
  useEffect(() => {
    handleGetAllBook();
    // return () => {
    //   console.log('This will be logged on unmount');
    // };
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
    </div>
  );
};

export default AllBookPage;
