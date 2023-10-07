'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const Button = ({ kind, children, to, isBorder = false }) => {
  const router = useRouter();
  let bgcClassName = '';
  let colorText = '';
  switch (kind) {
    case 'primary':
      bgcClassName = 'bg-[#6d4eec]';
      colorText = 'text-white';
      break;
    case 'secondary':
      bgcClassName = 'bg-white';
      colorText = 'text-black';
      break;
    default:
      break;
  }
  return (
    <button
      type="submit"
      className={`px-6 py-2 w-max text-base font-semibold cursor-pointer rounded-md hover:opacity-80 transition-all ${bgcClassName} ${colorText} ${
        isBorder ? 'border border-black' : ''
      }`}
      onClick={() => router.push(to)}
    >
      {children}
    </button>
  );
};

export default Button;
