import React from 'react';
import '../style/styled.scss';
const ProductDetail = () => {
  return (
    <section class="content">
      <div class="content-wrapper">
        {/* <!-- Start main detail area --> */}
        <div class="detail-wrapper">
          {/* <!-- Start product-view area --> */}
          <div class="product-view">
            <img
              src="https://i.ebayimg.com/images/g/8vIAAOSwztNg1quw/s-l1600.jpg"
              alt=""
              class="product-img"
            />
            <div class="product-labels">
              <span class="product-onsale">-33%</span>
              <span class="product-feature">HOT</span>
            </div>
          </div>
          {/* <!-- End product-view area --> */}
          {/* <!-- Start product-content area --> */}
          <div class="product-content">
            {/* <!-- Start header-detail area --> */}
            <div class="header-detail">
              <div class="path-detail">
                <nav class="product-path">
                  <a href="#" class="home">
                    Home
                  </a>
                  <a href="#" class="icon-division">
                    /
                  </a>
                  <a href="#" class="Adventure">
                    Adventure
                  </a>
                  <a href="#" class="icon-division">
                    /
                  </a>
                  <span class="product-name">
                    Nobita và vùng đất lý tưởng trên mây
                  </span>
                </nav>
              </div>
              <div class="product-management">
                <i class="fa fa-angle-left product-pre"></i>
                <i class="fa fa fa-th-large product-large"></i>
                <i class="fa fa-angle-right product-next"></i>
              </div>
            </div>
            {/* <!-- End header-detail area --> */}
            {/* <!-- Start content-detail area --> */}
            <div class="content-detail">
              <div class="product-information">
                <h1 class="product-title">
                  Nobita và vùng đất lý tưởng trên mây
                </h1>
                <div class="product-reviews">
                  <i class="fa fa-solid fa-star fa-2xl icon-star"></i>
                  <i class="fa fa-solid fa-star fa-2xl icon-star"></i>
                  <i class="fa fa-solid fa-star fa-2xl icon-star"></i>
                  <i class="fa fa-solid fa-star fa-2xl icon-star"></i>
                  <i class="fa fa-solid fa-star fa-2xl icon-star"></i>
                  <span class="customer-review">
                    (
                    <a href="#" class="customer-review-link">
                      2 Customer reviews
                    </a>
                    )
                  </span>
                </div>
                <div class="product-description">
                  <p>
                    The story is about the adventure of Nobita and his group of
                    friends to a crescent-shaped island in the clouds - a place
                    full of dark secrets hidden behind absolute perfection. It's
                    so perfect that even a sleeper who's considered a poor
                    student like Nobita can become a prodigy or a sports
                    superstar.
                  </p>
                </div>
                <div class="orther-information">
                  <div class="release-date">
                    <span class="orther-title">Release date</span>
                    <span class="info">20 Oct, 2023</span>
                  </div>
                  <div class="publisher">
                    <span class="orther-title">Publisher</span>
                    <span class="info">Deep Silver</span>
                  </div>
                  <div class="developer">
                    <span class="orther-title">Developer</span>
                    <a href="#" class="dev-link">
                      Raven Software
                    </a>
                  </div>
                </div>
              </div>
              {/* <!-- Start product-purchase-table area --> */}
              <div class="product-purchase-table">
                <div class="product-price">
                  <span class="old-price">$34.99</span>
                  <span class="current-price">$20.99</span>
                </div>
                <div class="platform">
                  <span class="plat-text">Platform:</span>
                  <div class="plat-dropdown">
                    <span class="dropdown-text">Choose an option</span>
                    <i class="fa fa-light fa-chevron-down icon-down"></i>
                  </div>
                </div>
                <div class="edition">
                  <span class="edi-text">Edition:</span>
                  <div class="edi-dropdown">
                    <span class="dropdown-text">Choose an option</span>
                    <i class="fa fa-light fa-chevron-down icon-down"></i>
                  </div>
                </div>
                <div class="product-payment">
                  <div class="add">
                    <div class="col-wrap product-number">
                      <div class="col col-minus">
                        <i class="fa fa-light fa-minus fa-xs"></i>
                      </div>
                      <div class="col col-number">
                        <span>1</span>
                      </div>
                      <div class="col col-plus">
                        <i class="fa fa-light fa-plus fa-xs"></i>
                      </div>
                    </div>

                    <button class="product-add">
                      <span class="add-text">Add To Cart</span>
                    </button>
                  </div>
                  <button class="product-buy">
                    <span class="buy-text">Buy Now</span>
                  </button>
                </div>
                <footer class="another-choice">
                  <div class="favorite-product">
                    <a href="#" class="favpro-text">
                      <i class="fa fa-heart-o icon-heart"></i> Add to wishlist
                    </a>
                  </div>
                  <div class="product-share">
                    <span class="prosha-text">Share:</span>
                    <a href="#" class="social-network icon-facebook">
                      <i class="fa fa-brands fa-facebook-f icon-facebook"></i>
                    </a>
                    <a href="#" class="social-network icon-twitter">
                      <i class="fa fa-brands fa-twitter icon-twitter"></i>
                    </a>
                    <a href="#" class="social-network icon-mail">
                      <i class="fa fa-solid fa-envelope icon-mail"></i>
                    </a>
                    <a href="#" class="social-network icon-telegram">
                      <i class="fa fa-brands fa-telegram icon-telegram"></i>
                    </a>
                  </div>
                </footer>
              </div>
              {/* <!-- End product-purchase-table area --> */}
            </div>
            {/* <!-- End content-detail area --> */}
            {/* <!-- Start footer content area --> */}
            <div class="footer-content">
              <table class="footer-tb">
                <tbody class="footer-detail">
                  <tr class="action">
                    <th class="item-label">
                      <img
                        src="	https://woodmart.b-cdn.net/games/wp-content/uploads/sites/14/2023/05/wd-vgs-product-genre-w.svg"
                        alt=""
                        class="img-item"
                      />
                    </th>
                    <td class="item-value">
                      <p>
                        <a href="#">Action</a>
                      </p>
                    </td>
                  </tr>
                  <tr class="mild-language">
                    <th class="item-label">
                      <img
                        src="	https://woodmart.b-cdn.net/games/wp-content/uploads/sites/14/2023/07/PEGI_12.jpg.webp"
                        alt=""
                        class="img-item"
                      />
                    </th>
                    <td class="item-value">
                      <p>
                        <a href="#">Mild Language,Violence</a>
                      </p>
                    </td>
                  </tr>
                  <tr class="support-language">
                    <th class="item-label">
                      <img
                        src="	https://woodmart.b-cdn.net/games/wp-content/uploads/sites/14/2023/05/wd-vgs-product-languages-w.svg"
                        alt=""
                        class="img-item"
                      />
                    </th>
                    <td class="item-value">
                      <p>
                        <a href="#">12 Support Language</a>
                      </p>
                    </td>
                  </tr>
                  <tr class="single-player">
                    <th class="item-label">
                      <img
                        src="	https://woodmart.b-cdn.net/games/wp-content/uploads/sites/14/2023/05/wd-vgs-product-features-w.svg"
                        alt=""
                        class="img-item"
                      />
                    </th>
                    <td class="item-value">
                      <p>
                        <a href="#">12 Support Language</a>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* <!-- End footer content area --> */}
          </div>
          {/* <!-- End product-content area --> */}
        </div>
        {/* <!-- End  main detail area --> */}

        {/* <!-- Start Description area --> */}
        <div class="description-wrapper">
          <div class="description-title directory-name">
            <h1>Description</h1>
          </div>
          <div class="description-slider">
            {/* <!-- tôm làm phần ni co zy ngen --> */}
          </div>
          <div class="description-detail">
            <h2>Information about the story</h2>
            <div class="main-actors">
              <span class="actors-label">Main actors:</span>
              <img
                src="https://tse1.mm.bing.net/th?id=OIP.AbyqDkpwVGUclMtO1kqv0QHaEV&pid=Api&P=0&h=180"
                alt=""
                class="actors-img"
              />
              <img
                src="https://vignette.wikia.nocookie.net/doraemon/images/1/1e/Nobita_Nobi_2005_anime_ID.png/revision/latest?cb=20181215061916&path-prefix=en"
                alt=""
                class="actors-img"
              />
              <img
                src="http://game8.vn/media/201807/images/unnamed.jpg"
                alt=""
                class="actors-img"
              />
              <img
                src="https://vignette.wikia.nocookie.net/doraemon/images/6/6e/Suneo_Honekawa_-_2D.png/revision/latest?cb=20150911122247&path-prefix=en"
                alt=""
                class="actors-img"
              />
              <img
                src="https://img2.thuthuatphanmem.vn/uploads/2018/12/08/hinh-anh-chaien_105740138.jpg"
                alt=""
                class="actors-img"
              />
            </div>
            <div class="story-summary">
              <p class="story-summary-value">
                Since the 1980s, to meet the needs of viewers, the author and
                producer released the first Doraemon movie - Doraemon: Nobita's
                Dinosaur. This first feature-length film publication of Doraemon
                has made a big splash in the world. The series earned the
                production crew 1.5 billion Yen and attracted more than 3
                million views. Since then, every year, audiences have enjoyed a
                cinematic release of the childhood animated series Doraemon.
                Returning to the movie market this time, Doraemon's production
                team promises to bring viewers a special movie called Doraemon:
                Nobita and the Ideal Land in the Clouds. This new movie is
                considered by many critics to have attractive content and
                eye-catching effects. Thanks to that, the film easily brings
                viewers to the fantasy world in the clouds with many interesting
                and unique things.
              </p>
              <center>
                <img
                  src="https://bloganchoi.com/wp-content/uploads/2023/03/doraemon-nobita-sky-utobia.jpg"
                  alt=""
                  class="story-summary-img"
                />
              </center>
              <p class="story-summary-value">
                Doraemon Story 2023 will be a completely new adventure of
                Nobita's group to the magical land of Paradapia. The story
                begins when Nobita accidentally reads a book about Utopia. This
                is a place that is described as bringing everyone a peaceful and
                happy life.And with the help of Doraemon and his friends, Nobita
                and everyone quickly set out to find the promised land. After a
                long journey, Doraemon, Nobita and their friends finally arrived
                at Paradapia. This fairyland floating in the sky is portrayed as
                a paradise land, where everyone can live a leisurely and happy
                life. This place was created by three prominent sages with the
                desire to create a new world, perfect and suitable for everyone.
                However, the joy did not last long before Paradapia faced the
                risk of being wiped out. Faced with this fateful situation, what
                will Nobita and his friends do to save the land of Paradapia?
                Let's wait for the movie to get the answer!
              </p>
            </div>
          </div>
        </div>
        {/* <!-- End Description area --> */}
        {/* <!-- Start specification area --> */}
        <div class="wrapper">
          <div class="specification-wrapper">
            <div class="specification-title directory-name">
              <h1>Specification</h1>
            </div>
            <div class="overview">
              <header class="overview-title">
                <i
                  class="fa fa-info-circle overview-icon"
                  aria-hidden="true"
                ></i>
                <span class="overview-label">Overview</span>
              </header>
              <div class="overview-content">
                <div class="overview-platform specification-form">
                  <span class="platform-label">Platform</span>
                  <span class="platform-value">
                    <a href="#">Nintendo Switch</a>,<a href="#">PC</a>,
                    <a href="#">PlayStation 5</a>,
                    <a href="#">Xbox Series X|S</a>
                  </span>
                </div>
                <div class="overview-multiplayer specification-form">
                  <span class="multiplayer-label">Multiplayer</span>
                  <span class="multiplayer-value value">
                    Cross platform co-op, Local co-op, Online co-op, Online
                    multiplayer, Single player
                  </span>
                </div>
                <div class="overview-releaseDate specification-form">
                  <span class="releaseDate-label">Release Date</span>
                  <span class="releaseDate-value value"> 28 Oct, 2022 </span>
                </div>
                <div class="overview-publisher specification-form">
                  <span class="publisher-label">Publisher</span>
                  <span class="publisher-value value"> Deep Silver </span>
                </div>
                <div class="overview-developer specification-form">
                  <span class="developer-label">Developer</span>
                  <span class="developer-value">
                    <a href="#"> Raven Software</a>
                  </span>
                </div>
              </div>
            </div>
            <div class="languages">
              <header class="languages-title">
                <i class="fa fa-globe languages-icon"></i>
                <span class="languages-label">Languages</span>
              </header>
              <div class="languages-content">
                <div class="languages-language specification-form">
                  <span class="language-label">Language</span>
                  <span class="language-value value">
                    Arabic, Chinese (Simplified), Chinese (Traditional), Czech,
                    Danish, Dutch, English, French, Ukrainian
                  </span>
                </div>
                <div class="languages-audio specification-form">
                  <span class="audio-label">Audio</span>
                  <span class="audio-value value">
                    Czech, Danish, Dutch, English, French
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="discounted-wrapper">
            <div class="discounted-title directory-name">
              <h1>Discounted Story</h1>
            </div>
            <div class="discounted-content">
              <div class="discounted-items" id="1">
                <div class="item-view">
                  <img
                    src="https://gamek.mediacdn.vn/133514250583805952/2021/3/18/cona7-1616045526983664603292.jpg"
                    alt=""
                    class="item-img"
                  />
                </div>
                <div class="item-content">
                  <div class="item-name">
                    <a href="#">Conan Movie 20</a>
                  </div>
                  <div class="item-review">
                    <i class="fa fa-solid fa-star fa-2xl icon-star"></i>
                    <i class="fa fa-solid fa-star fa-2xl icon-star"></i>
                    <i class="fa fa-solid fa-star fa-2xl icon-star"></i>
                    <i class="fa fa-solid fa-star fa-2xl icon-star"></i>
                    <i class="fa fa-solid fa-star fa-2xl icon-star"></i>
                  </div>
                  <div class="item-price">
                    <span>$49.99</span>
                  </div>
                </div>
              </div>
              <div class="discounted-items" id="2">
                <div class="item-view">
                  <img
                    src="https://tse1.mm.bing.net/th?id=OIP.BKeWDSBMuS5F2HTkVLkqBAAAAA&pid=Api&P=0&h=180"
                    alt=""
                    class="item-img"
                  />
                </div>
                <div class="item-content">
                  <div class="item-name">
                    <a href="#">Công chúa Ori</a>
                  </div>
                  <div class="item-price">
                    <span>$29.99</span>
                  </div>
                </div>
              </div>
              <div class="discounted-items" id="3">
                <div class="item-view">
                  <img
                    src="https://i0.wp.com/www.theilluminerdi.com/wp-content/uploads/2021/08/One-Piece-.jpeg?fit=2560%2C1440&ssl=1"
                    alt=""
                    class="item-img"
                  />
                </div>
                <div class="item-content">
                  <div class="item-name">
                    <a href="#">One Piece</a>
                  </div>
                  <div class="item-price">
                    <span>$49.99</span>
                  </div>
                </div>
              </div>
              <div class="discounted-items" id="4">
                <div class="item-view">
                  <img
                    src="https://i.pinimg.com/originals/38/65/fe/3865fe127378e6600cc55b5521bbb7cb.jpg"
                    alt=""
                    class="item-img"
                  />
                </div>
                <div class="item-content">
                  <div class="item-name">
                    <a href="#">Naruto</a>
                  </div>
                  <div class="item-review">
                    <i class="fa fa-solid fa-star fa-2xl icon-star"></i>
                    <i class="fa fa-solid fa-star fa-2xl icon-star"></i>
                    <i class="fa fa-solid fa-star fa-2xl icon-star"></i>
                    <i class="fa fa-solid fa-star fa-2xl icon-star"></i>
                    <i class="fa fa-star-half-o icon-star"></i>
                  </div>
                  <div class="item-price">
                    <span>$49.99</span>
                  </div>
                </div>
              </div>
              <div class="discounted-items" id="5">
                <div class="item-view">
                  <img
                    src="https://img4.thuthuatphanmem.vn/uploads/2019/12/09/winx-club-nhung-nang-tien-xinh-dep_115729863.jpg"
                    alt=""
                    class="item-img"
                  />
                </div>
                <div class="item-content">
                  <div class="item-name">
                    <a href="#">Winx </a>
                  </div>
                  <div class="item-review">
                    <i class="fa fa-solid fa-star fa-2xl icon-star"></i>
                    <i class="fa fa-solid fa-star fa-2xl icon-star"></i>
                    <i class="fa fa-solid fa-star fa-2xl icon-star"></i>
                    <i class="fa fa-solid fa-star fa-2xl icon-star"></i>
                    <i class="fa fa-star-o icon-star"></i>
                  </div>
                  <div class="item-price">
                    <span>$49.99</span>
                  </div>
                </div>
              </div>
              <div class="discounted-items" id="6">
                <div class="item-view">
                  <img
                    src="https://img.starbiz.com/resize/750x-/2020/07/16/doraemon-movies-download-3-9a6b.jpg"
                    alt=""
                    class="item-img"
                  />
                </div>
                <div class="item-content">
                  <div class="item-name">
                    <a href="#">Doraemon movie 20</a>
                  </div>
                  <div class="item-price">
                    <span>$49.99</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End specification area --> */}
        {/* <!-- Customer Reviews --> */}
        {/* <!-- <div>123213</div> --> */}
      </div>
    </section>
  );
};

export default ProductDetail;
