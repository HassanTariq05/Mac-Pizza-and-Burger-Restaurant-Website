import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"
import { useStateValue } from "../components/StateProvider"
import CurrencyFormat from "react-currency-format"
import authService from "../components/authService"
import orderService from "../components/orderService"
import orderDetailService from "../components/orderDetailService"
import deleteCartService from "../components/deleteCartService"
import toast from "react-hot-toast"
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps"
import { GOOGLE_MAPS_API_KEY } from "../components/service"
import { useCallback } from "react"
import couponService from "../components/couponService"
import deliveryPriceService from "../components/deliveryPriceService"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import DialogModal from "../components/LoginConfirmationModal"
import LoginConfirmationModal from "../components/LoginConfirmationModal"
import createCartService from "../components/createCartService"

const CouponSection = ({
  warnings,
  showBilling,
  discount,
  setDiscount,
  subTotalPrice,
  couponCode,
  setCouponCode,
}) => {
  const [{ basket }, dispatch] = useStateValue()
  const [showCoupon, setShowCoupon] = useState(false)
  const warningsRef = useRef(null)
  const [couponStatus, setCouponStatus] = useState("")

  useEffect(() => {
    if (warnings.length > 0) {
      warningsRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [warnings])

  const loginGuestUser = async () => {
    try {
      const params = {
        email: "guestseller@macburger.kg",
        password: "12345678",
      }

      const response = await authService.authenticate(params)
      const token =
        response.data.data.token_type + " " + response.data.data.access_token
      localStorage.setItem("token", token)
    } catch (error) {
      // console.error('Error fetching Auth:', error);
    }
  }

  const handleApplyCoupon = (event) => {
    event.preventDefault()
    loginGuestUser().then(() => {
      createCoupon(couponCode)
    })
  }

  const createCoupon = async (couponCode) => {
    try {
      const token = localStorage.getItem("token")
      const headers = {
        Authorization: token,
      }

      const params = {
        coupon: couponCode,
        user_id: "108",
        shop_id: "501",
      }

      const response = await couponService.check(params, headers)
      if (response.status === 200) {
        if (
          response.data.data.for === "total_price" &&
          response.data.data.type === "fixed"
        ) {
          setDiscount(response.data.data.price)
        }
        if (
          response.data.data.for === "total_price" &&
          response.data.data.type === "percent"
        ) {
          const subTotalPrice = () => {
            return basket
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2)
          }
          setDiscount((subTotalPrice() * response.data.data.price) / 100)
        }
        setCouponStatus({
          message: "Coupon Applied Successfully",
          status: "success",
        })
      } else {
        setCouponStatus({ message: "Coupon not Found", status: "error" })
      }
    } catch (error) {
      setCouponStatus({ message: "Coupon not Found", status: "error" })
      // console.error('Error creating coupon:', error);
    }
  }

  const handleRemoveCoupon = () => {
    {
      discount > 0 ??
        setCouponStatus({
          message: "Coupon Removed Successfully",
          status: "success",
        })
    }
    setDiscount(0)
    setShowCoupon(false)
  }

  return (
    <div className="have-coupon-bar-wrap" ref={warningsRef}>
      <div className="have-coupon-bar">
        <div className="icon-wrap"></div>
        <p>
          Have a coupon?{" "}
          <a onClick={() => setShowCoupon(true)}>
            Click here to enter your code
          </a>
        </p>
      </div>
      {showCoupon && (
        <div className="coupon-field-box">
          <p>If you have a coupon code, please apply it below.</p>
          <div className="field-wrap">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Coupon code"
            />
            <div className="apply-btn">
              <button
                onClick={handleApplyCoupon}
                id="applyBtn"
                type=""
                className="btn btn-md btn-salmon tra-salmon-hover"
              >
                <span className="wc-block-components-button__text">Apply</span>
              </button>
              <button
                onClick={handleRemoveCoupon}
                id="applyBtn"
                type=""
                className="btn btn-md btn-salmon tra-salmon-hover"
              >
                <span className="wc-block-components-button__text">Remove</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {couponStatus !== "" && (
        <div
          className={
            couponStatus.status === "success"
              ? "xoo-cp-atcn xoo-cp-success"
              : "xoo-cp-atcn xoo-cp-error"
          }
        >
          <span className="xoo-cp-icon-check">
            {couponStatus.status === "success" ? (
              <>
                <FontAwesomeIcon className="checkIcon" icon={faCheck} />
                <span>{couponStatus.message}</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon className="checkIcon" icon={faXmark} />
                <span>{couponStatus.message}</span>
              </>
            )}
          </span>
        </div>
      )}

      {warnings.length > 0 && showBilling && (
        <div className="warnings">
          <ul className="warnIcon">
            <FontAwesomeIcon icon={faExclamationCircle} />
          </ul>
          {warnings.map((warning, index) => (
            <p key={index} className="warning">
              {warning}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

const ProductCheckout = () => {
  const [map, setMap] = useState()
  const [userMarker, setUserMarker] = useState()
  const [address, setAddress] = useState()
  const [discount, setDiscount] = useState(0)
  const [couponCode, setCouponCode] = useState("")
  const [latLong, setLatLong] = useState()

  const [modalVisible, setModalVisible] = useState(false)

  const handleOpenModal = () => setModalVisible(true)
  const handleCloseModal = () => setModalVisible(false)

  const handleLogin = () => {
    navigate("/login")
    setModalVisible(false)
  }

  const handleMapClick = useCallback((ev) => {
    if (!map) return
    if (!ev.detail.latLng) return
    map.panTo(ev.detail.latLng)
    setUserMarker(ev.detail.latLng)
    handleMarkerAddress(ev.detail.latLng)
    console.log("ev.detail:", ev.detail)
    setLatLong(ev.detail.latLng)
  })

  const handleMarkerAddress = (latLng) => {
    const geocoder = new window.google.maps.Geocoder()
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          setFormData((prevState) => ({
            ...prevState,
            streetAddress: results[0].formatted_address,
          }))
        }
      } else {
        setAddress("Geocoder failed due to: " + status)
      }
    })
  }

  useEffect(() => {
    const deleteCart = async () => {
      try {
        const headers = {
          Authorization: localStorage.getItem("token"),
        }
        const deleteCartResponse = await deleteCartService.delete(headers)
      } catch (error) {
        toast.error("Error deleting cart")
      }
    }
    deleteCart()
  }, [])
  const [{}, dispatch] = useStateValue()
  const emptyBasket = () => {
    dispatch({
      type: "EMPTY_BASKET",
    })
  }

  const [orders, setOrders] = useState()
  const [validation, setValidation] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    streetAddress: "",
    phone: "",
    orderNotes: "",
  })

  const [warnings, setWarnings] = useState([])
  const navigate = useNavigate()
  const [{ basket }] = useStateValue()

  const [showBilling, setShowBilling] = useState(true)
  const [selectedShipping, setSelectedShipping] = useState("delivery")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleShippingChange = (e) => {
    const value = e.target.value
    setSelectedShipping(value)
    setShowBilling(value !== "point")
  }

  const [shippingCost, setShippingCost] = useState(0)

  const getShippingCost = async () => {
    try {
      const response = await deliveryPriceService.getPrice()
      if (response.status === 200) {
        if (selectedShipping === "delivery") {
          setShippingCost(response.data.data[0].price)
        } else {
          setShippingCost(0)
        }
      } else {
        // console.log('Delivery Price not found');
      }
    } catch (error) {
      // console.error('Error fetching delivery price:', error);
    }
  }

  useEffect(() => {
    getShippingCost()
  }, [selectedShipping])

  const getDeliveryDate = () => {
    const date = new Date()
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }
    return date.toLocaleDateString("sv-SE", options).replace(" ", " ")
  }

  const getProducts = () => {
    return basket.map((item) => ({
      stock_id: item.stockId,
      quantity: item.quantity,
    }))
  }

  const placeOrder = () => {
    const newWarnings = []
    if (!formData.email)
      newWarnings.push("Billing Email address is a required field.")
    if (!formData.firstName)
      newWarnings.push("Billing First name is a required field.")
    if (!formData.lastName)
      newWarnings.push("Billing Last name is a required field.")
    if (!formData.phone) newWarnings.push("Billing Phone is a required field.")

    if (showBilling) {
      setWarnings(newWarnings)
    }

    if (!showBilling || newWarnings.length === 0) {
      loginUser()
    }
  }

  const totalPrice = () => {
    return (
      basket.reduce((total, item) => total + item.price * item.quantity, 0) -
      discount +
      shippingCost
    ).toFixed(2)
  }
  const subTotalPrice = () => {
    return basket
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2)
  }

  const loginUser = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (!user) {
      handleOpenModal()
    } else {
      console.log("User: ", user)
      const token = localStorage.getItem("token")
      createCart(user.phone)
      // createOrder(token, user.phone)
    }
  }

  const createCart = async (phone) => {
    try {
      const token = localStorage.getItem("token")
      const params = {
        currency_id: 2,
        region_id: 1,
        country_id: 1,
        city_id: 1,
        area_id: 1,
        products: getProducts(),
      }

      const headers = {
        Authorization: token,
      }

      const createCartResponse = await createCartService.create(params, headers)
      const cart_id = createCartResponse.data.data.id
      console.log(cart_id)
      createOrder(token, phone, cart_id)
    } catch (error) {}
  }

  const createOrder = async (token, guestUserPhone, cart_id) => {
    try {
      const params = {
        user_id: 108,
        currency_id: 2,
        rate: 1,
        payment_id: 1,
        delivery_price_id: selectedShipping === "delivery" ? 1 : null,
        delivery_point_id: selectedShipping === "point" ? 1 : null,
        address:
          selectedShipping === "delivery"
            ? {
                country_id: 1,
                city_id: 1,
                street_house_number: JSON.parse(
                  localStorage.getItem("currentAddress")
                ).street_house_number.toString(),
                zip_code: "",
                location: {
                  latitude: latLong.lat,
                  longitude: latLong.lng,
                },
                phone: formData.phone,
              }
            : {},
        delivery_date: getDeliveryDate(),
        delivery_type: selectedShipping,
        phone: formData.phone,
        cart_id: cart_id,
        notes: {
          501: `${formData.email},${formData.firstName}, ${formData.lastName}, ${formData.streetAddress}, ${formData.orderNotes}, ${guestUserPhone}`,
        },
        coupon: couponCode == "" ? {} : { 501: couponCode },
        data: [
          {
            shop_id: 501,
            products: getProducts(),
          },
        ],
      }

      const headers = {
        Authorization: token,
      }

      const response = await orderService.create(params, headers)
      const orderId = response.data.data[0].id
      setOrders(response.data.data)
      navigate(`/order/${orderId}`)
      emptyBasket()
    } catch (error) {
      // console.error('Error creating order:', error.message);
    }
  }

  return (
    <>
      <div id="page" className="page">
        <div
          id="about-page"
          className="page-hero-section division"
          style={{ backgroundImage: 'url("")' }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-10 offset-lg-1">
                <div className="hero-txt text-center white-color">
                  <div id="breadcrumb">
                    <div className="row">
                      <div className="col">
                        <div className="breadcrumb-nav">
                          <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                              <Link to="/home">
                                <li className="breadcrumb-item">
                                  <a href="">Home</a>
                                </li>
                              </Link>
                              <p className="breadcrumb-item"></p>
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                Checkout
                              </li>
                            </ol>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h2 className="h2-xl">CHECKOUT</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="product-1" className="pt-100 pb-100 single-product division">
        <div className="container">
          <LoginConfirmationModal
            show={modalVisible}
            onClose={handleCloseModal}
            onLogin={handleLogin}
          />
          <CouponSection
            warnings={warnings}
            showBilling={showBilling}
            discount={discount}
            setDiscount={setDiscount}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
          />
          <div className="checkout-content-box">
            <div className="row1">
              <div className="col-lg-6 col-12">
                <div className="checkout-from-wrapper">
                  <h3>BILLING</h3>
                  {showBilling && (
                    <div className="">
                      <div id="" style={{ width: "100%", height: "450px" }}>
                        <APIProvider
                          apiKey={GOOGLE_MAPS_API_KEY}
                          onLoad={(map) => {
                            setMap(map)
                          }}
                        >
                          <Map
                            mapId="1"
                            onClick={handleMapClick}
                            defaultZoom={17}
                            defaultCenter={{ lat: 42.8724925, lng: 74.6121651 }}
                            onCameraChanged={(ev) => {
                              setMap(ev.map)
                            }}
                          >
                            <AdvancedMarker
                              key="User"
                              position={userMarker}
                            ></AdvancedMarker>
                          </Map>
                        </APIProvider>
                      </div>
                    </div>
                  )}
                  <div className="checkout-from">
                    <form>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="input-wrap">
                            <label>
                              Email address <span>*</span>
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-12">
                          <div className="input-wrap">
                            <label>
                              First name <span>*</span>
                            </label>
                            <input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-12">
                          <div className="input-wrap">
                            <label>
                              Last name <span>*</span>
                            </label>
                            <input
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        {showBilling && (
                          <div className="col-lg-12 col-12">
                            <div className="input-wrap">
                              <label>
                                Country / Region <span>*</span>
                              </label>
                              <p>Kyrgyzstan</p>
                            </div>
                          </div>
                        )}
                        <div className="col-lg-12">
                          <div className="input-wrap">
                            <label>
                              Street address <span>*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="House number and street name"
                              name="streetAddress"
                              value={formData.streetAddress}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="input-wrap">
                            <label>
                              Phone <span>*</span>
                            </label>
                            <input
                              type="text"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-12 col-12">
                          <h3 className="mb-3">ADDITIONAL INFORMATION</h3>
                          <div className="input-wrap">
                            <label>Order notes (optional)</label>
                            <textarea
                              rows="5"
                              cols="10"
                              placeholder={
                                showBilling
                                  ? "Notes about your order, e.g special notes for delivery."
                                  : "Notes about your order, e.g special notes for pickup."
                              }
                              name="orderNotes"
                              value={formData.orderNotes}
                              onChange={handleChange}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-12">
                <div className="checkout-container">
                  <table className="table">
                    <thead>
                      <tr>
                        <td style={{ borderTop: "none" }}>
                          <label className="sizeLabel" htmlFor="shipping">
                            Shipping
                          </label>
                        </td>
                        <td style={{ borderTop: "none" }}>
                          <select
                            className="select-shipping"
                            value={selectedShipping}
                            onChange={handleShippingChange}
                          >
                            <option value="delivery">Deliver</option>
                            <option value="point">Local pickup</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <th>Product</th>
                        <th className="text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {basket.map((item, index) => (
                        <tr key={index}>
                          <td>{`${item.title} × ${item.quantity}`}</td>
                          <td className="text-right">
                            {(item.price * item.quantity).toFixed(2)}som
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td>Subtotal</td>
                        <td className="text-right">
                          <CurrencyFormat
                            value={subTotalPrice()}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={"som"}
                            renderText={(value) => <div>{value}</div>}
                          />
                        </td>
                      </tr>
                      {selectedShipping === "delivery" && (
                        <tr>
                          <td>Shipping</td>
                          <td className="text-right">
                            <span className="">
                              {shippingCost.toFixed(2)}som
                            </span>
                          </td>
                        </tr>
                      )}

                      <tr>
                        <td>Discount</td>
                        <td className="text-right">
                          <span className="">{discount.toFixed(2)}som</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Total</td>
                        <td className="text-right total">
                          <CurrencyFormat
                            value={totalPrice()}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={"som"}
                            renderText={(value) => <div>{value}</div>}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {showBilling ? (
                    <div className="payment-method-wrapper">
                      <div className="payment-method">
                        <div className="payment-method-title">
                          Cash on delivery
                        </div>
                        <p>Pay with cash upon delivery.</p>
                      </div>
                      <div className="privacy-policy-wrap">
                        <p className="privacy-policy">
                          Your personal data will be used to process your order,
                          support your experience throughout this website, and
                          for other purposes described in our{" "}
                          <a href="#">privacy policy</a>.
                        </p>
                        <button
                          className="place-order-btn"
                          onClick={placeOrder}
                        >
                          Place order
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="payment-method-wrapper">
                      <div className="payment-method">
                        <div className="payment-method-title">
                          Pickup Address
                        </div>
                        <p>
                          <strong>Mac Burger & Pizza</strong>
                          <br />
                          137 Yusup Abdrahmanov Str. Crossing Toktogul, Bishkek,
                          Kyrgyzstan
                        </p>
                      </div>
                      <div className="privacy-policy-wrap">
                        <button
                          className="place-order-btn"
                          onClick={placeOrder}
                        >
                          Place order
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductCheckout
