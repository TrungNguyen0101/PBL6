'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  deleteOrder,
  getOrderById,
  updateOrder,
} from '@/services/orderService';
import { toast } from 'react-toastify';
import { Popconfirm } from 'antd';
import { getBookById } from '@/services/bookService';

const CartItem = ({
  cart,
  _id,
  handleGetCartByAccount,
  handleGetCartByAccountStatus,
  checked,
}) => {
  const accountID =
    typeof window !== 'undefined'
      ? JSON.parse(sessionStorage?.getItem('auth')).user._id
      : null;
  const [count, setCount] = useState(cart.Count);
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);
  const [book123, setBook123] = useState({});

  const handleUpdateOrder = async (id, count, status) => {
    try {
      const result = await getOrderById(id);
      if (result && result.data && result.data.order && result.data.order[0]) {
        const data = result.data.order[0];
        if (status === undefined) {
          const kq = await updateOrder({
            IdAccount: data.IdAccount,
            BookId: data.Book._id,
            Count: count,
          });
        } else {
          const kq = await updateOrder({
            IdAccount: data.IdAccount,
            BookId: data.Book._id,
            status: status,
          });
        }
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Error:', error);
    }
  };
  const handleDelete = async () => {
    const result = await deleteOrder(_id);
    toast.success('Delete product successfully');
    await handleGetCartByAccount(accountID);
    await handleGetCartByAccountStatus(accountID);
  };

  const handlerMinus = useCallback(async () => {
    if (count === 1) {
      return;
    } else {
      let resultCount = count - 1;
      await handleUpdateOrder(_id, resultCount);
      setCount(resultCount);
      await handleGetCartByAccountStatus(accountID);
    }
  }, [count]);

  const handlerPlus = useCallback(async () => {
    let resultCount = count + 1;
    await handleUpdateOrder(_id, resultCount);
    setCount(resultCount);
    await handleGetCartByAccountStatus(accountID);
  }, [count]);

  const handleCheckboxChange = async (event) => {
    setLoading(true);
    const checked = event.target.checked;
    await handleUpdateOrder(_id, count, checked);
    await handleGetCartByAccount(accountID);
    await handleGetCartByAccountStatus(accountID);
    setLoading(false);
  };

  useEffect(() => {
    try {
      const handleGetBookByID = async () => {
        // setIsLoading(true);
        const result = await getBookById(cart?.Book._id);
        if (result.data.book) {
          setBook123(result.data.book);
          // setIsLoading(false);
        }
      };
      handleGetBookByID();
    } catch (error) {
      console.log('file: page.jsx:37 ~ useEffect ~ error:', error);
    }
  }, []);
  return (
    <tr className={`${loading ? 'cursor-wait' : ''}`}>
      <td className="p-0 text-center">
        <input
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={checked}
        ></input>
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
            <Popconfirm
              title="Delete the book"
              description="Are you sure to delete this book?"
              onConfirm={handleDelete}
              okText="Yes"
              cancelText="No"
            >
              <button className="absolute top-[-15px] right-[-10px] z-40">
                <i className="fa fa-times" aria-hidden="true"></i>
              </button>
            </Popconfirm>
          </div>
          <span className="">{cart?.Book.booktitle}</span>
        </div>
      </td>
      <td className="p-0 text-center price-amount amount">
        <div className="flex items-center gap-x-[10px]">
          <span className="line-through">
            {cart?.Book.price?.toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })}
          </span>
          <span className="text-red-500">
            {parseFloat(cart?.PriceDiscount)?.toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })}
          </span>
        </div>
      </td>
      {/* <td className="text-center price-amount amount">
                  </td> */}
      <td className="pl-[15px] quantity">
        <div className="col-wrap product-number">
          {count === 1 ? (
            <Popconfirm
              title="Delete the book"
              description="Are you sure to delete this book?"
              onConfirm={handleDelete}
              okText="Yes"
              cancelText="No"
            >
              <button
                onClick={handlerMinus}
                className="justify-center w-full col col-minus"
              >
                <i className="fa fa-light fa-minus fa-xs "></i>
              </button>
            </Popconfirm>
          ) : (
            <button
              onClick={handlerMinus}
              className="justify-center w-full col col-minus"
            >
              <i className="fa fa-light fa-minus fa-xs "></i>
            </button>
          )}
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
          {(parseFloat(cart?.PriceDiscount) * count)?.toLocaleString('it-IT', {
            style: 'currency',
            currency: 'VND',
          })}
        </span>
      </td>
      <td className="p-[10px] text-left price-amount amount-sub">
        <span className="text-black">{book123?.quantity}</span>
      </td>
    </tr>
  );
};

export default CartItem;
