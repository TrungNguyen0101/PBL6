'use client';

import React, { useState } from 'react';
import CategoryColumnContent from '../CategoryColumnContent';
import { getBookByCategory } from '@/services/bookService';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const CategoryColumnHorror = () => {
  const { t } = useTranslation();
  const [listBookHorror, setListBookHorror] = useState([]);
  const fetchBookByHorror = async () => {
    const res = await getBookByCategory('Horror');
    if (res && res?.data?.errCode === 0) {
      setListBookHorror(res?.data?.book);
    }
  };
  useEffect(() => {
    fetchBookByHorror();
  }, []);
  return (
    <>
      <h1 className="mb-3 font-semibold">{t('Horror')}</h1>
      <div className="flex w-full gap-x-3">
        <div className="flex flex-col w-full bg-white rounded-lg">
          {listBookHorror?.length > 0 &&
            listBookHorror
              ?.slice(0, 5)
              ?.map((book, index) => (
                <CategoryColumnContent key={index} data={book} />
              ))}
        </div>
      </div>
    </>
  );
};

export default CategoryColumnHorror;
