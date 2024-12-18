import React, { useState } from "react"
import { useStateValue } from "./StateProvider"
import CurrencyFormat from "react-currency-format"
import "../css/Cart.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons"

function CartProduct({
  title,
  image,
  description,
  price,
  quantity,
  size,
  stockId,
  addons,
}) {
  const [{ basket }, dispatch] = useStateValue()

  const handleQuantityChange = (event) => {
    const newQuantity = Number(event.target.value)
    dispatch({
      type: "UPDATE_QUANTITY",
      item: {
        title: title,
        quantity: newQuantity,
        size: size,
        addons: addons,
      },
    })
  }

  const getTotalPrice = () => {
    const addonsTotal = addons
      ? addons.reduce((sum, addon) => sum + addon.max_price, 0)
      : 0
    return ((price + addonsTotal) * quantity).toFixed(2)
  }

  return (
    <tr className="thead">
      <td id="td" data-label="Product" className="product-name">
        <div className="cart-product-img">
          <img src={image} alt="cart-preview" />
        </div>
      </td>

      <td id="td" data-label="Product" className="product-name">
        <div className="cart-product-des">
          <p className="b">{title}</p>

          <p data-label="Price" className="b">
            {price}som
          </p>
          <p className="b">{size && `Size: ${size}`}</p>

          {addons != null &&
            addons.map((addon) => (
              <p className="b">
                {addon.translation.title}: {addon.max_price}som
              </p>
            ))}
          <input
            className="qty"
            type="number"
            min="1"
            max="20"
            value={quantity}
            onChange={handleQuantityChange}
          />

          <p>
            <button
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_BASKET",
                  title,
                  size,
                  addons,
                })
              }
              className="btn1"
            >
              <FontAwesomeIcon icon={faXmarkCircle} /> Remove item
            </button>
          </p>
        </div>
      </td>
      <td id="td" data-label="Total" className="product-price-total">
        <p className="b">{getTotalPrice()}som</p>
      </td>
    </tr>
  )
}

export default CartProduct
