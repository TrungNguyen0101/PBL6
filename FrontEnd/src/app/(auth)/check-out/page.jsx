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
import { useTranslation } from 'react-i18next';

const CheckOutPage = () => {
  const { t } = useTranslation('checkout');
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [listLocation, setListLocation] = useState([]);
  const [isCheck, setIsCheck] = useState(null);
  const [isShowListLocation, setIsShowListLocation] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
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
        const kq = await updatePayment({
          IdAccount: accountID,
          BookId: item._id,
        });
        return kq; // Assuming you want to return something after updatePayment
      });
      const results = await Promise.all(promises);
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
      let price = 0;
      if (res?.data?.book?.discount > 0) {
        totalMoney =
          (pricePerBook * count * (100 - res?.data?.book?.discount)) / 100;
      } else {
        totalMoney = pricePerBook * count;
      }
      setBook({
        book: [
          {
            ...res?.data?.book,
            Count: count,
            price: JSON.parse(pricePerBook),
            totalMoney: Number(totalMoney),
          },
        ],
        totalMoney: Number(totalMoney),
      });
    }
  };

  const handleOnChangeLocation = (event) => {
    setLocation(event.target.value);
    setIsShowListLocation(true);
  };
  const handleCheckOutByDirect = async () => {
    if (!name) {
      toast.warning('Vui lòng nhập tên!!!');
      return;
    } else if (!phoneNumber) {
      toast.warning('Vui lòng nhập số điện thoại!!!');
      return;
    } else if (!location) {
      toast.warning('Vui lòng nhập địa chỉ');
      return;
    }
    const res = await postPaymentDirect(
      name,
      location,
      phoneNumber,
      book?.totalMoney,
      book?.book
    );
    if (res) toast.success('Thanh toán thành công');
    updatePayments();
    router.push('/');
    sessionStorage.removeItem('priceBook');
    sessionStorage.removeItem('count');
    sessionStorage.removeItem('check');
    sessionStorage.removeItem('idBook');
    sessionStorage.removeItem('pricePerBook');
    sessionStorage.removeItem('book');
  };
  const handleCheckOutByVNPAY = async () => {
    if (!name) {
      toast.warning('Vui lòng nhập tên!!!');
      return;
    } else if (!phoneNumber) {
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
      router.push('/');
      window.open(res?.data, '_blank');
    }
    const check = sessionStorage.getItem('check');
    if (check === 'true') {
      updatePayments();
    }
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
      <form
        className="mt-7 w-[850px] mx-auto bg-[#f2f3f4] shadow-xl rounded-md p-8"
        autoComplete="off"
      >
        <TableAnt dataAccount={book} />
        <div className="mx-auto">
          <div className="mb-7">
            <h2 className="mb-2 text-2xl font-semibold">
              1. {t('FillInformation')}
            </h2>
            <div className="flex gap-x-3">
              <div className="flex flex-col w-[33.33%] gap-y-2">
                <label htmlFor="phone-number" className="font-semibold">
                  {t('Entername')}
                </label>
                <input
                  value={name}
                  id="phone-number"
                  type="text"
                  placeholder={t('EN')}
                  className="input w-full py-[10px] pl-[10px] text-base rounded-md outline-none font-semibold"
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div className="flex flex-col w-[33.33%] gap-y-2">
                <label htmlFor="phone-number" className="font-semibold">
                  {t('Enterphone')}
                </label>
                <input
                  value={phoneNumber}
                  id="phone-number"
                  type="number"
                  placeholder={t('EP')}
                  className="input w-full py-[10px] pl-[10px] text-base rounded-md outline-none font-semibold"
                  onChange={(event) => setPhoneNumber(event.target.value)}
                />
              </div>
              <div className="relative flex flex-col w-[33.33%] gap-y-2">
                <label htmlFor="location" className="font-semibold">
                  {t('EnterAddress')}
                </label>
                <input
                  id="location"
                  value={location}
                  type="text"
                  className="input w-full py-[10px] pl-[10px] text-base rounded-md outline-none font-semibold"
                  placeholder={t('EA')}
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
            <h2 className="mb-2 text-2xl font-semibold">2. {t('method')}</h2>
            <div>
              <div
                className="flex items-center cursor-pointer mb-[5px] gap-x-1 w-max hover:text-[#6d4eec] transition-all"
                onClick={handleCheckOutByDirect}
              >
                <span>
                  <GiTakeMyMoney size="25px" />
                </span>
                <span className="font-semibold">{t('cash')}</span>
              </div>
              <div
                className="flex items-center cursor-pointer gap-x-1 w-max hover:text-[#6d4eec] transition-all"
                onClick={handleCheckOutByVNPAY}
              >
                <span>
                  <BsBank size="20px" />
                </span>
                <span className="font-semibold">{t('VNPAY')}</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CheckOutPage;
