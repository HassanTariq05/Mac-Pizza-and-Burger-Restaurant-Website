import React, { useEffect, useState } from "react"
import "../css/style.css"
import "../css/responsive.css"
import "../css/header.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons"
import { Link } from "react-router-dom"
import getShopDetailsService from "../services/api/getShopDetails"

function Footer() {
  const [data, setData] = useState()

  useEffect(() => {
    const getShopDetails = async () => {
      const shopDetailsResponse = await getShopDetailsService.get()
      setData(shopDetailsResponse.data.data)
    }

    getShopDetails()
  }, [])

  const formatHour = (hour) => {
    if (!hour) return ""
    const intHour = parseInt(hour, 10)
    const period = intHour > 12 ? "PM" : "AM"
    const formattedHour = intHour % 12 === 0 ? 12 : intHour % 12
    return `${formattedHour} ${period}`
  }

  return (
    <footer id="footer-2" className="footer division">
      <div className="container">
        <div className="footer-2-holder text-center">
          <div className="row">
            <div className="col-sm-6 col-lg-3">
              <div className="footer-info mb-30">
                <h5 className="h5-md">Location</h5>
                <p>{data?.translation.address || ""}</p>
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
                  {/* <p>From 12:00pm noon- 02:00am Night</p> */}
                  <p>
                    From {formatHour(data?.delivery_time?.from)} -{" "}
                    {formatHour(data?.delivery_time?.to)}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="footer-contacts mb-30">
                <h5 className="h5-md">Order Now</h5>
                <p className="mt-5">
                  <span className="yellow-color">
                    <a>{data?.phone}</a>
                  </span>
                </p>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="footer-socials-links mb-30">
                <h5 className="h5-md">Follow Us</h5>
                <ul className="foo-socials text-center clearfix">
                  <li>
                    <a
                      href="https://www.facebook.com/macburgerandpizza"
                      className="ico-facebook"
                    >
                      <FontAwesomeIcon
                        className="fab fa-facebook-f"
                        icon={faFacebook}
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/macburger.kg/"
                      className="ico-instagram"
                    >
                      <FontAwesomeIcon
                        className="fab fa-instagram"
                        icon={faInstagram}
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="bottom-footer">
            <div class="footer-content">
              <span>© Mac Burger & Pizza 2024 - All Rights Reserved</span>
              <Link to="/privacy-policy">
                <a class="privacy-policy">Privacy Policy</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
