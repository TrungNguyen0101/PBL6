'use client';

import React, { useCallback, useEffect, useState } from 'react';
import '../style/styled.scss';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

const ProductDetail = () => {
  const [book, setBook] = useState();
  const [count, setCount] = useState(1);
  const { id } = useParams();
  const parsedDate = new Date(book !== undefined && book?.datePicker);
  const formattedDate = format(parsedDate, 'dd/MM/yyyy');
  console.log('file: page.jsx:10 ~ ProductDetail ~ book:', book);

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
  useEffect(() => {
    try {
      const handleGetBookByID = async () => {
        const result = await axios.get(`http://localhost:3030/api/book/${id}`);
        if (result.data.data.book) {
          setBook(result.data.data.book);
        }
      };
      handleGetBookByID();
    } catch (error) {
      console.log('file: page.jsx:37 ~ useEffect ~ error:', error);
    }
  }, []);
  console.log('check book', book);
  return (
    <section className="content">
      <div className="content-wrapper">
        {/* <!-- Start main detail area --> */}
        {/* <!-- Start header-detail area --> */}
        <div className="header-detail pt-[15px]">
          <div className="path-detail">
            <nav className="product-path">
              <a href="#" className="home">
                Home
              </a>
              <a href="#" className="icon-division">
                /
              </a>
              <a href="#" className="Adventure">
                Adventure
              </a>
              <a href="#" className="icon-division">
                /
              </a>
              <span className="product-name">
                Nobita và vùng đất lý tưởng trên mây
              </span>
            </nav>
          </div>
          <div className="product-management">
            <i className="fa fa-angle-left product-pre"></i>
            <i className="fa fa-th-large product-large"></i>
            <i className="fa fa-angle-right product-next"></i>
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
              className="product-img"
            ></Image>
            {/* <img
              src="https://i.ebayimg.com/images/g/8vIAAOSwztNg1quw/s-l1600.jpg"
              alt=""
              className="product-img"
            /> */}
            <div className="product-labels">
              <span className="product-onsale">-33%</span>
              <span className="product-feature">HOT</span>
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
                      2 Customer reviews
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
                    <span className="orther-title">Release date</span>
                    <span className="info">{formattedDate}</span>
                  </div>
                  <div className="publisher">
                    <span className="orther-title">Publisher</span>
                    <span className="info">{book?.publisher}</span>
                  </div>
                  <div className="developer">
                    <span className="orther-title">Author</span>
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
                  <span className="old-price">$34.99</span>
                  <span className="current-price">$20.99</span>
                </div>
                <div className="product-payment">
                  <div className="add">
                    <div className="col-wrap product-number">
                      <button
                        onClick={handlerMinus}
                        className="col col-minus w-full"
                      >
                        <i className="fa fa-light fa-minus fa-xs"></i>
                      </button>
                      <span className="col col-number w-full">{count}</span>
                      <button
                        onClick={handlerPlus}
                        className="col col-plus w-full"
                      >
                        <i className="fa fa-light fa-plus fa-xs"></i>
                      </button>
                    </div>

                    <button className="product-add">
                      <span className="add-text">Add To Cart</span>
                    </button>
                  </div>
                  <button className="product-buy">
                    <span className="buy-text">Buy Now</span>
                  </button>
                </div>
                <button className="favorite-product mt-[20px] flex justify-center items-center gap-x-[10px] m-atuo">
                  <i className="fa fa-heart-o icon-heart"></i>
                  <span> Add to wishlist</span>
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
            <h1>Description</h1>
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
                        height={600}
                        className="object-cover w-full max-h-[300px] rounded-md"
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
          <div className="description-detail mt-[20px]">
            <h2>Information about the story</h2>
            <div className="story-summary">
              <p className="story-summary-value">{book?.infomation}</p>

              <div className="flex items-center justify-center">
                <Image
                  src={book?.descImage[3]?.url}
                  width={500}
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
              <h1>Specification</h1>
            </div>
            <div className="overview">
              <header className="overview-title">
                <i
                  className="fa fa-info-circle overview-icon"
                  aria-hidden="true"
                ></i>
                <span className="overview-label">Overview</span>
              </header>
              <div className="overview-content">
                <div className="overview-releaseDate specification-form">
                  <span className="releaseDate-label">Release Date</span>
                  <span className="releaseDate-value value">
                    {formattedDate}
                  </span>
                </div>
                <div className="overview-publisher specification-form">
                  <span className="publisher-label">Publisher</span>
                  <span className="publisher-value value">
                    {book?.publisher}
                  </span>
                </div>
                <div className="overview-developer specification-form pb-[10px]">
                  <span className="developer-label">Author</span>
                  <span className="developer-value">{book?.author}</span>
                </div>
              </div>
            </div>
            <div className="languages">
              <header className="languages-title">
                <i className="fa fa-globe languages-icon"></i>
                <span className="languages-label">Languages</span>
              </header>
              <div className="languages-content">
                <div className="languages-language specification-form">
                  <span className="language-label">Language</span>
                  <span className="language-value value">
                    {book?.language.length > 0 &&
                      book?.language.map((item, index) => (
                        <span id={index}>
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
              <h1>Discounted Story</h1>
            </div>
            <div className="discounted-content">
              <div className="discounted-items" id="1">
                <div className="item-view">
                  <img
                    src="https://gamek.mediacdn.vn/133514250583805952/2021/3/18/cona7-1616045526983664603292.jpg"
                    alt=""
                    className="item-img"
                  />
                </div>
                <div className="item-content">
                  <div className="item-name">
                    <a href="#">
                      <span>Conan Movie 20</span>
                    </a>
                  </div>
                  <div className="item-review">
                    <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                    <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                    <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                    <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                    <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                  </div>
                  <div className="item-price">
                    <span>$49.99</span>
                  </div>
                </div>
              </div>
              <div className="discounted-items" id="2">
                <div className="item-view">
                  <img
                    src="https://tse1.mm.bing.net/th?id=OIP.BKeWDSBMuS5F2HTkVLkqBAAAAA&pid=Api&P=0&h=180"
                    alt=""
                    className="item-img"
                  />
                </div>
                <div className="item-content">
                  <div className="item-name">
                    <a href="#">
                      <span>Công chúa Ori</span>
                    </a>
                  </div>
                  <div className="item-price">
                    <span>$29.99</span>
                  </div>
                </div>
              </div>
              <div className="discounted-items" id="3">
                <div className="item-view">
                  <img
                    src="https://i0.wp.com/www.theilluminerdi.com/wp-content/uploads/2021/08/One-Piece-.jpeg?fit=2560%2C1440&ssl=1"
                    alt=""
                    className="item-img"
                  />
                </div>
                <div className="item-content">
                  <div className="item-name">
                    <a href="#">
                      <span>One Piece</span>
                    </a>
                  </div>
                  <div className="item-price">
                    <span>$49.99</span>
                  </div>
                </div>
              </div>
              <div className="discounted-items" id="4">
                <div className="item-view">
                  <img
                    src="https://i.pinimg.com/originals/38/65/fe/3865fe127378e6600cc55b5521bbb7cb.jpg"
                    alt=""
                    className="item-img"
                  />
                </div>
                <div className="item-content">
                  <div className="item-name">
                    <a href="#">
                      <span>Naruto</span>
                    </a>
                  </div>
                  <div className="item-review">
                    <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                    <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                    <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                    <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                    <i className="fa fa-star-half-o icon-star"></i>
                  </div>
                  <div className="item-price">
                    <span>$49.99</span>
                  </div>
                </div>
              </div>
              <div className="discounted-items" id="5">
                <div className="item-view">
                  <img
                    src="https://img4.thuthuatphanmem.vn/uploads/2019/12/09/winx-club-nhung-nang-tien-xinh-dep_115729863.jpg"
                    alt=""
                    className="item-img"
                  />
                </div>
                <div className="item-content">
                  <div className="item-name">
                    <a href="#">
                      <span>Winx</span>{' '}
                    </a>
                  </div>
                  <div className="item-review">
                    <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                    <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                    <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                    <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                    <i className="fa fa-star-o icon-star"></i>
                  </div>
                  <div className="item-price">
                    <span>$49.99</span>
                  </div>
                </div>
              </div>
              <div className="discounted-items" id="6">
                <div className="item-view">
                  <img
                    src="https://img.starbiz.com/resize/750x-/2020/07/16/doraemon-movies-download-3-9a6b.jpg"
                    alt=""
                    className="item-img"
                  />
                </div>
                <div className="item-content">
                  <div className="item-name">
                    <a href="#">
                      <span>Doraemon movie 20</span>
                    </a>
                  </div>
                  <div className="item-price">
                    <span>$49.99</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- End discounted area --> */}
        </div>
        {/* <!-- End wrapper area --> */}
        {/* <!-- Customer Reviews --> */}
        {/* <!-- Start Customer Reviews --> */}
        <div className="customerReviews-wrapper">
          <div className="customerReviews-title directory-name">
            <h1>Customer Reviews</h1>
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
                <div className="ratingHeader-reviews">2 Reviews</div>
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
              <h4 className="review-title">ADD A REVIEW</h4>
              <div className="review-form">
                <p className="comment-notes">
                  <span className="notes">
                    Your email address will not be published. Required fields
                    are marked
                  </span>
                  <span className="require">*</span>
                </p>
                <div className="comment-form-rating">
                  <label htmlFor="rating">
                    <span className="rating">Your rating</span>
                    <span className="require">*</span>
                    <span className="rating">:</span>
                  </label>
                  <span className="stars">
                    <i className="fa fa-star-o icon-star"></i>
                    <i className="fa fa-star-o icon-star"></i>
                    <i className="fa fa-star-o icon-star"></i>
                    <i className="fa fa-star-o icon-star"></i>
                    <i className="fa fa-star-o icon-star"></i>
                  </span>
                </div>
                <p className="comment-form-comment">
                  <label htmlFor="comment">
                    <span className="comment">Your review</span>
                    <span className="require">*</span>
                  </label>
                  <textarea
                    name="comment"
                    id="comment"
                    cols="45"
                    rows="8"
                    required
                  ></textarea>
                </p>
                <p className="comment-form-author">
                  <label htmlFor="author">
                    <span className="author">Name</span>
                    <span className="require">*</span>
                  </label>
                  <input
                    id="author"
                    type="text"
                    name="author"
                    size="30"
                    required
                  />
                </p>
                <p className="comment-form-email">
                  <label htmlFor="email">
                    <span className="email">Email</span>
                    <span className="require">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    size="30"
                    required
                  />
                </p>
                <p className="comment-form-consent">
                  <input
                    type="checkbox"
                    value="yes"
                    name="comment-consent"
                    id="comment-consent"
                  />
                  <label htmlFor="comment-consent">
                    Save my name, email, and website in this browser for the
                    next time I comment.
                  </label>
                </p>
                <p className="form-submit">
                  <input
                    name="submit"
                    type="submit"
                    id="submit"
                    className="submit"
                    value="Submit"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="comments-area">
            <div className="reviews-heading">
              <h3 className="label-comment">
                Reviews for
                <span>Nobita và vùng đất lý tưởng trên mây</span>
              </h3>
              {/* <!-- Khúc ni mn chỉnh code nhó --> */}
              <div className="default">Default</div>
            </div>
            <div className="review-box">
              <div className="review-card">
                <div className="card-top">
                  <div className="profile">
                    <div className="profile-image">
                      <img
                        src="https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/363425303_1929038524147723_790736361899725876_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=UUv3qFdJk04AX9HlcpE&_nc_ht=scontent.fdad3-5.fna&oh=00_AfA38fSxMLdwAl8ihtm40VQ87mbryYTFaeodxe2df8O7Zg&oe=65348A41"
                        alt=""
                      />
                    </div>
                    <div className="profile-name">
                      <strong>Zy Nguyen</strong>
                      <div className="likes">
                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                      </div>
                    </div>
                    <div className="comment-date">
                      <span>July 6 ,2023</span>
                    </div>
                  </div>
                </div>
                <div className="card-main">
                  <p>
                    I’ve heard the argument that “lorem ipsum” is effective in
                    wireframing or design because it helps people focus on the
                    actual layout, or color scheme, or whatever. The entire
                    structure of the page or app flow is FOR THE WORDS.
                  </p>
                </div>
                <div className="card-footer">
                  <div className="like">
                    <i className="fa fa-thumbs-o-up icon-like"></i>
                    <span>0</span>
                  </div>
                  <div className="unlike">
                    <i className="fa fa-thumbs-o-up fa-flip-vertical icon-unlike"></i>
                    <span>0</span>
                  </div>
                </div>
              </div>
              <div className="review-card">
                <div className="card-top">
                  <div className="profile">
                    <div className="profile-image">
                      <img
                        src="https://scontent.fdad3-5.fna.fbcdn.net/v/t1.15752-9/386468103_338193505413038_6568528634758558596_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=mO4aVhbiUSwAX-_aHWB&_nc_ht=scontent.fdad3-5.fna&oh=03_AdQxCI07syAu1NyPMubFrDIW0wNnz4iBJx29OMX-Lw3iCw&oe=65577F67"
                        alt=""
                      />
                    </div>
                    <div className="profile-name">
                      <strong>My Nguyen</strong>
                      <div className="likes">
                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                      </div>
                    </div>
                    <div className="comment-date">
                      <span>July 6 ,2023</span>
                    </div>
                  </div>
                </div>
                <div className="card-main">
                  <p>
                    A seemingly elegant design can quickly begin to bloat with
                    unexpected content or break under the weight of actual
                    activity. Fake data can ensure a nice looking layout but it
                    doesn’t reflect what a living, breathing application must
                    endure. Real data does.
                  </p>
                </div>
                <div className="card-footer">
                  <div className="like">
                    <i className="fa fa-thumbs-o-up icon-like"></i>
                    <span>0</span>
                  </div>
                  <div className="unlike">
                    <i className="fa fa-thumbs-o-up fa-flip-vertical icon-unlike"></i>
                    <span>0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Customer Reviews -->/ */}
      </div>
      D
    </section>
  );
};

export default ProductDetail;
