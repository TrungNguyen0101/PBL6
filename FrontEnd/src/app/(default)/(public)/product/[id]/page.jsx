'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Raiting from '@/components/Raiting';
import LoadingPage from '@/components/LoadingPage';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import { getOrderByAccount, postOrder } from '@/services/orderService';
import {
  deleteCommnet,
  getAllCommentByBook,
  postComment,
} from '@/services/commentService';
import {
  getAllBooksByDiscount,
  getBookByCategory,
  getBookById,
} from '@/services/bookService';
import { format } from 'date-fns';
import { Badge } from 'antd';
import { FaTrashAlt } from 'react-icons/fa';
import '../style/styled.scss';
import '../style/SwiperButton.scss';
import { da } from 'date-fns/locale';
import Swal from 'sweetalert2';
import Popover from '@/components/Popover';
import { useTranslation } from 'react-i18next';

const ProductDetail = () => {
  const { t } = useTranslation('books');
  const router = useRouter();
  const [routeLoading, setRouteLoading] = useState(false);
  const [value, setValue] = useState(0);
  const [orderLength, setOrderLength] = useState(0);
  const [book, setBook] = useState();
  const [bookDiscount, setBookDiscount] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(1);
  const [listCommentByBook, setListCommentByBook] = useState([]);
  const [comment, setComment] = useState('');
  const [auth, setAuth] = useState(null);
  const cmtRef = useRef();
  const { id } = useParams();
  const parsedDate = new Date(book !== undefined && book?.datePicker);
  const formattedDate = format(parsedDate, 'dd/MM/yyyy');
  const [orderItem, setOrderItem] = useState([]);
  const [listBookCategory, setListBookCategory] = useState([]);
  const maxItem = 5;
  const account =
    typeof window !== 'undefined'
      ? JSON.parse(sessionStorage?.getItem('auth'))
      : null;
  const priceDiscount =
    book?.discount !== 0 ? (book?.price * (100 - book?.discount)) / 100 : '';

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

  const handleGetLengthCart = async () => {
    const { data } = await getOrderByAccount(account?.user?._id);
    if (data?.order?.length > 0) {
      setOrderLength(data?.order?.length);
    }
  };
  const handleGetItemCart = async () => {
    const { data } = await getOrderByAccount(account?.user?._id);
    if (data?.order?.length > 0) {
      setOrderItem(data?.order);
    }
  };
  const handleAddCart = async () => {
    try {
      if (account) {
        if (count > book.quantity) {
          toast.warn('Product quantity is not enough');
        } else {
          const formData = {
            IdAccount: account?.user?._id,
            Book: book,
            PriceDiscount:
              priceDiscount !== ''
                ? priceDiscount.toFixed(2)
                : book?.price.toFixed(2),
            Count: count,
          };
          const result = await postOrder(formData);
          if (result?.data?.errCode === 200) {
            toast.success('Add book to cart successfully');
            handleGetLengthCart();
          } else {
            toast.error('Add book to cart fail');
          }
        }
      } else {
        toast.error('Please log in');
      }
    } catch (error) {
      toast.success('Add book to cart fail');
    }
  };

  const fetchAllCommentByBook = async () => {
    const res = await getAllCommentByBook(id);
    if (res && res?.data) {
      setListCommentByBook(res?.data?.comments);
    }
  };
  const handleAddComment = async () => {
    const auth = sessionStorage.getItem('auth');
    if (!auth) {
      toast.warning('Vui lòng đăng nhập!!!');
      return;
    }
    const res = await postComment(id, comment);
    if (res && res.data) {
      fetchAllCommentByBook();
      setComment('');
      cmtRef.current.value = '';
      toast.success(res.message);
    }
  };
  const handleDeleteComment = (idComment) => {
    const auth = sessionStorage.getItem('auth');
    if (!auth) {
      toast.warning('Bạn chưa đăng nhập!!!');
      return;
    }
    Swal.fire({
      title: 'Bạn có muốn xóa comment này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Vâng, hãy xóa nó!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteCommnet(idComment);
        if (res && res.message === 'Comment successfully deleted') {
          Swal.fire({
            title: 'Xóa!',
            text: 'Comment đã được xóa!',
            icon: 'success',
          });
          fetchAllCommentByBook();
        } else {
          Swal.fire({
            title: 'Xóa!',
            text: 'Comment chưa được xóa!',
            icon: 'error',
          });
        }
      }
    });
  };
  const handleBuyNow = (price) => {
    sessionStorage.setItem('check', false);
    const auth = sessionStorage.getItem('auth');
    const parseAuth = JSON.parse(auth);
    if (!auth) {
      toast.error('Bạn chưa đăng nhập!!!');
      return;
    } else if (!parseAuth?.user?.isVerified) {
      toast.warning(
        'Tài khoản của bạn chưa được xác thực nên không thể mua sách. Vui lòng xác thực tài khoản!!!'
      );
      return;
    }
    if (+book.quantity < count) {
      toast.warning('Product quantity is not enough');
      return;
    }
    sessionStorage.setItem('priceBook', Number(price * count));
    sessionStorage.setItem('count', Number(count));
    sessionStorage.setItem('idBook', book?._id);
    sessionStorage.setItem('pricePerBook', Number(book?.price));
    sessionStorage.setItem('book', JSON.stringify(book));
    router.push('/check-out');
  };
  const category = book?.category;
  const fetchBookByAction = async () => {
    const res = await getBookByCategory(`${category}`);
    if (res && res?.data) {
      setListBookCategory(res?.data?.book);
    }
  };
  useEffect(() => {
    try {
      const handleGetBookByDiscount = async () => {
        setIsLoading(true);
        const result = await getAllBooksByDiscount();
        if (result?.data?.length > 0) {
          setBookDiscount(result.data);
          setIsLoading(false);
        }
      };
      handleGetBookByDiscount();
    } catch (error) {
      console.log('file: page.jsx:37 ~ useEffect ~ error:', error);
    }
  }, []);

  useEffect(() => {
    try {
      const handleGetBookByID = async () => {
        setIsLoading(true);
        const result = await getBookById(id);
        if (result.data.book) {
          setBook(result.data.book);
          setIsLoading(false);
        }
      };
      handleGetBookByID();
    } catch (error) {
      console.log('file: page.jsx:37 ~ useEffect ~ error:', error);
    }
  }, []);

  useEffect(() => {
    handleGetLengthCart();
  }, [orderLength]);
  useEffect(() => {
    handleGetItemCart();
  }, [orderLength]);
  useEffect(() => {
    fetchAllCommentByBook();
  }, []);

  useEffect(() => {
    const auth = sessionStorage.getItem('auth');
    if (auth) {
      setAuth(JSON.parse(auth));
    }
  }, []);
  useEffect(() => {
    fetchBookByAction();
  }, [category]);
  const randomCategories = listBookCategory.slice(
    Math.floor(Math.random() * listBookCategory.length),
    Math.min(
      Math.floor(Math.random() * listBookCategory.length) + 5,
      listBookCategory.length
    )
  );
  return (
    <section className="content">
      {isLoading ? (
        <div className="mx-auto mt-5 w-max">
          <LoadingPage></LoadingPage>
        </div>
      ) : (
        <div className={`content-wrapper ${routeLoading ? 'cursor-wait' : ''}`}>
          <link
            href="https://fonts.googleapis.com/css2?family=Anton&family=Roboto:wght@500&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Merienda+One&family=Nunito:wght@200;300;400;500;600&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          />

          {/* <!-- Start main detail area --> */}
          {/* <!-- Start header-detail area --> */}
          <div className="header-detail pt-[15px]">
            <div className="path-detail">
              <nav className="product-path">
                <Link
                  href="/"
                  className="home"
                  onClick={() => setRouteLoading(true)}
                >
                  {t('home')}/
                </Link>
                <span className="product-name">{book?.booktitle}</span>
              </nav>
            </div>
            <div className="items-center col-span-1 mr-5 justify-self-start">
              <Popover
                renderPopover={
                  <div className="bg-white relative shadow-md rounded-md border border-gray-200 w-[350px] text-sm  mr-5">
                    <div className="p-2">
                      <div className="text-gray-400 capitalize">
                        {t('newProductsAdded')}
                      </div>
                      <div>
                        {orderLength > 0 ? (
                          orderItem.slice(0, 5).map((item) => (
                            <div>
                              {' '}
                              <div className="mt-5">
                                <div className="flex mt-4 ">
                                  <div className="flex-shrink-0">
                                    <img
                                      key={item.Book.mainImage}
                                      src={item.Book.mainImage[0].url}
                                      alt="anh"
                                      className="object-cover w-11 h-11"
                                    />
                                  </div>
                                  <div
                                    className="flex-grow ml-2 overflow-hidden"
                                    key={item.Book.booktitle}
                                  >
                                    <div className="truncate">
                                      {item.Book.booktitle}
                                    </div>
                                  </div>
                                  <div
                                    className="flex-shrink-0 ml-2"
                                    key={item.Book.price}
                                  >
                                    <span className="text-orange">
                                      {item.Book.price}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="flex h-[300px] w-full items-center justify-center p-2">
                            <img
                              src="https://evgracias.com/images/no-products.jpg"
                              alt="no purchase"
                              className="w-full h-full"
                            />
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-6">
                          <div className="text-xs text-gray-500 capitalize">
                            {orderLength > maxItem ? orderLength - maxItem : ''}{' '}
                            {t('Cart')}
                          </div>
                          <Link
                            href="/cart"
                            className="px-4 py-2 text-white capitalize bg-red-500 hover:bg-opacity-90 rounded-2xl"
                          >
                            {t('viewcart')}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              >
                <Link
                  href="/cart"
                  className="pr-[20px] flex justify-end items-center"
                  onClick={() => setRouteLoading(true)}
                >
                  <Badge count={orderLength} showZero>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="33"
                      height="33"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M11 9V6H8V4h3V1h2v3h3v2h-3v3zM7 22q-.825 0-1.412-.587T5 20q0-.825.588-1.412T7 18q.825 0 1.413.588T9 20q0 .825-.587 1.413T7 22m10 0q-.825 0-1.412-.587T15 20q0-.825.588-1.412T17 18q.825 0 1.413.588T19 20q0 .825-.587 1.413T17 22M1 4V2h3.275l4.25 9h7l3.9-7H21.7l-4.4 7.95q-.275.5-.737.775T15.55 13H8.1L7 15h12v2H7q-1.125 0-1.713-.975T5.25 14.05L6.6 11.6L3 4z"
                      />
                    </svg>
                  </Badge>
                </Link>
              </Popover>
            </div>
          </div>
          {/* <!-- End header-detail area --> */}
          <div className="detail-wrapper">
            {/* <!-- Start product-view area --> */}
            <div className="product-view">
              <Image
                src={book?.mainImage[0]?.url}
                width={400}
                height={600}
                alt="product-view"
                className="product-img"
              ></Image>
              <div className="product-labels">
                {book?.discount !== 0 && (
                  <span className="product-onsale">-{book?.discount}%</span>
                )}
                {/* <span className="product-feature">HOT</span> */}
              </div>
            </div>
            {/* <!-- End product-view area --> */}
            {/* <!-- Start product-content area --> */}
            <div className="product-content">
              {/* <!-- Start content-detail area --> */}
              <div className="content-detail flex items-start lg:flex-row flex-col gap-x-[20px]">
                <div className="product-information lg:w-[60%] w-full">
                  <h1 className="product-title">{book?.booktitle}</h1>
                  <div className="product-reviews">
                    <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                    <span className="customer-review">
                      (
                      <a href="#" className="customer-review-link">
                        2 {t('customerReviews')}
                      </a>
                      )
                    </span>
                  </div>
                  <div className="product-description">
                    <p>{book?.desc}</p>
                  </div>
                  {/* Information book */}
                  <div className="orther-information pb-[10px]">
                    <div className="release-date">
                      <span className="orther-title">{t('RealeaseDate')}</span>
                      <span className="info">{formattedDate}</span>
                    </div>
                    <div className="publisher">
                      <span className="orther-title">{t('Publisher')}</span>
                      <span className="info">{book?.publisher}</span>
                    </div>
                    <div className="developer">
                      <span className="orther-title">{t('Author')}</span>
                      <span className="info">{book?.author}</span>
                    </div>
                  </div>
                  {/* <!-- Start footer content area --> */}
                  <div className="footer-detail flex items-center justify-between mt-[15px]">
                    <div className="action flex items-center gap-x-[10px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M6 15.325q.35-.175.725-.25T7.5 15H8V4h-.5q-.625 0-1.063.438T6 5.5v9.825ZM10 15h8V4h-8v11Zm-4 .325V4v11.325ZM7.5 22q-1.45 0-2.475-1.025T4 18.5v-13q0-1.45 1.025-2.475T7.5 2H18q.825 0 1.413.587T20 4v12.525q0 .2-.163.363t-.587.362q-.35.175-.55.5t-.2.75q0 .425.2.763t.55.487q.35.15.55.413t.2.562v.25q0 .425-.288.725T19 22H7.5Zm0-2h9.325q-.15-.35-.237-.713T16.5 18.5q0-.4.075-.775t.25-.725H7.5q-.65 0-1.075.438T6 18.5q0 .65.425 1.075T7.5 20Z"
                        />
                      </svg>
                      <span className="text-[#777777]">{book?.category}</span>
                    </div>

                    <div className="support-language flex items-center gap-x-[10px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-.175-.013-.363t-.012-.312q-.125.725-.675 1.2T18 13h-2q-.825 0-1.413-.587T14 11v-1h-4V8q0-.825.588-1.413T12 6h1q0-.575.313-1.012t.762-.713q-.5-.125-1.012-.2T12 4Q8.65 4 6.325 6.325T4 12h5q1.65 0 2.825 1.175T13 16v1h-3v2.75q.5.125.988.188T12 20Z"
                        />
                      </svg>
                      <span className="text-[#777777]">
                        {book?.language.length} Support Language
                      </span>
                    </div>
                  </div>
                  {/* <!-- End footer content area --> */}
                </div>
                {/* <!-- Start product-purchase-table area --> */}
                <div className="product-purchase-table lg:w-[40%] md:w-[50%] w-full ">
                  <div className="product-price">
                    {book?.discount !== 0 ? (
                      <>
                        <span className="old-price">
                          {book?.price?.toLocaleString('it-IT', {
                            style: 'currency',
                            currency: 'VND',
                          })}
                        </span>
                        <span className="current-price">
                          {priceDiscount?.toLocaleString('it-IT', {
                            style: 'currency',
                            currency: 'VND',
                          })}
                        </span>
                      </>
                    ) : (
                      <span className="current-price">
                        {book?.price?.toLocaleString('it-IT', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </span>
                    )}
                  </div>
                  <div className="product-payment">
                    <div className="add">
                      <div className="col-wrap product-number">
                        <button
                          onClick={handlerMinus}
                          className="w-full col col-minus"
                        >
                          <i className="fa fa-light fa-minus fa-xs"></i>
                        </button>
                        <span className="w-full col col-number">{count}</span>
                        <button
                          onClick={handlerPlus}
                          className="w-full col col-plus"
                        >
                          <i className="fa fa-light fa-plus fa-xs"></i>
                        </button>
                      </div>

                      <button className="product-add" onClick={handleAddCart}>
                        <span className="add-text">{t('AddToCart')}</span>
                      </button>
                    </div>
                    {book?.discount !== 0 ? (
                      <button
                        className="product-buy"
                        onClick={() =>
                          handleBuyNow(
                            ((100 - book?.discount) / 100) * book?.price
                          )
                        }
                      >
                        <span className="buy-text">{t('BuyNow')}</span>
                      </button>
                    ) : (
                      <button
                        className="product-buy"
                        onClick={() => handleBuyNow(book?.price?.toFixed(2))}
                      >
                        <span className="buy-text">{t('BuyNow')}</span>
                      </button>
                    )}
                    {/* <button
                      className="product-buy"
                      onClick={() => handleBuyNow(book?.price?.toFixed(2))}
                    >
                      <span className="buy-text">Buy Now</span>
                    </button> */}
                  </div>
                  <button className="favorite-product mt-[20px] flex justify-center items-center gap-x-[10px] m-atuo">
                    {/* <i className="fa fa-heart-o icon-heart"></i>
                    <span>{t('Addtowishlist')}</span> */}
                    Quantity : {book?.quantity}
                  </button>
                </div>
                {/* <!-- End product-purchase-table area --> */}
              </div>
              {/* <!-- End content-detail area --> */}
            </div>
            {/* <!-- End product-content area --> */}
          </div>
          {/* <!-- End  main detail area --> */}

          {/* <!-- Start Description area --> */}
          <div className="description-wrapper">
            <div className="description-title directory-name">
              <h1>{t('Description')}</h1>
              <div className="mt-5">
                <Swiper
                  spaceBetween={20}
                  slidesPerView={3}
                  grabCursor={'true'}
                  modules={[Navigation, Pagination]}
                  pagination={{ clickable: true }}
                  className="pb-[30px]"
                >
                  {book?.descImage?.length > 0 &&
                    book?.descImage?.map((descImg, index) => (
                      <SwiperSlide key={index}>
                        <Image
                          src={descImg.url}
                          width={400}
                          alt="desc image"
                          height={600}
                          className="object-cover w-full h-[300px] rounded-md"
                        />
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            </div>
            <div className="description-detail mt-[20px]">
              <h2>{t('Information')}</h2>
              <div className="story-summary">
                <p className="story-summary-value">{book?.infomation}</p>

                <div className="flex items-center justify-center">
                  <Image
                    src={book?.descImage[3]?.url}
                    width={500}
                    alt="image"
                    height={500}
                    className="story-summary-img"
                  ></Image>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- End Description area --> */}
          {/* <!-- Start wrapper area --> */}
          <div className="wrapper">
            {/* <!-- Start specification area --> */}
            <div className="specification-wrapper">
              <div className="specification-title directory-name">
                <h1>{t('Specification')}</h1>
              </div>
              <div className="overview">
                <header className="overview-title">
                  <i
                    className="fa fa-info-circle overview-icon"
                    aria-hidden="true"
                  ></i>
                  <span className="overview-label">{t('Overview')}</span>
                </header>
                <div className="overview-content">
                  <div className="overview-releaseDate specification-form">
                    <span className="releaseDate-label">
                      {t('RealeaseDate')}
                    </span>
                    <span className="releaseDate-value value">
                      {formattedDate}
                    </span>
                  </div>
                  <div className="overview-publisher specification-form">
                    <span className="publisher-label">{t('Publisher')}</span>
                    <span className="publisher-value value">
                      {book?.publisher}
                    </span>
                  </div>
                  <div className="overview-developer specification-form pb-[10px]">
                    <span className="developer-label">{t('Author')}</span>
                    <span className="developer-value">{book?.author}</span>
                  </div>
                </div>
              </div>
              <div className="languages">
                <header className="languages-title">
                  <i className="fa fa-globe languages-icon"></i>
                  <span className="languages-label">{t('Languages')}</span>
                </header>
                <div className="languages-content">
                  <div className="languages-language specification-form">
                    <span className="language-label">{t('Language')}</span>
                    <span className="language-value value">
                      {book?.language.length > 0 &&
                        book?.language.map((item, index) => (
                          <span key={index}>
                            {item}
                            {index !== book?.language.length - 1 ? ' , ' : '.'}
                          </span>
                        ))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End specification area --> */}
            {/* <!-- Start discounted area --> */}
            <div className="discounted-wrapper">
              <div className="discounted-title directory-name">
                <h1>{t('DiscountedStory')}</h1>
              </div>
              <div className="discounted-content">
                {bookDiscount?.length > 0 &&
                  bookDiscount.map((item) => (
                    <div className="discounted-items" key={item._id}>
                      <div className="item-view">
                        <Image
                          src={item.mainImage[0].url}
                          width={500}
                          height={500}
                          alt="discount image"
                          className="item-img"
                        />
                      </div>
                      <div className="item-content">
                        <div className="item-name">
                          <Link
                            href={`/product/${item._id}`}
                            onClick={() => setRouteLoading(true)}
                          >
                            <span>{item.booktitle}</span>
                          </Link>
                        </div>
                        <div className="item-review">
                          <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                          <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                          <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                          <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                          <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                        </div>
                        <div className="item-price">
                          <span>
                            {item?.price?.toLocaleString('it-IT', {
                              style: 'currency',
                              currency: 'VND',
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            {/* <!-- End discounted area --> */}
          </div>
          {/* <!-- End wrapper area --> */}
          {/* <!-- Customer Reviews --> */}
          {/* <!-- Start Customer Reviews --> */}
          <div className="customerReviews-wrapper">
            <div className="customerReviews-title directory-name">
              <h1>{t('CustomerReviews')}</h1>
            </div>
            <div className="total">
              <div className="total-Rating">
                <div className="rating-header">
                  <div className="ratingHeader-number">
                    <span>5</span>
                  </div>
                  <div className="ratingHeader-star icon-star">
                    <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                    <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                    <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                    <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                    <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                  </div>
                  <div className="ratingHeader-reviews">2 {t('Reviews')}</div>
                </div>
                <div className="rating-main">
                  <div className="rating-five rating-items">
                    <div className="stars-area">
                      <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                      <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                      <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                      <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                      <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                    </div>
                    <div className="wrapper-proportional-area">
                      <div className="proportional-area"></div>
                    </div>
                    <div className="quantity-area">
                      <span>2</span>
                    </div>
                  </div>
                  <div className="rating-four rating-items">
                    <div className="stars-area">
                      <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                      <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                      <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                      <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                      <i className="fa fa-star-o icon-star"></i>
                    </div>
                    <div className="wrapper-proportional-area">
                      <div className="proportional-area"></div>
                    </div>
                    <div className="quantity-area">
                      <span>0</span>
                    </div>
                  </div>
                  <div className="rating-three rating-items">
                    <div className="stars-area">
                      <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                      <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                      <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                      <i className="fa fa-star-o icon-star"></i>
                      <i className="fa fa-star-o icon-star"></i>
                    </div>
                    <div className="wrapper-proportional-area">
                      <div className="proportional-area"></div>
                    </div>
                    <div className="quantity-area">
                      <span>0</span>
                    </div>
                  </div>
                  <div className="rating-two rating-items">
                    <div className="stars-area">
                      <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                      <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                      <i className="fa fa-star-o icon-star"></i>
                      <i className="fa fa-star-o icon-star"></i>
                      <i className="fa fa-star-o icon-star"></i>
                    </div>
                    <div className="wrapper-proportional-area">
                      <div className="proportional-area"></div>
                    </div>
                    <div className="quantity-area">
                      <span>0</span>
                    </div>
                  </div>
                  <div className="rating-one rating-items">
                    <div className="stars-area">
                      <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                      <i className="fa fa-star-o icon-star"></i>
                      <i className="fa fa-star-o icon-star"></i>
                      <i className="fa fa-star-o icon-star"></i>
                      <i className="fa fa-star-o icon-star"></i>
                    </div>
                    <div className="wrapper-proportional-area">
                      <div className="proportional-area"></div>
                    </div>
                    <div className="quantity-area">
                      <span>0</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="review-form-wrapper">
                <h4 className="review-title">{t('AddAReview')}</h4>
                <div className="review-form">
                  <p className="comment-notes">
                    <span className=" notes">{t('wish')}</span>
                  </p>
                  <div className="comment-form-rating">
                    <label htmlFor="rating" className="mr-[10px]">
                      <span className="rating"> {t('Yourrating')}</span>
                      <span className="require">*</span>
                      <span className="rating">:</span>
                    </label>
                    <Raiting value={value} setValue={setValue}></Raiting>
                  </div>
                  <p className="comment-form-comment">
                    <label htmlFor="comment">
                      <span className="comment"> {t('YourReview')}</span>
                      <span className="require">*</span>
                    </label>
                    <textarea
                      ref={cmtRef}
                      name="comment"
                      id="comment"
                      cols="45"
                      rows="8"
                      required
                      className="resize-none"
                      onChange={(event) => setComment(event.target.value)}
                    ></textarea>
                  </p>
                  <button className="form-submit" onClick={handleAddComment}>
                    <input
                      name="submit"
                      type="submit"
                      id="submit"
                      className="submit"
                      value={t('Submit')}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- End Customer Reviews -->/ */}
          <div className="px-[20px] list-comment">
            <div className="reviews-heading mb-[10px]">
              <h3 className="label-comment">
                {t('Reviewsfor')}
                <span className="font-semibold"> {book?.booktitle}</span>
              </h3>
            </div>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={3}
              navigation
              grabCursor={'true'}
              className="pb-[40px]"
            >
              {listCommentByBook?.length > 0 &&
                listCommentByBook?.map((cmt, index) => (
                  <SwiperSlide key={index}>
                    <div className="bg-[#f8f8f8] review-card p-[10px] rounded-lg">
                      <div className="card-top">
                        <div className="profile">
                          <div className="profile-image">
                            {/* <Image
                              src={cmt?.user?.avatar || ''}
                              alt=""
                              width={100}
                              height={100}
                            /> */}
                          </div>
                          <div className="profile-name">
                            <strong>{cmt?.user?.username}</strong>
                            <div className="likes">
                              <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                              <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                              <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                              <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                              <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                            </div>
                          </div>
                          <div className="comment-date">
                            <span>
                              {`${new Date(cmt?.createdAt).getDate()}-${
                                new Date(cmt?.createdAt).getMonth() + 1
                              }-${new Date(cmt?.createdAt).getFullYear()}`}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between card-main gap-x-5">
                        <p>{cmt?.comment}</p>
                        {auth?.user?._id === cmt?.id_user && (
                          <span
                            title="Delete"
                            className="mt-[5px] cursor-pointer"
                            onClick={() => handleDeleteComment(cmt?._id)}
                          >
                            <FaTrashAlt />
                          </span>
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
          {/* <!-- related books -->/ */}
          <div className="flex px-[20px] flex-col justify-start">
            <div className="directory-name">
              <h1>{t('Maybeyouwilllike')}</h1>
            </div>
            <div>
              <div className="flex max-w-full max-h-[350px] flex-row gap-x-[30px] my-3  ">
                {listBookCategory.length > 0 &&
                  randomCategories.slice(0, 5).map((item, index) => (
                    <div
                      className="max-w-[230px] max-h-[330px] flex flex-col hover:scale-110 transition delay-150 duration-150 ease-in-out"
                      key={index}
                    >
                      <Link href={`/product/${item._id}`}>
                        {' '}
                        <img
                          src={item?.mainImage[0].url}
                          alt=""
                          className="w-[220px] h-[280px] rounded-lg pb-1 cursor-pointer"
                        />
                        <div className="flex w-full text-xl font-bold cursor-pointer hover:text-black/60">
                          {item?.booktitle}
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;
