import './styled.scss';
export default function Cart() {
  return(<section class="cart-wrapper">
  {/* <!-- ********** -->
  <!-- CONTAINER -->
  <!-- ********** --> */}
  <div class="container">
    <ul class="checkout-steps">
      <li class="step-cart step-active">
        <a href="#"> <span>Shopping cart</span></a>
      </li>
      <li class="step-checkout step-inactive">
        <a href="#"> <span>Checkout</span></a>
      </li>
      <li class="step-complete step-inactive">
        <a href="#"> <span>Order complete</span></a>
      </li>
    </ul>
  </div>
  {/* <!-- ********** -->
  <!--  CART-TABLE -->
  <!-- ********** --> */}
  <div class="cart-table">
    <div class="product-list">
      <div class="cart-table-section">
        <table class="table-shop">
          <thead>
            <tr>
              <th class="product-remove">&nbsp;</th>
              <th class="product-thumbnail">&nbsp;</th>
              <th class="product-name">Product</th>
              <th class="product-price">Price</th>
              <th class="product-quantity">Quantity</th>
              <th class="product-subtotal">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="product-remove">
                <button>
                  <i class="fa fa-times" aria-hidden="true"></i>
                </button>
              </td>
              <td class="product-thumbnail">
                <a href="#">
                  <img src="https://img.starbiz.com/resize/750x-/2020/07/16/doraemon-movies-download-3-9a6b.jpg"
                    alt="" class="item-img" /></a>
              </td>
              <td class="product-name">
                <a
                  href="https://woodmart.xtemos.com/games/product/red-dead-redemption-2/?attribute_pa_platform=nintendo-switch&amp;attribute_pa_edition=standart"><span>Red
                    Dead Redemption 2 - Nintendo Switch, Standart</span></a>
              </td>
              <td class="price-amount amount">
                <span>$39.9</span>
              </td>
              <td class="quantity">
                <div class="col-wrap product-number">
                  <div class="col col-minus">
                    <i class="fa fa-light fa-minus fa-xs"></i>
                  </div>
                  <div class="col col-number">
                    <span>20</span>
                  </div>
                  <div class="col col-plus">
                    <i class="fa fa-light fa-plus fa-xs"></i>
                  </div>
              </td>
              <td class="price-amount amount-sub">
                <span>$39.9</span>
              </td>
            </tr>
            <tr>
              <td class="product-remove">
                <button>
                  <i class="fa fa-times" aria-hidden="true"></i>
                </button>
              </td>
              <td class="product-thumbnail">
                <a href="#">
                  <img src="https://img.starbiz.com/resize/750x-/2020/07/16/doraemon-movies-download-3-9a6b.jpg"
                    alt="" class="item-img" /></a>
              </td>
              <td class="product-name">
                <a
                  href="https://woodmart.xtemos.com/games/product/red-dead-redemption-2/?attribute_pa_platform=nintendo-switch&amp;attribute_pa_edition=standart"><span>Red
                    Dead Redemption 2 - Nintendo Switch, Standart</span></a>
              </td>
              <td class="price-amount amount">
                <span>$39.9</span>
              </td>
              <td class="quantity">
                <div class="col-wrap product-number">
                  <div class="col col-minus">
                    <i class="fa fa-light fa-minus fa-xs"></i>
                  </div>
                  <div class="col col-number">
                    <span>20</span>
                  </div>
                  <div class="col col-plus">
                    <i class="fa fa-light fa-plus fa-xs"></i>
                  </div>
              </td>
              <td class="price-amount amount-sub">
                <span>$39.9</span>
              </td>
            </tr>
            <tr>
              <td class="product-remove">
                <button>
                  <i class="fa fa-times" aria-hidden="true"></i>
                </button>
              </td>
              <td class="product-thumbnail">
                <a href="#">
                  <img src="https://img.starbiz.com/resize/750x-/2020/07/16/doraemon-movies-download-3-9a6b.jpg"
                    alt="" class="item-img" /></a>
              </td>
              <td class="product-name">
                <a
                  href="https://woodmart.xtemos.com/games/product/red-dead-redemption-2/?attribute_pa_platform=nintendo-switch&amp;attribute_pa_edition=standart"><span>Red
                    Dead Redemption 2 - Nintendo Switch, Standart</span></a>
              </td>
              <td class="price-amount amount">
                <span>$39.9</span>
              </td>
              <td class="quantity">
                <div class="col-wrap product-number">
                  <div class="col col-minus">
                    <i class="fa fa-light fa-minus fa-xs"></i>
                  </div>
                  <div class="col col-number">
                    <span>20</span>
                  </div>
                  <div class="col col-plus">
                    <i class="fa fa-light fa-plus fa-xs"></i>
                  </div>
              </td>
              <td class="price-amount amount-sub">
                <span>$39.9</span>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
    <div class="cart-totals">
      <div class="liner-continer">
        <h4 class="title">Cart totals</h4>
      </div>
      <div class="wd-cart-totals">
        <div class="cart-totals-inner">
          <table class="table-shop">
            <tbody>
              <tr class="cart-subtotal">
                <th>Subtotal</th>
                <td> <span>$39.9</span></td>
              </tr>
              <tr class="shipping">
                <th>Shipping</th>
                <td>
                  <ul class="shipping_medthod">
                    <li>
                      <label for="flat">Giao Hàng Nhanh</label>
                      <input type="radio" class="shipping_method" id="flat" value="Flat_rate" checked="checked"
                        name="shipping_method">

                    </li>
                    <li>
                      <label for="free">Giao Hàng Tiết Kiệm</label>
                      <input type="radio" class="shipping_method" id="free" value="Free_shipping"
                        name="shipping_method">
                    </li>
                    <li>
                      <label for="local">Giao Hàng Hỏa Tốc</label>
                      <input type="radio" class="shipping_method" id="local" value="Local_pickup"
                        name="shipping_method">
                    </li>
                  </ul>


                  <p class="shipping-destination">
                    Shipping options will be updated during checkout. </p>

                </td>
              </tr>
              <tr class="order-total">
                <th>Total</th>
                <td> <span>$39.9</span></td>
              </tr>
            </tbody>
          </table>
          <div class="wc-proceed-to-checkout">
            <button class="checkout-button"><a href="#">
                Proceed to checkout</a></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>);
}
