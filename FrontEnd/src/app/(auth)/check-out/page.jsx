'use client';
import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import axios from 'axios';
import { toast } from 'react-toastify';
import { postPayment } from '@/services/paymentService';
import { useRouter } from 'next/navigation';
import { getBookById } from '@/services/bookService';
import TableAnt from '@/components/TableAnt';

const CheckOutPage = () => {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [listLocation, setListLocation] = useState([]);
  const [isShowListLocation, setIsShowListLocation] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [book, setBook] = useState(null);
  const idBook = sessionStorage.getItem('idBook');
  if (!idBook) return;
  const fetchAllLocation = async () => {
    const res = await axios.get(
      `https://rsapi.goong.io/Place/AutoComplete?api_key=GS65AY8rHZnAKAMvfwP8tZvMNaszJrCS1bZM6NYg&input=${location}`
    );
    if (res && res?.status === 200) {
      setListLocation(res?.data?.predictions);
    }
  };
  const fetchBookById = async () => {
    const res = await getBookById(idBook);
    const count = sessionStorage.getItem('count');
    const priceBook = sessionStorage.getItem('priceBook');
    // if (check === true) return;
    if (res && res?.data && res?.data?.book) {
      setBook({
        book: [
          {
            ...res?.data?.book,
            Count: count,
            price: count * res?.data?.book?.price,
          },
        ],
        totalMoney: priceBook,
      });
    }
  };
  const handleOnChangeLocation = (event) => {
    setLocation(event.target.value);
    setIsShowListLocation(true);
  };
  const handleCheckOut = async () => {
    if (!phoneNumber) {
      toast.warning('Vui lòng nhập số điện thoại!!!');
      return;
    } else if (!location) {
      toast.warning('Vui lòng nhập địa chỉ');
      return;
    }
    const res = await postPayment(
      book?.totalMoney,
      phoneNumber,
      location,
      '',
      'vn',
      book?.book
    );
    console.log('check', res);
    if (res && res?.data) {
      // router.push(res?.data);
    }
  };
  useEffect(() => {
    fetchAllLocation();
  }, [location]);
  useEffect(() => {
    const check = sessionStorage.getItem('check');
    const bookList = sessionStorage.getItem('bookList');
    console.log('first', check);
    if (JSON.parse(check) === false) {
      console.log(1);
      fetchBookById();
    } else {
      console.log(2);
      setBook(JSON.parse(bookList));
    }
  }, [idBook]);
  useEffect(() => {
    const listLocation = document.querySelectorAll('.location-item');
    function getLocation(e) {
      for (let i = 0; i < listLocation.length; i++) {
        if (e.target === listLocation[i]) {
          setLocation(listLocation[i].textContent);
          setIsShowListLocation(false);
        }
      }
    }
    listLocation.forEach((item) => item.addEventListener('click', getLocation));
  }, [location]);
  return (
    <>
      <Header></Header>
      <div className="mt-7 w-[850px] mx-auto">
        <TableAnt dataAccount={book} />
        <div className="mx-auto">
          <div className="mb-7">
            <h2 className="mb-2 text-2xl font-semibold">1. Điền thông tin</h2>
            <div className="flex gap-x-3">
              <div className="flex flex-col w-1/2 gap-y-2">
                <label htmlFor="phone-number" className="font-semibold">
                  Nhập số điện thoại
                </label>
                <input
                  value={phoneNumber}
                  id="phone-number"
                  type="text"
                  placeholder="Số điện thoại"
                  className="p-2 text-base rounded outline-none"
                  onChange={(event) => setPhoneNumber(event.target.value)}
                />
              </div>
              <div className="relative flex flex-col w-1/2 gap-y-2">
                <label htmlFor="location" className="font-semibold">
                  Nhập địa chỉ
                </label>
                <input
                  id="location"
                  value={location}
                  type="text"
                  className="p-2 text-base rounded outline-none"
                  placeholder="Enter a location"
                  onChange={(event) => handleOnChangeLocation(event)}
                />
                {isShowListLocation && location && (
                  <div className="absolute w-full h-[150px] top-full translate-y-[10px] bg-white shadow-xl rounded p-4 overflow-auto list-location">
                    {listLocation?.length > 0 &&
                      listLocation?.map((d, index) => (
                        <div
                          key={index}
                          className="cursor-pointer location-item bg-transparent hover:bg-[#eee] p-[5px]"
                        >
                          {d?.description}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <h2 className="mb-2 text-2xl font-semibold">
              2. Chọn phương thức thanh toán
            </h2>
            <div>
              <div className="flex items-center mb-1 gap-x-1">
                <input
                  type="radio"
                  name="checkout"
                  id="direct"
                  defaultChecked={true}
                  className="cursor-pointer"
                />
                <label htmlFor="direct" className="cursor-pointer">
                  Thanh toán khi nhận hàng
                </label>
              </div>
              <div className="flex items-center cursor-pointer gap-x-1">
                <input
                  type="radio"
                  name="checkout"
                  id="bank"
                  className="cursor-pointer"
                />
                <label htmlFor="bank" className="cursor-pointer">
                  Thanh toán qua VNPAY
                </label>
              </div>
            </div>
            <button
              className="bg-[#1677ff] text-white font-semibold py-[6px] px-3 rounded block w-max mx-auto mt-2 hover:bg-opacity-70 transition-all"
              onClick={handleCheckOut}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOutPage;
