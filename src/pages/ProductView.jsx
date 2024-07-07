import React, { useState } from 'react';
import '../css/ProductView.css';
import '../css/style.css';
import '../css/responsive.css';
import { Link, useParams } from 'react-router-dom';
import { useStateValue } from '../components/StateProvider';
import ShopProduct from '../components/ShopProduct';

const ProductView = () => {
    const { title, image, hasOption, price, productQuantity, category, rating, description } = useParams();
    const [quantity, setQuantity] = useState(parseInt(productQuantity) || 1);
    const [size, setSize] = useState('');
    const [showAdditionalPrice, setShowAdditionalPrice] = useState(false);
    const [{ basket }, dispatch] = useStateValue();

    const relatedProducts = [
        {
            image: require("../images/sashimi.png"),
            title: 'Related Product 1',
            rating: 4,
            description: 'Description for related product 1',
            price: 200,
            hasOption: false,
            category: 'Related Category',
        },
        {
            image: require("../images/sashimi.png"),
            title: 'Related Product 2',
            rating: 5,
            description: 'Description for related product 2',
            price: 250,
            hasOption: true,
            category: 'Related Category',
        },
        {
            image: require("../images/sashimi.png"),
            title: 'Related Product 1',
            rating: 4,
            description: 'Description for related product 1',
            price: 200,
            hasOption: false,
            category: 'Related Category',
        },
        {
            image: require("../images/sashimi.png"),
            title: 'Related Product 2',
            rating: 5,
            description: 'Description for related product 2',
            price: 250,
            hasOption: true,
            category: 'Related Category',
        },
        {
            image: require("../images/sashimi.png"),
            title: 'Related Product 1',
            rating: 4,
            description: 'Description for related product 1',
            price: 200,
            hasOption: false,
            category: 'Related Category',
        },
        // Add up to 5 related products here
    ];

    const addToBasket = () => {
        const itemIndex = basket.findIndex((item) => item.title === title);
        if (itemIndex >= 0) {
            dispatch({
                type: 'UPDATE_QUANTITY',
                item: {
                    title: title,
                    quantity: basket[itemIndex].quantity + quantity,
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
                    quantity: quantity,
                },
            });
        }
    };

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value);
        if (value >= 1) {
            setQuantity(value);
        }
    };

    const handleSizeChange = (event) => {
        const selectedSize = event.target.value;
        setSize(selectedSize);
        setShowAdditionalPrice(selectedSize !== '');
    };

    const decodedTitle = decodeURIComponent(title);
    const decodedImage = decodeURIComponent(image);
    const decodedPrice = decodeURIComponent(price);
    const decodedCategory = category ? decodeURIComponent(category) : ''; // Handle undefined category
    const decodedHasOption = decodeURIComponent(hasOption);

    console.log('Decoded Title:', decodedTitle);
    console.log('Decoded Image:', decodedImage);
    console.log('Decoded Price:', decodedPrice);
    console.log('Decoded Category:', decodedCategory);
    console.log('Decoded HasOption:', decodedHasOption);

    return (
        <>
            <div id="about-page" className="page-hero-section1" style={{ backgroundImage: 'url("")' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="hero-txt text-center white-color">
                                <div id="breadcrumb">
                                    <div className="row">
                                        <div className="col">
                                            <div className="breadcrumb-nav">
                                                <nav aria-label="breadcrumb">
                                                    <ol className="breadcrumb">
                                                        <li className="breadcrumb-item">
                                                            <Link to='/home'>Home</Link>
                                                        </li>
                                                        <li className="breadcrumb-item active" aria-current="page">Product</li>
                                                    </ol>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="product-view">
                <div className="product-image">
                    <img src={decodedImage} alt="Product" />
                </div>
                <div className="product-details">
                    <h1 className="product-title">{decodedTitle}</h1>
                    <p className="product-price">{`${decodedPrice}som`}</p>
                    {decodedHasOption === 'true' && (
                        <div className="product-size">
                            <label className='sizeLabel' htmlFor="size">Size</label>
                            <select id="size" value={size} onChange={handleSizeChange}>
                                <option value="">Choose an option</option>
                                <option value="S">Small</option>
                                <option value="M">Medium</option>
                                <option value="L">Large</option>
                            </select>
                        </div>
                    )}
                    <hr className="separator-line" /> {/* Add separator line */}
                    {showAdditionalPrice && (
                        <p className="product-price">$10</p>
                    )}
                    <div className="product-quantity">
                        <input
                            className="qty"
                            type="number"
                            min="1"
                            max="20"
                            value={quantity}
                            onChange={handleQuantityChange}
                        />
                        <Link to={`/shop/add-to-cart/${title}`}>
                            <button onClick={addToBasket} className="addToCart"><span className="flaticon-shopping-bag"></span>Add to Cart</button>
                        </Link>
                        
                    </div>
                    <div className="category-container">
                        <div className="categoryLabel">Category:</div>
                        <div className="product-category">{decodedCategory}</div>
                    </div>
                </div>
            </div>
            <div className="related-products-section">
                <h2>Related Products</h2>
                <div className="related-products">
                    {relatedProducts.slice(0, 5).map((product, index) => (
                        <ShopProduct
                            key={index}
                            image={product.image}
                            title={product.title}
                            rating={product.rating}
                            description={product.description}
                            price={product.price}
                            hasOption={product.hasOption}
                            category={product.category}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProductView;
