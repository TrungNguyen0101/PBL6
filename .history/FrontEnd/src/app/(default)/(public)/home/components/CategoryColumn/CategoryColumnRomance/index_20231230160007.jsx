'use client';

import React, { useEffect, useState } from 'react';
import CategoryColumnContent from '../CategoryColumnContent';
import { getBookByCategory } from '@/services/bookService';
import { useTranslation } from 'react-i18next';

const CategoryColumnRomance = () => {
  const { t } = useTranslation();
  const [listBookRomance, setListBookRomance] = useState([]);
  const fetchBookByRomance = async () => {
    const res = await getBookByCategory('Romance');
    if (res && res?.data?.errCode === 0) {
      setListBookRomance(res?.data?.book);
    }
  };
  useEffect(() => {
    fetchBookByRomance();
  }, []);
  return (
    <>
      <h1 className="mb-3 font-semibold">{t('Romance')}</h1>
      <div className="flex w-full gap-x-3">
        <div className="flex flex-col w-full bg-white rounded-lg">
          {listBookRomance?.length > 0 &&
            listBookRomance
              ?.slice(0, 5)
              ?.map((book, index) => (
                <CategoryColumnContent key={index} data={book} />
              ))}
        </div>
      </div>
    </>
  );
};

export default CategoryColumnRomance;
