'use client';
import React, { useCallback, useEffect, useState } from 'react';
import './styled.scss';
import {
  getOrderByAccount,
  getOrderByAccountStatus,
  getOrderById,
  updateAllStatusOrder,
  updateOrder,
  updatePayment,
} from '@/services/orderService';
import CartItem from './CartItem';
import { Switch } from 'antd';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { getBookById } from '@/services/bookService';
export default function Cart() {
  const { t } = useTranslation('cart');
  const router = useRouter();
  const [order, setOder] = useState([]);
  const [payment, setPayment] = useState({});
  const [orderStatusTrue, setOrderStatusTrue] = useState({});
  const [isChecked, setIschecked] = useState(false);
  const accountID =
    typeof window !== 'undefined'
      ? JSON.parse(sessionStorage?.getItem('auth'))?.user._id
      : null;

  const handleGetCartByAccount = async (id) => {
    const { data } = await getOrderByAccount(id);
    if (data?.order?.length > 0) {
      setOder(data.order);
    } else {
      setOder({});
    }
  };
  const handleGetCartByAccountStatus = async (id) => {
    const { data } = await getOrderByAccountStatus(id);
    if (data?.order.length > 0) {
      setOrderStatusTrue(data.order);
      const orders = data?.order;
      const total = orders.reduce((acc, order) => {
        const priceDiscount = parseFloat(order.PriceDiscount);
        acc += order.Count * priceDiscount;
        return acc;
      }, 0);

      const booksWithCount = await Promise.all(
        data?.order.map(async (item) => {
          const { Book, Count } = item;
          const totalPrice = parseFloat(Book.price) * parseInt(Count);
          const result = await getBookById(Book._id);

          return {
            ...Book,
            Count,
            price: Book.price,
            quantityNew: result?.data?.book?.quantity,
          };
        })
      );

      setPayment({
        book: booksWithCount,
        totalMoney: total,
      });
    } else {
      setPayment({
        book: [],
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

  async function updatePayments() {
    try {
      const promises = orderStatusTrue.map(async (item) => {
        const kq = await updatePayment({
          IdAccount: accountID,
          BookId: item.Book._id,
        });
        return kq; // Assuming you want to return something after updatePayment
      });
      const results = await Promise.all(promises);
      console.log('All payments updated:', results);
    } catch (error) {
      console.error('Error updating payments:', error);
    }
  }
  const handleCheckout = () => {
    if (payment.totalMoney > 0) {
      const result =
        payment.book.length > 0 &&
        payment.book.every((item) => {
          return parseInt(item.Count) <= parseInt(item.quantityNew);
        });
      if (result) {
        sessionStorage.setItem('bookList', JSON.stringify(payment));
        sessionStorage.setItem('check', true);
        router.push('/check-out');
      } else {
        toast.warn('Product quantity is not enough');
      }
    } else {
      toast.warning('Cart Empty!!!');
    }
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
                  <th className="pr-0 product-name">{t('Product')}</th>
                  <th className="px-0 product-price">{t('Price')}</th>
                  {/* <th className="whitespace-nowrap product-price">
                      Sale price
                    </th> */}
                  <th className="pl-[15px]  product-quantity">
                    {t('Quantity')}
                  </th>
                  <th className="pl-[10px] text-left product-subtotal">
                    {t('Subtotal')}
                  </th>
                  <th className="pl-[10px] text-left product-subtotal">
                    {/* {t('Subtotal')} */}
                    Quantity in stock
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
            <h4 className="title">{t('CartTotal')}</h4>
          </div>
          <div className="wd-cart-totals">
            <div className="cart-totals-inner">
              <table className="table-shop">
                <tbody>
                  <tr className="order-total">
                    <th>{t('Total')}</th>
                    <td>
                      <span>
                        {payment.totalMoney
                          ? payment.totalMoney?.toLocaleString('it-IT', {
                              style: 'currency',
                              currency: 'VND',
                            })
                          : 0}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="wc-proceed-to-checkout">
                <button
                  className="text-white checkout-button"
                  onClick={handleCheckout}
                >
                  {t('Proceedtocheckout')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
