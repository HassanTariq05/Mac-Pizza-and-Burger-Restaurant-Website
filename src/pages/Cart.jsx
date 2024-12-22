import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import CartProduct from "../components/CartProduct"
import { useStateValue } from "../components/StateProvider"
import CurrencyFormat from "react-currency-format"
import "../css/Cart.css"
import ShopProduct from "../components/ShopProduct"
import { BASE_URL } from "../env/env"
import productService from "../services/api/productService"
import couponService from "../services/api/couponService"
import authService from "../services/api/authService"
import toast from "react-hot-toast"
import deleteCartService from "../services/api/deleteCartService"
import AddressModal from "../components/AddressModal"
import deliveryPriceService from "../services/api/deliveryPriceService"
import { error } from "jquery"
import useUser from "../components/useUser"
import DeliveryTypeModal from "../components/DeliveryTypeModal"
import PickupAddressModal from "../components/PickupAddressModal"

const Cart = () => {
  const [products, setProducts] = useState([])
  const [deliveryPrice, setDeliveryPrice] = useState({
    value: "",
    validation: false,
  })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = { id: "bc25c7cd-ed84-4626-8f6b-897476ca2a29" }
        const response = await productService.getAll(params)
        setProducts(response.data.data)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchProducts()
  }, ["bc25c7cd-ed84-4626-8f6b-897476ca2a29"])

  useEffect(() => {
    const deleteCart = async () => {
      try {
        if (!localStorage.getItem("token")) {
          throw error
        }
        const headers = {
          Authorization: localStorage.getItem("token"),
        }
        const deleteCartResponse = await deleteCartService.delete(headers)
      } catch (error) {
        if (loggedIn) {
          toast.error("Error deleting cart")
        } else {
          console.log("Not logged in")
        }
      }
    }
    deleteCart()
  }, [])

  const [{ basket }, dispatch] = useStateValue()
  const [couponCode, setCouponCode] = useState("")
  const [emptyBasket, setEmptyBasket] = useState(true)
  const [AddressModalOpen, setAddressModalOpen] = useState(false)
  const [DeliveryTypeModalOpen, setDeliveryTypeModalOpen] = useState(false)
  const [PickupAddressModalOpen, setPickupAddressModalOpen] = useState(false)

  const onClose = () => {
    setAddressModalOpen(false)
    getDeliveryPrice()
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

  useEffect(() => {
    setEmptyBasket(basket.length === 0)
  }, [basket])

  const totalPrice = () => {
    const basketPrice = basket
      .reduce((total, item) => {
        const addonsTotal = item.addons
          ? item.addons.reduce((sum, addon) => sum + addon.max_price, 0)
          : 0
        return total + (item.price + addonsTotal) * item.quantity
      }, 0)
      .toFixed(2)

    const deliveryPriceNumber = parseFloat(deliveryPrice.value) || 0
    const basketPriceNumber = parseFloat(basketPrice) || 0

    const total =
      localStorage.getItem("deliveryType") === "pickup"
        ? basketPriceNumber
        : basketPriceNumber + deliveryPriceNumber

    return deliveryPrice !== "" && !isNaN(total)
      ? total.toFixed(2) + "som"
      : "Select Address to view"
  }

  const subTotalPrice = () => {
    return basket
      .reduce((total, item) => {
        const addonsTotal = item.addons
          ? item.addons.reduce((sum, addon) => sum + addon.max_price, 0)
          : 0
        return total + (item.price + addonsTotal) * item.quantity
      }, 0)
      .toFixed(2)
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

      const response = await couponService.create(params, headers)
    } catch (error) {
      console.error("Error creating coupon:", error)
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

  const getUserAddress = () => {
    const currentAddress = localStorage.getItem("currentAddress")

    if (!currentAddress) {
      return null
    }

    if (localStorage.getItem("deliveryType") === "pickup") {
      return localStorage.getItem("currentAddress")
    }

    try {
      const parsedAddress = JSON.parse(currentAddress)

      if (!parsedAddress?.street_house_number) {
        return null
      }

      const address = JSON.parse(parsedAddress.street_house_number).address

      return address || null
    } catch (error) {
      return null
    }
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

  const getLocationTagType = () => {
    const type = localStorage.getItem("deliveryType")
    let tag
    if (type !== null) {
      if (type === "delivery") {
        tag = "Delivery Location: "
      } else if (type === "pickup") {
        tag = "Pickup Location: "
      }
    } else {
      tag = "Location: "
    }

    return tag
  }

  useEffect(() => {
    if (localStorage.getItem("isGuestUser") === "false") {
      getDeliveryPrice()
    }
  }, [])

  const { loggedIn } = useUser()

  const navigate = useNavigate()
  const handleCheckoutClick = () => {
    const currentAddress = localStorage.getItem("currentAddress")

    console.log(localStorage)
    if (currentAddress !== null) {
      navigate("/checkout")
    } else {
      toast.error("Select address to proceed")
    }
  }

  const getShippingFee = () => {
    const fee = localStorage.getItem("shippingFee")
    if (fee !== null) {
      return fee + ".00som"
    } else {
      return "Address not selected"
    }
    // {deliveryPrice.validation
    //   ? deliveryPrice.value
    //   : "Address not selected"}
  }

  return (
    <div id="page" className="page">
      <div
        id="about-page"
        className="page-hero-section division"
        style={{ backgroundImage: "url('')" }}
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
                            <li className="breadcrumb-item">
                              <Link to="/home">Home</Link>
                            </li>
                            <li
                              className="breadcrumb-item active"
                              aria-current="page"
                            >
                              CART
                            </li>
                          </ol>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
                <h2 className="h2-xl">CART</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section id="cart-1" className="wide-100 cart-page division">
        <div className="container">
          {emptyBasket ? (
            <>
              <div className="text-center">
                <img className="sadimg"></img>
                <h2>Your cart is currently empty!</h2>
              </div>
              <div className="related-products-section">
                <h2>NEW IN STORE</h2>
                <div className="related-products-cart">
                  {products.map((item) => (
                    <ShopProduct
                      key={item.id}
                      title={item.translation.title}
                      description={item.translation.description}
                      price={[item.min_price, item.max_price]}
                      image={`${BASE_URL}/${item.img}`}
                      quantity={item.min_qty}
                      maxQuantity={item.max_qty}
                      stocks={item.stocks}
                      hasOption={item.stocks.length > 1 ? true : false}
                      uuid={item.uuid}
                      categoryUUID={"bc25c7cd-ed84-4626-8f6b-897476ca2a29"}
                      productType={false}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="row">
              <div className="col-md-8">
                <div className="cart-table mb-70">
                  <table id="myTable">
                    <thead>
                      <tr>
                        <th scope="col">PRODUCT</th>
                        <th className="totalth" scope="col"></th>
                        <th className="totalth" scope="col">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {basket.map((item) => (
                        <CartProduct
                          key={item.title}
                          title={item.title}
                          image={item.image}
                          description={item.description}
                          price={item.price}
                          quantity={item.quantity}
                          size={item.size}
                          addons={item.addons}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-md-4">
                <div className="cart-checkout">
                  <table>
                    <tbody>
                      <tr className="trrr">
                        <td>
                          <span
                            className={
                              getUserAddress()
                                ? "address-text label-text"
                                : "not-selected-text label-text"
                            }
                          >
                            {getLocationTagType()}
                          </span>

                          {getUserAddress() || "Not Selected"}
                        </td>
                        <td className="text-right">
                          <button
                            onClick={handleDeliveryTypeModalOpen}
                            id="cbtn"
                            href="#"
                            className="btn btn-md btn-salmon tra-salmon-hover"
                            style={{
                              width: "100px",
                              height: "45px",
                              fontSize: "12px",
                              padding: "4px",
                              marginLeft: "10px",
                              justifySelf: "end",
                            }}
                          >
                            Change
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
                <div className="cart-checkout">
                  <p className="c">CART TOTALS</p>
                  <table>
                    <tbody>
                      <tr className="trrr">
                        <td>Coupon</td>
                        <td className="text-right">On Checkout</td>
                      </tr>
                      <tr className="trr">
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
                      {localStorage.getItem("deliveryType") !== "pickup" && (
                        <tr>
                          <td>Shipping</td>
                          <td className="text-right">
                            <div>{getShippingFee()}</div>
                          </td>
                        </tr>
                      )}

                      <tr className="last-tr">
                        <td>Total</td>
                        <td className="text-right">{totalPrice()}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="checkout-button-sticky">
                    <button
                      id="cbtn"
                      href="#"
                      className="btn btn-md btn-salmon tra-salmon-hover"
                      onClick={handleCheckoutClick}
                    >
                      Proceed To Checkout
                    </button>
                  </div>
                  <Link to={"/shop"}>
                    <button
                      href="#"
                      className="btn btn-md btn-salmon tra-salmon-hover"
                    >
                      Add another item
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Cart
