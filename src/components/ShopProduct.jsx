import React from 'react';
import { useStateValue } from './StateProvider';
import '../css/ProductView.css';
import { Link } from 'react-router-dom';

function ShopProduct({ image, title, rating, description, price, hasOption, category }) {
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    const itemIndex = basket.findIndex((item) => item.title === title);
    if (itemIndex >= 0) {
      dispatch({
        type: 'UPDATE_QUANTITY',
        item: {
          title: title,
          quantity: basket[itemIndex].quantity + 1,
        },
      });
    } else {
      dispatch({
        type: 'ADD_TO_BASKET',
        item: {
          title: title,
          image: image,
          price: price,
          rating: rating,
          description: description,
          quantity: 1,
        },
      });
    }
  };

  const encodedTitle = encodeURIComponent(title);
  const encodedImage = encodeURIComponent(image);
  const encodedHasOption = encodeURIComponent(hasOption);
  const encodedPrice = encodeURIComponent(price);
  const encodedDesc = encodeURIComponent(description);

  return (
    <div className="shopProduct">
      <div className="">
        <div className="">
          <Link to={`/product/${encodedTitle}/${encodedImage}/${encodedHasOption}/${1}/${category}/${encodedPrice}/${encodedDesc}`}>
            <div className="hover-overlay">
              <img className="img-fluid" src={image} alt="menu-image" />
              <span className="item-code bg-tra-dark"></span>
            </div>
          </Link>
        </div>
        <div className="">
          <Link to={`/product/${encodedTitle}/${encodedImage}/${encodedHasOption}/${1}/${category}/${encodedPrice}/${encodedDesc}`}>
            <span className="productTitle">{title}</span>
            <div className="">
              <span className="productPrice">{`${price.toFixed(2)}som`}</span>
            </div>
          </Link>
          <div className="addToCartShop">
            {hasOption ? (
              <Link to={`/product/${encodedTitle}/${encodedImage}/${encodedHasOption}/${1}/${category}/${encodedPrice}/${encodedDesc}`}>
                <button className='addToCart1'>SELECT OPTION</button>
              </Link>
            ) : (
                <Link to={`/shop/add-to-cart/${encodedTitle}`}>
              <button className='addToCart1' onClick={addToBasket}>
                <span className="flaticon-shopping-bag"></span> Add to Cart
              </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopProduct;
