import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useStateValue } from "../components/StateProvider"
import CurrencyFormat from "react-currency-format"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import orderDetailService from "../services/api/orderDetailService"
import moment from "moment"

const OrderInfo = ({ detail }) => {
  return (
    <div className="order-info">
      <div className="info-item">
        <span className="label">Order Number:</span>
        <span className="value">{detail.id}</span>
      </div>
      <div className="info-item">
        <span className="label">Date:</span>
        <span className="value">
          {moment(detail.delivery_date).format("MMM DD, hh:mm A")}
        </span>
      </div>
      <div className="info-item">
        <span className="label">Total:</span>
        <span className="value">
          {detail.total_price} {detail.currency.symbol}
        </span>
      </div>
      <div className="info-item">
        <span className="label">
          {detail.delivery_type == "point"
            ? "Shipping Method:"
            : "Payment Method:"}
        </span>
        <span className="value">
          {detail.delivery_type == "point"
            ? "Local Pickup"
            : "Cash on Delivery"}
        </span>
      </div>
      <div className="info-item">
        <span className="label">ORDER STATUS:</span>
        <span className="value">
          {detail.status == "new" ? "PENDING" : "CANCELED"}
        </span>
      </div>
    </div>
  )
}

// const getProductsList = () => {
//   ret
// }

const OrderDetails = ({ detail }) => {
  const getItemTotalPrice = (mainItem) => {
    const mainItemPrice = mainItem.total_price * mainItem.quantity
    const addonsPrice = detail.details
      .filter(
        (addon) =>
          addon.stock.product.addon === 1 &&
          addon.order_id === mainItem.order_id
      )
      .reduce((total, addon) => {
        const addonPrice = addon.total_price ?? addon.stock.product.price ?? 0
        return total + addonPrice * addon.quantity
      }, 0)

    return mainItemPrice + addonsPrice
  }
  return (
    <div className="order-details">
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {detail.details.map((item, index) => {
            if (item.stock.product.addon === 0) {
              return (
                <tr key={index}>
                  <td className="text-bold">
                    {`${item.stock.product.translation.title} X ${item.quantity}`}
                  </td>
                  <td className="text-bold">
                    {(item.total_price ?? 0).toFixed(2)}
                  </td>
                </tr>
              )
            } else {
              return (
                <tr key={index}>
                  <td className="text-gray-600 pl-4">
                    {`↳ ${item.stock.product.translation.title}`}
                  </td>
                  <td className="text-bold">{item.stock.price ?? "0"}.00</td>
                </tr>
              )
            }
          })}

          {detail.delivery_type != "point" && (
            <tr>
              <td className="text-bold">Shipping Fee:</td>
              <td className="text-bold">{detail.delivery_fee.toFixed(2)}</td>
            </tr>
          )}
          {detail.coupon && detail.coupon.name && (
            <tr>
              <td className="text-bold">
                Discount(Coupon Applied):{detail.coupon.name}
              </td>
              <td className="text-bold">{detail.coupon.price.toFixed(2)}</td>
            </tr>
          )}
          <tr>
            <td className="text-bold">Subtotal:</td>
            <td className="text-bold">{detail.total_price.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="text-bold">Shipping:</td>
            <td className="text-bold">
              {detail.delivery_type == "point" ? "Local Pickup" : "Delivery"}
            </td>
          </tr>
          <tr>
            <td className="text-bold">Payment method:</td>
            <td className="text-bold">
              {detail.delivery_type == "point" ? "Cash" : "Cash on Delivery"}
            </td>
          </tr>
          <tr>
            <td className="total-num">Total:</td>
            <td className="total-num">
              <CurrencyFormat
                value={detail.total_price}
                displayType={"text"}
                thousandSeparator={true}
                suffix={detail.currency.symbol}
                renderText={(value) => <div>{value}</div>}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const Orders = () => {
  const [detail, setDetail] = useState({
    id: "",
    currency: { symbol: "" },
    details: [],
    delivery_fee: 0,
    total_price: 0,
    coupon: { name: "" },
  })
  useEffect(() => {
    getOrderDetail()
  }, [])

  const { id } = useParams()
  const [{}, dispatch] = useStateValue()

  const getOrderDetail = async () => {
    try {
      const headers = { Authorization: localStorage.getItem("token") }
      const response = await orderDetailService.getDetail(id, headers)
      setDetail(response.data.data)
    } catch (error) {
      console.error("Error fetching order details:", error)
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
                  <h2 className="h2-xl">SUCCESS</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="product-1" className="pt-100 pb-100 single-product division">
        <div className="container">
          <div className="order-confirmation">
            <h2>Thank you. Your order has been received.</h2>
            <OrderInfo detail={detail} />
            <h3>Order Details</h3>
            <OrderDetails detail={detail} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Orders
