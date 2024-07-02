import React from 'react'

function CartProduct({ title, image, description, price }) {
    const getTotalPrice = (() => {
        <span>100</span>
    })
  return (
    <tr>
        <td data-label="Product" className="product-name">
            {/* Product Details */}
            <div className="cart-product-img"><img src={image} alt="cart-preview" /></div>
            <div className="cart-product-desc">
                <h5 className="h5-sm">{title}</h5>
                <p className="p-sm">{description}</p>
            </div>
        </td>
        <td data-label="Price" className="product-price">
            <h5 className="h5-md">{price}</h5>
        </td>
        <td data-label="Quantity" className="product-qty">
            <input className="qty" type="number" min="1" max="20" defaultValue="1" />
        </td>
        <td data-label="Total" className="product-price-total">
            <h5 className="h5-md">{getTotalPrice}</h5>
        </td>
        <td data-label="Delete" className="td-trash"><i className="far fa-trash-alt"></i></td>
    </tr>
  )
}

export default CartProduct;
