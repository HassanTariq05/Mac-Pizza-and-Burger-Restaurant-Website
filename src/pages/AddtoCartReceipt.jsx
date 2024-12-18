import React, { useState, useEffect } from "react"
import "../css/AddToCartReceipt.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { Link, useParams, useNavigate } from "react-router-dom"
import { useStateValue } from "../components/StateProvider"

const AddToCartReceipt = () => {
  const { title, size, addonTitles } = useParams()
  const [{ basket }, dispatch] = useStateValue()
  const [isActive, setIsActive] = useState(false)
  const [isRemoved, setIsRemoved] = useState(false)
  const navigate = useNavigate()

  const addonTitlesArray = addonTitles ? addonTitles.split(",") : []

  const matchedProduct = basket.find((item) => {
    const isSizeNone = size === "size_none"
    const isAddonNone = addonTitles === "addon_none"

    const addonsMatch = isAddonNone
      ? !item.addons || item.addons.length === 0
      : item.addons &&
        addonTitlesArray.length > 0 &&
        item.addons.length === addonTitlesArray.length &&
        item.addons.every((addon) =>
          addonTitlesArray.includes(addon.translation.title)
        )

    if (isSizeNone && isAddonNone) {
      return item.title === title
    }

    return item.title === title && item.size === size && addonsMatch
  })

  useEffect(() => {
    setIsActive(true)
    console.log("Params:", { title, size, addonTitles })
    console.log("Basket:", basket)
    console.log("Matched Product:", matchedProduct)
  }, [matchedProduct])

  const handleCloseModal = () => {
    setIsActive(false)
    navigate(-1)
  }

  const handleRemoveProduct = () => {
    const isSizeNone = size === "size_none"
    const isAddonNone = addonTitles === "addon_none"

    if (isSizeNone || isAddonNone) {
      dispatch({ type: "REMOVE_FROM_BASKET", title, size })
    } else {
      dispatch({
        type: "REMOVE_FROM_BASKET_WITH_TITLE",
        title,
        size,
        addonTitles,
      })
    }

    setIsRemoved(true)
  }

  const totalPrice = matchedProduct
    ? matchedProduct.price * matchedProduct.quantity
    : 0

  const handleQuantityChange = (newQuantity) => {
    const isSizeNone = size === "size_none"
    const isAddonNone = addonTitles === "addon_none"
    if (isSizeNone || isAddonNone) {
      dispatch({
        type: "UPDATE_QUANTITY",
        item: {
          title: title,
          quantity: newQuantity,
          size: size === "size_none" ? "" : size,
        },
      })
    } else {
      dispatch({
        type: "UPDATE_QUANTITY_WITH_TITLE_NAMES",
        item: {
          title: title,
          quantity: newQuantity,
          size: size,
          addonTitles: addonTitlesArray,
        },
      })
    }
  }

  const increaseQuantity = () => {
    handleQuantityChange(matchedProduct.quantity + 1)
  }

  const decreaseQuantity = () => {
    if (matchedProduct.quantity > 1) {
      handleQuantityChange(matchedProduct.quantity - 1)
    }
  }

  return (
    <>
      <div className={"xoo-cp-opac active"}></div>

      <div className={"xoo-cp-modal xoo-cp-active"}>
        <div className="xoo-cp-container">
          <div className="xoo-cp-outer" style={{ display: "none" }}>
            <div className="xoo-cp-cont-opac"></div>
            <span className="xoo-cp-preloader xoo-cp-icon-spinner"></span>
          </div>
          <div className="xoo-cp-content" style={{ opacity: 1 }}>
            <div className="xoo-cp-atcn xoo-cp-success">
              <span className="xoo-cp-icon-check">
                <FontAwesomeIcon className="checkIcon" icon={faCheck} />
                {isRemoved
                  ? "Product removed successfully"
                  : "Product successfully added to your cart"}
              </span>
            </div>
            {!isRemoved && matchedProduct && (
              <table className="xoo-cp-pdetails clearfix">
                <tbody>
                  <tr data-xoo_cp_key="a8abb4bb284b5b27aa7cb790dc20f80b">
                    <td className="xoo-cp-remove">
                      <FontAwesomeIcon
                        onClick={handleRemoveProduct}
                        className="fa fa-trash"
                        icon={faXmarkCircle}
                      />
                    </td>
                    <td className="xoo-cp-pimg">
                      <img
                        width="300"
                        height="300"
                        src={matchedProduct.image}
                        alt="Product"
                      />
                    </td>
                    <td className="xoo-cp-ptitle">
                      <a href="#">{matchedProduct.title}</a>
                      <br />
                      {size && size === "size_none" ? "" : `Size:  ${size}`}
                    </td>
                    <td className="xoo-cp-pprice">
                      <span className="woocommerce-Price-amount amount">
                        <bdi>
                          {matchedProduct.price}
                          <span className="woocommerce-Price-currencySymbol">
                            som
                          </span>
                        </bdi>
                      </span>
                    </td>
                    <td className="xoo-cp-pqty">
                      <div className="xoo-cp-qtybox">
                        <span
                          className="xcp-minus xcp-chng"
                          onClick={decreaseQuantity}
                        >
                          -
                        </span>
                        <input
                          className="xoo-cp-qty"
                          min="1"
                          step="1"
                          value={matchedProduct.quantity}
                          pattern="[0-9]*"
                          onChange={(e) =>
                            handleQuantityChange(Number(e.target.value))
                          }
                        />
                        <span
                          className="xcp-plus xcp-chng"
                          onClick={increaseQuantity}
                        >
                          +
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
            {!isRemoved && matchedProduct && (
              <div className="xoo-cp-ptotal">
                <span className="xcp-totxt">Total : </span>
                <span className="xcp-ptotal">
                  <span className="woocommerce-Price-amount amount">
                    <bdi>
                      {totalPrice}
                      <span className="woocommerce-Price-currencySymbol">
                        som
                      </span>
                    </bdi>
                  </span>
                </span>
              </div>
            )}
          </div>
          <div className="xoo-cp-btns">
            <Link to={"/cart"} className="xoo-cp-btn-vc xcp-btn">
              View Cart
            </Link>
            <button className="xoo-cp-close xcp-btn" onClick={handleCloseModal}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddToCartReceipt
