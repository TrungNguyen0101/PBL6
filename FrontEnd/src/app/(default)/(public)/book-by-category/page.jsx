'use client';

import React, { useState, useEffect } from 'react';
import { getBookByCategory } from '@/services/bookService';
import { useSearchParams } from 'next/navigation';
import BookCard from '@/components/BookCard';

const BookByCategoryPage = () => {
  const [listBook, setListBook] = useState([]);
  const searchParam = useSearchParams();
  const category = searchParam.get('value');
  const handleGetAllBook = async () => {
    const res = await getBookByCategory(category);
    if (res && res?.data?.errCode === 0) {
      setListBook(res?.data?.book);
    }
  };
  useEffect(() => {
    handleGetAllBook();
  }, []);
  return (
    <div className="mt-5 wrapper-content">
      <>
        {/* <input
          type="text"
          placeholder="Search book..."
          className="w-full p-3 text-sm font-semibold rounded-md outline-none"
        /> */}
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

export default BookByCategoryPage;
