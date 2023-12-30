'use client';

import React, { useEffect, useState } from 'react';
import CategoryColumnContent from '../CategoryColumnContent';
import { getBookByCategory } from '@/services/bookService';
import { useTranslation } from 'react-i18next';

const CategoryComedy = () => {
  const { t } = useTranslation();
  const [listBookComedy, setBookListComedy] = useState([]);
  const fetchBookByComedy = async () => {
    const res = await getBookByCategory('Comedy');
    if (res && res?.data?.errCode === 0) {
      setBookListComedy(res?.data?.book);
    }
  };
  useEffect(() => {
    fetchBookByComedy();
  }, []);
  return (
    <>
      <h1 className="mb-3 font-semibold">{t('Comedy')}</h1>
      <div className="flex w-full gap-x-3">
        <div className="flex flex-col w-full bg-white rounded-lg">
          {listBookComedy?.length > 0 &&
            listBookComedy
              ?.slice(0, 5)
              ?.map((book, index) => (
                <CategoryColumnContent key={index} data={book} />
              ))}
        </div>
      </div>
    </>
  );
};

export default CategoryComedy;
