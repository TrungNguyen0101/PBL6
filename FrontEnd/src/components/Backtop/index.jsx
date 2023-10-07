import Link from 'next/link';
import React from 'react';
import { MdOutlineKeyboardArrowUp } from 'react-icons/md';

const Backtop = () => {
  return (
    <span className="fixed bottom-5 right-5 rounded-full z-30 w-10 h-10 backtop bg-[#6d4eec] flex items-center justify-center hover:bg-opacity-70 transition-all">
      <Link href="#" className="flex items-center justify-center w-full h-full">
        <MdOutlineKeyboardArrowUp size="30px" color="white" />
      </Link>
    </span>
  );
};

export default Backtop;
