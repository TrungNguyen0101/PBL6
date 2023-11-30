'use client';

import React, { useCallback, useState } from 'react';
import Image from 'next/image';

const CartItem = ({ cart }) => {
  const [count, setCount] = useState(cart.Count);

  const handlerMinus = useCallback(() => {
    if (count === 1) {
      setCount(1);
    } else {
      setCount(count - 1);
    }
  }, [count]);
  const handlerPlus = useCallback(() => {
    setCount(count + 1);
  }, [count]);
  return (
    <tr>
      <td className="p-0">
        <input type="checkbox"></input>
      </td>
      <td className="">
        <div className="flex flex-row items-center gap-x-[10px]">
          <div className="relative">
            <Image
              src={cart?.Book.mainImage[0].url}
              alt=""
              width={200}
              height={200}
              className="item-img max-w-[80px] object-cover"
            />
            <button className="absolute top-[-15px] right-[-10px] z-40">
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          </div>
          <span className="">{cart?.Book.booktitle}</span>
        </div>
      </td>
      <td className="p-0 text-center price-amount amount">
        <div className="flex items-center gap-x-[10px]">
          <span className="line-through">${cart?.Book.price?.toFixed(2)}</span>
          <span className="text-red-500">
            ${parseFloat(cart?.PriceDiscount).toFixed(2)}
          </span>
        </div>
      </td>
      {/* <td className="text-center price-amount amount">
                  </td> */}
      <td className="pl-[15px] quantity">
        <div className="col-wrap product-number">
          <button
            onClick={handlerMinus}
            className="justify-center w-full col col-minus"
          >
            <i className="fa fa-light fa-minus fa-xs "></i>
          </button>
          <span className="justify-center w-full col col-number">{count}</span>
          <button
            onClick={handlerPlus}
            className="justify-center w-full col col-plus"
          >
            <i className="fa fa-light fa-plus fa-xs"></i>
          </button>
        </div>
      </td>
      <td className="p-[10px] text-left price-amount amount-sub">
        <span className="">
          ${(parseFloat(cart?.PriceDiscount) * count).toFixed(2)}
        </span>
      </td>
    </tr>
  );
};

export default CartItem;
