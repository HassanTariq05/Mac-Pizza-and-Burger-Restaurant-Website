import React, { useState } from "react"
import { useStateValue } from "../components/StateProvider"
import CurrencyFormat from "react-currency-format"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import orderDetailService from "../services/api/orderDetailService"
import moment from "moment"
import "../css/OrderDetail.css"
import { Calendar } from "lucide-react"
import { BASE_URL } from "../env/env"
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
            {detail.details.map((item, index) => {
              if (item.stock.product.addon === 0) {
                // Collect all subsequent addons until the next non-addon item
                const addons = []
                let addonsTotalPrice = 0 // Variable to store the total price of addons
                for (let i = index + 1; i < detail.details.length; i++) {
                  if (detail.details[i].stock.product.addon === 1) {
                    addons.push({
                      title: detail.details[i].stock.product.translation.title,
                      price: detail.details[i].stock.price ?? 0,
                    })
                    addonsTotalPrice += detail.details[i].stock.price ?? 0
                  } else {
                    break // Stop if the next non-addon item is found
                  }
                }

                const totalPrice = (item.stock.price ?? 0) + addonsTotalPrice

                return (
                  <div className="order-itemss" key={item.id}>
                    <img
                      src={`${BASE_URL}/${item.stock.product.img}`}
                      alt={item.stock.product.translation.title}
                      className="item-image"
                    />
                    <div className="item-details">
                      <h4>
                        {item.stock.product.translation.title}
                        {addons.length > 0 && (
                          <div className="addon-titles">
                            {addons.map((addon, addonIndex) => (
                              <div
                                style={{ color: "gray", fontSize: "14px" }}
                                key={addonIndex}
                              >
                                {`↳ ${addon.title} (${addon.price.toFixed(2)})`}
                              </div>
                            ))}
                          </div>
                        )}
                      </h4>
                    </div>
                    <div className="item-pricing">{totalPrice.toFixed(2)}</div>
                    <div className="item-pricing">{item.quantity}</div>
                    <div className="item-pricing">
                      {(totalPrice * item.quantity).toFixed(2)}
                    </div>
                  </div>
                )
              }
              return null // Skip rendering addon items
            })}
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
      <OrderProgressBar
        type={detail.delivery_type}
        orderNo={detail.id}
        status={detail.status}
      />
    </>
  )
}

export default OrderDetail
