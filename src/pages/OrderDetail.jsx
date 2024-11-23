import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useStateValue } from "../components/StateProvider"
import CurrencyFormat from "react-currency-format"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import orderDetailService from "../components/orderDetailService"
import moment from "moment"
import "../css/OrderDetail.css"
import { Calendar } from "lucide-react"
import { baseURL } from "../components/service"
import OrderProgressBar from "../components/OrderProgressBar"

const OrderDetail = () => {
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
      <div class="order-container">
        <span>Orders / Order Detail</span>

        <div class="order-header">
          <h2>{`Order #${detail.id}`}</h2>
          <div class="order-status">
            <span class="badge paid">
              <span class="dot paid"></span>
              {detail.delivery_type == "point"
                ? "Local Pickup"
                : "Cash on Delivery"}
            </span>
            <span class="order-date">
              <Calendar size={18} class="calendar-icon" />{" "}
              {moment(detail.delivery_date).format("MMM DD, hh:mm A")}
            </span>
          </div>
        </div>
      </div>

      <div class="order-container">
        <div class="order-details">
          <div class="order-details-header">
            <h3>
              Order details{" "}
              <span class="item-count">({detail.details.length})</span>
            </h3>
          </div>
          <div class="order-items">
            {detail.details.map((item) => (
              <div class="order-itemss">
                <img
                  src={`${baseURL}/${item.stock.product.img}`}
                  alt="RayBan sunglasses"
                  class="item-image"
                />
                <div class="item-details">
                  <h4>{item.stock.product.translation.title}</h4>
                </div>
                <div class="item-pricing">{item.stock.price}</div>
                <div class="item-pricing">{item.quantity}</div>
                <div class="item-pricing">{item.total_price.toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div class="order-summary">
            <h3>Order Summary</h3>
            {detail.delivery_type != "point" && (
              <div class="summary-item">
                <span>Shipping fee:</span>
                <span>{detail.delivery_fee.toFixed(2)}</span>
              </div>
            )}
            {detail.coupon && detail.coupon.name && (
              <div class="summary-item">
                <span>Discount(Coupon Applied):{detail.coupon.name}</span>
                <span>{detail.coupon.price.toFixed(2)}</span>
              </div>
            )}
            <div class="summary-item">
              <span>Subtotal:</span>
              <span>{detail.total_price.toFixed(2)}</span>
            </div>

            <div class="summary-item">
              <span>Shipping:</span>
              <span>
                {detail.delivery_type == "point" ? "Local Pickup" : "Delivery"}
              </span>
            </div>
            <div class="summary-item">
              <span>Payment Method:</span>
              <span>
                {detail.delivery_type == "point" ? "Cash" : "Cash on Delivery"}
              </span>
            </div>
            <div class="summary-item total">
              <span>Total:</span>
              <span>{detail.total_price}som</span>
            </div>
          </div>
        </div>
      </div>
      <OrderProgressBar orderNo={detail.id} status={detail.status} />
    </>
  )
}

export default OrderDetail
