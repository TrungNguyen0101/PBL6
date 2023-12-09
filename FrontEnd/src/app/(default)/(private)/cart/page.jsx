'use client';
import React, { useCallback, useEffect, useState } from 'react';
import './styled.scss';
import {
  getOrderByAccount,
  getOrderByAccountStatus,
  getOrderById,
  updateAllStatusOrder,
  updateOrder,
} from '@/services/orderService';
import CartItem from './CartItem';
import { Switch } from 'antd';
export default function Cart() {
  const [order, setOder] = useState([]);
  const [payment, setPayment] = useState({});
  const [isChecked, setIschecked] = useState(false);
  const accountID =
    typeof window !== 'undefined'
      ? JSON.parse(sessionStorage?.getItem('auth'))?.user._id
      : null;

  const handleGetCartByAccount = async (id) => {
    const { data } = await getOrderByAccount(id);
    if (data?.order?.length > 0) {
      setOder(data.order);
    }
  };
  const handleGetCartByAccountStatus = async (id) => {
    const { data } = await getOrderByAccountStatus(id);
    if (data?.order.length > 0) {
      const orders = data?.order;
      const total = orders.reduce((acc, order) => {
        const priceDiscount = parseFloat(order.PriceDiscount);
        acc += order.Count * priceDiscount;
        return acc;
      }, 0);
      const booksWithCount = data?.order.map((item) => {
        const { Book, Count } = item;
        const totalPrice = parseFloat(Book.price) * parseInt(Count); // Tính tổng giá tiền

        return { ...Book, Count, price: totalPrice }; // Tạo đối tượng mới chứa thông tin sách và Count
      });
      setPayment({
        book: booksWithCount,
        totalMoney: total,
      });
    } else {
      setPayment({
        book: {},
        totalMoney: 0,
      });
    }
  };
  useEffect(() => {
    const handleChangeOffStatus = async () => {
      const result = await updateAllStatusOrder({
        IdAccount: accountID,
        status: false,
      });
      await handleGetCartByAccount(accountID);
    };
    handleChangeOffStatus();
  }, []);

  const onChange = async (checked) => {
    setIschecked(checked);
    const result = await updateAllStatusOrder({
      IdAccount: accountID,
      status: checked,
    });
    handleGetCartByAccount(accountID);
    handleGetCartByAccountStatus(accountID);
  };

  const handleCheckout = () => {
    console.log(payment);
  };
  return (
    <section className="cart-wrapper">
      {/* <!-- ********** -->
  <!--  CART-TABLE -->
  <!-- ********** --> */}
      <div className="cart-table flex items-start justify-between bg-[#f7f7f7]">
        <div className="bg-white product-list w-[70%] max-h-[500px] overflow-y-auto">
          <div className="cart-table-section">
            <table className="table-shop">
              <thead>
                <tr>
                  {/* <th className="product-remove">&nbsp;</th> */}
                  <th className="p-0">
                    <Switch
                      defaultChecked={false}
                      onChange={onChange}
                      className={`${isChecked ? '' : 'bg-[#00000073]'}`}
                    />
                  </th>
                  <th className="pr-0 product-name">Product</th>
                  <th className="px-0 product-price">Price</th>
                  {/* <th className="whitespace-nowrap product-price">
                      Sale price
                    </th> */}
                  <th className="pl-[15px]  product-quantity">Quantity</th>
                  <th className="pl-[10px] text-left product-subtotal">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.length > 0 &&
                  order?.map((item) => (
                    <CartItem
                      key={item._id}
                      cart={item}
                      _id={item._id}
                      checked={item.status}
                      handleGetCartByAccount={handleGetCartByAccount}
                      handleGetCartByAccountStatus={
                        handleGetCartByAccountStatus
                      }
                    ></CartItem>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white cart-totals w-[28%]">
          <div className="liner-continer">
            <h4 className="title">Cart totals</h4>
          </div>
          <div className="wd-cart-totals">
            <div className="cart-totals-inner">
              <table className="table-shop">
                <tbody>
                  <tr className="order-total">
                    <th>Total</th>
                    <td>
                      <span>
                        {payment.totalMoney ? payment.totalMoney : 0} đ
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="wc-proceed-to-checkout">
                <button
                  className="checkout-button text-white"
                  onClick={handleCheckout}
                >
                  Proceed to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
