import React from 'react';
import CategoryColumnContent from '../CategoryColumnContent';

const CategoryColumnHorror = () => {
  return (
    <>
      <h1 className="mb-3 font-semibold">Kinh Dị</h1>
      <div className="flex w-full gap-x-3">
        <div className="flex flex-col w-full bg-white rounded-lg">
          <CategoryColumnContent />
          <CategoryColumnContent />
          <CategoryColumnContent />
          <CategoryColumnContent />
          <CategoryColumnContent />
        </div>
      </div>
    </>
  );
};

export default CategoryColumnHorror;
