import React from 'react';

const Button = ({ kind, children }) => {
  let bgcClassName = '';
  switch (kind) {
    case 'primary':
      break;
    case 'secondary':
      bgcClassName = 'bg-white';
      break;
    default:
      break;
  }
  return (
    <button
      type="submit"
      className={`p-2 w-full text-xl font-bold text-center cursor-pointer rounded-md ${bgcClassName}`}
    >
      {children}
    </button>
  );
};

export default Button;
