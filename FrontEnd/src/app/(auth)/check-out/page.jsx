'use client';
import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import axios from 'axios';
import { toast } from 'react-toastify';
import { postPayment, postPaymentDirect } from '@/services/paymentService';
import { useRouter } from 'next/navigation';
import { getBookById } from '@/services/bookService';
import TableAnt from '@/components/TableAnt';
import { BsBank } from 'react-icons/bs';
import { GiTakeMyMoney } from 'react-icons/gi';
import '../../../styles/Input.scss';
import { updatePayment } from '@/services/orderService';

const CheckOutPage = () => {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [listLocation, setListLocation] = useState([]);
  const [isCheck, setIsCheck] = useState(null);
  const [isShowListLocation, setIsShowListLocation] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [book, setBook] = useState(null);
  const accountID =
    typeof window !== 'undefined'
      ? JSON.parse(sessionStorage?.getItem('auth'))?.user._id
      : null;
  const fetchAllLocation = async () => {
    const res = await axios.get(
      `https://rsapi.goong.io/Place/AutoComplete?api_key=GS65AY8rHZnAKAMvfwP8tZvMNaszJrCS1bZM6NYg&input=${location}`
    );
    if (res && res?.status === 200) {
      setListLocation(res?.data?.predictions);
    }
  };

  async function updatePayments() {
    try {
      const promises = book?.book.map(async (item) => {
        console.log('++++++++++', item._id);
        const kq = await updatePayment({
          IdAccount: accountID,
          BookId: item._id,
        });
        return kq; // Assuming you want to return something after updatePayment
      });
      const results = await Promise.all(promises);
      console.log('All payments updated:', results);
    } catch (error) {
      console.error('Error updating payments:', error);
    }
  }

  const fetchBookById = async () => {
    const idBook = sessionStorage.getItem('idBook');
    if (!idBook) return;
    const res = await getBookById(idBook);
    const count = sessionStorage.getItem('count');
    const pricePerBook = sessionStorage.getItem('pricePerBook');
    if (res && res?.data && res?.data?.book) {
      let totalMoney = 0;
      book?.book?.forEach((item) => {
        if (item.discount > 0) {
          totalMoney += (item.price * count * (100 - item.discount)) / 100;
          console.log(totalMoney);
        } else totalMoney += item.price * item.quantity;
      });
      setBook({
        book: [
          {
            ...res?.data?.book,
            Count: count,
            price: JSON.parse(pricePerBook),
          },
        ],
        totalMoney: totalMoney,
      });
    }
  };
  const handleOnChangeLocation = (event) => {
    setLocation(event.target.value);
    setIsShowListLocation(true);
  };
  const handleCheckOutByDirect = async () => {
    const res = await postPaymentDirect(
      location,
      phoneNumber,
      book?.totalMoney,
      book?.book
    );
    updatePayments();
  };
  const handleCheckOutByVNPAY = async () => {
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
    if (res && res?.data) {
      router.push(res?.data);
    }
    updatePayments();
  };
  useEffect(() => {
    fetchAllLocation();
  }, [location]);
  useEffect(() => {
    const check = sessionStorage.getItem('check');
    const bookList = sessionStorage.getItem('bookList');
    setIsCheck(check);
    if (JSON.parse(check) === true) {
      setBook(JSON.parse(bookList));
    } else if (JSON.parse(check) === false) {
      fetchBookById();
    }
  }, [isCheck]);
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
      <div className="mt-7 w-[850px] mx-auto bg-[#f2f3f4] shadow-xl rounded-md p-8">
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
                  className="input w-full py-[10px] pl-[10px] text-base rounded-md outline-none font-semibold"
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
                  className="input w-full py-[10px] pl-[10px] text-base rounded-md outline-none font-semibold"
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
              <div
                className="flex items-center cursor-pointer mb-[5px] gap-x-1 w-max hover:text-[#6d4eec] transition-all"
                onClick={handleCheckOutByDirect}
              >
                <span>
                  <GiTakeMyMoney size="25px" />
                </span>
                <span className="font-semibold">Thanh toán trực tiếp</span>
              </div>
              <div
                className="flex items-center cursor-pointer gap-x-1 w-max hover:text-[#6d4eec] transition-all"
                onClick={handleCheckOutByVNPAY}
              >
                <span>
                  <BsBank size="20px" />
                </span>
                <span className="font-semibold">Thanh toán qua VNPAY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOutPage;
