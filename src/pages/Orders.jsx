import React from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../components/StateProvider';
import CurrencyFormat from 'react-currency-format';
import { useEffect } from 'react';

const OrderInfo = () => {
    const [{basket}] = useStateValue();
    const getCurrentDate = () => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const currentDate = new Date().toLocaleDateString('en-US', options);
        return currentDate;
    };

    const totalPrice = () => {
        return basket.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="order-info">
            <div className="info-item">
                <span className="label">Order Number:</span>
                <span className="value">834</span>
            </div>
            <div className="info-item">
                <span className="label">Date:</span>
                <span className="value">{getCurrentDate()}</span>
            </div>
            <div className="info-item">
                <span className="label">Total:</span>
                <span className="value">{totalPrice()}som</span>
            </div>
            <div className="info-item">
                <span className="label">Payment Method:</span>
                <span className="value">Cash on delivery</span>
            </div>
        </div>
    );
};

const OrderDetails = () => {
    const [{basket}] = useStateValue();
    const totalPrice = () => {
        return basket.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="order-details">
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    
                {basket.map(item => (
                    <tr>
                        <td className='text-bold'>{`${item.title} × ${item.quantity}`}</td>
                        <td className='text-bold'>{(item.price*item.quantity).toFixed(2)}som</td>
                    </tr>
                ))}
                    <tr>
                        <td className="text-bold">Subtotal:</td>
                        <td className="text-bold">
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
                        <td className="text-bold">Shipping:</td>
                        <td className="text-bold">Local pickup</td>
                    </tr>
                    <tr>
                        <td className="text-bold">Payment method:</td>
                        <td className="text-bold">Cash on delivery</td>
                    </tr>
                    <tr>
                        <td className="total-num">Total:</td>
                        <td className="total-num">
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
        </div>
    );
};

const Orders = () => {
    const [{}, dispatch] = useStateValue();
    const emptyBasket = (() => {
        dispatch( {
            type: 'EMPTY_BASKET',
        });
    })

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
                                    <h2 className="h2-xl">SUCCESS</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <div id="product-1" className="pt-100 pb-100 single-product division">
            <div className="container">
                <div className="order-confirmation">
                    <h2>Thank you. Your order has been received.</h2>
                    <OrderInfo />
                    <p>Pay with cash upon delivery.</p>
                    <h3>Order Details</h3>
                    <OrderDetails />
                </div>
            </div>
        </div>
        </>
    );
};

export default Orders;
