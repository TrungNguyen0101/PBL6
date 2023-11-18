'use client';

import BookCard from '@/components/BookCard';
import { getAllBook } from '@/services/bookService';
import { useEffect } from 'react';

const AllBookPage = () => {
  const handleGetAllBook = async () => {
    const res = await getAllBook();
    console.log('check', res);
  };
  useEffect(() => {
    handleGetAllBook();
  }, []);
  return (
    <div className="wrapper-content mt-5">
      <>
        <input
          type="text"
          placeholder="Search book..."
          className="p-3 rounded-md w-full outline-none text-sm font-semibold"
        />
      </>
      <div className="flex">
        <BookCard></BookCard>
        <BookCard></BookCard>
        <BookCard></BookCard>
        <BookCard></BookCard>
        <BookCard></BookCard>
      </div>
    </div>
  );
};

export default AllBookPage;
