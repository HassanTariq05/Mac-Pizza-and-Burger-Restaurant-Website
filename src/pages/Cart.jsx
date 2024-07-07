import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartProduct from '../components/CartProduct';
import { useStateValue } from '../components/StateProvider';
import CurrencyFormat from 'react-currency-format';
import '../css/Cart.css'; // Import the CSS file
import ShopProduct from '../components/ShopProduct';

const Cart = () => {

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
    ];

    const [{ basket }, dispatch] = useStateValue();
    const [showCouponInput, setShowCouponInput] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [emptyBasket, setEmptyBasket] = useState(true);

    useEffect(() => {
        setEmptyBasket(basket.length === 0);
    }, [basket]);

    const totalPrice = () => {
        return basket.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handleApplyCoupon = (event) => {
        event.preventDefault();
        // Logic to apply the coupon
        console.log('Coupon applied:', couponCode);
    };

    return (
        <div id="page" className="page">
            <div id="about-page" className="page-hero-section division" style={{ backgroundImage: "url('')" }}>
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
                                                        <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                                                        <li className="breadcrumb-item active" aria-current="page">CART</li>
                                                    </ol>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h2 className="h2-xl">CART</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section id="cart-1" className="wide-100 cart-page division">
                <div className="container">
                    {emptyBasket ? (
                        <>
                        <div className="text-center">
                            <img className='sadimg' ></img>
                            <h2>Your cart is currently empty!</h2>
                        </div>
                        <div className="related-products-section">
                        <h2>NEW IN STORE</h2>
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
                    ) : (
                        <div className="row">
                            <div className="col-md-8">
                                <div className="cart-table mb-70">
                                    <table id="myTable">
                                        <thead>
                                            <tr>
                                                <th scope="col">PRODUCT</th>
                                                <th className='totalth' scope="col"></th>
                                                <th className='totalth' scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {basket.map(item => (
                                                <CartProduct
                                                    key={item.title}
                                                    title={item.title}
                                                    image={item.image}
                                                    description={item.description}
                                                    price={item.price}
                                                    quantity={item.quantity}
                                                />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="cart-checkout">
                                    <p className="c">CART TOTALS</p>
                                    <table>
                                        <tbody>
                                            <tr className="trrr">
                                                <td>
                                                    {showCouponInput ? (
                                                        <form className="wc-block-components-totals-coupon__form" id="wc-block-components-totals-coupon__form" onSubmit={handleApplyCoupon}>
                                                            <div className="wc-block-components-text-input wc-block-components-totals-coupon__input">
                                                                <input className='cinput'
                                                                    type="text"
                                                                    id="wc-block-components-totals-coupon__input-0"
                                                                    autocapitalize="off"
                                                                    autocomplete="off"
                                                                    aria-label="Enter code"
                                                                    aria-invalid="false"
                                                                    title=""
                                                                    placeholder='Enter Code'
                                                                    value={couponCode}
                                                                    onChange={(e) => setCouponCode(e.target.value)}
                                                                />
                                                            </div>
                                                        </form>
                                                    ) : (
                                                        <span className="coupon" onClick={() => setShowCouponInput(true)}>Add a coupon</span>
                                                    )}
                                                </td>
                                                <td>
                                                    {showCouponInput ? (
                                                        <button id='applyBtn' type="submit" className="btn btn-md btn-salmon tra-salmon-hover">
                                                            <span className="wc-block-components-button__text">Apply</span>
                                                        </button>
                                                    ) : (
                                                        <span></span>
                                                    )}
                                                </td>
                                            </tr>
                                            <tr className='trr'>
                                                <td>Subtotal</td>
                                                <td className="text-right">
                                                    <CurrencyFormat
                                                        value={totalPrice()}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        suffix={'som'}
                                                        renderText={value => <div>{value}</div>}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Shipping</td>
                                                <td className="text-right">
                                                    <div>0.00som</div>
                                                </td>
                                            </tr>
                                            <tr className="last-tr">
                                                <td>Total</td>
                                                <td className="text-right">
                                                    <CurrencyFormat
                                                        value={totalPrice()}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        suffix={'som'}
                                                        renderText={value => <div>{value}</div>}
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className='checkout-button-sticky'>
                                        <Link to={'/checkout'}>
                                            <button id='cbtn' href="#" className="btn btn-md btn-salmon tra-salmon-hover">Proceed To Checkout</button>
                                        </Link>
                                    </div>
                                    <button href="#" className="btn btn-md btn-salmon tra-salmon-hover">Add another item</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Cart;
