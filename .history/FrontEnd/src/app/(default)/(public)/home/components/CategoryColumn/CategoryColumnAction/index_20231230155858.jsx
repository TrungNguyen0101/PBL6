'use client';

import React, { useEffect, useState } from 'react';
import CategoryColumnContent from '../CategoryColumnContent';
import { getBookByCategory } from '@/services/bookService';
import { useTranslation } from 'react-i18next';

const CategoryColumnAction = () => {
  const { t } = useTranslation();
  const [listBookAction, setListBookAction] = useState([]);
  const fetchBookByAction = async () => {
    const res = await getBookByCategory('Action');
    if (res && res?.data?.errCode === 0) {
      setListBookAction(res?.data?.book);
    }
  };
  useEffect(() => {
    fetchBookByAction();
  }, []);
  return (
    <>
      <h1 className="mb-3 font-semibold">{t('Actions')}</h1>
      <div className="flex w-full gap-x-3">
        <div className="flex flex-col w-full bg-white rounded-lg">
          {listBookAction?.length > 0 &&
            listBookAction
              ?.slice(0, 5)
              ?.map((book, index) => (
                <CategoryColumnContent key={index} data={book} />
              ))}
        </div>
      </div>
    </>
  );
};

export default CategoryColumnAction;
