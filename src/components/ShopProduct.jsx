import React from 'react'

function ShopProduct({ image, title, rating, description, price }) {
  return (
    <div className="col-lg-4">
        <div className="menu-6-item bg-white">

            <div className="menu-6-img rel">
                <div className="hover-overlay">

                    <img className="img-fluid" src={image} alt="menu-image"/>

                    <span className="item-code bg-tra-dark"></span>

                    <div className="menu-img-zoom ico-25">
                        <a href={require("../images/breakfast-img-1.jpg")} className="image-link">
                            <span className="flaticon-zoom"></span>
                        </a>
                    </div>

                </div>
            </div>

            <div className="menu-6-txt rel">

                <div className="item-rating">
                    <div className="stars-rating stars-lg">
                    {Array(rating).fill().map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                    ))}
                    </div>
                </div>

                <div className="like-ico ico-25">
                    <a href="#"><span className="flaticon-heart"></span></a>
                </div>

                <h5 className="h5-sm">{title}</h5>

                <p className="grey-color">{description}.</p>

                <div className="menu-6-price bg-coffee">
                    <h5 className="h5-xs yellow-color">{price}</h5>
                </div>

                <div className="add-to-cart bg-yellow ico-10">
                    <a href="#"><span className="flaticon-shopping-bag"></span> Add to Cart</a>
                </div>

            </div>
    </div>
    </div>
  )
}

export default ShopProduct
