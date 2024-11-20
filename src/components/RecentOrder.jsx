import React, { useState } from "react"
import "../css/UserProfile.css"
import defaultProfilePicture from "../images/default-user-pic.webp"
import allOrdersService from "./allOrdersService"
import { useEffect } from "react"
import { baseURL } from "./service"
import { Link } from "react-router-dom"

function RecentOrder() {
  const [allOrdersResponse, setAllOrdersResponse] = useState()

  useEffect(() => {
    const getRecentOrder = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await allOrdersService.get(token)
        console.log("All Orders: ", response.data.data)
        setAllOrdersResponse(response.data.data)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    getRecentOrder()
  }, [])

  return (
    <div class="orders-container">
      <div class="orders-header">
        <span class="orders-title">My Orders</span>
        <Link to={"/orders"}>
          <span class="orders-see-all">See All</span>
        </Link>
      </div>

      <div class="order-detail">
        <span class="order-id">
          Order ID{" "}
          <p className="order-id-heavy">{allOrdersResponse?.[0]?.id || "-"}</p>
        </span>
        <span class="order-status">
          {allOrdersResponse?.[0]?.delivery_type == "point"
            ? "pickup"
            : "delivery" || "-"}
        </span>
      </div>

      <div class="separator"></div>

      <Link to={`/orders/order-detail/${allOrdersResponse?.[0]?.id}`}>
        <div class="order-item">
          <div class="order-item-header">
            <div>
              <img
                class="order-img"
                src={
                  `${baseURL}/${allOrdersResponse?.[0]?.details?.[0]?.stock?.product?.img}` ||
                  defaultProfilePicture
                }
                alt="order-img"
              />
            </div>
            <div className="order-desc-div">
              <span class="order-item-name">
                {allOrdersResponse?.[0]?.details?.[0]?.stock?.product
                  ?.translation?.title || "-"}
              </span>
              <span class="order-item-price">
                {`${allOrdersResponse?.[0]?.details?.[0]?.stock?.total_price}.0som` ||
                  "-"}
              </span>
            </div>
          </div>
          <div class="order-item-footer">
            {`${allOrdersResponse?.[0]?.details?.length} item(s)` || "-"}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default RecentOrder
