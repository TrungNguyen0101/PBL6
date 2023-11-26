'use client';
import './styled.scss';
export default function Cart() {
  return(<section className="cart-wrapper">
  {/* <!-- ********** -->
  <!-- CONTAINER -->
  <!-- ********** --> */}
  <div className="container">
    <ul className="checkout-steps">
      <li className="step-cart step-active">
        <a href="#"> <span>Shopping cart</span></a>
      </li>
      <li className="step-checkout step-inactive">
        <a href="#"> <span>Checkout</span></a>
      </li>
      <li className="step-complete step-inactive">
        <a href="#"> <span>Order complete</span></a>
      </li>
    </ul>
  </div>
  {/* <!-- ********** -->
  <!--  CART-TABLE -->
  <!-- ********** --> */}
  <div className="cart-table">
    <div className="product-list">
      <div className="cart-table-section">
        <table className="table-shop">
          <thead>
            <tr>
              <th className="product-remove">&nbsp;</th>
              <th className="product-thumbnail">&nbsp;</th>
              <th className="product-name">Product</th>
              <th className="product-price">Price</th>
              <th className="product-quantity">Quantity</th>
              <th className="product-subtotal">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="product-remove">
                <button>
                  <i className="fa fa-times" aria-hidden="true"></i>
                </button>
              </td>
              <td className="product-thumbnail">
                <a href="#">
                  <img src="https://img.starbiz.com/resize/750x-/2020/07/16/doraemon-movies-download-3-9a6b.jpg"
                    alt="" className="item-img" /></a>
              </td>
              <td className="product-name">
                <a
                  href="https://woodmart.xtemos.com/games/product/red-dead-redemption-2/?attribute_pa_platform=nintendo-switch&amp;attribute_pa_edition=standart"><span>Red
                    Dead Redemption 2 - Nintendo Switch, Standart</span></a>
              </td>
              <td className="price-amount amount">
                <span>$39.9</span>
              </td>
              <td className="quantity">
                <div className="col-wrap product-number">
                  <div className="col col-minus">
                    <i className="fa fa-light fa-minus fa-xs"></i>
                  </div>
                  <div className="col col-number">
                    <span>20</span>
                  </div>
                  <div className="col col-plus">
                    <i className="fa fa-light fa-plus fa-xs"></i>
                  </div>
                  </div>
              </td>
              <td className="price-amount amount-sub">
                <span>$39.9</span>
              </td>
            </tr>
            <tr>
              <td className="product-remove">
                <button>
                  <i className="fa fa-times" aria-hidden="true"></i>
                </button>
              </td>
              <td className="product-thumbnail">
                <a href="#">
                  <img src="https://img.starbiz.com/resize/750x-/2020/07/16/doraemon-movies-download-3-9a6b.jpg"
                    alt="" className="item-img" /></a>
              </td>
              <td className="product-name">
                <a
                  href="https://woodmart.xtemos.com/games/product/red-dead-redemption-2/?attribute_pa_platform=nintendo-switch&amp;attribute_pa_edition=standart"><span>Red
                    Dead Redemption 2 - Nintendo Switch, Standart</span></a>
              </td>
              <td className="price-amount amount">
                <span>$39.9</span>
              </td>
              <td className="quantity">
                <div className="col-wrap product-number">
                  <div className="col col-minus">
                    <i className="fa fa-light fa-minus fa-xs"></i>
                  </div>
                  <div className="col col-number">
                    <span>20</span>
                  </div>
                  <div className="col col-plus">
                    <i className="fa fa-light fa-plus fa-xs"></i>
                  </div>
                  </div>
              </td>
              <td className="price-amount amount-sub">
                <span>$39.9</span>
              </td>
            </tr>
            <tr>
              <td className="product-remove">
                <button>
                  <i className="fa fa-times" aria-hidden="true"></i>
                </button>
              </td>
              <td className="product-thumbnail">
                <a href="#">
                  <img src="https://img.starbiz.com/resize/750x-/2020/07/16/doraemon-movies-download-3-9a6b.jpg"
                    alt="" className="item-img" /></a>
              </td>
              <td className="product-name">
                <a
                  href="https://woodmart.xtemos.com/games/product/red-dead-redemption-2/?attribute_pa_platform=nintendo-switch&amp;attribute_pa_edition=standart"><span>Red
                    Dead Redemption 2 - Nintendo Switch, Standart</span></a>
              </td>
              <td className="price-amount amount">
                <span>$39.9</span>
              </td>
              <td className="quantity">
                <div className="col-wrap product-number">
                  <div className="col col-minus">
                    <i className="fa fa-light fa-minus fa-xs"></i>
                  </div>
                  <div className="col col-number">
                    <span>20</span>
                  </div>
                  <div className="col col-plus">
                    <i className="fa fa-light fa-plus fa-xs"></i>
                  </div>
                  </div>
              </td>
              <td className="price-amount amount-sub">
                <span>$39.9</span>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
    <div className="cart-totals">
      <div className="liner-continer">
        <h4 className="title">Cart totals</h4>
      </div>
      <div className="wd-cart-totals">
        <div className="cart-totals-inner">
          <table className="table-shop">
            <tbody>
              <tr className="cart-subtotal">
                <th>Subtotal</th>
                <td> <span>$39.9</span></td>
              </tr>
              <tr className="shipping">
                <th>Shipping</th>
                <td>
                  <ul className="shipping_medthod">
                    <li>
                      <label for="flat">Giao Hàng Nhanh</label>
                      <input type="radio" className="shipping_method" id="flat" value="Flat_rate" checked="checked"
                        name="shipping_method">
</input>
                    </li>
                    <li>
                      <label for="free">Giao Hàng Tiết Kiệm</label>
                      <input type="radio" className="shipping_method" id="free" value="Free_shipping"
                        name="shipping_method">
                        </input>
                    </li>
                    <li>
                      <label for="local">Giao Hàng Hỏa Tốc</label>
                      <input type="radio" className="shipping_method" id="local" value="Local_pickup"
                        name="shipping_method">
                    </li>
                  </ul>


                  <p className="shipping-destination">
                    Shipping options will be updated during checkout. </p>

                </td>
              </tr>
              <tr className="order-total">
                <th>Total</th>
                <td> <span>$39.9</span></td>
              </tr>
            </tbody>
          </table>
          <div className="wc-proceed-to-checkout">
            <button className="checkout-button"><a href="#">
                Proceed to checkout</a></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>);
}
