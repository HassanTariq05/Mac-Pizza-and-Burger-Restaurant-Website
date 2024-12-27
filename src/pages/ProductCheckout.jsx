import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"
import { useStateValue } from "../components/StateProvider"
import CurrencyFormat from "react-currency-format"
import authService from "../services/api/authService"
import orderService from "../services/api/orderService"
import deleteCartService from "../services/api/deleteCartService"
import toast from "react-hot-toast"
import { useCallback } from "react"
import couponService from "../services/api/couponService"
import deliveryPriceService from "../services/api/deliveryPriceService"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import LoginConfirmationModal from "../components/LoginConfirmationModal"
import createCartService from "../services/api/createCartService"
import "../css/ProductCheckout.css"
import AddressModal from "../components/AddressModal"
import PickupAddressModal from "../components/PickupAddressModal"
import DeliveryTypeModal from "../components/DeliveryTypeModal"

const CouponSection = ({
  warnings,
  delivery,
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

      {warnings.length > 0 && delivery && (
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
  const [AddressModalOpen, setAddressModalOpen] = useState(false)
  const [DeliveryTypeModalOpen, setDeliveryTypeModalOpen] = useState(false)
  const [PickupAddressModalOpen, setPickupAddressModalOpen] = useState(false)
  const [deliveryPrice, setDeliveryPrice] = useState({
    value: "",
    validation: false,
  })

  const onClose = () => {
    setAddressModalOpen(false)
    getDeliveryPrice()
  }

  const getDeliveryPrice = async () => {
    try {
      const currentAddress = JSON.parse(localStorage.getItem("currentAddress"))
      if (!currentAddress || !currentAddress.location) {
        setDeliveryPrice({ value: "Select address to view", validation: false })
        return
      }

      const { latitude: lat, longitude: lng } = currentAddress.location
      if (!lat || !lng) {
        setDeliveryPrice({ value: "Select address to view", validation: false })
        return
      }

      const addressCoordsObj = { lat, lng }

      const getDeliveryDistanceResponse = await deliveryPriceService.getPrice()
      const distances = getDeliveryDistanceResponse?.data?.data

      if (!Array.isArray(distances) || distances.length === 0) {
        setDeliveryPrice({
          value: "No delivery options available",
          validation: false,
        })
        return
      }

      const maxDistanceObj = distances.reduce(
        (maxObj, item) =>
          item.max_distance_km > (maxObj?.max_distance_km || 0) ? item : maxObj,
        null
      )

      if (
        !maxDistanceObj ||
        !maxDistanceObj.shop ||
        !maxDistanceObj.shop.lat_long
      ) {
        setDeliveryPrice({
          value: "No delivery options available",
          validation: false,
        })
        return
      }

      const calculatedDistance = calculateDistance(addressCoordsObj, {
        lat: maxDistanceObj.shop.lat_long.latitude,
        lng: maxDistanceObj.shop.lat_long.longitude,
      })

      const price = matchPrice(calculatedDistance, distances)

      setDeliveryPrice({
        value: price !== "" ? `${price}.00som` : "Select address to view",
        validation: true,
      })
      localStorage.setItem("shippingFee", price)
    } catch (error) {
      console.error("Error fetching delivery price:", error)
      setDeliveryPrice({
        value: "Error fetching delivery price",
        validation: false,
      })
    }
  }

  const calculateDistance = (coord1, coord2) => {
    if (!coord1 || !coord2) return Infinity

    const R = 6371e3 // Earth's radius in meters
    const lat1 = (coord1.lat * Math.PI) / 180
    const lat2 = (coord2.lat * Math.PI) / 180
    const deltaLat = ((coord2.lat - coord1.lat) * Math.PI) / 180
    const deltaLng = ((coord2.lng - coord1.lng) * Math.PI) / 180

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLng / 2) *
        Math.sin(deltaLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return (R * c) / 1000
  }
  const matchPrice = (calculatedDistance, data) => {
    const matchedItem = data.find(
      (item) =>
        calculatedDistance >= item.min_distance_km &&
        calculatedDistance <= item.max_distance_km
    )

    localStorage.setItem("deliveryPriceId", matchedItem.id)
    return matchedItem
      ? matchedItem.price
      : "No price available for the given distance"
  }

  const onDeliveryTypeModalClose = () => {
    setDeliveryTypeModalOpen(false)
  }

  const onPickupAddressModalClose = () => {
    setPickupAddressModalOpen(false)
  }

  const handleAddressModalOpen = () => {
    setAddressModalOpen(true)
  }

  const onDeliveryButtonClick = () => {
    onDeliveryTypeModalClose()
    handleAddressModalOpen()
  }

  const onPickupButtonClick = () => {
    onDeliveryTypeModalClose()
    setPickupAddressModalOpen(true)
  }

  const handleDeliveryTypeModalOpen = () => {
    setDeliveryTypeModalOpen(true)
  }

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
    if (localStorage.getItem("isGuesUser") === "false") {
      deleteCart()
    }
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

  const [delivery, setdelivery] = useState(true)
  const [selectedShipping, setSelectedShipping] = useState("delivery")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleShippingChange = (e) => {
    const value = e.target.value
    setSelectedShipping(value)
    setdelivery(value !== "point")
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
    const products = []

    basket.forEach((item) => {
      products.push({
        stock_id: item.stockId,
        quantity: item.quantity,
      })

      if (item.addons && item.addons.length > 0) {
        item.addons.forEach((addon) => {
          products.push({
            stock_id: addon.stocks[0]?.id,
            quantity: item.quantity,
          })
        })
      }
    })

    return products
  }

  const placeOrder = () => {
    const newWarnings = []
    if (isGuestUser()) {
      if (!formData.email)
        newWarnings.push("Billing Email address is a required field.")
      if (!formData.firstName)
        newWarnings.push("Billing First name is a required field.")
      if (!formData.lastName)
        newWarnings.push("Billing Last name is a required field.")
      if (!formData.phone)
        newWarnings.push("Billing Phone is a required field.")

      if (delivery) {
        setWarnings(newWarnings)
      }
    }

    if (!delivery || newWarnings.length === 0) {
      loginUser()
    }
  }

  const totalPrice = () => {
    const basketTotal = basket.reduce((total, item) => {
      const addonTotal = item.addons
        ? item.addons.reduce((sum, addon) => sum + addon.max_price, 0)
        : 0

      const itemTotal = (item.price + addonTotal) * item.quantity

      return total + itemTotal
    }, 0)

    const shippingFee =
      localStorage.getItem("deliveryType") === "delivery"
        ? parseInt(localStorage.getItem("shippingFee"), 10) || 0
        : 0

    return (basketTotal - discount + shippingFee).toFixed(2)
  }

  const subTotalPrice = () => {
    return basket
      .reduce((total, item) => {
        const addonTotal = item.addons
          ? item.addons.reduce((sum, addon) => sum + addon.max_price, 0)
          : 0
        const itemTotal = (item.price + addonTotal) * item.quantity

        return total + itemTotal
      }, 0)
      .toFixed(2)
  }

  const loginGuestUser = async () => {
    try {
      const params = {
        email: "guestseller@macburger.kg",
        password: "12345678",
      }

      const response = await authService.authenticate(params)
      const token =
        response.data.data.token_type + " " + response.data.data.access_token

      const user = JSON.stringify(response.data.data.user)
      localStorage.setItem("token", token)
      localStorage.setItem("user", user)

      createCart("")
    } catch (error) {
      // console.error('Error fetching Auth:', error);
    }
  }

  const loginUser = () => {
    const user = localStorage.getItem("user")
    if (!user && localStorage.getItem("isGuestUser") === "true") {
      loginGuestUser()
    } else {
      createCart(user.phone)
    }
  }

  const getDeliveryType = () => {
    const type = localStorage.getItem("deliveryType")

    if (type === "delivery") {
      return "delivery"
    } else if (type === "pickup") {
      return "point"
    } else {
      return null
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
      createOrder(token, phone, cart_id)
    } catch (error) {}
  }

  const createOrder = async (token, guestUserPhone, cart_id) => {
    try {
      // Parse necessary localStorage data
      const userRaw = localStorage.getItem("user")
      const currentAddressRaw = localStorage.getItem("currentAddress")
      const deliveryType = localStorage.getItem("deliveryType")

      if (!userRaw) throw new Error("User data is missing from localStorage")
      const user = JSON.parse(userRaw)

      const currentAddress =
        deliveryType === "delivery" && currentAddressRaw
          ? JSON.parse(currentAddressRaw)
          : null

      // Build params
      const params = {
        user_id: user.id,
        currency_id: 2,
        rate: 1,
        payment_id: 1,
        delivery_price_id:
          deliveryType === "delivery"
            ? parseInt(localStorage.getItem("deliveryPriceId"))
            : null,
        delivery_point_id:
          deliveryType === "pickup"
            ? parseInt(localStorage.getItem("deliveryPointId"))
            : null,
        delivery_date: getDeliveryDate(),
        delivery_type: getDeliveryType(),
        phone: formData.phone || "123",
        cart_id: cart_id,
        notes: {
          501: isGuestUser()
            ? `${formData.email},${formData.firstName}, ${formData.lastName}, ${formData.streetAddress}, ${formData.orderNotes}, ${guestUserPhone}`
            : "",
        },
        coupon: couponCode === "" ? {} : { 501: couponCode },
        data: [
          {
            shop_id: 501,
            products: getProducts(),
          },
        ],
      }

      // Add address only if delivery type is "delivery" and currentAddress is valid
      if (deliveryType === "delivery" && currentAddress) {
        params.address = {
          country_id: 1,
          city_id: 1,
          street_house_number: currentAddress.street_house_number.toString(),
          zip_code: "",
          location: {
            latitude: currentAddress.latitude,
            longitude: currentAddress.longitude,
          },
          phone: user.phone,
        }
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
      console.error("Error creating order:", error.message)
    }
  }

  const isGuestUser = () => {
    const isGuest = localStorage.getItem("isGuestUser") === "true"
    return isGuest
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
                              <Link to="/">
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
            delivery={delivery}
            discount={discount}
            setDiscount={setDiscount}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
          />
          <div className="checkout-content-box">
            <div className="row1">
              <div
                style={{
                  border: "1px solid gainsboro",
                  borderRadius: "8px",
                  paddingBottom: "20px",
                }}
                className="col-lg-6 col-12"
              >
                <div className="checkout-container">
                  <table className="table">
                    <thead>
                      <tr>
                        <td style={{ borderTop: "none" }}>
                          <h3>Order Details</h3>
                        </td>
                      </tr>
                      <tr>
                        <th>Product</th>
                        <th className="text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {basket.map((item, index) => {
                        // Calculate the total price for addons
                        const addonTotal = item.addons
                          ? item.addons.reduce(
                              (sum, addon) => sum + addon.max_price,
                              0
                            )
                          : 0

                        const totalPrice =
                          (item.price + addonTotal) * item.quantity

                        return (
                          <tr key={index}>
                            <td>
                              {`${item.title} × ${item.quantity}`}
                              {item.addons && item.addons.length > 0 && (
                                <div className="text-sm text-gray-500">
                                  Addons:{" "}
                                  {item.addons
                                    .map((addon) => addon.translation.title)
                                    .join(", ")}
                                </div>
                              )}
                            </td>
                            <td className="text-right">
                              {totalPrice.toFixed(2)}som
                            </td>
                          </tr>
                        )
                      })}

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
                      {localStorage.getItem("deliveryType") === "delivery" && (
                        <tr>
                          <td>Shipping</td>
                          <td className="text-right">
                            <span className="">
                              {localStorage.getItem("shippingFee")}.00som
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
                  {delivery ? (
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
              <div style={{ border: "none" }} className="col-lg-6 col-12">
                <div
                  style={{ border: "1px solid gainsboro", borderRadius: "8px" }}
                  className="checkout-from-wrapper"
                >
                  {delivery && !isGuestUser() && (
                    <div className="deliver-to-container">
                      <h3>
                        {localStorage.getItem("deliveryType") === "delivery"
                          ? "Deliver To:"
                          : "Pickup Details"}
                      </h3>
                      <table className="details-table">
                        <tbody>
                          <tr>
                            <td className="label">Name</td>
                            <td className="value">
                              {JSON.parse(localStorage.getItem("user"))
                                .firstname +
                                " " +
                                JSON.parse(localStorage.getItem("user"))
                                  .lastname}
                            </td>
                          </tr>
                          <tr>
                            <td className="label">Phone No.</td>
                            <td className="value">
                              {JSON.parse(localStorage.getItem("user")).phone}
                            </td>
                          </tr>
                          {localStorage.getItem("deliveryType") ===
                            "delivery" && (
                            <tr>
                              <td className="label">Address</td>
                              <td className="value">
                                {
                                  JSON.parse(
                                    JSON.parse(
                                      localStorage.getItem("currentAddress")
                                    ).street_house_number
                                  ).address
                                }
                              </td>
                            </tr>
                          )}

                          {localStorage.getItem("deliveryType") ===
                            "delivery" && (
                            <>
                              <tr>
                                <td className="cbtn-td"></td>
                                <td className="cbtn-td">
                                  <button
                                    onClick={handleDeliveryTypeModalOpen}
                                    className="cbtn"
                                  >
                                    Change
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <td className="label">City</td>
                                <td className="value">
                                  {
                                    JSON.parse(
                                      JSON.parse(
                                        localStorage.getItem("currentAddress")
                                      ).street_house_number
                                    ).address1
                                  }
                                </td>
                              </tr>
                            </>
                          )}

                          {localStorage.getItem("deliveryType") ===
                            "pickup" && (
                            <>
                              <tr>
                                <td className="label">Pickup Location</td>
                                <td className="value">
                                  {localStorage.getItem("currentAddress")}
                                </td>
                              </tr>
                              <tr>
                                <td className="cbtn-td"></td>
                                <td className="cbtn-td">
                                  <button
                                    onClick={handleDeliveryTypeModalOpen}
                                    className="cbtn"
                                  >
                                    Change
                                  </button>
                                </td>
                              </tr>
                            </>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                  <AddressModal isOpen={AddressModalOpen} onClose={onClose} />
                  <DeliveryTypeModal
                    isOpen={DeliveryTypeModalOpen}
                    onDeliveryTypeModalClose={onDeliveryTypeModalClose}
                    onDeliveryButtonClick={onDeliveryButtonClick}
                    onPickupButtonClick={onPickupButtonClick}
                  />
                  <PickupAddressModal
                    isOpen={PickupAddressModalOpen}
                    onPickupAddressModalClose={onPickupAddressModalClose}
                  />
                  {isGuestUser() && (
                    <div className="checkout-from">
                      <form>
                        <div
                          style={{ justifyContent: "center" }}
                          className="row"
                        >
                          <div>
                            <h4>Customer Information</h4>
                          </div>
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

                          <div
                            className="acc-div"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              textAlign: "center",
                              gap: "8px",
                              height: "100%",
                            }}
                          >
                            <div className="col-lg-12">
                              <span>
                                <Link to={"/signup"}>
                                  <span
                                    style={{ color: "red", cursor: "pointer" }}
                                  >
                                    Register
                                  </span>{" "}
                                </Link>
                                to avail rewards and discounts
                              </span>
                            </div>
                            <div className="col-lg-12">
                              <span style={{ color: "secondary" }}>OR</span>
                            </div>
                            <div className="col-lg-12">
                              <span>
                                Already have an account?{" "}
                                <Link to={"/login"}>
                                  <span
                                    style={{ color: "red", cursor: "pointer" }}
                                  >
                                    Sign In
                                  </span>
                                </Link>
                              </span>
                            </div>
                          </div>
                        </div>
                      </form>
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
