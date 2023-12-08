'use client';
import React, { useCallback, useEffect, useState } from 'react';
import './styled.scss';
import {
  getOrderByAccount,
  getOrderById,
  updateOrder,
} from '@/services/orderService';
import CartItem from './CartItem';
export default function Cart() {
  const [order, setOder] = useState([]);
  const accountID =
    typeof window !== 'undefined'
      ? JSON.parse(sessionStorage?.getItem('auth')).user._id
      : null;

  const handleGetCartByAccount = async (id) => {
    const { data } = await getOrderByAccount(id);
    if (data.order.length > 0) {
      setOder(data.order);
    }
  };
  useEffect(() => {
    handleGetCartByAccount(accountID);
  }, []);

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
                  <th className="p-0">&nbsp;</th>
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
                      handleGetCartByAccount={handleGetCartByAccount}
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
                  <tr className="cart-subtotal">
                    <th>Subtotal</th>
                    <td>
                      {' '}
                      <span>$39.9</span>
                    </td>
                  </tr>
                  <tr className="shipping">
                    <th>Shipping</th>
                    <td>
                      <ul className="shipping_medthod">
                        <li>
                          <label for="flat">Giao Hàng Nhanh</label>
                          <input
                            type="radio"
                            className="shipping_method"
                            id="flat"
                            value="Flat_rate"
                            name="shipping_method"
                          ></input>
                        </li>
                        <li>
                          <label for="free">Giao Hàng Tiết Kiệm</label>
                          <input
                            type="radio"
                            className="shipping_method"
                            id="free"
                            value="Free_shipping"
                            name="shipping_method"
                          ></input>
                        </li>
                        <li>
                          <label for="local">Giao Hàng Hỏa Tốc</label>
                          <input
                            type="radio"
                            className="shipping_method"
                            id="local"
                            value="Local_pickup"
                            name="shipping_method"
                          ></input>
                        </li>
                      </ul>

                      <p className="shipping-destination">
                        Shipping options will be updated during checkout.{' '}
                      </p>
                    </td>
                  </tr>
                  <tr className="order-total">
                    <th>Total</th>
                    <td>
                      {' '}
                      <span>$39.9</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="wc-proceed-to-checkout">
                <button className="checkout-button">
                  <a href="#">Proceed to checkout</a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
