import React, { useEffect, useState } from "react"
import "../css/UserProfile.css"
import defaultProfilePicture from "../images/default-user-pic.webp"
import { baseURL } from "../components/service"
import allOrdersService from "../components/allOrdersService"
import { Link } from "react-router-dom"

function AllOrders() {
  const [allOrdersResponse, setAllOrdersResponse] = useState([])
  const [activeTab, setActiveTab] = useState("recent")

  useEffect(() => {
    const getRecentOrder = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await allOrdersService.get(token)
        console.log("All Orders: ", response.data.data)
        setAllOrdersResponse(response.data.data || [])
      } catch (error) {
        console.error("Error fetching orders:", error)
      }
    }

    getRecentOrder()
  }, [])

  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const filteredOrders =
    activeTab === "recent"
      ? allOrdersResponse.filter(
          (order) => new Date(order.created_at) >= sevenDaysAgo
        )
      : allOrdersResponse.filter(
          (order) => new Date(order.created_at) < sevenDaysAgo
        )

  return (
    <div className="orders-wrapper">
      <div className="tabs-container">
        <button
          className={`tab-button ${activeTab === "recent" ? "active" : ""}`}
          onClick={() => setActiveTab("recent")}
        >
          Recent Orders
        </button>
        <button
          className={`tab-button ${activeTab === "past" ? "active" : ""}`}
          onClick={() => setActiveTab("past")}
        >
          Past Orders
        </button>
      </div>

      <div className="orders-container">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order, orderIndex) => (
            <Link to={`order-detail/${order.id}`}>
              <div
                className={`order-item ${
                  orderIndex === filteredOrders.length - 1 ? "no-border" : ""
                }`}
                key={order.id || orderIndex}
              >
                <div className="order-item-header">
                  <div>
                    <img
                      className="order-img"
                      src={
                        order?.details?.[0]?.stock?.product?.img
                          ? `${baseURL}/${order.details[0].stock.product.img}`
                          : defaultProfilePicture
                      }
                      alt="order-img"
                    />
                  </div>
                  <div className="order-desc-div">
                    <span className="order-item-name">
                      {order?.details?.[0]?.stock?.product?.translation
                        ?.title || "-"}
                    </span>
                    <span className="order-item-price">
                      {order?.details?.[0]?.stock?.total_price
                        ? `${order.details[0].stock.total_price}.0 som`
                        : "-"}
                    </span>
                  </div>
                </div>
                <div className="order-item-footer">
                  {order?.details?.length
                    ? `${order.details.length} item(s)`
                    : "0 item(s)"}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="no-orders-message">
            {activeTab === "recent" ? "No Recent Orders" : "No Past Orders"}
          </div>
        )}
      </div>
    </div>
  )
}

export default AllOrders
