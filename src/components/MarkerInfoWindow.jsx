import React from "react"

function MarkerInfoWindow({
  distance,
  maxDeliveryDistance,
  formatted_address,
}) {
  const handlePointClick = () => {
    alert("anc")
  }
  return (
    <div>
      <div style="display: flex; align-items: center; padding: 10px;">
        <div style="margin-right: 8px;">
          <img src="${delivery_scooter}" alt="icon" width="30" />
        </div>
        <div>
          <p style="margin: 0;">
            <b>${formatted_address}</b>
          </p>
          {distance <= maxDeliveryDistance ? (
            <button
              onclick={handlePointClick}
              style="
                        background: none;
                        border: none;
                        color: red;
                        font-size: 12px;
                        font-weight: bold;
                        text-decoration: none;
                        cursor: pointer;"
            >
              Use this point
            </button>
          ) : (
            <p style="margin: 0; color: gray; font-size: 12px; font-weight: bold;">
              We don't deliver here
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default MarkerInfoWindow
