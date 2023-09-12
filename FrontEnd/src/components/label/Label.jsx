import React from 'react';

const Label = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className="text-xl font-semibold cursor-pointer">
      {children}
    </label>
  );
};

export default Label;
