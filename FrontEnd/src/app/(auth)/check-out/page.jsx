'use client';
import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import axios from 'axios';
import { toast } from 'react-toastify';
import { postPayment } from '@/services/paymentService';

const CheckOutPage = () => {
  const [location, setLocation] = useState('');
  const [listLocation, setListLocation] = useState([]);
  const [isShowListLocation, setIsShowListLocation] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const fetchAllLocation = async () => {
    const res = await axios.get(
      `https://rsapi.goong.io/Place/AutoComplete?api_key=GS65AY8rHZnAKAMvfwP8tZvMNaszJrCS1bZM6NYg&input=${location}`
    );
    if (res && res?.status === 200) {
      setListLocation(res?.data?.predictions);
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
    const priceBook = sessionStorage.getItem('priceBook');
    const res = await postPayment(priceBook, phoneNumber, location, '');
    console.log('check res:', res);
  };
  useEffect(() => {
    fetchAllLocation();
  }, [location]);
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
      <div className="w-[800px] mx-auto">
        <div className="mt-10">
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
