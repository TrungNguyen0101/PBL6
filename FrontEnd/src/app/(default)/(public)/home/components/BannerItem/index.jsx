import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const BannerItem = ({ book }) => {
  const { t } = useTranslation();
  return (
    <div className="w-full h-[600px] relative">
      <div className="absolute inset-0 bg-black rounded-md bg-opacity-40"></div>
      {book?.descImage?.length > 0 &&
        book?.descImage
          ?.slice(0, 1)
          .map((b, index) => (
            <img
              key={index}
              src={b?.url}
              alt=""
              className="object-cover w-full h-full"
            />
          ))}
      <div className="absolute bottom-16 left-10 text-white w-[600px] flex flex-col gap-y-3">
        <h2 className="text-2xl">
          {t('Booktitle')}: {book?.booktitle}
        </h2>
        <span className="inline-block text-lg">
          {'Category'}: {book?.category}
        </span>
        <p className="mb-2 text-base font-light leading-6">
          {t('Description')}: {book?.desc}
        </p>
        <Link
          href={`/product/${book?._id}`}
          className="bg-[#6d4eec] w-max p-[15px] font-semibold text-base rounded-md hover:bg-opacity-60 transition-all"
        >
          {t('Details')}
        </Link>
      </div>
    </div>
  );
};

export default BannerItem;
