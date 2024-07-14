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
            <div className="have-coupon-bar">
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
                <div className='warnings'>
                    <ul className='warnIcon'><FontAwesomeIcon icon={faExclamationCircle} /></ul>
                    {warnings.map((warning, index) => (
                        <p key={index} className="warning">{warning}</p>
                    ))}
                </div>
            )}
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
    const [{ basket }] = useStateValue();

    const [showBilling, setShowBilling] = useState(true);
    const [selectedShipping, setSelectedShipping] = useState('Deliver');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleShippingChange = (e) => {
        const value = e.target.value;
        setSelectedShipping(value);
        setShowBilling(value !== 'Local pickup');
    };

    const placeOrder = () => {
        const newWarnings = [];
        if (!formData.email) newWarnings.push('Billing Email address is a required field.');
        if (!formData.firstName) newWarnings.push('Billing First name is a required field.');
        if (!formData.lastName) newWarnings.push('Billing Last name is a required field.');
        if (!formData.phone) newWarnings.push('Billing Phone is a required field.');

        setWarnings(newWarnings);

        if(!showBilling) {
            navigate('/checkout/order-received');
        }
        if (newWarnings.length === 0) {
            navigate('/checkout/order-received');
        }
    };

    const totalPrice = () => {
        return basket.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            initMap();
        };

        const initMap = () => {
            const map = new window.google.maps.Map(document.getElementById("map"), {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8,
            });
            const marker = new window.google.maps.Marker({
                position: { lat: -34.397, lng: 150.644 },
                map,
                draggable: true,
            });

            const geocoder = new window.google.maps.Geocoder();

            marker.addListener('dragend', () => {
                geocodePosition(marker.getPosition(), geocoder);
            });

            const geocodePosition = (pos, geocoder) => {
                geocoder.geocode({ latLng: pos }, (results, status) => {
                    if (status === window.google.maps.GeocoderStatus.OK) {
                        const address = results[0].formatted_address;
                        setFormData(prevState => ({ ...prevState, streetAddress: address }));
                    }
                });
            };
        };

        return () => {
            document.head.removeChild(script);
        };
    }, []);

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
                        <div className="row1">
                            {showBilling && (
                                <div className="col-lg-6 col-12">
                                    <div className="checkout-from-wrapper">
                                        <h3>BILLING</h3>
                                        <div className="map-box">
                                            <div id="map" style={{ width: '100%', height: '450px' }}></div>
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
                                </div>
                            )}
                            <div className="col-lg-6 col-12">
                                <div className="checkout-container">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <td style={{ borderTop: 'none' }}>
                                                    <label className='sizeLabel' htmlFor="shipping">Shipping</label>
                                                </td>
                                                <td style={{ borderTop: 'none' }}>
                                                    <select className='select-shipping' value={selectedShipping} onChange={handleShippingChange}>
                                                        <option value="Deliver">Deliver</option>
                                                        <option value="Local pickup">Local pickup</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Product</th>
                                                <th className="text-right">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {basket.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{`${item.title} × ${item.quantity}`}</td>
                                                    <td className="text-right">{(item.price * item.quantity).toFixed(2)}som</td>
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
                                                    <span className="shipping-method">{selectedShipping}</span>
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
                                    {(showBilling) ? 
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
                                    : (
                                        <div className="payment-method-wrapper">
                                        <div className="payment-method">
                                            <div className="payment-method-title">Pickup Address</div>
                                            <p><strong>Mac Burger & Pizza</strong><br/>
                                            137 Yusup Abdrahmanov Str. Crossing Toktogul, Bishkek, Kyrgyzstan</p>
                                        </div>
                                        <div className="privacy-policy-wrap">
                                            <button className="place-order-btn" onClick={placeOrder}>Place order</button>
                                        </div>
                                    </div> 
                                    )}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCheckout;
