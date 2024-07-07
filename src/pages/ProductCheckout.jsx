import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { useStateValue } from '../components/StateProvider';
import CurrencyFormat from 'react-currency-format';

const CouponSection = ({ warnings }) => {
    const [showCoupon, setShowCoupon] = useState(false);
    const warningsRef = useRef(null);

    useEffect(() => {
        if (warnings.length > 0) {
            warningsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [warnings]);

    return (
        <div className="have-coupon-bar-wrap" ref={warningsRef}>
            <div className="have-coupon-bar" >
                <div className="icon-wrap"></div>
                <p>Have a coupon? <a onClick={() => setShowCoupon(true)}>Click here to enter your code</a></p>
            </div>
            {showCoupon && (
                <div className="coupon-field-box">
                    <p>If you have a coupon code, please apply it below.</p>
                    <div className="field-wrap">
                        <input type="text" placeholder="Coupon code" />
                        <div className="apply-btn">
                            <a href="#">Apply coupon</a>
                        </div>
                    </div>
                </div>
            )}

            {warnings.length > 0 && (
                <div className='warnings' >
                    <ul className='warnIcon'><FontAwesomeIcon icon={faExclamationCircle} /></ul>
                    {warnings.map((warning, index) => (
                        <p key={index} className="warning">{warning}</p>
                    ))}
                </div>
            )}
        </div>
    );
};

const BillingForm = ({ formData, setFormData }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <div className="checkout-from-wrapper">
            <h3>BILLING</h3>
            <div className="map-box">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2924.022710337545!2d74.60941867529345!3d42.87236480258325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb7c66fe2d2e3%3A0xcb5b5082725f8bc2!2s137%20Yusup%20Abdrahmanov%20Street%2C%20Bishkek%2C%20Kyrgyzstan!5e0!3m2!1sen!2s!4v1719583607089!5m2!1sen!2s"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            <div className="checkout-from">
                <form>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="input-wrap">
                                <label>Email address <span>*</span></label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="col-lg-6 col-12">
                            <div className="input-wrap">
                                <label>First name <span>*</span></label>
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="col-lg-6 col-12">
                            <div className="input-wrap">
                                <label>Last name <span>*</span></label>
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="col-lg-12 col-12">
                            <div className="input-wrap">
                                <label>Country / Region <span>*</span></label>
                                <p>Kyrgyzstan</p>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="input-wrap">
                                <label>Street address <span>*</span></label>
                                <input type="text" placeholder="House number and street name" name="streetAddress" value={formData.streetAddress} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="input-wrap">
                                <label>Phone <span>*</span></label>
                                <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="col-lg-12 col-12">
                            <h3 className="mb-3">ADDITIONAL INFORMATION</h3>
                            <div className="input-wrap">
                                <label>Order notes (optional)</label>
                                <textarea rows="5" cols="10" placeholder="Notes about your order, e.g special notes for delivery." name="orderNotes" value={formData.orderNotes} onChange={handleChange}></textarea>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

const CheckoutSummary = ({ placeOrder }) => {
    const totalPrice = () => {
        return basket.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const [{basket}] = useStateValue();
    return (
        <div className="checkout-container">
            <table className="table">
                <thead>
                    <tr>
                        <th style={{ borderTop: 'none' }}>Product</th>
                        <th className="text-right" style={{ borderTop: 'none' }}>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                {basket.map(item => (
                    <tr>
                        <td>{`${item.title} × ${item.quantity}`}</td>
                        <td className="text-right">{(item.price*item.quantity).toFixed(2)}som</td>
                    </tr>
                ))}
                    <tr>
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
                            <span className="shipping-method">Local pickup</span>
                        </td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td className="text-right total">
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
            <div className="payment-method-wrapper">
                <div className="payment-method">
                    <div className="payment-method-title">Cash on delivery</div>
                    <p>Pay with cash upon delivery.</p>
                </div>
                <div className="privacy-policy-wrap">
                    <p className="privacy-policy">
                        Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="#">privacy policy</a>.
                    </p>
                    <button className="place-order-btn" onClick={placeOrder}>Place order</button> 
                </div>
            </div>
        </div>
    );
};

const ProductCheckout = () => {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        streetAddress: '',
        phone: '',
        orderNotes: '',
    });

    const [warnings, setWarnings] = useState([]);
    const navigate = useNavigate();

    const placeOrder = () => {
        const newWarnings = [];
        if (!formData.email) newWarnings.push('Billing Email address is a required field.');
        if (!formData.firstName) newWarnings.push('Billing First name is a required field.');
        if (!formData.lastName) newWarnings.push('Billing Last name is a required field.');
        if (!formData.phone) newWarnings.push('Billing Phone is a required field.');
        if (formData.streetAddress.includes('PK')) newWarnings.push('Unfortunately we do not ship to PK. Please enter an alternative shipping address.');

        setWarnings(newWarnings);

        if (newWarnings.length === 0) {
            navigate('/checkout/order-received');
        }
    };

    return (
        <>
            <div id="page" className="page">
                <div id="about-page" className="page-hero-section division" style={{ backgroundImage: 'url("")' }}>
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
                                                            <Link to='/home'>
                                                                <li className="breadcrumb-item"><a href="">Home</a></li>
                                                            </Link>
                                                            <p className='breadcrumb-item'></p>
                                                            <li className="breadcrumb-item active" aria-current="page">Checkout</li>
                                                        </ol>
                                                    </nav>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h2 className="h2-xl">CHECKOUT</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="product-1" className="pt-100 pb-100 single-product division">
                <div className="container">
                    <CouponSection warnings={warnings} />
                    <div className="checkout-content-box">
                        <div className="row">
                            <div className="col-lg-6 col-12">
                                <BillingForm formData={formData} setFormData={setFormData} />
                            </div>
                            <div className="col-lg-6 col-12">
                                <CheckoutSummary placeOrder={placeOrder} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCheckout;
