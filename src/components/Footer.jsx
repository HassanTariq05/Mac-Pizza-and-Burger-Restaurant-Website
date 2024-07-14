import React from 'react';
import '../css/style.css';
import '../css/responsive.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faFileWaveform } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  return (
    <footer id="footer-2" className="footer division">
      <div className="container">
        <div className="footer-2-holder text-center">
          <div className="row">
            <div className="col-sm-6 col-lg-3">
              <div className="footer-info mb-30">
                <h5 className="h5-md">Location</h5>
                <p>137 Yusup Abdrahmanov Str. Crossing Toktogul, Bishkek, Kyrgyzstan</p>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="footer-info mb-30">
                <h5 className="h5-md">Working Schedule</h5>
                <div className="footer-info-wrap">
                  <h6>Dine-In Opens:</h6>
                  <p>11:00am till 02:00am Night</p>
                </div>
                <div className="footer-info-wrap">
                  <h6>Delivery:</h6>
                  <p>From 12:00pm noon- 02:00am Night</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="footer-contacts mb-30">
                <h5 className="h5-md">Order Now</h5>
                <p className="mt-5">
                  <span className="yellow-color">
                    <a href="tel:+996 700 334 433">+996 700 334 433</a>
                  </span>
                </p>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="footer-socials-links mb-30">
                <h5 className="h5-md">Follow Us</h5>
                <ul className="foo-socials text-center clearfix">
                  <li>
                    <a href="https://www.facebook.com/macburgerandpizza" className="ico-facebook">
                      <FontAwesomeIcon className="fab fa-facebook-f" icon={faFacebook}/>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/macburger.kg/" className="ico-instagram">
                      <FontAwesomeIcon className="fab fa-instagram" icon={faInstagram}/>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bottom-footer">
            <div className="row d-flex align-items-center">
              <div className="col-lg-10 offset-lg-1">
                <ul className="bottom-footer-list clearfix">
                  <li>© Mac Burger &amp; Pizza 2024 - All Rights Reserved</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
