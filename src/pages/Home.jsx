import React from 'react';
import '../css/style.css';
import '../css/responsive.css';

function Home() {
  return (
    <div>
      <section id="hero-2" className="bg-fixed hero-section division">
        <div className="bg-fixed bg-inner division" style={{ backgroundImage: "url('')" }}>
          <div className="container">
            <div className="hero-2-txt text-center">
              <h2 className="red-color shadow-txt-white"></h2>
              <div className="hero-2-img">
                <img className="img-fluid" src={require('../images/hero-sec-banner-img.jpg')} width="100%" height="auto" alt="hero-image" />
                <div className="price-badge-sm bg-fixed white-color1" style={{ backgroundImage: "url('https://macburger.kg/wp-content/uploads/2024/02/price-badge-yellow.png')" }}>
                  <div className="badge-txt">
                    <h5 className="h5-md">From</h5>
                    <h4 className="h4-lg">₽6.99</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-fixed white-overlay-wave"></div>
        </div>
      </section>

      <section id="menu-8" className="wide-70 menu-section division h-categories">
        <div className="container">
          <div id="tabs-nav" className="mb-0">
            <div className="row">
              <div className="col-lg-12 text-center">
                <ul className="tabs-1 ico-55 red-tabs clearfix">
                  <li className="tab-link current">
                    <a href="shop.html">
                      <img src={require('../images/our-menu-1.png')} alt="vector" />
                      <h5>Breakfast</h5>
                    </a>
                  </li>
                  <li className="tab-link">
                    <a href="shop.html">
                      <img src={require('../images/our-menu-2.png')} alt="" />
                      <h5>Burgers</h5>
                    </a>
                  </li>
                  <li className="tab-link">
                    <a href="shop.html">
                      <img src={require('../images/our-menu-3.png')} alt="" />
                      <h5>Coffee</h5>
                    </a>
                  </li>
                  <li className="tab-link">
                    <a href="shop.html">
                      <img src={require('../images/our-menu-4.png')} alt="" />
                      <h5>Drinks</h5>
                    </a>
                  </li>
                  <li className="tab-link">
                    <a href="shop.html">
                      <img src={require('../images/our-menu-5.png')} alt="" />
                      <h5>Fried</h5>
                    </a>
                  </li>
                  <li className="tab-link">
                    <a href="shop.html">
                      <img src={require('../images/our-menu-6.png')} alt="" />
                      <h5>Ice Cream</h5>
                    </a>
                  </li>
                  <li className="tab-link">
                    <a href="shop.html">
                      <img src={require('../images/our-menu-7.png')} alt="" />
                      <h5>Indian-Pakistani Menu</h5>
                    </a>
                  </li>
                  <li className="tab-link">
                    <a href="shop.html">
                      <img src={require('../images/our-menu-8.png')} alt="" />
                      <h5>Juices</h5>
                    </a>
                  </li>
                  <li className="tab-link">
                    <a href="shop.html">
                      <img src={require('../images/our-menu-9.png')} alt="" />
                      <h5>Milk Shakes</h5>
                    </a>
                  </li>
                  <li className="tab-link">
                    <a href="shop.html">
                      <img src={require('../images/our-menu-14.png')} alt="" />
                      <h5>Pizza</h5>
                    </a>
                  </li>
                  <li className="tab-link">
                    <a href="shop.html">
                      <img src={require('../images/our-menu-10.png')} alt="" />
                      <h5>Pizza roll/Shawarma</h5>
                    </a>
                  </li>
                  <li className="tab-link">
                    <a href="shop.html">
                      <img src={require('../images/our-menu-11.png')} alt="" />
                      <h5>Salad</h5>
                    </a>
                  </li>
                  <li className="tab-link">
                    <a href="shop.html">
                      <img src={require('../images/our-menu-12.png')} alt="" />
                      <h5>Sauces</h5>
                    </a>
                  </li>
                  <li className="tab-link">
                    <a href="shop.html">
                      <img src={require('../images/our-menu-13.png')} alt="" />
                      <h5>Soups</h5>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="promo-11" className="bg-fixed promo-section division">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-md-5 col-lg-4">
              <div className="pbox-11-txt mb-40 white-color">
                <h3 className="h3-lg">The</h3>
                <h2>County General</h2>
                <a href="product-single.html" className="btn btn-lg btn-red tra-white-hover">Order Now</a>
              </div>
            </div>
            <div className="col-md-7 col-lg-6">
              <div className="pbox-11-img mb-40">
                <img className="img-fluid" src={require('../images/pizza-banner-removebg-preview.png')} alt="promo-image" />
                <div className="red-badge price-badge-lg bg-fixed">
                  <div className="badge-txt white-color">
                    <h5 className="h5-xl">Only</h5>
                    <h3 className="h3-sm">170.00SOM</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="pbox-11-link text-center white-color">
                <a href="product-single.html">
                  <img className="img-fluid" src={require('../images/central-banner-pizza-1.png')} alt="promo-image" />
                  <p>POLO VEGGIE PIZZA</p>
                </a>
              </div>
              <div className="pbox-11-link text-center mb-40 white-color">
                <a href="product-single.html">
                  <img className="img-fluid" src={require('../images/central-banner-pizza-2.png')} alt="promo-image" />
                  <p>HAWAIIAN PIZZA</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="promo-3" className="promo-section division wide-50">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-md-6">
              <a href="menu-3.html">
                <div className="pbox-3 mb-30">
                  <div className="hover-overlay">
                    <img className="img-fluid" src={require('../images/promo-3-sec-img-1.webp')} alt="promo-image" />
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-6">
              <a href="menu-3.html">
                <div className="pbox-3 mb-30">
                  <div className="hover-overlay">
                    <img className="img-fluid" src={require('../images/promo-3-sec-img-2.webp')} alt="promo-image" />
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-6">
              <a href="menu-3.html">
                <div className="pbox-3">
                  <div className="hover-overlay">
                    <img className="img-fluid" src={require('../images/promo-3-sec-img-3.webp')} alt="promo-image" />
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-6">
              <a href="menu-3.html">
                <div className="pbox-3 pbox-3-last">
                  <div className="hover-overlay">
                    <img className="img-fluid" src={require('../images/promo-3-sec-img-4.webp')} alt="promo-image" />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
